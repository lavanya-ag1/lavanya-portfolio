import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Typewriter from "../components/Typewriter.jsx";
import Reveal from "../components/Reveal.jsx";
import ProjectModal from "../components/ProjectModal.jsx";
import CertModal from "../components/CertModal.jsx";
import { API } from "../api.js";
import { profile, skills, projects, timeline, certs } from "../data.js";

export default function Home() {
  const [skillView, setSkillView] = useState("bars"); // "bars" | "radial"
  const [projectFilter, setProjectFilter] = useState("All");
  const [activeProject, setActiveProject] = useState(null);
  const [activeCert, setActiveCert] = useState(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Contact Form State
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [formState, setFormState] = useState({ status: "idle", message: "" });

  // Backend Health State
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

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormState({ status: "sending", message: "" });

    try {
      const res = await fetch(`${API}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit message.");
      }

      setForm({ name: "", email: "", subject: "", message: "" });
      setFormState({
        status: "success",
        message: "Thank you! Your message was saved to MongoDB and sent successfully.",
      });
    } catch (err) {
      setFormState({
        status: "error",
        message: err.message || "Could not reach the server. Please try again.",
      });
    }
  };

  const filteredProjects = projects.filter(
    (p) => projectFilter === "All" || p.category === projectFilter
  );

  return (
    <>
      {/* 1. HERO / LANDING SECTION */}
      <section className="hero">
        <div className="wrap hero-grid">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Signature Monogram Heading Badge (matching user design) */}
            <div className="hero-monogram-badge">
              <div className="hero-signature-mark" aria-hidden="true">
                <svg width="42" height="42" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                  <path
                    d="M20 70 Q 30 20 40 45 T 50 65 Q 60 25 70 40 T 82 70"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M28 48 Q 50 42 78 48"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <circle cx="84" cy="36" r="3" fill="currentColor" />
                </svg>
              </div>
              <span className="hero-monogram-name">{profile.name}</span>
            </div>

            <div className="availability-pill">
              <span className="pulse-dot" />
              <span>{profile.availability}</span>
            </div>

            <div className="hero-title">
              <span className="greeting">Hi, I'm</span>
              <h1>{profile.name}</h1>
            </div>

            <div className="hero-role">
              <Typewriter words={profile.roles} />
            </div>

            <p className="hero-lead">{profile.tagline}</p>

            <div className="hero-cta">
              <a
                className="btn btn-primary"
                href={`${API}/api/resume/pdf`}
                download
                title="Served from Express /api/resume/pdf"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>Download CV</span>
                <span className="btn-badge">PDF</span>
              </a>

              <a
                className="btn btn-secondary"
                href={`${API}/api/resume/docx`}
                download
                title="Served from Express /api/resume/docx"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>Download CV</span>
                <span className="btn-badge">DOCX</span>
              </a>

              <a className="btn btn-outline" href="#projects">
                <span>View Projects</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </a>
            </div>

            <div className="hero-stats">
              {profile.stats.map((s) => (
                <div className="stat-item" key={s.label}>
                  <span className="stat-value">{s.value}</span>
                  <span className="stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Hero Visual / Portrait Card */}
          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="portrait-wrapper">
              <div className="portrait-glow" />
              <div className="portrait-frame">
                <img
                  className="portrait-img"
                  src={profile.photo}
                  alt={`Portrait of ${profile.name}`}
                />
              </div>

              {/* Floating Credential Badges */}
              <div className="floating-badge badge-top">
                <div className="badge-icon">🎓</div>
                <div>
                  <div style={{ color: "var(--text-primary)" }}>B.Tech CSE '28</div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>JKLU Jaipur</div>
                </div>
              </div>

              <div className="floating-badge badge-bottom">
                <div className="badge-icon" style={{ background: "var(--brand-subtle)", color: "var(--brand)" }}>
                  ⚡
                </div>
                <div>
                  <div style={{ color: "var(--text-primary)" }}>AI/ML Intern</div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Dynamicore Strategies</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. ABOUT ME SECTION */}
      <section className="wrap section" id="about">
        <Reveal>
          <div className="section-head">
            <span className="section-tag">About Me</span>
            <h2>Bridging Full-Stack Engineering & AI Systems</h2>
            <p className="section-desc">
              A glimpse into my background, academic journey, and passion for software engineering.
            </p>
          </div>
        </Reveal>

        <div className="about-grid">
          <Reveal delay={0.1} className="about-text">
            <p>{profile.bio}</p>
            <p>
              My approach to software pairs architectural discipline with user-centered simplicity. Whether
              designing relational database schemas, engineering real-time MERN applications, or constructing
              eval-driven LLM pipelines, I focus on clean code, thorough testing, and performant user experiences.
            </p>

            <div className="about-highlights">
              <div className="highlight-box">
                <div className="highlight-title">
                  <span>💻</span> Full-Stack MERN
                </div>
                <div className="highlight-desc">
                  Building responsive React frontends with modular state, robust Node/Express REST endpoints, and schema-validated MongoDB databases.
                </div>
              </div>

              <div className="highlight-box">
                <div className="highlight-title">
                  <span>🤖</span> AI & Agent Workflows
                </div>
                <div className="highlight-desc">
                  Hands-on experience with LangChain, LangGraph, pgvector, and evaluating enterprise guardrails like Llama Guard.
                </div>
              </div>

              <div className="highlight-box">
                <div className="highlight-title">
                  <span>📐</span> Solid Foundations
                </div>
                <div className="highlight-desc">
                  Rigorous focus on Data Structures & Algorithms, Object-Oriented Software Design, and Database Normalization.
                </div>
              </div>

              <div className="highlight-box">
                <div className="highlight-title">
                  <span>🚀</span> Production Mindset
                </div>
                <div className="highlight-desc">
                  Experienced with Git workflows, automated REST testing with Postman, environment isolation, and cloud deployments.
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="about-details-card">
              <h3 style={{ marginBottom: "1rem", fontSize: "1.2rem" }}>Quick Facts</h3>
              <div className="details-table">
                <div className="details-row">
                  <span className="details-label">Location</span>
                  <span className="details-value">{profile.location}</span>
                </div>
                <div className="details-row">
                  <span className="details-label">Current Academic Status</span>
                  <span className="details-value">{profile.currentStatus}</span>
                </div>
                <div className="details-row">
                  <span className="details-label">University</span>
                  <span className="details-value">{profile.institution}</span>
                </div>
                <div className="details-row">
                  <span className="details-label">Primary Stack</span>
                  <span className="details-value">React, Node.js, Express, MongoDB, FastAPI</span>
                </div>
                <div className="details-row">
                  <span className="details-label">Direct Contact</span>
                  <span className="details-value">{profile.email}</span>
                  <button className="copy-email-btn" onClick={copyEmail} title="Copy email address">
                    <span>{copiedEmail ? "✓ Copied!" : "📋 Copy Email"}</span>
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. SKILLS SECTION */}
      <section className="wrap section" id="skills">
        <Reveal>
          <div className="section-head">
            <span className="section-tag">Core Competencies</span>
            <h2>Skills & Technologies</h2>
            <p className="section-desc">
              Demonstrated capabilities grouped across frontend architecture, backend systems, AI workflows, and development tooling.
            </p>
          </div>
        </Reveal>

        <div className="skills-controls">
          <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
            Hover over any skill to see practical project context.
          </p>

          <div className="view-toggle">
            <button
              className={`view-btn ${skillView === "bars" ? "active" : ""}`}
              onClick={() => setSkillView("bars")}
              aria-label="View skills as progress bars"
            >
              Bar View
            </button>
            <button
              className={`view-btn ${skillView === "radial" ? "active" : ""}`}
              onClick={() => setSkillView("radial")}
              aria-label="View skills as radial charts"
            >
              Circular View
            </button>
          </div>
        </div>

        {skillView === "bars" ? (
          <div className="skills-grid">
            {Object.entries(skills).map(([category, list], idx) => (
              <Reveal key={category} delay={idx * 0.08} className="skill-card">
                <div className="skill-card-head">
                  <div className="skill-card-icon">
                    {category.includes("Frontend") && "🎨"}
                    {category.includes("Backend") && "⚙️"}
                    {category.includes("AI") && "🧠"}
                    {category.includes("Tools") && "🛠️"}
                  </div>
                  <h3>{category}</h3>
                </div>

                <div className="skill-list">
                  {list.map((s) => (
                    <div className="skill-item" key={s.name}>
                      <div className="skill-meta">
                        <span className="skill-name">{s.name}</span>
                        <span className="skill-pct">{s.level}%</span>
                      </div>
                      <div className="skill-track">
                        <motion.div
                          className="skill-progress"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${s.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                        />
                      </div>
                      <span className="skill-context">{s.context}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="radial-grid">
            {Object.values(skills)
              .flat()
              .map((s, i) => {
                const radius = 38;
                const circumference = 2 * Math.PI * radius;
                const offset = circumference - (s.level / 100) * circumference;

                return (
                  <Reveal key={s.name} delay={i * 0.04} className="radial-card">
                    <div className="radial-chart">
                      <svg className="radial-svg" viewBox="0 0 100 100">
                        <circle className="radial-bg" cx="50" cy="50" r={radius} />
                        <motion.circle
                          className="radial-fill"
                          cx="50"
                          cy="50"
                          r={radius}
                          strokeDasharray={circumference}
                          initial={{ strokeDashoffset: circumference }}
                          whileInView={{ strokeDashoffset: offset }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                        />
                      </svg>
                      <div className="radial-text">{s.level}%</div>
                    </div>
                    <div className="radial-name">{s.name}</div>
                    <div className="radial-sub">{s.context}</div>
                  </Reveal>
                );
              })}
          </div>
        )}
      </section>

      {/* 4. PROJECTS SHOWCASE */}
      <section className="wrap section" id="projects">
        <Reveal>
          <div className="section-head">
            <span className="section-tag">Portfolio Showcase</span>
            <h2>Featured Projects</h2>
            <p className="section-desc">
              Production-ready web applications and intelligent systems with complete source code, live demos, and architectural notes.
            </p>
          </div>
        </Reveal>

        {/* Filter Chips */}
        <div className="project-filters" role="group" aria-label="Filter projects">
          {["All", "Full-Stack", "AI & ML"].map((f) => (
            <button
              key={f}
              className={`filter-chip ${projectFilter === f ? "active" : ""}`}
              onClick={() => setProjectFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div layout className="projects-grid">
          <AnimatePresence>
            {filteredProjects.map((p) => (
              <motion.article
                layout
                key={p.id}
                className="project-card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
              >
                <div className="project-preview">
                  <img src={p.image} alt={p.name} loading="lazy" />
                  <span className="project-badge-tag">{p.badge}</span>
                </div>

                <div className="project-body">
                  <h3 className="project-title">{p.name}</h3>
                  <p className="project-desc">{p.description}</p>

                  <ul className="project-highlights-list">
                    {p.highlights.slice(0, 2).map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>

                  <ul className="project-tech-badges">
                    {p.tech.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>

                  <div className="project-actions">
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noreferrer"
                      className="project-link primary"
                    >
                      <span>Live Demo</span>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>

                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      className="project-link"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      <span>Code</span>
                    </a>

                    <button
                      className="btn btn-outline btn-sm"
                      style={{ marginLeft: "auto" }}
                      onClick={() => setActiveProject(p)}
                    >
                      Architecture ▹
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* 5. CV / RESUME DOWNLOAD SECTION (Dedicated Showcase Box) */}
        <Reveal delay={0.2}>
          <div className="cv-banner" id="resume">
            <div className="cv-grid">
              <div>
                <span className="cv-badge">Server-Rendered Documents</span>
                <h3 style={{ fontSize: "1.7rem", marginBottom: "0.8rem" }}>
                  Download Curriculum Vitae
                </h3>
                <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem", lineHeight: 1.6 }}>
                  Both PDF and Microsoft Word (.docx) formats are dynamically served via dedicated Express.js backend endpoints (<code>/api/resume/pdf</code> & <code>/api/resume/docx</code>) adhering strictly to MERN course requirements.
                </p>
                <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                  <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                    Backend Service:
                  </span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.85rem", color: "var(--accent)", fontWeight: 600 }}>
                    <span className="pulse-dot" style={{ width: 7, height: 7 }} /> Node.js / Express Streaming Active
                  </span>
                </div>
              </div>

              <div className="cv-options">
                <a
                  className="cv-download-card"
                  href={`${API}/api/resume/pdf`}
                  download
                  title="Download PDF via Express route"
                >
                  <div className="cv-format-info">
                    <div className="cv-icon pdf">PDF</div>
                    <div className="cv-text-group">
                      <h4>Resume (PDF Document)</h4>
                      <span>Standard Print Format • 165 KB</span>
                    </div>
                  </div>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: "var(--accent)" }}>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </a>

                <a
                  className="cv-download-card"
                  href={`${API}/api/resume/docx`}
                  download
                  title="Download DOCX via Express route"
                >
                  <div className="cv-format-info">
                    <div className="cv-icon docx">DOC</div>
                    <div className="cv-text-group">
                      <h4>Resume (Word Document)</h4>
                      <span>Editable .docx Format • 38 KB</span>
                    </div>
                  </div>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: "var(--accent)" }}>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 6. EDUCATION & EXPERIENCE TIMELINE */}
      <section className="wrap section" id="timeline">
        <Reveal>
          <div className="section-head">
            <span className="section-tag">Career Milestones</span>
            <h2>Education & Experience</h2>
            <p className="section-desc">
              Chronological progression through academic degrees, software engineering internships, and leadership initiatives.
            </p>
          </div>
        </Reveal>

        <div className="timeline-wrapper">
          {timeline.map((item, idx) => (
            <Reveal key={idx} delay={idx * 0.1} className="timeline-item">
              <div className={`timeline-marker ${item.type}`} />
              <div className="timeline-card">
                <div className="timeline-header">
                  <div>
                    <h3 className="timeline-role">{item.title}</h3>
                    <div className="timeline-org">
                      {item.organization} • <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>{item.location}</span>
                    </div>
                  </div>
                  <span className="timeline-period">{item.period}</span>
                </div>

                <p className="timeline-summary">{item.summary}</p>

                <ul className="timeline-bullets">
                  {item.bullets.map((b, bIdx) => (
                    <li key={bIdx}>{b}</li>
                  ))}
                </ul>

                <ul className="timeline-tags">
                  {item.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 7. CERTIFICATIONS & ACHIEVEMENTS */}
      <section className="wrap section" id="certs">
        <Reveal>
          <div className="section-head">
            <span className="section-tag">Verified Credentials</span>
            <h2>Certifications & Achievements</h2>
            <p className="section-desc">
              Accredited coursework from global platforms and collegiate competitive achievements. Click any certificate to inspect full document.
            </p>
          </div>
        </Reveal>

        <div className="certs-grid">
          {certs.map((c, idx) => (
            <Reveal key={c.title} delay={idx * 0.08}>
              <article className="cert-card">
                {/* Certificate image thumbnail */}
                {c.image && (
                  <div
                    className="cert-thumb-box"
                    onClick={() => setActiveCert(c)}
                    title="Click to view full certificate"
                  >
                    <img
                      src={c.image}
                      alt={c.title}
                      className="cert-thumb-img"
                      loading="lazy"
                    />
                    <div className="cert-thumb-overlay">
                      <span>Inspect Certificate 🔍</span>
                    </div>
                  </div>
                )}

                <div className="cert-card-body">
                  <div className="cert-top">
                    <span className="cert-badge">{c.badge}</span>
                    <span className="cert-year">{c.year}</span>
                  </div>
                  <h3 className="cert-title">{c.title}</h3>
                  <div className="cert-issuer">{c.issuer}</div>
                  <p className="cert-desc">{c.description}</p>
                </div>

                <div className="cert-footer">
                  <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                    Skills: {c.skills}
                  </span>
                  <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
                    <button
                      className="btn-cert-view"
                      onClick={() => setActiveCert(c)}
                      title="View full certificate preview"
                    >
                      View
                    </button>
                    <a
                      href={c.link}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-cert-verify"
                      title={`Verify ${c.title} directly with ${c.issuer}`}
                    >
                      Verify ↗
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 8. CONTACT FORM (BACKEND CONNECTED) */}
      <section className="wrap section" id="contact">
        <Reveal>
          <div className="section-head">
            <span className="section-tag">Let's Connect</span>
            <h2>Get In Touch</h2>
            <p className="section-desc">
              Interested in discussing software engineering opportunities, internships, or collaboration? Drop me a message below.
            </p>
          </div>
        </Reveal>

        <div className="contact-grid">
          {/* Contact Details & Backend Status */}
          <Reveal delay={0.1} className="contact-info-panel">
            <div className="contact-card-box">
              <h3 style={{ fontSize: "1.25rem", marginBottom: "1.2rem" }}>Direct Information</h3>

              <div className="contact-method">
                <div className="contact-method-icon">✉️</div>
                <div className="contact-method-text">
                  <h4>Email Address</h4>
                  <a href={`mailto:${profile.email}`}>{profile.email}</a>
                  <div>
                    <button
                      className="copy-email-btn"
                      style={{ marginTop: "0.4rem" }}
                      onClick={copyEmail}
                    >
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
                <div className="contact-method-text">
                  <h4>Professional Profiles</h4>
                  <div style={{ display: "flex", gap: "1rem", marginTop: "0.3rem" }}>
                    <a href={profile.github} target="_blank" rel="noreferrer" style={{ color: "var(--accent)", fontWeight: 600 }}>
                      GitHub ↗
                    </a>
                    <a href={profile.linkedin} target="_blank" rel="noreferrer" style={{ color: "var(--accent)", fontWeight: 600 }}>
                      LinkedIn ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* MERN Integration Status Card */}
            <div className="contact-card-box" style={{ padding: "1.5rem" }}>
              <h4 style={{ fontSize: "0.95rem", marginBottom: "0.5rem" }}>
                MERN Full-Stack Service Monitor
              </h4>
              <p style={{ fontSize: "0.84rem", color: "var(--text-muted)", marginBottom: "0.8rem" }}>
                This contact form sends payloads to Express API (<code>POST /api/contact</code>) and persists them in MongoDB via Mongoose.
              </p>

              <div className="api-status-badge">
                <span
                  className={`api-status-dot ${backendHealth.online ? "" : "offline"}`}
                />
                <div>
                  <div style={{ fontWeight: 600, color: "var(--text-primary)" }}>
                    {backendHealth.checked
                      ? backendHealth.online
                        ? "API Server: Online"
                        : "API Server: Local Offline Mode"
                      : "Connecting to API..."}
                  </div>
                  <div style={{ fontSize: "0.76rem", color: "var(--text-muted)" }}>
                    {backendHealth.mongo
                      ? "MongoDB Atlas: Connected & Synchronized"
                      : "Database: Standalone / Ready for Atlas"}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Interactive Contact Form */}
          <Reveal delay={0.2}>
            <div className="contact-form-card">
              <h3 style={{ fontSize: "1.3rem", marginBottom: "1.4rem" }}>Send a Message</h3>

              <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-name">
                    Your Name *
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    className="form-input"
                    value={form.name}
                    onChange={handleFormChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-email">
                    Your Email Address *
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    placeholder="alex@company.com"
                    className="form-input"
                    value={form.email}
                    onChange={handleFormChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-subject">
                    Subject / Topic
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    placeholder="Internship opportunity / Project inquiry"
                    className="form-input"
                    value={form.subject}
                    onChange={handleFormChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-message">
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows="5"
                    required
                    placeholder="Write your message here..."
                    className="form-textarea"
                    value={form.message}
                    onChange={handleFormChange}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: "100%", justifyContent: "center" }}
                  disabled={formState.status === "sending"}
                >
                  {formState.status === "sending" ? (
                    <>
                      <span className="pulse-dot" style={{ background: "#ffffff" }} />
                      <span>Saving to MongoDB...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message to Express API</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                    </>
                  )}
                </button>

                {formState.status === "success" && (
                  <div className="form-status success" role="status">
                    <span>✓</span>
                    <span>{formState.message}</span>
                  </div>
                )}

                {formState.status === "error" && (
                  <div className="form-status error" role="alert">
                    <span>⚠</span>
                    <span>{formState.message}</span>
                  </div>
                )}
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Project Details Modal */}
      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}

      {/* Certificate Preview Modal */}
      {activeCert && (
        <CertModal
          cert={activeCert}
          onClose={() => setActiveCert(null)}
        />
      )}

      {/* Toast Notification when Email is copied */}
      {copiedEmail && (
        <div className="toast">
          ✓ Email address copied to clipboard: <strong>{profile.email}</strong>
        </div>
      )}
    </>
  );
}
