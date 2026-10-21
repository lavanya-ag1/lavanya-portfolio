# Lavanya Agarwal | Personal Portfolio (MERN Stack)

Full-stack developer portfolio built with React 18 (Vite), Node.js + Express, and MongoDB Atlas (Mongoose).
Features interactive typewriter hero, skill bars, project filters, timeline, certifications, dark/light theme switcher, a contact form persisted to MongoDB with rate limiting, and dual resume streaming (PDF + DOCX).

- **Live Site:** [https://lavanya-portfolio.vercel.app](https://lavanya-portfolio.vercel.app)
- **API Service:** [https://lavanya-portfolio-api.onrender.com](https://lavanya-portfolio-api.onrender.com)
- **Deployment Guide:** See [DEPLOY.md](DEPLOY.md)
- **Complete Documentation:** See top-level [README.md](../README.md)

## Structure
```text
client/   React frontend (Vite, Framer Motion, src/data.js)
server/   Express API (MongoDB Atlas, contact form, resume routes)
```

## Quick Start
```powershell
# 1. Backend
cd server
npm install
npm run test-db    # Run connection diagnostics for MongoDB Atlas
npm run dev        # http://localhost:5000

# 2. Frontend (in new terminal)
cd client
npm install
npm run dev        # http://localhost:5173
```
