#!/usr/bin/env bash
# Run once from the project root: bash commits.sh
# Creates a clean history of meaningful commits. Then add your remote and push:
#   git remote add origin https://github.com/YOU/portfolio.git && git push -u origin main
set -e
git init -b main
git add .gitignore README.md DEPLOY.md && git commit -m "chore: add gitignore, README and deployment guide"
git add server/package.json server/index.js server/.env.example && git commit -m "feat(server): express app with MongoDB connection and CORS"
git add server/models && git commit -m "feat(server): add Message model for contact form"
git add server/routes/contact.js && git commit -m "feat(server): contact API with validation and optional email alert"
git add server/routes/resume.js server/files && git commit -m "feat(server): serve resume as PDF and DOCX"
git add client/package.json client/vite.config.js client/index.html client/.env.example client/vercel.json client/public client/src/main.jsx client/src/App.jsx client/src/api.js && git commit -m "feat(client): vite + react router app shell"
git add client/src/components && git commit -m "feat(client): navbar with theme toggle, typewriter, scroll reveal"
git add client/src/data.js && git commit -m "content: add profile, skills, projects and timeline"
git add client/src/pages/Home.jsx && git commit -m "feat(client): hero, about, skills, timeline and certifications"
git add client/src/pages/Work.jsx && git commit -m "feat(client): projects page with technology filter"
git add client/src/pages/Contact.jsx && git commit -m "feat(client): contact form connected to API"
git add client/src/styles.css && git commit -m "style: responsive layout with dark and light themes"
git add -A && git diff --cached --quiet || git commit -m "chore: final tweaks"
git log --oneline
