import ProjectGrid from "../components/ProjectGrid.jsx";

export default function Work() {
  return (
    <section className="wrap section page-top">
      <div className="section-head">
        <span className="section-tag">Projects</span>
        <h1>Projects & Systems</h1>
        <p className="section-desc">
          Web applications, AI pipelines, and compliance tools I've built. Open any card for the architecture notes.
        </p>
      </div>
      <ProjectGrid />
    </section>
  );
}
