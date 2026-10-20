import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { profile } from "../data.js";
import { API } from "../api.js";

export default function Nav() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    if (location.pathname !== "/") return;

    const sections = ["about", "skills", "projects", "resume", "timeline", "certs", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  const navLinks = [
    { label: "About", href: "#about", id: "about" },
    { label: "Skills", href: "#skills", id: "skills" },
    { label: "Projects", href: "#projects", id: "projects" },
    { label: "CV Download", href: "#resume", id: "resume" },
    { label: "Timeline", href: "#timeline", id: "timeline" },
    { label: "Certifications", href: "#certs", id: "certs" },
    { label: "Contact", href: "#contact", id: "contact" },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const targetId = href.replace("#", "");

    if (location.pathname === "/") {
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", href);
        setActiveSection(targetId);
      }
    } else {
      navigate(`/${href}`);
    }
  };

  return (
    <header className="nav">
      <div className="wrap nav-in">
        <Link to="/" className="brand" aria-label="Lavanya Agarwal Portfolio">
          {/* Handwritten artistic signature icon */}
          <div className="brand-signature-icon" title="Lavanya Agarwal">
            <svg width="34" height="34" viewBox="0 0 100 100" fill="none" stroke="currentColor">
              <path
                d="M20 70 Q 30 20 40 45 T 50 65 Q 60 25 70 40 T 82 70"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M28 48 Q 50 42 78 48"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <circle cx="84" cy="36" r="3" fill="currentColor" />
            </svg>
          </div>
          <div className="brand-name">
            <span className="brand-name-title">{profile.name}</span>
            <span className="brand-name-sub">MERN & AI Developer</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav aria-label="Main Navigation">
          <ul className="nav-links">
            {navLinks.map((link) => {
              const isActive = location.pathname === "/" && activeSection === link.id;
              return (
                <li key={link.label}>
                  <a
                    href={location.pathname === "/" ? link.href : `/${link.href}`}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={isActive ? "active-nav-link" : ""}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Actions: Theme Toggle + CV Button */}
        <div className="nav-actions">
          <button
            className="theme-toggle"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`Toggle ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          <a
            className="btn-nav-cv"
            href={`${API}/api/resume/pdf`}
            download
            title="Download PDF Resume from Node/Express API"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>Resume</span>
          </a>

          {/* Mobile hamburger button */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="mobile-drawer">
          {navLinks.map((link) => (
            <a
              key={link.label}
              className={`mobile-nav-link ${activeSection === link.id ? "active" : ""}`}
              href={location.pathname === "/" ? link.href : `/${link.href}`}
              onClick={(e) => handleLinkClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
          <div style={{ display: "flex", gap: "0.8rem", marginTop: "1rem" }}>
            <a className="btn btn-primary" href={`${API}/api/resume/pdf`} download style={{ flex: 1 }}>
              Download PDF CV
            </a>
            <a className="btn btn-secondary" href={`${API}/api/resume/docx`} download style={{ flex: 1 }}>
              Word CV
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
