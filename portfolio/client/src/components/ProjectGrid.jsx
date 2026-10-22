import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectModal from "./ProjectModal.jsx";
import { ExternalIcon, GitHubIcon } from "./Icons.jsx";
import { projects } from "../data.js";

const categories = ["All", ...new Set(projects.map((p) => p.category))];

// Filterable project cards with a details modal. Used on Home and /work.
export default function ProjectGrid() {
  const [filter, setFilter] = useState("All");
  const [activeProject, setActiveProject] = useState(null);
  const shown = projects.filter((p) => filter === "All" || p.category === filter);

  return (
    <>
      <div className="project-filters" role="group" aria-label="Filter projects by category">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-chip ${filter === cat ? "active" : ""}`}
            aria-pressed={filter === cat}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <motion.div layout className="projects-grid">
        <AnimatePresence>
          {shown.map((p, idx) => (
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
                <img src={p.image} alt="" loading="lazy" />
                <span className="project-badge-tag">{p.badge}</span>
                <span className="project-serial-tag">0{idx + 1}</span>
              </div>

              <div className="project-body">
                <div className="project-header-row">
                  <span className="project-num-indicator">0{idx + 1}</span>
                  <h3 className="project-title">{p.name}</h3>
                </div>
                <p className="project-desc">{p.description}</p>

                <ul className="project-highlights-list">
                  {p.highlights.slice(0, 2).map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>

                <ul className="project-tech-badges">
                  {p.tech.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>

                <div className="project-actions">
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noreferrer" className="project-link primary">
                      <span>Live Demo</span>
                      <ExternalIcon />
                    </a>
                  )}
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noreferrer" className="project-link">
                      <GitHubIcon size={15} />
                      <span>Code</span>
                    </a>
                  )}
                  <button
                    className="btn btn-outline btn-sm"
                    style={{ marginLeft: "auto" }}
                    onClick={() => setActiveProject(p)}
                    aria-label={`Architecture details for ${p.name}`}
                  >
                    Architecture ▹
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {activeProject && (
          <ProjectModal key={activeProject.id} project={activeProject} onClose={() => setActiveProject(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
