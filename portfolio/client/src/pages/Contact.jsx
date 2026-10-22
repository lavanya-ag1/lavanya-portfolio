import ContactPanel from "../components/ContactPanel.jsx";

export default function Contact() {
  return (
    <section className="wrap section page-top">
      <div className="section-head">
        <span className="section-tag">Contact</span>
        <h1>Contact & Opportunities</h1>
        <p className="section-desc">
          Open to software engineering internships, fresher roles, open-source projects, and technical discussions.
        </p>
      </div>
      <ContactPanel idPrefix="page-contact" />
    </section>
  );
}
