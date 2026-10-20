const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const Message = require("../models/Message");

const router = express.Router();
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// SMTP transporter, created once. Needs SMTP_HOST, SMTP_USER and SMTP_PASS.
const smtpPort = Number(process.env.SMTP_PORT) || 587;
const transporter =
  process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS
    ? nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: smtpPort,
        // Port 465 uses TLS from the start; 587 upgrades with STARTTLS
        secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : smtpPort === 465,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      })
    : null;

if (transporter) {
  transporter
    .verify()
    .then(() => console.log(`[Mailer] SMTP ready (${process.env.SMTP_HOST}:${smtpPort}).`))
    .catch((e) => console.warn("[Mailer] SMTP check failed:", e.message));
}

// Simple in-memory rate limit: 5 messages per IP every 15 minutes
const WINDOW_MS = 15 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map();

function rateLimit(req, res, next) {
  const now = Date.now();
  const recent = (hits.get(req.ip) || []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    return res.status(429).json({ error: "Too many messages. Please try again later." });
  }
  recent.push(now);
  hits.set(req.ip, recent);
  next();
}

// Drop stale entries so the map doesn't grow forever
setInterval(() => {
  const now = Date.now();
  for (const [ip, times] of hits) {
    if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(ip);
  }
}, WINDOW_MS).unref();

// POST /api/contact - submit contact form
router.post("/", rateLimit, async (req, res) => {
  const { name, email, message } = req.body || {};
  const subject =
    typeof req.body?.subject === "string" && req.body.subject.trim()
      ? req.body.subject.trim()
      : "General Inquiry";

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
      subject,
    });

    // Optional email notification (only when SMTP is configured in .env)
    if (transporter) {
      transporter
        .sendMail({
          from: process.env.MAIL_FROM || process.env.SMTP_USER,
          to: process.env.MAIL_TO || process.env.SMTP_USER,
          replyTo: email.trim(),
          subject: `[Portfolio Contact] ${subject} from ${name.trim()}`,
          text: `Name: ${name.trim()}
Email: ${email.trim()}

Message:
${message.trim()}`,
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
