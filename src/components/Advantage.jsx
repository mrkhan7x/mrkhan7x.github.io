import React from "react";
import { motion } from "framer-motion";
import WorkflowDemo from "./WorkflowDemo";
import "../styles/WorkflowDemo.css";

export default function Advantage() {
  const points = [
    {
      num: "01",
      title: "Zero Human Error",
      desc: "Automations don't sleep or forget things. Data enters your system perfectly formatted, every single time."
    },
    {
      num: "02",
      title: "Instant Scaling",
      desc: "Process 10 leads or 10,000 leads using the exact same infrastructure without hiring extra staff."
    },
    {
      num: "03",
      title: "Rapid ROI",
      desc: "Most automation systems pay for themselves in time saved within the first 14 days of going live."
    }
  ];

  return (
    <section className="advantage-section" id="advantage">
      <div className="about-container"> {/* Reusing common container padding */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="about-header"
          style={{ marginBottom: "40px" }}
        >
          <span className="section-tag">How It Works</span>
          <h2 className="section-title">
            The Automation <span className="highlight">Advantage</span>
          </h2>
          <p className="section-subtitle" style={{ maxWidth: "600px", margin: "10px auto 0 auto", color: "#8c8ea3", fontSize: "0.95rem" }}>
            Visualizing how data flows securely and instantly through your business in real-time.
          </p>
        </motion.div>

        <div className="advantage-grid">
          {/* Left Side: Animated SVG Workflow */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <WorkflowDemo />
          </motion.div>

          {/* Right Side: Key Value Points */}
          <div className="advantage-points">
            {points.map((point, index) => (
              <motion.div
                key={index}
                className="advantage-point-card"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="advantage-point-num">{point.num}</div>
                <div className="advantage-point-details">
                  <h3>{point.title}</h3>
                  <p>{point.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
