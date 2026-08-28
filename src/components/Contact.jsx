import { motion } from "framer-motion";
import "../styles/Contact.css";

export default function Contact({ onOpenBooking }) {
  const processSteps = [
    {
      step: "01",
      title: "Discovery and audit",
      text: "We start with a focused conversation to understand your goals, current systems, bottlenecks, and where AI can create the highest value."
    },
    {
      step: "02",
      title: "Scope and proposal",
      text: "You receive a clear plan, timeline, and scope tailored to your needs. Choose a fixed-price project or flexible hourly support based on your needs."
    },
    {
      step: "03",
      title: "Build and launch",
      text: "We design, build, test, and deploy your custom solution with regular progress updates—making sure your solution operates cleanly and confidently."
    },
    {
      step: "04",
      title: "Ongoing support",
      text: "After launch, we stay close by, monitoring performance, updating workflows, and expanding your system through flexible retainer units or ongoing support management."
    }
  ];

  const socialChannels = [
    {
      name: "LinkedIn",
      handle: "Muhammad Roman Khan",
      label: "Professional Profile & Case Studies",
      url: "https://www.linkedin.com/in/muhammad-roman-khan-8245a0328",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      )
    },
    {
      name: "GitHub",
      handle: "@mrkhan7x",
      label: "Open Source, Repos & Scripts",
      url: "https://github.com/mrkhan7x",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
      )
    },
    {
      name: "Instagram",
      handle: "@mrkhan7x",
      label: "Direct Message & Behind The Scenes",
      url: "https://www.instagram.com/mrkhan7x",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      )
    },
    {
      name: "WhatsApp",
      handle: "+92 328 5792098",
      label: "Direct Chat & Quick Inquiries",
      url: "https://wa.me/923285792098",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      )
    },
    {
      name: "Direct Email",
      handle: "mrkhan.officialsite@gmail.com",
      label: "Detailed Scopes & Inquiries",
      url: "mailto:mrkhan.officialsite@gmail.com",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      )
    }
  ];

  const handleBooking = () => {
    if (onOpenBooking) {
      onOpenBooking();
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="contact-container">
        {/* ========================================================= */}
        {/* Page 7: From first call to launch. (Process section)     */}
        {/* ========================================================= */}
        <div className="process-section">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="process-header"
          >
            <h2 className="process-heading">From first call to launch.</h2>
          </motion.div>

          <div className="process-grid">
            {processSteps.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                className="process-card"
              >
                <span className="process-card__step">STEP {item.step}</span>
                <h3 className="process-card__title">{item.title}</h3>
                <p className="process-card__text">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* Page 8: Ready to put AI to work? (CTA Banner)            */}
        {/* ========================================================= */}
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
            Book a free 30-minute AI growth call. We&apos;ll examine your
            funnel, pinpoint what&apos;s slowing growth, and show you where
            intelligent automation can create the biggest lift.
          </p>

          <button className="talk-btn cta-banner__btn" onClick={handleBooking}>
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

        {/* ========================================================= */}
        {/* Direct Channels & Socials Connection Grid                 */}
        {/* ========================================================= */}
        <div className="contact-channels">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="contact-channels__title"
          >
            Or reach out directly across channels
          </motion.h3>

          <div className="contact-channels__grid">
            {socialChannels.map((chan, idx) => (
              <motion.a
                key={idx}
                href={chan.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06 }}
                className="contact-channel-card"
              >
                <div className="contact-channel-card__icon">{chan.icon}</div>
                <div className="contact-channel-card__info">
                  <span className="contact-channel-card__name">{chan.name}</span>
                  <strong className="contact-channel-card__handle">{chan.handle}</strong>
                  <span className="contact-channel-card__label">{chan.label}</span>
                </div>
                <span className="contact-channel-card__arrow">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
