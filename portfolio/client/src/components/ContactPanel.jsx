import { useState } from "react";
import { API } from "../api.js";
import { profile } from "../data.js";
import { useApiStatus, useCopy } from "../hooks.js";
import { GitHubIcon, LinkedInIcon, SendIcon } from "./Icons.jsx";

// Must match LIMITS in server/models/Message.js
const LIMITS = { name: 120, email: 180, subject: 200, message: 3000 };
const empty = { name: "", email: "", subject: "", message: "" };

// Contact details + message form. Used on Home and /contact.
// idPrefix keeps input ids unique if both ever render on one page.
export default function ContactPanel({ idPrefix = "contact" }) {
  const [form, setForm] = useState(empty);
  const [state, setState] = useState({ status: "idle", message: "" });
  const [copied, copy] = useCopy();
  const apiStatus = useApiStatus();

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setState({ status: "sending", message: "" });

    try {
      const res = await fetch(`${API}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        signal: AbortSignal.timeout(60000),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");

      setForm(empty);
      setState({ status: "sent", message: "Thanks! Your message was sent. I'll get back to you soon." });
    } catch (err) {
      const offline = err.name === "TypeError" || err.name === "TimeoutError";
      setState({
        status: "error",
        message: offline
          ? `Couldn't reach the server. Please email me at ${profile.email} instead.`
          : err.message,
      });
    }
  };

  const field = (name) => ({
    id: `${idPrefix}-${name}`,
    name,
    value: form[name],
    onChange: change,
    maxLength: LIMITS[name],
  });

  return (
    <div className="contact-grid">
      <div className="contact-info-panel">
        <div className="contact-card-box">
          <h3 style={{ fontSize: "1.25rem", marginBottom: "1.2rem" }}>Direct Information</h3>

          <div className="contact-method">
            <div className="contact-method-icon" aria-hidden="true">✉️</div>
            <div className="contact-method-text">
              <h4>Email Address</h4>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <div>
                <button className="copy-email-btn" style={{ marginTop: "0.4rem" }} onClick={() => copy(profile.email)}>
                  {copied ? "✓ Copied!" : "📋 Copy to clipboard"}
                </button>
              </div>
            </div>
          </div>

          <div className="contact-method">
            <div className="contact-method-icon" aria-hidden="true">📍</div>
            <div className="contact-method-text">
              <h4>Location</h4>
              <p>{profile.location}</p>
            </div>
          </div>

          <div className="contact-method">
            <div className="contact-method-icon" aria-hidden="true">🔗</div>
            <div className="contact-method-text" style={{ width: "100%" }}>
              <h4>Profiles</h4>
              <div style={{ display: "flex", gap: "0.8rem", marginTop: "0.6rem", flexWrap: "wrap" }}>
                <a href={profile.github} target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm" style={{ gap: "0.5rem" }}>
                  <GitHubIcon />
                  <span>GitHub ↗</span>
                </a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm" style={{ gap: "0.5rem" }}>
                  <LinkedInIcon />
                  <span>LinkedIn ↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="contact-form-card">
        <h3 style={{ fontSize: "1.3rem", marginBottom: "1.4rem" }}>Send a Message</h3>

        {apiStatus === "offline" && (
          <div className="form-notice" role="status">
            The message form is offline right now. You can still reach me at{" "}
            <a href={`mailto:${profile.email}`}>{profile.email}</a>.
          </div>
        )}

        <form onSubmit={submit}>
          <div className="form-group">
            <label className="form-label" htmlFor={`${idPrefix}-name`}>Your Name *</label>
            <input {...field("name")} type="text" required autoComplete="name" className="form-input" placeholder="e.g. Alex Morgan" />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor={`${idPrefix}-email`}>Your Email Address *</label>
            <input {...field("email")} type="email" required autoComplete="email" className="form-input" placeholder="alex@company.com" />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor={`${idPrefix}-subject`}>Subject</label>
            <input {...field("subject")} type="text" className="form-input" placeholder="Internship opportunity / Collaboration" />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor={`${idPrefix}-message`}>Message *</label>
            <textarea
              {...field("message")}
              rows="6"
              required
              className="form-textarea"
              placeholder="Write your message here..."
              aria-describedby={`${idPrefix}-message-count`}
            />
            <div id={`${idPrefix}-message-count`} className="char-count">
              {form.message.length} / {LIMITS.message}
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%", justifyContent: "center" }}
            disabled={state.status === "sending"}
          >
            {state.status === "sending" ? (
              <span>Sending…</span>
            ) : (
              <>
                <span>Send Message</span>
                <SendIcon />
              </>
            )}
          </button>

          {state.status === "sent" && (
            <div className="form-status success" role="status">
              <span aria-hidden="true">✓</span>
              <span>{state.message}</span>
            </div>
          )}
          {state.status === "error" && (
            <div className="form-status error" role="alert">
              <span aria-hidden="true">⚠</span>
              <span>{state.message}</span>
            </div>
          )}
        </form>
      </div>

      {copied && (
        <div className="toast" role="status">
          ✓ Email address copied to clipboard: <strong>{profile.email}</strong>
        </div>
      )}
    </div>
  );
}
