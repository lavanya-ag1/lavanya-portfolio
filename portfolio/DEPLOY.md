# Deployment guide (do in this order)

## 1. MongoDB Atlas (database)
1. Sign up at mongodb.com/atlas, create a free **M0** cluster.
2. Database Access: add a user (username + password). Save the password.
3. Network Access: Add IP address `0.0.0.0/0` (needed so Render can connect).
4. Connect > Drivers > copy the connection string. Replace `<password>` and add the database name:
   `mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/portfolio`
5. Put it in `server/.env` as `MONGO_URI` and test locally (`npm run dev` in /server).
   Send a message from the contact form, then check Atlas > Browse Collections > `messages`.

## 2. Backend on Render
1. Push the repo to GitHub first (`git push`).
2. render.com > New > **Web Service** > pick your repo.
3. Root Directory: `server` | Build: `npm install` | Start: `npm start` | Instance: Free.
4. Environment variables: `MONGO_URI` (your Atlas string). Leave `CLIENT_URL` for step 4.
   Optional email alerts: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `MAIL_TO` (see `server/.env.example`).
5. Deploy, then open `https://YOUR-API.onrender.com/api/resume/pdf`. The PDF should download.
   (Free tier sleeps after inactivity, so the first request can take ~50 seconds.)

## 3. Frontend on Vercel
1. vercel.com > Add New > Project > pick the same repo.
2. Root Directory: `client` | Framework: Vite.
3. Environment variable: `VITE_API_URL` = your Render URL (no trailing slash).
4. Deploy. Copy the Vercel URL.

## 4. Connect them
Back on Render, add `CLIENT_URL` = your Vercel URL, and redeploy. Then test on the live site:
contact form, PDF download, Word download, dark/light toggle, mobile view.

## 5. Final checklist
- [ ] Live links work in an incognito window
- [ ] README has the live URLs
- [ ] `git ls-files | grep .env` shows only `.env.example` files
- [ ] Repo is public and the link is submitted on Google Classroom
