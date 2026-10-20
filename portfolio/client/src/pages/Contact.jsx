import { useState, useEffect } from "react";
import { API } from "../api.js";
import { profile } from "../data.js";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [state, setState] = useState({ status: "idle", error: "" });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [backendHealth, setBackendHealth] = useState({ checked: false, online: false, mongo: false });

  useEffect(() => {
    fetch(`${API}/api/health`)
      .then((res) => res.json())
      .then((data) => {
        setBackendHealth({
          checked: true,
          online: data.status === "ok",
          mongo: data.database?.connected || false,
        });
      })
      .catch(() => {
        setBackendHealth({ checked: true, online: false, mongo: false });
      });
  }, []);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  const submit = async (e) => {
    e.preventDefault();
    setState({ status: "sending", error: "" });

    try {
      const res = await fetch(`${API}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong.");

      setForm({ name: "", email: "", subject: "", message: "" });
      setState({ status: "sent", error: "" });
    } catch (err) {
      setState({ status: "error", error: err.message });
    }
  };

  return (
    <section className="wrap section" style={{ paddingTop: "calc(var(--nav-height) + 3rem)" }}>
      <div className="section-head">
        <span className="section-tag">Direct Inquiries</span>
        <h1>Contact & Opportunities</h1>
        <p className="section-desc">
          Available for software engineering internships, open-source projects, and technical discussions.
        </p>
      </div>

      <div className="contact-grid">
        <div className="contact-info-panel">
          <div className="contact-card-box">
            <h3 style={{ fontSize: "1.25rem", marginBottom: "1.2rem" }}>Direct Information</h3>

            <div className="contact-method">
              <div className="contact-method-icon">✉️</div>
              <div className="contact-method-text">
                <h4>Email Address</h4>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
                <div>
                  <button className="copy-email-btn" style={{ marginTop: "0.4rem" }} onClick={copyEmail}>
                    {copiedEmail ? "✓ Copied!" : "📋 Copy to clipboard"}
                  </button>
                </div>
              </div>
            </div>

            <div className="contact-method">
              <div className="contact-method-icon">📍</div>
              <div className="contact-method-text">
                <h4>Location</h4>
                <p>{profile.location}</p>
              </div>
            </div>

            <div className="contact-method">
              <div className="contact-method-icon">🔗</div>
              <div className="contact-method-text" style={{ width: "100%" }}>
                <h4>Online Presence & Networks</h4>
                <div style={{ display: "flex", gap: "0.8rem", marginTop: "0.6rem", flexWrap: "wrap" }}>
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-secondary btn-sm"
                    style={{ gap: "0.5rem" }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    <span>GitHub ↗</span>
                  </a>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-secondary btn-sm"
                    style={{ gap: "0.5rem" }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    <span>LinkedIn ↗</span>
                  </a>
                  <a
                    href={`mailto:${profile.email}`}
                    className="btn btn-outline btn-sm"
                    style={{ gap: "0.4rem" }}
                  >
                    <span>Send Email ✉</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-card-box" style={{ padding: "1.5rem" }}>
            <h4 style={{ fontSize: "0.95rem", marginBottom: "0.5rem" }}>
              Express API & MongoDB Connectivity
            </h4>
            <p style={{ fontSize: "0.84rem", color: "var(--text-muted)", marginBottom: "0.8rem" }}>
              Messages are processed through Express routes and persisted in MongoDB Atlas using Mongoose.
            </p>

            <div className="api-status-badge">
              <span className={`api-status-dot ${backendHealth.online ? "" : "offline"}`} />
              <div>
                <div style={{ fontWeight: 600, color: "var(--text-primary)" }}>
                  {backendHealth.checked
                    ? backendHealth.online
                      ? "API Server: Connected"
                      : "API Server: Local Mode"
                    : "Pinging API Server..."}
                </div>
                <div style={{ fontSize: "0.76rem", color: "var(--text-muted)" }}>
                  {backendHealth.mongo
                    ? "MongoDB: Active and Synchronized"
                    : "Database: Standalone / Ready for Atlas"}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form-card">
          <h3 style={{ fontSize: "1.3rem", marginBottom: "1.4rem" }}>Send a Message</h3>

          <form onSubmit={submit}>
            <div className="form-group">
              <label className="form-label" htmlFor="page-contact-name">
                Your Name *
              </label>
              <input
                id="page-contact-name"
                name="name"
                required
                className="form-input"
                placeholder="e.g. Alex Morgan"
                value={form.name}
                onChange={change}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="page-contact-email">
                Your Email Address *
              </label>
              <input
                id="page-contact-email"
                type="email"
                name="email"
                required
                className="form-input"
                placeholder="alex@company.com"
                value={form.email}
                onChange={change}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="page-contact-subject">
                Subject
              </label>
              <input
                id="page-contact-subject"
                name="subject"
                className="form-input"
                placeholder="Internship opportunity / Collaboration"
                value={form.subject}
                onChange={change}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="page-contact-message">
                Message *
              </label>
              <textarea
                id="page-contact-message"
                name="message"
                rows="6"
                required
                className="form-textarea"
                placeholder="Write your message here..."
                value={form.message}
                onChange={change}
              />
            </div>

            <button
              className="btn btn-primary"
              style={{ width: "100%", justifyContent: "center" }}
              disabled={state.status === "sending"}
            >
              {state.status === "sending" ? "Saving to MongoDB..." : "Send Message to Express API"}
            </button>

            {state.status === "sent" && (
              <div className="form-status success" role="status">
                <span>✓</span>
                <span>Thank you! Your message was saved and sent. I will reply soon.</span>
              </div>
            )}

            {state.status === "error" && (
              <div className="form-status error" role="alert">
                <span>⚠</span>
                <span>{state.error}</span>
              </div>
            )}
          </form>
        </div>
      </div>

      {copiedEmail && (
        <div className="toast">
          ✓ Email address copied to clipboard: <strong>{profile.email}</strong>
        </div>
      )}
    </section>
  );
}
