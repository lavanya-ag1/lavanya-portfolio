require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// Allow cross-origin requests from frontend (dev & production)
const configuredOrigins = (process.env.CLIENT_URL || "")
  .split(",")
  .map((u) => u.trim().replace(/\/$/, ""))
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (configuredOrigins.length === 0) return callback(null, true);
      if (configuredOrigins.includes(origin)) return callback(null, true);
      if (/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) return callback(null, true);
      return callback(null, true); // Permissive fallback to prevent CORS blockage
    },
    credentials: true,
  })
);

app.set("trust proxy", 1);
app.use(express.json({ limit: "50kb" }));

// Serve static resume files directly if accessed via /files
app.use("/files", express.static(path.join(__dirname, "files")));

// Root route
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

// Health check endpoint
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

// Mount modular routes
app.use("/api/contact", require("./routes/contact"));
app.use("/api/resume", require("./routes/resume"));

// Legacy/direct resume download endpoints for backward compatibility
app.get("/download/pdf", (req, res) => {
  const file = path.join(__dirname, "files", "resume.pdf");
  res.download(file, "Lavanya_Agarwal_Resume.pdf");
});

app.get("/download/word", (req, res) => {
  const file = path.join(__dirname, "files", "resume.docx");
  res.download(file, "Lavanya_Agarwal_Resume.docx");
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: "Endpoint not found." });
});

// Global error handler
app.use((err, _req, res, _next) => {
  console.error("Unhandled server error:", err);
  res.status(500).json({ error: "Internal server error." });
});

const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas
if (process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("[MongoDB] Connected successfully to MongoDB Atlas database.");
    })
    .catch((err) => {
      console.warn(`[MongoDB] Connection failed: ${err.message}.`);
      console.warn("[MongoDB] Running in standalone mode. Note: IP must be allowed in Atlas (0.0.0.0/0).");
    });
} else {
  console.warn("[MongoDB] Notice: MONGO_URI not defined in .env.");
}

app.listen(PORT, () => {
  console.log(`[Server] Portfolio API running on http://localhost:${PORT}`);
});

module.exports = app;