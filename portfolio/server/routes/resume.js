const express = require("express");
const path = require("path");
const fs = require("fs");

const router = express.Router();
const files = {
  pdf: { file: "resume.pdf", name: "Lavanya_Agarwal_Resume.pdf" },
  docx: { file: "resume.docx", name: "Lavanya_Agarwal_Resume.docx" },
};

router.get("/:format", (req, res) => {
  const entry = files[req.params.format];
  if (!entry) return res.status(404).json({ error: "Use /pdf or /docx." });
  const filePath = path.join(__dirname, "..", "files", entry.file);
  if (!fs.existsSync(filePath)) return res.status(404).json({ error: "Resume file missing." });
  res.download(filePath, entry.name);
});

module.exports = router;
