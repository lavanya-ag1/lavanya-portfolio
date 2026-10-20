import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
        <motion.div
          className="modal-content"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.25 }}
        >
          <button className="modal-close" onClick={onClose} aria-label="Close modal">
            ✕
          </button>

          <div style={{ marginBottom: "1.2rem" }}>
            <span className="section-tag" style={{ marginBottom: "0.5rem" }}>
              {project.category}
            </span>
            <h2 style={{ fontSize: "1.8rem", marginTop: "0.4rem" }}>{project.name}</h2>
            <p style={{ color: "var(--accent)", fontWeight: 600, fontSize: "0.95rem" }}>
              {project.badge}
            </p>
          </div>

          <div
            style={{
              borderRadius: "14px",
              overflow: "hidden",
              marginBottom: "1.5rem",
              border: "1px solid var(--border)",
              maxHeight: "260px",
            }}
          >
            <img
              src={project.image}
              alt={project.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <h4 style={{ fontSize: "1.05rem", marginBottom: "0.5rem", color: "var(--text-primary)" }}>
              Project Overview
            </h4>
            <p style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "var(--text-secondary)" }}>
              {project.description}
            </p>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <h4 style={{ fontSize: "1.05rem", marginBottom: "0.6rem", color: "var(--text-primary)" }}>
              Architecture & Engineering Highlights
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.45rem" }}>
              {project.highlights?.map((h, idx) => (
                <li
                  key={idx}
                  style={{
                    fontSize: "0.9rem",
                    color: "var(--text-secondary)",
                    position: "relative",
                    paddingLeft: "1.3rem",
                  }}
                >
                  <span style={{ position: "absolute", left: 0, color: "var(--accent)" }}>▹</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <h4 style={{ fontSize: "0.9rem", marginBottom: "0.5rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", fontFamily: "var(--font-mono)" }}>
              Technologies Deployed
            </h4>
            <ul className="project-tech-badges" style={{ margin: 0 }}>
              {project.tech.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", borderTop: "1px solid var(--border)", paddingTop: "1.5rem" }}>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
              >
                <span>View Live Demo</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            )}

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary"
              >
                <span>GitHub Repository</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
            )}

            <button className="btn btn-outline" onClick={onClose} style={{ marginLeft: "auto" }}>
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
