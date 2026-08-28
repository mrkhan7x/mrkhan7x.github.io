import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import profilePhoto from "../assets/images/mrk-profile.jpg";
import "../styles/AboutPage.css";

export default function AboutPage({ onOpenBooking }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const viewportRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    if (viewportRef.current) {
      startXRef.current = e.pageX - viewportRef.current.offsetLeft;
      scrollLeftRef.current = viewportRef.current.scrollLeft;
    }
  };

  const handleMouseLeaveOrUp = () => {
    isDraggingRef.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current || !viewportRef.current) return;
    e.preventDefault();
    const x = e.pageX - viewportRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 2;
    viewportRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleTalkClick = () => {
    if (onOpenBooking) {
      onOpenBooking();
    }
  };

  const pillars = [
    {
      title: "BS Artificial Intelligence Foundation",
      description:
        "Pursuing a degree in Artificial Intelligence (BS AI)—grounding every workflow in mathematical rigor, statistical modeling, and machine learning principles from the ground up."
    },
    {
      title: "Deep Learning & PyTorch Architectures",
      description:
        "Hands-on experience building, training, and fine-tuning neural networks, supervised learning ensembles (XGBoost, Random Forests), and PyTorch models for targeted intelligence tasks."
    },
    {
      title: "Data Engineering & Analytics Pipelines",
      description:
        "Designing robust data extraction pipelines, custom Python ETL flows, and normalized SQL/Supabase databases that supply clean, structured inputs to production AI agents."
    },
    {
      title: "Production B2B Systems We Stand Behind",
      description:
        "Translating advanced AI models and APIs into self-running business infrastructure that triages leads, connects CRMs, and returns 20+ hours each week to operating teams."
    }
  ];

  return (
    <div className="about-page">
      {/* ========================================================= */}
      {/* Hero Section                                              */}
      {/* ========================================================= */}
      <section className="about-page__hero">
        <div className="about-page__hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="about-page__headline"
          >
            The engineer behind
            <br />
            your AI systems.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="about-page__supporting"
          >
            Muhammad Roman Khan (M R KHAN) combines formal Artificial Intelligence (BS AI)
            education with real-world system architecture. Designing production AI agents,
            custom machine learning workflows, and data pipelines built for business growth.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            <button className="talk-btn" onClick={handleTalkClick}>
              <span className="talk-btn__label">
                <span className="talk-btn__label-current">Let&apos;s talk</span>
              </span>
              <span className="talk-btn__arrow">
                <svg
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* Tech / Partner Marquee                                    */}
      {/* ========================================================= */}
      <div className="company-marquee">
        <p className="company-marquee__label">CORE STACK &amp; SPECIALTIES</p>
        <div
          ref={viewportRef}
          className="company-marquee__viewport"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeaveOrUp}
          onMouseUp={handleMouseLeaveOrUp}
          onMouseMove={handleMouseMove}
        >
          <div className="company-marquee__track">
            <div className="company-marquee__group">
              <span>BS Artificial Intelligence</span>
              <span>PyTorch &amp; Deep Learning</span>
              <span>Machine Learning (scikit-learn)</span>
              <span>Python &amp; Data Engineering</span>
              <span>n8n Workflows</span>
              <span>OpenAI API &amp; LLM Orchestration</span>
              <span>Supabase &amp; PostgreSQL</span>
              <span>HubSpot &amp; CRM Sync</span>
              <span>Data Analytics &amp; Statistics</span>
              <span>FastAPI &amp; REST Microservices</span>
            </div>
            <div className="company-marquee__group" aria-hidden="true">
              <span>BS Artificial Intelligence</span>
              <span>PyTorch &amp; Deep Learning</span>
              <span>Machine Learning (scikit-learn)</span>
              <span>Python &amp; Data Engineering</span>
              <span>n8n Workflows</span>
              <span>OpenAI API &amp; LLM Orchestration</span>
              <span>Supabase &amp; PostgreSQL</span>
              <span>HubSpot &amp; CRM Sync</span>
              <span>Data Analytics &amp; Statistics</span>
              <span>FastAPI &amp; REST Microservices</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* Story Section: Academic Depth + Production Track Record   */}
      {/* ========================================================= */}
      <section className="about-story" id="about-story">
        <div className="about-story__inner">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="about-story__title"
          >
            Engineering depth meets practical automation.
          </motion.h2>

          <div className="about-story__layout">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="about-story__copy"
            >
              <p>
                Muhammad Roman Khan is a software builder and <strong>BS Artificial Intelligence</strong> student
                with a singular focus: engineering practical, resilient AI systems that replace manual chaos
                with reliable autonomous workflows.
              </p>
              <p>
                Unlike surface-level tool integrators, his work is backed by a disciplined foundation in
                <strong> Machine Learning and Deep Learning</strong>. From training predictive models and decision
                tree ensembles to writing custom <strong>PyTorch</strong> neural network architectures, he understands
                how algorithms operate under the hood—ensuring models are chosen for accuracy, speed, and real operational fit.
              </p>
              <p>
                His engineering extends deeply into <strong>Data Analytics &amp; Data Engineering</strong>:
                building clean ingestion pipelines, structuring SQL databases, and automating statistical triage
                so that AI agents receive reliable, validated data rather than noisy assumptions.
              </p>
              <p>
                On the production side, his commercial automations—including custom AI generation pipelines
                for ArtPoliceJoe—have produced over $30K in revenue. Through MRKHANSERVICES, he builds
                complete lead intake engines, autonomous chatbots, and CRM sync systems that give growing
                businesses 20+ hours back every week.
              </p>
            </motion.div>

            <motion.figure
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.18 }}
              className="about-story__media"
            >
              <div className="about-story__media-frame">
                <img src={profilePhoto} alt="M R KHAN Profile" loading="lazy" />
              </div>
            </motion.figure>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* Pillars Section: AI Foundations & Engineering Breadth    */}
      {/* ========================================================= */}
      <section className="about-pillars">
        <div className="about-pillars__inner">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="about-pillars__title"
          >
            Engineering, machine learning, &amp; performance.
          </motion.h2>

          <div className="about-pillars__grid">
            {pillars.map((pillar, idx) => (
              <motion.article
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.45 }}
                className="about-pillar"
              >
                <h3 className="about-pillar__title">{pillar.title}</h3>
                <p className="about-pillar__copy">{pillar.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* CTA Banner: Ready to put AI to work?                      */}
      {/* ========================================================= */}
      <section className="about-cta-section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="cta-banner"
        >
          <div className="cta-banner__glow" />
          <h2 className="cta-banner__title">Ready to put AI to work?</h2>
          <p className="cta-banner__text">
            Book a free 30-minute AI growth call. We&apos;ll examine your funnel,
            pinpoint what&apos;s slowing growth, and show you where intelligent
            automation can create the biggest lift.
          </p>

          <button className="talk-btn cta-banner__btn" onClick={handleTalkClick}>
            <span className="talk-btn__label">
              <span className="talk-btn__label-current">Book a free strategy call</span>
            </span>
            <span className="talk-btn__arrow">
              <svg
                viewBox="0 0 24 24"
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </button>
        </motion.div>
      </section>
    </div>
  );
}
