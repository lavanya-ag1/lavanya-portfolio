const mongoose = require("mongoose");

// Shared with routes/contact.js so the API rejects oversized fields with a clear 400
const LIMITS = { name: 120, email: 180, subject: 200, message: 3000 };

const messageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: LIMITS.name },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: LIMITS.email },
    subject: { type: String, trim: true, default: "General Inquiry", maxlength: LIMITS.subject },
    message: { type: String, required: true, trim: true, maxlength: LIMITS.message },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
module.exports.LIMITS = LIMITS;
