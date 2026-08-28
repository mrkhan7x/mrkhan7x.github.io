import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import "../styles/Projects.css";

export default function Projects({ onOpenBooking }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
    setTimeout(() => setSelectedProject(null), 300);
  };

  const workItems = [
    {
      id: "artpolicejoe",
      title: "ArtPoliceJoe",
      description: "AI image generation systems that helped produce more than $30K in revenue.",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1100&q=85",
      link: "#contact"
    },
    {
      id: "lead-concierge",
      title: "Lead Concierge",
      description: "AI-assisted lead response, qualification, and follow-up infrastructure.",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1100&q=85",
      link: "#contact"
    },
    {
      id: "travelitaly",
      title: "TravelItaly",
      description: "Custom travel planning flows with faster inquiries and handoff.",
      image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1100&q=85",
      link: "#contact"
    }
  ];

  return (
    <section className="work-showcase" id="projects">
      <div className="work-showcase__inner">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="work-showcase__intro"
        >
          <h2>Some of our work.</h2>
          <p>
            Real results from real engagements. Every project below was built, deployed, and managed by our team.{" "}
            <a href="#services" className="work-showcase__link">See all services &amp; industries &rarr;</a>
          </p>
        </motion.div>

        {/* Work Cards Grid */}
        <div className="work-showcase__grid">
          {workItems.map((item, index) => (
            <motion.article 
              key={item.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="work-showcase__item"
            >
              <div 
                className="work-showcase__image-link"
                onClick={() => openModal(item)}
              >
                <img src={item.image} alt={item.title} loading="lazy" />
                <span className="work-showcase__arrow">
                  <span className="work-showcase__arrow-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </span>
                </span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Modal Popup */}
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="project-modal-backdrop"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="project-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close-btn" onClick={closeModal}>
                ×
              </button>

              <h2 className="modal-title">{selectedProject.title}</h2>
              <p className="modal-description">{selectedProject.description}</p>
              
              <div className="modal-actions" style={{ marginTop: "24px" }}>
                <button
                  className="talk-btn"
                  onClick={() => {
                    closeModal();
                    if (onOpenBooking) onOpenBooking();
                  }}
                >
                  <span className="talk-btn__label">
                    <span className="talk-btn__label-current">Book a Strategy Call</span>
                  </span>
                  <span className="talk-btn__arrow">
                    <svg viewBox="0 0 32 32" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M6 16h20M19 9l7 7-7 7" />
                    </svg>
                  </span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}