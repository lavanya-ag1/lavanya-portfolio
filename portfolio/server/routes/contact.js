const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const Message = require("../models/Message");

const { LIMITS } = Message;
const router = express.Router();
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const UNAVAILABLE = "The contact form is temporarily unavailable. Please email me directly instead.";

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

const clean = (v) => (typeof v === "string" ? v.trim() : "");
// Header values (subject line) must never contain line breaks
const oneLine = (v) => v.replace(/[\r\n]+/g, " ");

function validate({ name, email, subject, message }) {
  if (!name) return "Please provide your name.";
  if (name.length > LIMITS.name) return `Name must be ${LIMITS.name} characters or fewer.`;
  if (!email || !emailRe.test(email)) return "Please enter a valid email address.";
  if (email.length > LIMITS.email) return `Email must be ${LIMITS.email} characters or fewer.`;
  if (subject.length > LIMITS.subject) return `Subject must be ${LIMITS.subject} characters or fewer.`;
  if (!message) return "Please include a message.";
  if (message.length > LIMITS.message) return `Message must be ${LIMITS.message} characters or fewer.`;
  return null;
}

function notify({ name, email, subject, message }) {
  return transporter.sendMail({
    from: process.env.MAIL_FROM || process.env.SMTP_USER,
    to: process.env.MAIL_TO || process.env.SMTP_USER,
    replyTo: email,
    subject: oneLine(`[Portfolio Contact] ${subject} from ${name}`),
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  });
}

// POST /api/contact - submit contact form
router.post("/", rateLimit, async (req, res) => {
  const body = req.body || {};
  const data = {
    name: clean(body.name),
    email: clean(body.email).toLowerCase(),
    subject: clean(body.subject) || "General Inquiry",
    message: clean(body.message),
  };

  const problem = validate(data);
  if (problem) return res.status(400).json({ error: problem });

  const dbReady = mongoose.connection.readyState === 1;
  if (!dbReady && !transporter) {
    console.error("[Contact API] Message dropped: no database connection and no SMTP configured.");
    return res.status(503).json({ error: UNAVAILABLE });
  }

  let saved = false;
  if (dbReady) {
    try {
      await Message.create(data);
      saved = true;
    } catch (err) {
      console.error("[Contact API] Error saving message:", err.message);
    }
  }

  if (transporter) {
    const sending = notify(data);
    if (saved) {
      // Already stored, so don't make the visitor wait for the email
      sending.catch((e) => console.error("[Mailer] Notification failed:", e.message));
    } else {
      try {
        await sending;
      } catch (e) {
        console.error("[Mailer] Notification failed:", e.message);
        return res.status(503).json({ error: UNAVAILABLE });
      }
    }
  } else if (!saved) {
    return res.status(503).json({ error: UNAVAILABLE });
  }

  res.status(201).json({ ok: true, message: "Thanks! Your message was sent." });
});

module.exports = router;
