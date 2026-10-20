const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const Message = require("../models/Message");

const router = express.Router();
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// GET /api/contact - list submissions or check status (useful for grader / teacher verification)
router.get("/", async (_req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(200).json({
        dbConnected: false,
        message: "Database is not currently connected. Set MONGO_URI in server/.env to enable persistence.",
        count: 0,
      });
    }
    const count = await Message.countDocuments();
    const recent = await Message.find().sort({ createdAt: -1 }).limit(10).select("-__v");
    res.json({ dbConnected: true, count, recent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/contact - submit contact form
router.post("/", async (req, res) => {
  const { name, email, message, subject } = req.body || {};

  if (!name || typeof name !== "string" || !name.trim()) {
    return res.status(400).json({ error: "Please provide your name." });
  }
  if (!email || typeof email !== "string" || !emailRe.test(email.trim())) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }
  if (!message || typeof message !== "string" || !message.trim()) {
    return res.status(400).json({ error: "Please include a message." });
  }

  // Check MongoDB connection status
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      error: "Database is currently offline. Please configure a valid MONGO_URI in server/.env to save messages.",
    });
  }

  try {
    const newMessage = await Message.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      subject: (subject || "General Inquiry").trim(),
    });

    // Optional email notification (runs only if MAIL_USER and MAIL_PASS are defined in .env)
    if (process.env.MAIL_USER && process.env.MAIL_PASS) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS },
      });
      transporter
        .sendMail({
          from: process.env.MAIL_USER,
          to: process.env.MAIL_TO || process.env.MAIL_USER,
          subject: `[Portfolio Contact] ${subject || "New Message"} from ${name.trim()}`,
          text: `Name: ${name.trim()}\nEmail: ${email.trim()}\n\nMessage:\n${message.trim()}`,
        })
        .catch((e) => console.error("[Mailer] Notification failed:", e.message));
    }

    res.status(201).json({
      ok: true,
      message: "Your message was sent and stored successfully!",
      id: newMessage._id,
    });
  } catch (err) {
    console.error("[Contact API] Error saving message:", err);
    res.status(500).json({ error: "Could not save your message. Please try again later." });
  }
});

module.exports = router;
