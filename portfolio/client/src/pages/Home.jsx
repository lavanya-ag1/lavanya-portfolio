import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Typewriter from "../components/Typewriter.jsx";
import Reveal from "../components/Reveal.jsx";
import ProjectGrid from "../components/ProjectGrid.jsx";
import ContactPanel from "../components/ContactPanel.jsx";
import CertModal from "../components/CertModal.jsx";
import { DownloadIcon, SignatureMark } from "../components/Icons.jsx";
import { useCopy } from "../hooks.js";
import { profile, skills, timeline, certs, resumeFiles } from "../data.js";

// Show a proficiency word instead of a self-rated percentage
const tierOf = (level) => (level >= 85 ? "Advanced" : level >= 75 ? "Proficient" : "Intermediate");

const categoryIcon = { Frontend: "🎨", Backend: "⚙️", "AI & Systems": "🧠", "Tools & Technologies": "🛠️" };

export default function Home() {
  const [skillView, setSkillView] = useState("bars"); // "bars" | "radial"
  const [activeCert, setActiveCert] = useState(null);
  const [copied, copy] = useCopy();

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="wrap hero-grid">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="hero-top-eyebrows">
              <div className="hero-monogram-badge">
                <div className="hero-signature-mark">
                  <img src="/favicon.jpg" alt={`${profile.name} Logo`} className="hero-logo-img" />
                </div>
                <div className="hero-eyebrow-text">
                  <span className="hero-eyebrow-tag">FULL-STACK & AI DEVELOPER</span>
                  <span className="hero-eyebrow-sub">B.TECH CSE • JKLU JAIPUR</span>
                </div>
              </div>

              <div className="availability-pill">
                <span className="pulse-dot" />
                <span>AVAILABLE FOR INTERNSHIPS</span>
              </div>
            </div>

            <div className="hero-title-block">
              <div className="hero-script-intro">Hello, I'm</div>
              <h1 className="hero-poster-name">
                <span className="name-first">LAVANYA</span>
                <span className="name-last">AGARWAL</span>
              </h1>
              <div className="hero-subheading-tag">
                FULL-STACK MERN DEVELOPER & AI AGENT BUILDER
              </div>
            </div>

            <div className="hero-role">
              <Typewriter words={profile.roles} />
            </div>

            <p className="hero-lead">
              {profile.tagline}
            </p>

            <div className="hero-cta">
              <a className="btn btn-primary" href={resumeFiles.pdf.href} download title="Download PDF Resume">
                <DownloadIcon />
                <span>Download CV</span>
                <span className="btn-badge">PDF</span>
              </a>
              <a className="btn btn-secondary" href={resumeFiles.docx.href} download title="Download Word Resume">
                <DownloadIcon />
                <span>Download CV</span>
                <span className="btn-badge">DOCX</span>
              </a>
              <a className="btn btn-outline" href="#projects">
                <span>View Projects</span>
                <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </a>
            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-value">04+</span>
                <span className="stat-label">PROJECTS COMPLETED</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">01</span>
                <span className="stat-label">AI/ML INTERNSHIP</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">2028</span>
                <span className="stat-label">B.TECH GRADUATION</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">100%</span>
                <span className="stat-label">PASSION & DRIVE</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="portrait-wrapper">
              <div className="portrait-glow" />
              <div className="portrait-frame">
                <img className="portrait-img" src={profile.photo} alt={`Portrait of ${profile.name}`} />
              </div>

              {/* Reference style floating callout bubble */}
              <div className="hero-vision-tag">
                <div className="vision-plus">+</div>
                <div className="vision-text">Turning ideas into powerful digital experiences.</div>
              </div>

              <div className="floating-badge badge-top">
                <div className="badge-icon" aria-hidden="true">🎓</div>
                <div>
                  <div style={{ color: "var(--text-primary)", fontWeight: 700 }}>B.Tech CSE '28</div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>JKLU Jaipur</div>
                </div>
              </div>

              <div className="floating-badge badge-bottom">
                <div className="badge-icon" aria-hidden="true" style={{ background: "var(--brand-subtle)", color: "var(--accent)" }}>
                  ⚡
                </div>
                <div>
                  <div style={{ color: "var(--text-primary)", fontWeight: 700 }}>AI/ML Intern</div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Dynamicore Strategies</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="wrap section" id="about">
        <Reveal>
          <div className="section-head">
            <span className="section-tag">About Me</span>
            <h2>Bridging Full-Stack Engineering & AI Systems</h2>
            <p className="section-desc">My background, academic journey, and what I enjoy building.</p>
          </div>
        </Reveal>

        <div className="about-grid">
          <Reveal delay={0.1} className="about-text">
            <p>{profile.bio}</p>
            <p>
              My approach to software pairs architectural discipline with user-centered simplicity. Whether
              designing database schemas, building MERN applications, or constructing eval-driven LLM pipelines,
              I focus on clean code, testing, and fast, accessible user experiences.
            </p>

            <div className="about-highlights">
              {[
                ["💻", "Full-Stack MERN", "Responsive React frontends, Node/Express REST endpoints, and schema-validated MongoDB databases."],
                ["🤖", "AI & Agent Workflows", "Hands-on experience with LangChain, LangGraph, pgvector, and evaluating guardrails like Llama Guard."],
                ["📐", "Solid Foundations", "Data Structures & Algorithms, Object-Oriented Design, and Database Normalization."],
                ["🚀", "Production Mindset", "Git workflows, API testing with Postman, environment isolation, and cloud deployments."],
              ].map(([icon, title, desc]) => (
                <div className="highlight-box" key={title}>
                  <div className="highlight-title">
                    <span aria-hidden="true">{icon}</span> {title}
                  </div>
                  <div className="highlight-desc">{desc}</div>
                </div>
              ))}
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
                  <button className="copy-email-btn" onClick={() => copy(profile.email)} title="Copy email address">
                    <span>{copied ? "✓ Copied!" : "📋 Copy Email"}</span>
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SKILLS */}
      <section className="wrap section" id="skills">
        <Reveal>
          <div className="section-head">
            <span className="section-tag">Core Competencies</span>
            <h2>Skills & Technologies</h2>
            <p className="section-desc">
              Grouped across frontend, backend, AI workflows, and tooling, with where I've used each one.
            </p>
          </div>
        </Reveal>

        <div className="skills-controls">
          <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
            Each skill lists the practical context I've used it in.
          </p>

          <div className="view-toggle" role="group" aria-label="Skill layout">
            <button
              className={`view-btn ${skillView === "bars" ? "active" : ""}`}
              aria-pressed={skillView === "bars"}
              onClick={() => setSkillView("bars")}
            >
              Bar View
            </button>
            <button
              className={`view-btn ${skillView === "radial" ? "active" : ""}`}
              aria-pressed={skillView === "radial"}
              onClick={() => setSkillView("radial")}
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
                  <div className="skill-card-icon" aria-hidden="true">{categoryIcon[category]}</div>
                  <h3>{category}</h3>
                </div>

                <div className="skill-list">
                  {list.map((s) => (
                    <div className="skill-item" key={s.name}>
                      <div className="skill-meta">
                        <span className="skill-name">{s.name}</span>
                        <span className="skill-pct">{tierOf(s.level)}</span>
                      </div>
                      <div className="skill-track" aria-hidden="true">
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
                      <svg className="radial-svg" viewBox="0 0 100 100" aria-hidden="true">
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
                      <div className="radial-text radial-tier">{tierOf(s.level)}</div>
                    </div>
                    <div className="radial-name">{s.name}</div>
                    <div className="radial-sub">{s.context}</div>
                  </Reveal>
                );
              })}
          </div>
        )}
      </section>

      {/* PROJECTS */}
      <section className="wrap section" id="projects">
        <Reveal>
          <div className="section-head">
            <span className="section-tag">Portfolio Showcase</span>
            <h2>Featured Projects</h2>
            <p className="section-desc">
              Web applications and AI systems I've designed and built. Open any card for the architecture notes.
            </p>
          </div>
        </Reveal>

        <ProjectGrid />

        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <Link to="/work" className="btn btn-outline">
            Open the projects page →
          </Link>
        </div>

        {/* RESUME DOWNLOADS */}
        <Reveal delay={0.2}>
          <div className="cv-banner" id="resume">
            <div className="cv-grid">
              <div>
                <span className="cv-badge">Resume Downloads</span>
                <h3 style={{ fontSize: "1.7rem", marginBottom: "0.8rem" }}>Download My Resume</h3>
                <p style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  Get it as a PDF for reading and printing, or as an editable Word document.
                </p>
              </div>

              <div className="cv-options">
                {[
                  [resumeFiles.pdf, "pdf", "PDF", "Resume (PDF Document)", "Standard print format"],
                  [resumeFiles.docx, "docx", "DOC", "Resume (Word Document)", "Editable .docx format"],
                ].map(([file, cls, label, title, sub]) => (
                  <a key={cls} className="cv-download-card" href={file.href} download title={`Download ${title}`}>
                    <div className="cv-format-info">
                      <div className={`cv-icon ${cls}`}>{label}</div>
                      <div className="cv-text-group">
                        <h4>{title}</h4>
                        <span>
                          {sub} • {file.size}
                        </span>
                      </div>
                    </div>
                    <span style={{ color: "var(--accent)" }}>
                      <DownloadIcon size={20} />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* TIMELINE */}
      <section className="wrap section" id="timeline">
        <Reveal>
          <div className="section-head">
            <span className="section-tag">Career Milestones</span>
            <h2>Education & Experience</h2>
            <p className="section-desc">My internship experience and academic path, most recent first.</p>
          </div>
        </Reveal>

        <div className="timeline-wrapper">
          {timeline.map((item, idx) => (
            <Reveal key={item.title} delay={idx * 0.1} className="timeline-item">
              <div className={`timeline-marker ${item.type}`} />
              <div className="timeline-card">
                <div className="timeline-header">
                  <div>
                    <h3 className="timeline-role">{item.title}</h3>
                    <div className="timeline-org">
                      {item.organization} •{" "}
                      <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>{item.location}</span>
                    </div>
                  </div>
                  <span className="timeline-period">{item.period}</span>
                </div>

                <p className="timeline-summary">{item.summary}</p>

                <ul className="timeline-bullets">
                  {item.bullets.map((b) => (
                    <li key={b}>{b}</li>
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

      {/* WORK PROCESS & PHILOSOPHY (From reference design) */}
      <section className="wrap section" id="process">
        <Reveal>
          <div className="section-head">
            <span className="section-tag">How I Build</span>
            <h2>Work Process & Philosophy</h2>
            <p className="section-desc">From discovery and algorithmic design to full-stack deployment and guardrails.</p>
          </div>
        </Reveal>

        <div className="poster-columns-grid">
          {/* Col 1: Education & Skills Quick View */}
          <Reveal delay={0.1} className="poster-col-card">
            <div className="poster-col-head">
              <span className="poster-col-tag">ACADEMIC & CORE</span>
              <h3>Education & Skills</h3>
            </div>

            <div className="poster-edu-list">
              <div className="poster-edu-item">
                <div className="poster-edu-role">B.Tech in Computer Science</div>
                <div className="poster-edu-place">JK Lakshmipat University, Jaipur</div>
                <div className="poster-edu-year">2024 – 2028</div>
              </div>

              <div className="poster-edu-item">
                <div className="poster-edu-role">AI/ML Engineering Internship</div>
                <div className="poster-edu-place">Dynamicore Strategies Pvt. Ltd.</div>
                <div className="poster-edu-year">2026</div>
              </div>

              <div className="poster-edu-item">
                <div className="poster-edu-role">Red Hat System Admin (RH124)</div>
                <div className="poster-edu-place">Red Hat Enterprise Linux</div>
                <div className="poster-edu-year">2026</div>
              </div>
            </div>

            <div className="poster-skill-chips">
              <span className="p-chip">React.js</span>
              <span className="p-chip">Node.js</span>
              <span className="p-chip">Express</span>
              <span className="p-chip">MongoDB</span>
              <span className="p-chip">FastAPI</span>
              <span className="p-chip">LangChain</span>
              <span className="p-chip">pgvector</span>
              <span className="p-chip">Redis</span>
              <span className="p-chip">Python</span>
              <span className="p-chip">Git</span>
            </div>
          </Reveal>

          {/* Col 2: Step-by-Step Work Process */}
          <Reveal delay={0.2} className="poster-col-card">
            <div className="poster-col-head">
              <span className="poster-col-tag">METHODOLOGY</span>
              <h3>Work Process</h3>
            </div>

            <div className="poster-process-steps">
              {[
                { step: "01", icon: "🔍", title: "DISCOVER", desc: "Understanding system requirements, data schema, and user interaction flow." },
                { step: "02", icon: "💡", title: "IDEATE & ARCHITECT", desc: "Drafting component hierarchies, REST contracts, and AI pipeline graphs." },
                { step: "03", icon: "⚡", title: "DEVELOP & INTEGRATE", desc: "Building scalable React interfaces, Express/FastAPI backends, and databases." },
                { step: "04", icon: "🛡️", title: "VERIFY & GUARD", desc: "Rigorous API testing, edge case handling, and AI safety benchmarking." },
                { step: "05", icon: "🚀", title: "DEPLOY & OPTIMIZE", desc: "Cloud production rollout with caching, responsive tuning, and CI/CD." },
              ].map((s) => (
                <div className="process-step-row" key={s.step}>
                  <div className="step-num">{s.step}</div>
                  <div className="step-icon-bubble">{s.icon}</div>
                  <div className="step-info">
                    <span className="step-title">{s.title}</span>
                    <p className="step-desc">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Col 3: Signature Quote & Contact Banner */}
          <Reveal delay={0.3} className="poster-col-card quote-card">
            <div className="quote-mark">“</div>
            <blockquote className="quote-body">
              Good design and clean architecture are not just how it looks, but how reliably it works.
            </blockquote>
            <div className="quote-author-sig">
              <div className="author-name">Lavanya</div>
              <div className="author-title">Full-Stack & AI Developer</div>
            </div>

            <div className="poster-col-cta">
              <span className="col-cta-tag">LET'S CREATE SOMETHING GREAT TOGETHER</span>
              <a href="#contact" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                <span>Get In Touch</span>
                <span className="vision-plus" style={{ width: 18, height: 18, fontSize: "0.75rem" }}>↗</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="wrap section" id="certs">
        <Reveal>
          <div className="section-head">
            <span className="section-tag">Credentials</span>
            <h2>Certifications</h2>
            <p className="section-desc">
              Internship and course certificates. Select one to view the full document, or verify it with the issuer where available.
            </p>
          </div>
        </Reveal>

        <div className="certs-grid">
          {certs.map((c, idx) => (
            <Reveal key={c.title} delay={idx * 0.08}>
              <article className="cert-card">
                {c.image && (
                  <button
                    type="button"
                    className="cert-thumb-box"
                    onClick={() => setActiveCert(c)}
                    aria-label={`View certificate: ${c.title}`}
                  >
                    <img src={c.image} alt="" className="cert-thumb-img" loading="lazy" />
                    <div className="cert-thumb-overlay">
                      <span>Inspect Certificate 🔍</span>
                    </div>
                  </button>
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
                  <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Skills: {c.skills}</span>
                  <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
                    {c.image && (
                      <button className="btn-cert-view" onClick={() => setActiveCert(c)}>
                        View
                      </button>
                    )}
                    {c.link && (
                      <a
                        href={c.link}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-cert-verify"
                        title={`Verify ${c.title} with ${c.issuer}`}
                      >
                        Verify ↗
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="wrap section" id="contact">
        <Reveal>
          <div className="section-head">
            <span className="section-tag">Let's Connect</span>
            <h2>Get In Touch</h2>
            <p className="section-desc">
              Interested in an internship, a role, or a collaboration? Send me a message below.
            </p>
          </div>
        </Reveal>
        <ContactPanel idPrefix="contact" />
      </section>

      <AnimatePresence>
        {activeCert && <CertModal key={activeCert.title} cert={activeCert} onClose={() => setActiveCert(null)} />}
      </AnimatePresence>

      {copied && (
        <div className="toast" role="status">
          ✓ Email address copied to clipboard: <strong>{profile.email}</strong>
        </div>
      )}
    </>
  );
}
