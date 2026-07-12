import { motion } from "framer-motion";
import PortfolioContent from "../data/PortfolioContent";
import "../styles/Hero.css";

export default function Hero() {
  const { hero } = PortfolioContent;

  const handlePrimaryAction = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleSecondaryAction = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section className="hero" id="home">
      <div className="hero-video-bg">
        <video autoPlay muted loop playsInline preload="auto">
          <source src={process.env.PUBLIC_URL + "/assets/hero_bg.mp4"} type="video/mp4" />
        </video>
        <div className="video-overlay" />
      </div>
      <div className="hero-container">
        <div className="hero-content-wrapper">
          <div className="hero-content">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="hero-badge-ref"
            >
              <span className="badge-dot-ref" />
              <span className="badge-text-ref">SYSTEMS & AUTOMATION SPECIALIST</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="hero-title-ref"
            >
              <span className="block-title">SYSTEMS DON'T</span>
              <span className="block-title highlight-text">RUN ON MANUAL.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hero-subtitle-ref"
            >
              {hero.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="hero-actions-ref"
            >
              <button
                className="btn-main-primary"
                onClick={handlePrimaryAction}
              >
                <span>{hero.buttons.primary}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="arrow-icon"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
              <button className="btn-main-secondary" onClick={handleSecondaryAction}>
                <span>{hero.buttons.secondary}</span>
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="hero-reviews-ref"
            >
              <div className="stars-row">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="star-svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                ))}
              </div>
              <span className="reviews-text">5.0 / 5.0 — 100% Client Satisfaction · 4+ Years Experience</span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="tech-stack"
          >
            <p className="tech-label">
              <span className="tech-dot" />
              Tech Stack
            </p>
            <div className="tech-grid">
              {hero.technologies.map((tech, index) => (
                <motion.span
                  key={index}
                  className="tech-tag"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {tech}
                  <span className="tech-glow" />
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
