// Backend base URL. Set VITE_API_URL in Vercel (or client/.env) to your deployed API.
// The production fallback matches the service name in render.yaml.
const defaultApiUrl = import.meta.env.DEV
  ? "http://localhost:5000"
  : "https://lavanya-portfolio-api.onrender.com";

export const API = (import.meta.env.VITE_API_URL || defaultApiUrl).replace(/\/+$/, "");
