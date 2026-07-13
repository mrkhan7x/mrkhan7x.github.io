import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PortfolioContent from "../data/PortfolioContent";
import "../styles/navbar.css";

export default function Navbar() {
  const { navbar } = PortfolioContent;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [theme, setTheme] = useState(() => {
    // Initial check from localStorage or document theme
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(t => t === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll);

    const sections = ["home", "about", "experience", "projects", "skills", "reviews", "contact"];
    const observers = sections.map((sectionId) => {
      const el = document.getElementById(sectionId);
      if (!el) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(sectionId);
          }
        },
        { rootMargin: "-25% 0px -55% 0px" }
      );
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, []);

  const scrollToSection = (id) => {
    const sectionId = id.replace('#', '');
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(sectionId);
      setOpen(false);
    }
  };

  return (
    <header className={`header-floating-wrapper ${scrolled ? "scrolled" : ""}`}>
      {/* Desktop Navigation Pill */}
      <nav className="navbar-pill glass">
        {navbar.links.map((link) => {
          const sectionId = link.href.replace('#', '');
          const isActive = activeSection === sectionId;
          return (
            <button
              key={link.label}
              className={`nav-item-btn ${isActive ? "active" : ""}`}
              onClick={() => scrollToSection(link.href)}
            >
              {isActive && (
                <motion.span
                  layoutId="activePill"
                  className="active-pill-bg"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="nav-item-text">{link.label}</span>
            </button>
          );
        })}

        <div className="nav-divider-line"></div>

        {/* Theme Toggle inside Pill */}
        <button className="navbar-theme-btn" onClick={toggleTheme} aria-label="Toggle Theme">
          {theme === "dark" ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M12 2v2"></path>
              <path d="M12 20v2"></path>
              <path d="m4.93 4.93 1.41 1.41"></path>
              <path d="m17.66 17.66 1.41 1.41"></path>
              <path d="M2 12h2"></path>
              <path d="M20 12h2"></path>
              <path d="m6.34 17.66-1.41 1.41"></path>
              <path d="m19.07 4.93-1.41 1.41"></path>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Navbar Header */}
      <div className="mobile-navbar-bar glass">
        <span className="mobile-brand-logo" onClick={() => scrollToSection("#home")}>
          {navbar.brand}
        </span>

        <div className="mobile-actions">
          <button className="mobile-theme-btn" onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === "dark" ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>
            )}
          </button>

          <button 
            className={`burger-btn ${open ? "open" : ""}`}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mobile-dropdown-menu glass"
          >
            {navbar.links.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <button
                  key={link.label}
                  className={`mobile-dropdown-link ${isActive ? "active" : ""}`}
                  onClick={() => scrollToSection(link.href)}
                >
                  {link.label}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}