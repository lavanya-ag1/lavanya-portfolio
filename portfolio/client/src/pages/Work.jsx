import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectModal from "../components/ProjectModal.jsx";
import { projects } from "../data.js";

const allCategories = ["All", ...new Set(projects.map((p) => p.category))];

export default function Work() {
  const [filter, setFilter] = useState("All");
  const [activeProject, setActiveProject] = useState(null);

  const shown = projects.filter((p) => filter === "All" || p.category === filter);

  return (
    <section className="wrap section" style={{ paddingTop: "calc(var(--nav-height) + 3rem)" }}>
      <div className="section-head">
        <span className="section-tag">Portfolio Archive</span>
        <h1>Projects & Systems</h1>
        <p className="section-desc">
          Interactive showcase of web applications, AI pipelines, and enterprise compliance tools.
        </p>
      </div>

      <div className="project-filters" role="group" aria-label="Filter by category">
        {allCategories.map((cat) => (
          <button
            key={cat}
            className={`filter-chip ${filter === cat ? "active" : ""}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <motion.div layout className="projects-grid">
        <AnimatePresence>
          {shown.map((p) => (
            <motion.article
              layout
              key={p.id}
              className="project-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
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

      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </section>
  );
}
