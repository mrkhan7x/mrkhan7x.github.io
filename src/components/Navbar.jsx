import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PortfolioContent from "../data/PortfolioContent";
import "../styles/navbar.css";

export default function Navbar() {
  const { navbar } = PortfolioContent;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll);

    const sections = ["home", "about", "skills", "projects", "contact"];
    const observers = sections.map((sectionId) => {
      const el = document.getElementById(sectionId);
      if (!el) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(sectionId);
          }
        },
        { rootMargin: "-20% 0px -60% 0px" }
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
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
      setOpen(false);
    }
  };

  return (
    <motion.nav 
      className={`navbar ${scrolled ? "scrolled" : ""}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="nav-container">
        <div className="nav-brand" onClick={() => scrollToSection("#home")}>
          <div className="brand-glow" />
          <span className="brand-dot" />
          <span className="brand-text">{navbar.brand}</span>
        </div>

        <ul className={`nav-links ${open ? "open" : ""}`}>
          {navbar.links.map((link, i) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <motion.li 
                key={link.label}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <a 
                  href={link.href} 
                  className={isActive ? "active" : ""}
                  onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                >
                  {link.label}
                  {!isActive && <span className="link-underline" />}
                </a>
              </motion.li>
            );
          })}
          <li className="mobile-cta">
            <button className="btn-glow" onClick={() => scrollToSection("#contact")}>
              <span className="btn-text">{navbar.cta}</span>
              <span className="btn-shimmer" />
            </button>
          </li>
        </ul>

        <div className="nav-actions-group">
          <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === "dark" ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>
            )}
          </button>

          <button className="nav-cta" onClick={() => scrollToSection("#contact")}>
            <span className="btn-text">{navbar.cta}</span>
            <span className="btn-shimmer" />
          </button>
        </div>

        <button 
          className={`burger ${open ? "open" : ""}`} 
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
        </button>
      </div>
    </motion.nav>
  );
}