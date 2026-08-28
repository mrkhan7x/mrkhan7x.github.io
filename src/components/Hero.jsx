import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "../styles/Hero.css";

export default function Hero({ onOpenBooking }) {
  const lottieContainerRef = useRef(null);

  useEffect(() => {
    let anim;
    if (window.lottie && lottieContainerRef.current) {
      anim = window.lottie.loadAnimation({
        container: lottieContainerRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: process.env.PUBLIC_URL + "/assets/n8n_hero.json",
      });
    }
    return () => {
      if (anim) anim.destroy();
    };
  }, []);

  const handleSecondaryAction = () => {
    if (onOpenBooking) {
      onOpenBooking();
    } else {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

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

  return (
    <section className="hero hero--home" id="home">
      {/* Background Video Layer */}
      <div className="hero-bg">
        <div ref={lottieContainerRef} className="hero-bg-anim" />
        <video autoPlay muted loop playsInline preload="auto" className="hero-bg-video">
          <source src={process.env.PUBLIC_URL + "/assets/hero_bg.mp4"} type="video/mp4" />
          <source src={process.env.PUBLIC_URL + "/assets/n8n_hero.mov"} type="video/quicktime" />
        </video>
        <div className="hero-overlay" />
      </div>

      {/* Hero Content */}
      <div className="hero__content">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero__intro"
        >
          <h1 className="hero__headline">
            SYSTEMS DON&apos;T<br />RUN ON MANUAL.
          </h1>
          <p className="hero__supporting">
            Stop wasting time on manual tasks. I design custom automation workflows and AI agents that capture leads, manage customer support, and scale operations on autopilot.
          </p>
        </motion.div>

        {/* Hero Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hero__results"
        >
          <div className="hero__stats">
            <div className="hero__stat">
              <strong>100+</strong>
              <span>workflows built</span>
            </div>
            <div className="hero__stat">
              <strong>100%</strong>
              <span>client satisfaction</span>
            </div>
            <div className="hero__stat">
              <strong>2+ yrs</strong>
              <span>building AI systems</span>
            </div>
            <div className="hero__stat">
              <strong>20+ hrs</strong>
              <span>saved per week</span>
            </div>
          </div>

          <div className="hero__results-cta">
            <button className="talk-btn" onClick={handleSecondaryAction}>
              <span className="talk-btn__label">
                <span className="talk-btn__label-current">Let&apos;s talk</span>
              </span>
              <span className="talk-btn__arrow">
                <svg viewBox="0 0 32 32" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M6 16h20M19 9l7 7-7 7" />
                </svg>
              </span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Company / Tech Marquee */}
      <div className="company-marquee">
        <p className="company-marquee__label">MRKHANSERVICES WORKS WITH</p>
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
              <span>n8n Workflows</span>
              <span>OpenAI Agents</span>
              <span>Voiceflow</span>
              <span>Make.com</span>
              <span>Supabase</span>
              <span>HubSpot CRM</span>
              <span>Airtable</span>
              <span>Slack API</span>
              <span>WhatsApp API</span>
              <span>Python Automation</span>
            </div>
            <div className="company-marquee__group" aria-hidden="true">
              <span>n8n Workflows</span>
              <span>OpenAI Agents</span>
              <span>Voiceflow</span>
              <span>Make.com</span>
              <span>Supabase</span>
              <span>HubSpot CRM</span>
              <span>Airtable</span>
              <span>Slack API</span>
              <span>WhatsApp API</span>
              <span>Python Automation</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
