import React from "react";
import { motion } from "framer-motion";
import PortfolioContent from "../data/PortfolioContent";
import "../styles/Reviews.css";

export default function Reviews() {
  const { testimonials } = PortfolioContent;

  return (
    <section className="reviews-section" id="reviews">
      <div className="reviews-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="reviews-header-ref"
        >
          <div className="section-header-tag">
            <span className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-[#B000FF]">
              05 / Reviews
            </span>
            <span className="h-px flex-1 max-w-[100px] bg-border"></span>
          </div>
          <h2 className="section-title-ref">
            What Clients <span className="text-gradient-purple">Say</span>
          </h2>
          <p className="section-desc-ref">
            Hear from founders, marketing agencies, and operations leaders who have automated their bottlenecks.
          </p>
        </motion.div>

        <div className="reviews-grid">
          {testimonials.map((test, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="review-card glass"
            >
              {/* Decorative orbs */}
              <div className="card-decor-orb"></div>

              {/* Star Rating Row */}
              <div className="review-stars-row">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="review-star-svg"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="currentColor"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                ))}
              </div>

              {/* Review Text */}
              <p className="review-text">"{test.text}"</p>

              {/* Reviewer Details */}
              <div className="review-author-info">
                <div className="author-avatar-initials">
                  {test.author.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="review-author-name">{test.author}</h4>
                  <span className="review-author-title">{test.title}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
