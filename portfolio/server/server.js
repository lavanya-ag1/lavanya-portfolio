const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Allow your frontend to call the API
app.use(cors());              // for quick fix; restrict origin later
app.use(express.json());

// Contact form route
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log('Message received:', req.body);
  res.json({ success: true, message: 'Message sent!' });
});

// Serve resume files (see section 2)
app.use('/files', express.static(path.join(__dirname, 'public/files')));

app.get('/download/pdf', (req, res) => {
  res.download(path.join(__dirname, 'public/files/resume.pdf'), 'My_Resume.pdf');
});

app.get('/download/word', (req, res) => {
  res.download(path.join(__dirname, 'public/files/resume.docx'), 'My_Resume.docx');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));