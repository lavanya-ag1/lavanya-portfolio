# 🚀 Lavanya Agarwal — Full-Stack Developer Portfolio (MERN Stack)

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.3.5-646CFF?logo=vite&logoColor=white)

A high-performance, modern full-stack developer portfolio and resume service built for **Lavanya Agarwal**, a Computer Science and Engineering undergraduate at JK Lakshmipat University, Jaipur. 

This platform showcases AI/ML systems, full-stack web applications, technical skill proficiencies, internship experience, certifications, and provides automated binary resume downloads (PDF and Microsoft Word) alongside an Express + MongoDB Atlas contact ingestion backend.

---

## 🌐 Live Deployments & Links

| Service / Resource | Status | Live Link |
| :--- | :---: | :--- |
| **Live Portfolio Website** | 🟢 Production | [lavanya-portfolio.vercel.app](https://lavanya-portfolio.vercel.app) |
| **Backend API Service** | 🟢 Live API | [lavanya-portfolio-api.onrender.com](https://lavanya-portfolio-api.onrender.com) |
| **API Health Check** | 🟢 Live Status | [lavanya-portfolio-api.onrender.com/api/health](https://lavanya-portfolio-api.onrender.com/api/health) |
| **Direct PDF Resume** | 📄 Direct Download | [Download PDF](https://lavanya-portfolio.vercel.app/files/resume.pdf) \| [API Stream](https://lavanya-portfolio-api.onrender.com/api/resume/pdf) |
| **Direct DOCX Resume** | 📝 Direct Download | [Download Word](https://lavanya-portfolio.vercel.app/files/resume.docx) \| [API Stream](https://lavanya-portfolio-api.onrender.com/api/resume/docx) |
| **Source Code Repository** | 💻 GitHub | [github.com/lavanya-ag1/lavanya-portfolio](https://github.com/lavanya-ag1/lavanya-portfolio) |
| **GitHub Profile** | 👩‍💻 GitHub | [github.com/lavanya-ag1](https://github.com/lavanya-ag1) |
| **LinkedIn Profile** | 💼 LinkedIn | [linkedin.com/in/lavanya-ag5](https://www.linkedin.com/in/lavanya-ag5/) |
| **Email** | ✉️ Contact | [lavanya.agarwal1508@gmail.com](mailto:lavanya.agarwal1508@gmail.com) |

---

## 🌟 Key Features

- **Dynamic Interactive UI:**
  - Fast single-page application built with React 18, Vite, and Framer Motion.
  - Interactive typewriter introduction and animated skill bars.
  - Category-based project filtering and detailed project architecture modals.
  - Seamless Dark and Light theme toggle with persisted preference.
- **Backend & Database Infrastructure:**
  - Robust Node.js + Express REST API.
  - MongoDB Atlas cloud database connection managed with Mongoose schemas.
  - Server-side payload validation, sanitized inputs, and IP rate limiting (5 submissions per 15 minutes).
  - Fallback graceful degradation (health check reports status; resume streaming operates independently).
  - Optional automated email notifications on new message submission via Nodemailer SMTP.
- **Dual Resume Streaming:**
  - Direct binary downloads of up-to-date PDF and Microsoft Word (.docx) resumes served both via static CDN and Express streaming routes.

---

## 🛠️ Architecture & Tech Stack

```text
┌────────────────────────────┐          ┌────────────────────────────┐          ┌────────────────────────────┐
│      Frontend Client       │          │       Backend Server       │          │       Cloud Database       │
│  (React 18 + Vite on Vercel)│ ───────> │  (Node.js + Express Render)│ ───────> │       MongoDB Atlas        │
│    • Framer Motion         │   REST   │    • Mongoose ODM          │  TLS/SSL │   • Cluster: portfolio     │
│    • Responsive CSS Tokens │   CORS   │    • Express Rate Limit    │          │   • Collection: messages   │
│    • Dark/Light Theme      │          │    • Nodemailer SMTP       │          │   • IP Access: 0.0.0.0/0   │
└────────────────────────────┘          └────────────────────────────┘          └────────────────────────────┘
```

- **Frontend:** React 18, Vite, React Router DOM, Framer Motion, Vanilla CSS Design System.
- **Backend:** Node.js, Express 4, Mongoose 8, Nodemailer, CORS.
- **Database:** MongoDB Atlas (M0 Shared Tier).
- **Deployment & Hosting:** Vercel (Frontend), Render (Backend Web Service), MongoDB Atlas (Database).

---

## 📂 Project Structure

```text
lavanya-portfolio/
├── .gitignore                      # Top-level gitignore preventing credential leakage
├── README.md                       # Repository overview and documentation
└── portfolio/
    ├── DEPLOY.md                   # Complete step-by-step deployment runbook
    ├── client/                     # Frontend React + Vite application
    │   ├── public/
    │   │   ├── files/              # Resume binaries (resume.pdf, resume.docx)
    │   │   ├── certi.jpg           # Internship authorization certificate
    │   │   ├── profile.jpg         # Profile image
    │   │   └── _redirects          # SPA routing rules
    │   ├── src/
    │   │   ├── components/         # Nav, Typewriter, Modals, Skills
    │   │   ├── pages/              # Home, Work, and Contact pages
    │   │   ├── api.js              # Centralized backend API configuration
    │   │   ├── data.js             # Projects, experience, and profile data
    │   │   └── styles.css          # Design system & dark/light theme tokens
    │   ├── .env.example            # Frontend environment variable template
    │   ├── package.json
    │   └── vercel.json             # Vercel SPA rewrite configuration
    └── server/                     # Backend Node.js + Express API
        ├── files/                  # Server-side resume downloads
        ├── models/                 # Mongoose schema (Message.js)
        ├── routes/                 # Express route handlers
        │   ├── contact.js          # Ingestion, validation, rate limit & email
        │   └── resume.js           # Binary resume downloads
        ├── index.js                # Express app entry & MongoDB Atlas connection
        ├── test-db.js              # Diagnostic tool for MongoDB Atlas connection
        ├── .env.example            # Backend environment variable template
        └── package.json
```

---

## 📡 API Endpoints

The API is deployed at `https://lavanya-portfolio-api.onrender.com` (or locally at `http://localhost:5000`):

| Method | Endpoint | Description | Sample Request / Response |
| :---: | :--- | :--- | :--- |
| `GET` | `/` | API service overview and available endpoints | `{ "status": "online", "service": "Lavanya Agarwal Portfolio API" }` |
| `GET` | `/api/health` | Service uptime and MongoDB database state | `{ "status": "ok", "database": { "status": "connected", "connected": true } }` |
| `POST` | `/api/contact` | Submits and saves message to MongoDB | **Body:** `{ "name": "...", "email": "...", "message": "..." }` |
| `GET` | `/api/resume/pdf` | Downloads official PDF resume | Streams `Lavanya_Agarwal_Resume.pdf` |
| `GET` | `/api/resume/docx` | Downloads editable Microsoft Word resume | Streams `Lavanya_Agarwal_Resume.docx` |

---

## 💻 Local Development Setup

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)
- MongoDB Atlas account or local MongoDB instance

### 1. Backend Setup (`portfolio/server`)

```powershell
cd portfolio/server
npm install

# Copy environment template
Copy-Item .env.example .env
```

Open `portfolio/server/.env` and configure your credentials:
```env
MONGO_URI=mongodb+srv://<username>:<password>@portfolio.hkbkzi9.mongodb.net/portfolioDB?retryWrites=true&w=majority
PORT=5000
CLIENT_URL=http://localhost:5173
```

Run connection diagnostics:
```powershell
npm run test-db
```
Start the API in development mode:
```powershell
npm run dev
```
The server will start at `http://localhost:5000`.

### 2. Frontend Setup (`portfolio/client`)

In a new terminal window:
```powershell
cd portfolio/client
npm install

# Copy environment template
Copy-Item .env.example .env
```

Verify `portfolio/client/.env`:
```env
VITE_API_URL=http://localhost:5000
```

Start Vite dev server:
```powershell
npm run dev
```
Open your browser at `http://localhost:5173`.

---

## 🚀 Deployment Guide

For exhaustive instructions, see [portfolio/DEPLOY.md](./portfolio/DEPLOY.md).

### Quick Deployment Steps:

1. **MongoDB Atlas:**
   - Under **Security > Network Access**, add IP `0.0.0.0/0` (Allow Access from Anywhere). This enables Render cloud containers to connect without TLS error 80.
   - Create a database user under **Database Access** and copy the connection string.

2. **Backend on Render:**
   - Create a new **Blueprint** from the repository `lavanya-ag1/lavanya-portfolio`; Render will read `render.yaml`.
   - Set the required `MONGO_URI` secret to your Atlas connection string.
   - Alternatively, create a Web Service manually with root directory `portfolio/server`, build command `npm install`, and start command `npm start`.

3. **Frontend on Vercel:**
   - Create a new project importing `lavanya-ag1/lavanya-portfolio`.
   - **Framework:** `Vite`
   - **Root Directory:** `portfolio/client` *(Crucial)*
   - Optional environment variable: `VITE_API_URL` = your Render backend URL if it differs from `https://lavanya-portfolio-api.onrender.com`. The client uses localhost automatically during local development.
   - Click **Deploy**.

---

## 📌 Featured Projects in Portfolio

1. **Multi-Agent News & Financial Research System**
   - Autonomous multi-agent pipeline using LangGraph, LangChain, FastAPI, pgvector, and Redis.
   - [Repository](https://github.com/lavanya-ag1/news_agent)
2. **CPCT — Campus Placement & Career Tracking Portal**
   - Full-stack recruitment management system with JWT authentication and analytics.
   - [Repository](https://github.com/lavanya-ag1/placement_project)
3. **CyberSafe — Legal & Regulatory Compliance System**
   - Compliance dashboard with role-based governance and audit trails.
4. **Personal Developer Portfolio & Resume Service**
   - MERN stack portfolio with MongoDB persistence, dual binary resume streaming, and rate limiting.
   - [Repository](https://github.com/lavanya-ag1/lavanya-portfolio)

---

## 👤 Author

**Lavanya Agarwal**
- **University:** JK Lakshmipat University, Jaipur
- **Degree:** B.Tech in Computer Science and Engineering
- **GitHub:** [@lavanya-ag1](https://github.com/lavanya-ag1)
- **LinkedIn:** [linkedin.com/in/lavanya-ag5](https://www.linkedin.com/in/lavanya-ag5/)
- **Email:** [lavanya.agarwal1508@gmail.com](mailto:lavanya.agarwal1508@gmail.com)