import { motion } from "framer-motion";
import { useEffect } from "react";
import "../styles/ContactPage.css";

export default function ContactPage({ onOpenBooking }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleTalkClick = () => {
    if (onOpenBooking) {
      onOpenBooking();
    }
  };

  const directChannels = [
    {
      name: "LinkedIn",
      handle: "Muhammad Roman Khan",
      label: "Professional Profile & Outreach",
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
      label: "Open Source Code & Repos",
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
      label: "Direct Messages & Updates",
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
      label: "Instant Inquiries & Voice",
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

  return (
    <div className="contact-page">
      {/* ========================================================= */}
      {/* Contact Hero — Strictly matching AsimServices /contact/   */}
      {/* ========================================================= */}
      <section className="contact-hero">
        <div className="contact-hero__inner">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="contact-hero__heading"
          >
            <p className="contact-hero__eyebrow">Contact</p>
            <h1 className="contact-hero__title">Let&apos;s talk.</h1>
            <p className="contact-hero__subtitle">
              Book a free 30-minute AI growth call, or reach out directly.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="contact-details-box"
          >
            <p className="contact-details__intro">
              The fastest way to begin is with a focused growth call. We&apos;ll
              look at your current funnel and operations, identify the
              bottlenecks, and show you where AI or automation can create the
              clearest business impact. No hard pitch—just practical next steps.
            </p>

            <dl className="contact-details__list">
              <div className="contact-details__row">
                <dt>Book a call</dt>
                <dd>
                  <button
                    type="button"
                    onClick={handleTalkClick}
                    className="contact-details__booking-link"
                  >
                    Reserve a 30-minute growth call (→)
                  </button>
                </dd>
              </div>
              <div className="contact-details__row">
                <dt>Email</dt>
                <dd>
                  <a href="mailto:mrkhan.officialsite@gmail.com">
                    mrkhan.officialsite@gmail.com
                  </a>
                </dd>
              </div>
              <div className="contact-details__row">
                <dt>Website</dt>
                <dd>
                  <a href="https://portfolio.mrkhan.qzz.io">
                    portfolio.mrkhan.qzz.io
                  </a>
                </dd>
              </div>
              <div className="contact-details__row">
                <dt>Serving</dt>
                <dd>Businesses worldwide</dd>
              </div>
            </dl>
          </motion.div>

          {/* Direct channels cards */}
          <div className="contact-page__channels">
            <h3 className="contact-page__channels-title">
              Direct Channels &amp; Connections
            </h3>
            <div className="contact-page__channels-grid">
              {directChannels.map((chan, idx) => (
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
                    <span className="contact-channel-card__name">
                      {chan.name}
                    </span>
                    <strong className="contact-channel-card__handle">
                      {chan.handle}
                    </strong>
                    <span className="contact-channel-card__label">
                      {chan.label}
                    </span>
                  </div>
                  <span className="contact-channel-card__arrow">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* Ready to put AI to work? CTA Banner                       */}
      {/* ========================================================= */}
      <section className="contact-cta-section">
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

          <button className="talk-btn cta-banner__btn" onClick={handleTalkClick}>
            <span className="talk-btn__label">
              <span className="talk-btn__label-current">
                Book a free strategy call
              </span>
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
