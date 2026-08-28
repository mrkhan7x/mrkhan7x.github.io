import { motion } from "framer-motion";
import profilePhoto from "../assets/images/mrk-profile.jpg";
import "../styles/About.css";

export default function About({ onOpenBooking }) {
  return (
    <section className="social-proof" id="about">
      <div className="social-proof__inner">
        {/* LEFT: Heading, Narrative & CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="social-proof__left"
        >
          <h2 className="social-proof__heading">
            Automations that save 20+ hours every week for businesses.
          </h2>
          <p className="social-proof__body">
            I am a Systems & Automation Specialist dedicated to designing custom AI agents, lead acquisition machines, and CRM synchronizations that eliminate manual work.
          </p>
          <p className="social-proof__body">
            Every pipeline is engineered with standardized error catches, active logs, and bulletproof fail-safes—giving your team complete operational freedom.
          </p>
          <button 
            className="talk-btn"
            onClick={() => {
              if (onOpenBooking) onOpenBooking();
              else {
                const el = document.getElementById("contact");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <span className="talk-btn__label">
              <span className="talk-btn__label-current">Let&apos;s talk</span>
            </span>
            <span className="talk-btn__arrow">
              <svg viewBox="0 0 32 32" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M6 16h20M19 9l7 7-7 7" />
              </svg>
            </span>
          </button>
        </motion.div>

        {/* RIGHT: Profile Photo */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="social-proof__right"
        >
          <div className="social-proof__img-wrap">
            <img
              src={profilePhoto}
              alt="M R KHAN — Systems Specialist"
              className="social-proof__img"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}