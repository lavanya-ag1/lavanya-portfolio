# Lavanya Agarwal — Developer Portfolio (MERN)

Personal portfolio for **Lavanya Agarwal**, B.Tech CSE student at JK Lakshmipat University, Jaipur.
React + Vite frontend, Node.js + Express API, MongoDB Atlas for contact messages.

- **Source:** [github.com/lavanya-ag1/lavanya-portfolio](https://github.com/lavanya-ag1/lavanya-portfolio)
- **GitHub:** [github.com/lavanya-ag1](https://github.com/lavanya-ag1) · **LinkedIn:** [linkedin.com/in/lavanya-ag5](https://www.linkedin.com/in/lavanya-ag5/) · **Email:** [lavanya.agarwal1508@gmail.com](mailto:lavanya.agarwal1508@gmail.com)
- **Live site:** not deployed yet — follow [portfolio/DEPLOY.md](portfolio/DEPLOY.md), then add the URL here.

## Features

- Single-page React app: typewriter hero, skills, filterable projects with detail dialogs, timeline, certificates, dark/light theme.
- Featured project: [LIANA — Fashion Storefront](https://lavanya-ag1.github.io/liana-website/).
- Resume downloads (PDF and Word) served as static files from the frontend.
- Contact form → Express API → saved in MongoDB, with optional email alert via SMTP.
  If the database is down but email is configured, messages are still delivered by email.
- API protections: input validation with length limits, per-IP rate limit (5 messages / 15 min), CORS allow-list, 50 KB body limit.
- Accessibility: keyboard-friendly dialogs (focus trap, Escape, focus restore), skip link, reduced-motion support.

## Architecture

```text
Browser ──> Frontend (React + Vite, static, e.g. Vercel)
               │  POST /api/contact, GET /api/health
               ▼
            API (Node + Express, e.g. Render) ──> MongoDB Atlas (messages)
                                              └─> SMTP (optional email alert)
```

## Project structure

```text
portfolio/
├── DEPLOY.md                 Deployment guide (Atlas, Render, Vercel)
├── client/                   React frontend
│   ├── public/               Images, favicon, files/resume.pdf + resume.docx
│   ├── src/
│   │   ├── data.js           ALL site content (profile, skills, projects, timeline, certs)
│   │   ├── api.js            Backend URL (VITE_API_URL)
│   │   ├── hooks.js          API status check, copy-to-clipboard
│   │   ├── components/       Nav, ProjectGrid, ContactPanel, Modal, Icons, ...
│   │   └── pages/            Home, Work (/work), Contact (/contact)
│   ├── vercel.json           SPA rewrite for Vercel
│   └── public/_redirects     SPA rewrite for Netlify
└── server/                   Express API
    ├── server.js             App setup, CORS, health check, MongoDB connection
    ├── routes/contact.js     POST /api/contact
    ├── routes/resume.js      GET /api/resume/:format
    ├── models/Message.js     Mongoose schema + field limits
    └── files/                Resume copies for the API download route
render.yaml                   Render blueprint for the API
```

To update the site's content, edit [portfolio/client/src/data.js](portfolio/client/src/data.js).
To update the resume, replace the files in **both** `client/public/files/` and `server/files/`
(the two are deployed separately) and update the sizes in `resumeFiles` in `data.js`.

## API

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/api/health` | Uptime and database status |
| `POST` | `/api/contact` | Body: `{ name, email, subject?, message }` → `201`, `400` (validation), `429` (rate limit), `503` (no storage available) |
| `GET` | `/api/resume/pdf` · `/api/resume/docx` | Resume download |

## Run locally

Requires Node.js 20.19+ (or 22.12+).

```powershell
# Terminal 1 — API on http://localhost:5000
cd portfolio/server
npm install
Copy-Item .env.example .env   # then fill in MONGO_URI (and SMTP_* if you want email alerts)
npm run dev

# Terminal 2 — frontend on http://localhost:5173
cd portfolio/client
npm install
npm run dev
```

The frontend uses `http://localhost:5000` in development automatically. Set `VITE_API_URL` in
`portfolio/client/.env` only if your API runs elsewhere.

## Security notes

- Never commit `.env`. Only `.env.example` (placeholders) belongs in git.
- A real database password was committed in an earlier version of `server/.env.example`.
  It must be rotated in MongoDB Atlas; removing it from the file does not remove it from git history.

## Tech stack

React 18, React Router 7, Framer Motion, Vite · Node.js, Express 4, Mongoose 8, Nodemailer · MongoDB Atlas · Vercel / Render.
