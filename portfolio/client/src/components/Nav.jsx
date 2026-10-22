import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { profile, resumeFiles } from "../data.js";
import { DownloadIcon, SignatureMark } from "./Icons.jsx";

const navLinks = [
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Process", id: "process" },
  { label: "CV Download", id: "resume" },
  { label: "Timeline", id: "timeline" },
  { label: "Certifications", id: "certs" },
  { label: "Contact", id: "contact" },
];

// localStorage can throw (private mode, blocked storage), so guard every access
function readTheme() {
  try {
    return localStorage.getItem("theme") || "dark";
  } catch {
    return "dark";
  }
}

export default function Nav() {
  const [theme, setTheme] = useState(readTheme);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const location = useLocation();
  const navigate = useNavigate();
  const onHome = location.pathname === "/";

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("theme", theme);
    } catch {
      // Theme still applies for this visit
    }
  }, [theme]);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Highlight the nav link for the section currently on screen
  useEffect(() => {
    if (!onHome) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [onHome]);

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    setMobileOpen(false);
    if (onHome) {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", `#${id}`);
        setActiveSection(id);
      }
    } else {
      navigate(`/#${id}`);
    }
  };

  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <header className="nav">
      <div className="wrap nav-in">
        <Link to="/" className="brand" aria-label={`${profile.name}, home`}>
          <div className="brand-logo-img-wrapper">
            <img src="/favicon.jpg" alt={`${profile.name} Logo`} className="brand-logo-img" />
          </div>
          <div className="brand-name">
            <span className="brand-name-title">{profile.name}</span>
            <span className="brand-name-sub">MERN & AI Developer</span>
          </div>
        </Link>

        <nav aria-label="Main Navigation">
          <ul className="nav-links">
            {navLinks.map((link) => {
              const isActive = onHome && activeSection === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={`/#${link.id}`}
                    onClick={(e) => handleLinkClick(e, link.id)}
                    className={isActive ? "active-nav-link" : ""}
                    aria-current={isActive ? "true" : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="nav-actions">
          <button
            className="theme-toggle"
            onClick={() => setTheme(nextTheme)}
            aria-label={`Switch to ${nextTheme} mode`}
            title={`Switch to ${nextTheme} mode`}
          >
            {theme === "dark" ? (
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          <a className="btn-nav-cv" href={resumeFiles.pdf.href} download title="Download PDF Resume">
            <DownloadIcon size={15} />
            <span>Resume</span>
          </a>

          <button
            className="mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-drawer"
          >
            {mobileOpen ? (
              <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="mobile-drawer" id="mobile-drawer">
          {navLinks.map((link) => (
            <a
              key={link.id}
              className={`mobile-nav-link ${onHome && activeSection === link.id ? "active" : ""}`}
              href={`/#${link.id}`}
              onClick={(e) => handleLinkClick(e, link.id)}
            >
              {link.label}
            </a>
          ))}
          <Link className="mobile-nav-link" to="/work">All Projects</Link>
          <div style={{ display: "flex", gap: "0.8rem", marginTop: "1rem" }}>
            <a className="btn btn-primary" href={resumeFiles.pdf.href} download style={{ flex: 1 }}>
              Download PDF CV
            </a>
            <a className="btn btn-secondary" href={resumeFiles.docx.href} download style={{ flex: 1 }}>
              Word CV
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
