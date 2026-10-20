import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Nav from "./components/Nav.jsx";
import Home from "./pages/Home.jsx";
import Work from "./pages/Work.jsx";
import Contact from "./pages/Contact.jsx";
import { profile } from "./data.js";
import { API } from "./api.js";

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace("#", "");
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 150);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Nav />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="*"
            element={
              <section className="wrap section" style={{ paddingTop: "calc(var(--nav-height) + 5rem)", textAlign: "center" }}>
                <span className="section-tag">404 Error</span>
                <h1 style={{ margin: "1rem 0" }}>Page Not Found</h1>
                <p style={{ marginBottom: "2rem" }}>The requested page could not be located.</p>
                <a className="btn btn-primary" href="/">Return to Home</a>
              </section>
            }
          />
        </Routes>
      </main>

      <footer className="footer">
        <div className="wrap">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="brand" style={{ marginBottom: "0.5rem" }}>
                <div className="brand-badge">{profile.initials}</div>
                <div className="brand-name">
                  <span>{profile.name}</span>
                  <span>Full-Stack Developer</span>
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
                  <li><a href="#about">About Me</a></li>
                  <li><a href="#skills">Skills & Tech</a></li>
                  <li><a href="#projects">Projects</a></li>
                  <li><a href="#timeline">Timeline</a></li>
                  <li><a href="#certs">Certifications</a></li>
                  <li><a href="#contact">Contact</a></li>
                </ul>
              </div>

              <div className="footer-nav-col">
                <h4>CV Downloads</h4>
                <ul>
                  <li>
                    <a href="/resume/pdf" download>
                      PDF Resume (165 KB)
                    </a>
                  </li>
                  <li>
                    <a href="/resume/docx" download>
                      Word Resume (38 KB)
                    </a>
                  </li>
                  <li>
                    <a href="#resume">Document Server Info</a>
                  </li>
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
              © {new Date().getFullYear()} {profile.name} • Built with React 18, Node.js, Express & MongoDB (MERN Stack)
            </span>

            <button className="back-to-top" onClick={scrollToTop} aria-label="Back to top">
              <span>Back to Top</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="18 15 12 9 6 15" />
              </svg>
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}
