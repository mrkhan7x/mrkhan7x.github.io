import React from "react";
import { motion } from "framer-motion";
import PortfolioContent from "../data/PortfolioContent";
import "../styles/Experience.css";

export default function Experience() {
  const { experience } = PortfolioContent;

  return (
    <section className="experience-section" id="experience">
      <div className="experience-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="experience-header-ref"
        >
          <div className="section-header-tag">
            <span className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-[#B000FF]">
              02 / {experience.tag}
            </span>
            <span className="h-px flex-1 max-w-[100px] bg-border"></span>
          </div>
          <h2 className="section-title-ref">
            {experience.title} <span className="text-gradient-purple">{experience.titleHighlight}</span>
          </h2>
          <p className="section-desc-ref">{experience.description}</p>
        </motion.div>

        {/* Sticky Cards Stacking Area */}
        <div className="experience-timeline">
          {experience.items.map((item, idx) => {
            // Stack offset spacing: 0px, 12px, 24px, etc.
            const stickyTopOffset = `${idx * 16}px`;

            return (
              <div
                key={item.id}
                className="experience-sticky-card-wrapper"
                style={{ top: stickyTopOffset }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
                  viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                  className="experience-card-ref glass"
                >
                  {/* Decorative blur orbs inside the card */}
                  <div className="card-orb orb-top-right"></div>
                  <div className="card-orb orb-bottom-left"></div>

                  <div className="experience-card-grid">
                    {/* Left Column: Role Details */}
                    <div className="card-col-left">
                      <div className="card-index-row">
                        <span className="card-index font-mono">{item.id}</span>
                        <svg
                          className="sparkle-icon"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path d="M12 2v20M2 12h20M5.6 5.6l12.8 12.8M5.6 18.4L18.4 5.6" />
                        </svg>
                      </div>

                      <h3 className="card-role">{item.role}</h3>
                      <p className="card-company">{item.company}</p>

                      <div className="card-meta-list">
                        <div className="meta-item">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                          </svg>
                          <span>{item.period}</span>
                        </div>
                        <div className="meta-item">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          <span>{item.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Narrative & Bullets */}
                    <div className="card-col-right">
                      <p className="card-desc">{item.description}</p>
                      
                      <ul className="card-bullets">
                        {item.bullets.map((bullet, bIdx) => (
                          <motion.li
                            key={bIdx}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 * bIdx }}
                            viewport={{ once: true }}
                            className="bullet-li"
                          >
                            <span className="bullet-dot"></span>
                            <span className="bullet-text">{bullet}</span>
                          </motion.li>
                        ))}
                      </ul>

                      <div className="card-tags">
                        {item.tags.map((tag, tIdx) => (
                          <span key={tIdx} className="card-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
