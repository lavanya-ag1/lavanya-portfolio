const defaultApiUrl = import.meta.env.DEV
  ? "http://localhost:5000"
  : "https://lavanya-portfolio-api.onrender.com";

export const API = (import.meta.env.VITE_API_URL || defaultApiUrl).replace(/\/+$/, "");
