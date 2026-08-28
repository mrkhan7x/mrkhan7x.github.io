import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PortfolioContent from "../data/PortfolioContent";
import "../styles/navbar.css";

export default function Navbar({ currentRoute = "home", setCurrentRoute, onOpenBooking }) {
  const { navbar } = PortfolioContent;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [theme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href) => {
    setOpen(false);
    if (href === "#services" || href === "/services") {
      window.location.hash = "#services";
      if (setCurrentRoute) setCurrentRoute("services");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (href === "#about" || href === "/about") {
      window.location.hash = "#about";
      if (setCurrentRoute) setCurrentRoute("about");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (href === "#home" || href === "/") {
      window.location.hash = "#home";
      if (setCurrentRoute) setCurrentRoute("home");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      if (setCurrentRoute && currentRoute !== "home") {
        setCurrentRoute("home");
        window.location.hash = "#home";
        setTimeout(() => {
          const el = document.getElementById(href.replace('#', ''));
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 150);
      } else {
        const el = document.getElementById(href.replace('#', ''));
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className={`header-floating-wrapper ${scrolled ? "scrolled" : ""}`}>
      <nav className="header-nav-container">
        {/* Brand Identity */}
        <div className="nav-brand" onClick={() => handleNavClick("#home")}>
          <span className="brand-icon-badge">{navbar.logo}</span>
          <span className="brand-name-text">{navbar.brand}</span>
        </div>

        {/* Links */}
        <div className="nav-links-center">
          {navbar.links.map((link) => {
            const linkRoute = link.href.replace('#', '').replace('/', '');
            const isActive = currentRoute === linkRoute || (currentRoute === "home" && linkRoute === "home");
            return (
              <button
                key={link.label}
                className={`nav-link-btn ${isActive ? "active" : ""}`}
                onClick={() => handleNavClick(link.href)}
              >
                {link.label}
              </button>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="nav-cta-wrapper">
          <button 
            className="talk-btn"
            onClick={() => {
              if (onOpenBooking) onOpenBooking();
              else handleNavClick("#contact");
            }}
          >
            <span className="talk-btn__label">
              <span className="talk-btn__label-current">{navbar.cta}</span>
            </span>
            <span className="talk-btn__arrow">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Navbar Header */}
      <div className="mobile-navbar-bar">
        <div className="nav-brand" onClick={() => handleNavClick("#home")}>
          <span className="brand-icon-badge">{navbar.logo}</span>
          <span className="brand-name-text">{navbar.brand}</span>
        </div>

        <div className="mobile-actions">
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
            className="mobile-dropdown-menu"
          >
            {navbar.links.map((link) => {
              const linkRoute = link.href.replace('#', '').replace('/', '');
              const isActive = currentRoute === linkRoute;
              return (
                <button
                  key={link.label}
                  className={`mobile-dropdown-link ${isActive ? "active" : ""}`}
                  onClick={() => handleNavClick(link.href)}
                >
                  {link.label}
                </button>
              );
            })}
            <button 
              className="talk-btn mobile-talk-btn"
              onClick={() => handleNavClick("#contact")}
            >
              <span>{navbar.cta}</span>
              <span className="talk-btn__arrow">→</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}