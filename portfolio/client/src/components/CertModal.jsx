import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CertModal({ cert, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!cert) return null;

  return (
    <AnimatePresence>
      <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
        <motion.div
          className="modal-content cert-modal-content"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.25 }}
        >
          <button className="modal-close" onClick={onClose} aria-label="Close certificate preview">
            ✕
          </button>

          <div style={{ marginBottom: "1rem" }}>
            <div style={{ display: "flex", gap: "0.6rem", alignItems: "center", marginBottom: "0.4rem" }}>
              <span className="cert-badge">{cert.badge}</span>
              <span className="cert-year">{cert.year}</span>
            </div>
            <h2 style={{ fontSize: "1.6rem", margin: "0.3rem 0" }}>{cert.title}</h2>
            <p style={{ color: "var(--accent)", fontWeight: 600, fontSize: "0.95rem" }}>
              Issued by: {cert.issuer}
            </p>
          </div>

          {/* Certificate Image Frame */}
          <div className="cert-preview-frame">
            <img
              src={cert.image}
              alt={`${cert.title} by ${cert.issuer}`}
              className="cert-preview-img"
            />
          </div>

          <div style={{ margin: "1.2rem 0" }}>
            <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "var(--text-secondary)" }}>
              {cert.description}
            </p>
            <div style={{ marginTop: "0.8rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
              <strong style={{ color: "var(--text-primary)" }}>Skills & Competencies:</strong>{" "}
              {cert.skills}
            </div>
          </div>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", borderTop: "1px solid var(--border)", paddingTop: "1.2rem" }}>
            <a
              href={cert.link}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
            >
              <span>Verify Credential</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>

            <a
              href={cert.image}
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary"
            >
              <span>View Full Size Image ↗</span>
            </a>

            <button className="btn btn-outline" onClick={onClose} style={{ marginLeft: "auto" }}>
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
