# Lavanya Agarwal | Personal Portfolio (MERN Stack)

Full-stack portfolio built with React (Vite), Node.js + Express, and MongoDB (Mongoose).
It has a typewriter hero, animated skill bars, project filters, timeline, certifications,
dark/light mode, a contact form saved to MongoDB, and CV download (PDF + DOCX) served by the backend.

**Live site:** https://your-portfolio.vercel.app
**API:** https://your-api.onrender.com

## Structure
```
client/   React frontend (all content is in src/data.js)
server/   Express API (contact form + resume downloads)
```

## Local setup
```bash
# 1. Backend
cd server
npm install
cp .env.example .env     # then fill in MONGO_URI
npm run dev              # http://localhost:5000

# 2. Frontend (new terminal)
cd client
npm install
cp .env.example .env
npm run dev              # http://localhost:5173
```

## API
| Method | Route | Purpose |
|---|---|---|
| POST | /api/contact | Save a message `{name, email, message}` |
| GET | /api/resume/pdf | Download resume PDF |
| GET | /api/resume/docx | Download resume Word file |

## Deployment
Full step-by-step guide: see [DEPLOY.md](DEPLOY.md).

- **Backend (Render):** root dir `server`, build `npm install`, start `npm start`. Add env vars `MONGO_URI`, `CLIENT_URL` (your Vercel URL).
- **Frontend (Vercel):** root dir `client`, framework Vite. Add env var `VITE_API_URL` (your Render URL).
- **MongoDB Atlas:** allow network access `0.0.0.0/0` so Render can connect.

Never commit `.env`. It is listed in `.gitignore`.
