require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const isProduction = process.env.NODE_ENV === "production";

// CORS: allow the frontend URL(s) from CLIENT_URL, plus localhost during development
const allowedOrigins = (process.env.CLIENT_URL || "")
  .split(",")
  .map((u) => u.trim().replace(/\/$/, ""))
  .filter(Boolean);
const localhostRe = /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;

if (isProduction && allowedOrigins.length === 0) {
  console.warn("[CORS] CLIENT_URL is not set, so requests from any website are allowed. Set it to your frontend URL.");
}

app.use(
  cors({
    origin: (origin, callback) => {
      // No Origin header: same-origin requests, curl, health checks
      if (!origin) return callback(null, true);
      if (isProduction && allowedOrigins.length === 0) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      if (!isProduction && localhostRe.test(origin)) return callback(null, true);
      return callback(null, false);
    },
  })
);

// Render and similar hosts sit behind one proxy; needed so req.ip is the visitor's IP
app.set("trust proxy", 1);
app.use(express.json({ limit: "50kb" }));

app.get("/", (_req, res) => {
  res.json({
    status: "online",
    service: "Lavanya Agarwal Portfolio API",
    endpoints: {
      contact: "POST /api/contact",
      resumePdf: "GET /api/resume/pdf",
      resumeDocx: "GET /api/resume/docx",
      health: "GET /api/health",
    },
  });
});

app.get("/api/health", (_req, res) => {
  const states = ["disconnected", "connected", "connecting", "disconnecting"];
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()),
    database: {
      status: states[mongoose.connection.readyState] || "unknown",
      connected: mongoose.connection.readyState === 1,
    },
  });
});

app.use("/api/contact", require("./routes/contact"));
app.use("/api/resume", require("./routes/resume"));

app.use((_req, res) => {
  res.status(404).json({ error: "Endpoint not found." });
});

// Errors with a 4xx status (e.g. malformed JSON, body too large) are the client's fault
app.use((err, _req, res, _next) => {
  const status = err.status || err.statusCode || 500;
  if (status >= 500) console.error("Unhandled server error:", err);
  res.status(status).json({
    error: status === 413 ? "Request is too large." : status < 500 ? "Invalid request." : "Internal server error.",
  });
});

const PORT = process.env.PORT || 5000;

if (process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("[MongoDB] Connected."))
    .catch((err) => {
      console.warn(`[MongoDB] Connection failed: ${err.message}`);
      console.warn("[MongoDB] Check the URI and that Atlas Network Access allows this server's IP.");
    });
} else {
  console.warn("[MongoDB] MONGO_URI is not set; messages will only be delivered by email (if SMTP is set up).");
}

app.listen(PORT, () => console.log(`[Server] Portfolio API running on port ${PORT}`));

module.exports = app;
