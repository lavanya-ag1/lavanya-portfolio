require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// CORS: allow origins listed in CLIENT_URL (comma-separated) plus localhost for development
const configuredOrigins = (process.env.CLIENT_URL || "")
  .split(",")
  .map((u) => u.trim().replace(/\/$/, ""))
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // No Origin header: curl, server-to-server, direct downloads
      if (!origin) return callback(null, true);
      if (configuredOrigins.includes(origin)) return callback(null, true);
      if (/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) return callback(null, true);
      return callback(null, false);
    },
  })
);

// Render sits behind a proxy; needed so req.ip is the real client IP (rate limiting)
app.set("trust proxy", 1);

app.use(express.json({ limit: "50kb" }));

// Health and API info
app.get("/", (_req, res) => {
  res.json({
    status: "online",
    service: "Lavanya Agarwal Portfolio API (MERN Stack)",
    mongo: mongoose.connection.readyState === 1 ? "connected" : "connecting/pending",
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
  const dbState = states[mongoose.connection.readyState] || "unknown";
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()),
    database: {
      status: dbState,
      connected: mongoose.connection.readyState === 1,
    },
  });
});

app.use("/api/contact", require("./routes/contact"));
app.use("/api/resume", require("./routes/resume"));

// 404 handler for API routes
app.use((_req, res) => {
  res.status(404).json({ error: "Endpoint not found." });
});

// Error handling middleware
app.use((err, _req, res, _next) => {
  console.error("Unhandled server error:", err);
  res.status(500).json({ error: "Internal server error." });
});

const PORT = process.env.PORT || 5000;

// Start server first so endpoints are immediately accessible
app.listen(PORT, () => {
  console.log(`[Server] Portfolio API listening on http://localhost:${PORT}`);
});

// Connect to MongoDB
if (process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("[MongoDB] Connected successfully to MongoDB Atlas database.");
    })
    .catch((err) => {
      console.warn(`[MongoDB] Connection failed: ${err.message}.`);
      console.warn("[MongoDB] Server running in standalone mode (resume routes working).");
    });
} else {
  console.warn("[MongoDB] Notice: MONGO_URI not defined in .env. Server running in standalone mode.");
}
