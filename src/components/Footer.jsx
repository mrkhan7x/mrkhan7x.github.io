import "../styles/Footer.css";

export default function Footer({ onOpenBooking }) {
  const currentYear = new Date().getFullYear();

  const handleTalkClick = () => {
    if (onOpenBooking) {
      onOpenBooking();
    } else {
      const contactSection = document.getElementById("contact");
      if (contactSection) contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Top Multi-column grid - Matches Image 4 */}
        <div className="footer-columns">
          {/* Column 1: Work with us */}
          <div className="footer-col footer-col--brand">
            <span className="footer-col__eyebrow">Work with us</span>
            <h4 className="footer-col__heading">
              Start with a free, thirty-minute AI growth call.
            </h4>
            <div className="footer-col__cta">
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
            </div>
          </div>

          {/* Column 2: SERVICES */}
          <div className="footer-col">
            <h5 className="footer-col__title">SERVICES</h5>
            <ul className="footer-col__list">
              <li><a href="/services/">AI Lead Generation</a></li>
              <li><a href="/services/">Custom AI Agents</a></li>
              <li><a href="/services/">Workflow Automation</a></li>
              <li><a href="/services/">CRM &amp; Sales Automation</a></li>
              <li><a href="/services/">All Services</a></li>
            </ul>
          </div>

          {/* Column 3: COMPANY */}
          <div className="footer-col">
            <h5 className="footer-col__title">COMPANY</h5>
            <ul className="footer-col__list">
              <li><a href="/about/">About</a></li>
              <li><a href="/about/">What is MRKHANSERVICES?</a></li>
              <li><a href="/#projects">Projects</a></li>
              <li><a href="/services/">Industries</a></li>
              <li>
                <a href="https://mrkhanservices.site" target="_blank" rel="noreferrer">
                  mrkhanservices.site
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: RESOURCES */}
          <div className="footer-col">
            <h5 className="footer-col__title">RESOURCES</h5>
            <ul className="footer-col__list">
              <li><a href="/services/">Technical Expertise</a></li>
              <li><a href="/about/">Results &amp; Impact</a></li>
              <li><a href="/#projects">Case Studies</a></li>
              <li><a href="/contact/">Contact</a></li>
            </ul>
          </div>

          {/* Column 5: CONNECT */}
          <div className="footer-col">
            <h5 className="footer-col__title">CONNECT</h5>
            <ul className="footer-col__list">
              <li>
                <a href="https://www.linkedin.com/in/muhammad-roman-khan-8245a0328" target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://github.com/mrkhan7x" target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/mrkhan7x" target="_blank" rel="noreferrer">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://wa.me/923285792098" target="_blank" rel="noreferrer">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="mailto:mrkhan.officialsite@gmail.com">
                  Direct Email
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleTalkClick}
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    font: "inherit",
                    color: "inherit",
                    cursor: "pointer",
                    textAlign: "left"
                  }}
                >
                  Book a Call
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar - Matches Image 4 */}
        <div className="footer-bottom">
          <div className="footer-bottom__brand">
            <span className="footer-bottom__monogram">MRK</span>
          </div>
          <div className="footer-bottom__legal">
            <a href="#home">Privacy Policy</a>
            <a href="#home">Terms of Service</a>
          </div>
          <span className="footer-bottom__copyright">
            © {currentYear} MRKHANSERVICES Media LLC. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}