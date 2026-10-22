import Modal from "./Modal.jsx";
import { ExternalIcon, GitHubIcon } from "./Icons.jsx";

export default function ProjectModal({ project, onClose }) {
  const titleId = `project-modal-${project.id}`;

  return (
    <Modal onClose={onClose} labelledBy={titleId}>
      <div style={{ marginBottom: "1.2rem" }}>
        <span className="section-tag" style={{ marginBottom: "0.5rem" }}>
          {project.category}
        </span>
        <h2 id={titleId} style={{ fontSize: "1.8rem", marginTop: "0.4rem" }}>
          {project.name}
        </h2>
        <p style={{ color: "var(--accent)", fontWeight: 600, fontSize: "0.95rem" }}>{project.badge}</p>
      </div>

      <div className="modal-image-frame">
        <img src={project.image} alt="" />
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <h3 className="modal-subhead">Project Overview</h3>
        <p style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "var(--text-secondary)" }}>{project.description}</p>
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <h3 className="modal-subhead">Architecture & Engineering Highlights</h3>
        <ul className="modal-highlights">
          {project.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 className="modal-subhead mono-label">Technologies Used</h3>
        <ul className="project-tech-badges" style={{ margin: 0 }}>
          {project.tech.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>

      <div className="modal-actions">
        {project.live && (
          <a href={project.live} target="_blank" rel="noreferrer" className="btn btn-primary">
            <span>View Live Demo</span>
            <ExternalIcon size={16} strokeWidth={2} />
          </a>
        )}
        {project.github && (
          <a href={project.github} target="_blank" rel="noreferrer" className="btn btn-secondary">
            <span>GitHub Repository</span>
            <GitHubIcon />
          </a>
        )}
        <button className="btn btn-outline" onClick={onClose} style={{ marginLeft: "auto" }}>
          Close
        </button>
      </div>
    </Modal>
  );
}
