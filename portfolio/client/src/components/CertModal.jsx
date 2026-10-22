import Modal from "./Modal.jsx";
import { ExternalIcon } from "./Icons.jsx";

export default function CertModal({ cert, onClose }) {
  const titleId = "cert-modal-title";

  return (
    <Modal onClose={onClose} labelledBy={titleId} className="cert-modal-content">
      <div style={{ marginBottom: "1rem" }}>
        <div style={{ display: "flex", gap: "0.6rem", alignItems: "center", marginBottom: "0.4rem" }}>
          <span className="cert-badge">{cert.badge}</span>
          <span className="cert-year">{cert.year}</span>
        </div>
        <h2 id={titleId} style={{ fontSize: "1.6rem", margin: "0.3rem 0" }}>
          {cert.title}
        </h2>
        <p style={{ color: "var(--accent)", fontWeight: 600, fontSize: "0.95rem" }}>Issued by: {cert.issuer}</p>
      </div>

      {cert.image && (
        <div className="cert-preview-frame">
          <img src={cert.image} alt={`${cert.title} certificate from ${cert.issuer}`} className="cert-preview-img" />
        </div>
      )}

      <div style={{ margin: "1.2rem 0" }}>
        <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "var(--text-secondary)" }}>{cert.description}</p>
        <div style={{ marginTop: "0.8rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
          <strong style={{ color: "var(--text-primary)" }}>Skills & Competencies:</strong> {cert.skills}
        </div>
      </div>

      <div className="modal-actions">
        {cert.link && (
          <a href={cert.link} target="_blank" rel="noreferrer" className="btn btn-primary">
            <span>Verify Credential</span>
            <ExternalIcon size={16} />
          </a>
        )}
        {cert.image && (
          <a href={cert.image} target="_blank" rel="noreferrer" className="btn btn-secondary">
            <span>View Full Size Image ↗</span>
          </a>
        )}
        <button className="btn btn-outline" onClick={onClose} style={{ marginLeft: "auto" }}>
          Close
        </button>
      </div>
    </Modal>
  );
}
