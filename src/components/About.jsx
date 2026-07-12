import { motion } from "framer-motion";
import PortfolioContent from "../data/PortfolioContent";
import "../styles/About.css";

export default function About() {
  const { about } = PortfolioContent;

  return (
    <section className="about-ref" id="about">
      <div className="about-container-ref">
        <div className="about-header-ref">
          <span className="section-tag-ref">01 / About</span>
          <div className="header-line-ref" />
        </div>
        
        <h2 className="about-title-ref">
          About <span className="highlight-text-ref">M R KHAN</span>
        </h2>

        <div className="about-grid-ref">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="about-left-ref"
          >
            <div className="mockup-container-ref">
              <div className="abstract-glow-circle" />
              <div className="agency-brand-avatar">
                <span className="avatar-initials">MRK</span>
              </div>
              <div className="floating-glass-card">
                <div className="glass-card-header">
                  <span className="sparkle-icon-ref">✨</span>
                  <span className="glass-card-text">Building automated systems that refuse to let leads slip.</span>
                </div>
                <span className="glass-card-author">— M R KHAN</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="about-right-ref"
          >
            <p className="narrative-bold">
              Hi, I'm a Systems & Automation Specialist dedicated to turning manual work into automated processes.
            </p>
            {about.paragraphs.map((paragraph, index) => (
              <p key={index} className="narrative-text">
                {paragraph}
              </p>
            ))}
            
            <p className="narrative-cta">
              Let's connect. It's time to make your systems RUN on autopilot.
            </p>

            <div className="about-subcards-ref">
              <div className="subcard-ref">
                <div className="subcard-icon">🧠</div>
                <div>
                  <h4 className="subcard-title">What I Do</h4>
                  <p className="subcard-desc">Specializing in lead acquisition systems, custom CRM synchronizations, autonomous AI assistants, and customer support triage pipelines.</p>
                </div>
              </div>
              
              <div className="subcard-ref">
                <div className="subcard-icon">🎯</div>
                <div>
                  <h4 className="subcard-title">Why Choose Me</h4>
                  <p className="subcard-desc">Every pipeline is designed with active logging, detailed error catches, and bulletproof fallback options to protect your business data 24/7.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Row */}
        <div className="about-stats-row-ref">
          <div className="stat-card-ref">
            <span className="stat-value-ref">100+</span>
            <span className="stat-title-ref">Tools Integrated</span>
          </div>
          <div className="stat-card-ref">
            <span className="stat-value-ref">20+</span>
            <span className="stat-title-ref">Hours Saved / Week</span>
          </div>
          <div className="stat-card-ref">
            <span className="stat-value-ref">100%</span>
            <span className="stat-title-ref">Delivery Rate</span>
          </div>
          <div className="stat-card-ref">
            <span className="stat-value-ref">100%</span>
            <span className="stat-title-ref">Client Satisfaction</span>
          </div>
        </div>
      </div>
    </section>
  );
}