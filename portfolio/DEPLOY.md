# Deployment Guide

Three parts, set up in this order: database (MongoDB Atlas) → API (Render) → frontend (Vercel).
All three have free tiers.

## 1. MongoDB Atlas

1. **Rotate the leaked password first.** In Atlas → *Database Access*, edit the user
   `agarwallavanya1508_db_user` and set a new password (or delete the user and create a new one).
   The old password was public in this repo's git history.
2. *Network Access* → add `0.0.0.0/0`. Render's free tier has no fixed IP, so the API can connect from anywhere;
   the strong password is what protects the database.
3. *Database* → *Connect* → *Drivers* → copy the connection string. Put the database name before the `?`:
   `mongodb+srv://<user>:<password>@<cluster-host>/portfolioDB?retryWrites=true&w=majority`

## 2. API on Render

1. Render dashboard → **New** → **Blueprint** → choose the `lavanya-ag1/lavanya-portfolio` repo.
   Render reads [`render.yaml`](../render.yaml) and creates the `lavanya-portfolio-api` web service (free plan).
2. When asked for environment variables:
   - `MONGO_URI` — the string from step 1.
   - `CLIENT_URL` — your frontend URL from step 3 (you can fill this in after deploying the frontend).
   - `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`, `MAIL_TO` — optional email alerts. For Gmail use
     `smtp.gmail.com` and a [Google App Password](https://myaccount.google.com/apppasswords). Leave empty to skip.
3. After it deploys, open `https://<your-service>.onrender.com/api/health`. You should see
   `"database": { "connected": true }`.

If Render gives the service a different URL than `https://lavanya-portfolio-api.onrender.com`,
set `VITE_API_URL` on the frontend (step 3).

> Free Render services sleep after ~15 minutes idle and take up to a minute to wake.
> The site pings `/api/health` when the page loads, so the API is usually awake by the time someone sends a message.

## 3. Frontend on Vercel

1. Vercel → **Add New Project** → import `lavanya-ag1/lavanya-portfolio`.
2. Settings:
   - **Root Directory:** `portfolio/client`
   - **Framework Preset:** Vite (build `npm run build`, output `dist`)
   - **Environment Variable:** `VITE_API_URL` = your Render URL, e.g. `https://lavanya-portfolio-api.onrender.com`
3. Deploy. Note the URL Vercel assigns.
   The address `lavanya-portfolio.vercel.app` currently serves a different, older site. Either reuse that Vercel
   project (point it at this repo and root directory) or use the new project's URL.

## 4. Finish up

1. In Render, set `CLIENT_URL` to the exact frontend URL (no trailing slash) and redeploy.
2. In [`client/src/data.js`](client/src/data.js), set `live:` on the portfolio project to the frontend URL.
3. Add the live URL to the top of the main [README](../README.md).
4. Test: open the site, send a message from the contact form, and check it appears in Atlas
   (*Browse Collections* → `portfolioDB.messages`) and/or your inbox.

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| Form says "Couldn't reach the server" | Wrong `VITE_API_URL`, or API asleep/down — open `/api/health` directly. |
| Browser console shows a CORS error | `CLIENT_URL` on Render doesn't exactly match the site's origin (scheme + host, no trailing slash). |
| Form says "temporarily unavailable" | API is up but MongoDB isn't connected and SMTP isn't set. Check Render logs for `[MongoDB]` lines. |
| Refreshing `/work` gives 404 | The SPA rewrite isn't applied — check `vercel.json` is in the root directory you chose. |
