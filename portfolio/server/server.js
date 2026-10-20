
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Test route
app.get("/api/health", (req, res) => {
  res.json({
    message: "Backend is running",
    database: mongoose.connection.readyState === 1
      ? "Connected"
      : "Not connected",
  });
});

// Connect to MongoDB first, then start the server
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully!");

    app.listen(process.env.PORT || 5000, () => {
      console.log("Backend running on port 5000");
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
}

startServer();
