import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Nav from "./components/Nav.jsx";
import Home from "./pages/Home.jsx";
import Work from "./pages/Work.jsx";
import Contact from "./pages/Contact.jsx";
import { profile, resumeFiles } from "./data.js";

const sectionLinks = [
  ["about", "About Me"],
  ["skills", "Skills & Tech"],
  ["projects", "Projects"],
  ["process", "Work Process"],
  ["timeline", "Timeline"],
  ["certs", "Certifications"],
  ["contact", "Contact"],
];

function NotFound() {
  return (
    <section className="wrap section page-top" style={{ textAlign: "center" }}>
      <span className="section-tag">404 Error</span>
      <h1 style={{ margin: "1rem 0" }}>Page Not Found</h1>
      <p style={{ marginBottom: "2rem" }}>The requested page could not be located.</p>
      <Link className="btn btn-primary" to="/">
        Return to Home
      </Link>
    </section>
  );
}

export default function App() {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();

  // Footer section links: scroll if on home, otherwise go home first
  const goToSection = (e, id) => {
    e.preventDefault();
    if (pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `#${id}`);
    } else {
      navigate(`/#${id}`);
    }
  };

  // On route change: jump to the #section if there is one, otherwise to the top
  useEffect(() => {
    if (hash) {
      const timer = setTimeout(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
      }, 150);
      return () => clearTimeout(timer);
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash]);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Nav />
      <main id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="footer">
        <div className="wrap">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="brand" style={{ marginBottom: "0.5rem" }}>
                <div className="brand-logo-img-wrapper footer-brand-logo">
                  <img src="/favicon.jpg" alt={`${profile.name} Logo`} className="brand-logo-img" />
                </div>
                <div className="brand-name">
                  <span className="brand-name-title">{profile.name}</span>
                  <span className="brand-name-sub">MERN & AI Developer</span>
                </div>
              </div>
              <p>
                Computer Science undergraduate at JK Lakshmipat University, Jaipur. Building full-stack web applications with the MERN stack and developing AI agent pipelines.
              </p>
            </div>

            <div className="footer-nav">
              <div className="footer-nav-col">
                <h4>Navigation</h4>
                <ul>
                  {sectionLinks.map(([id, label]) => (
                    <li key={id}>
                      <a href={`/#${id}`} onClick={(e) => goToSection(e, id)}>
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="footer-nav-col">
                <h4>Pages</h4>
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/work">All Projects</Link></li>
                  <li><Link to="/contact">Contact Page</Link></li>
                </ul>
              </div>

              <div className="footer-nav-col">
                <h4>CV Downloads</h4>
                <ul>
                  <li><a href={resumeFiles.pdf.href} download>PDF Resume ({resumeFiles.pdf.size})</a></li>
                  <li><a href={resumeFiles.docx.href} download>Word Resume ({resumeFiles.docx.size})</a></li>
                </ul>
              </div>

              <div className="footer-nav-col">
                <h4>Connect</h4>
                <ul>
                  <li><a href={profile.github} target="_blank" rel="noreferrer">GitHub Profile ↗</a></li>
                  <li><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn Profile ↗</a></li>
                  <li><a href={`mailto:${profile.email}`}>Email Lavanya ↗</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} {profile.name} • Built with React, Node.js, Express & MongoDB
            </span>

            <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              <span>Back to Top</span>
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="18 15 12 9 6 15" />
              </svg>
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}
