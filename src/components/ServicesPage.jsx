import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import "../styles/ServicesPage.css";

export default function ServicesPage({ onOpenBooking }) {
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

  const verticals = [
    {
      id: "dental",
      title: "Dental & healthcare",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      ),
      description:
        "AI-led outreach engines, patient acquisition journeys, and paid-media optimization for dental practices and healthcare organizations. Helped grow a dental PPC agency to $2M in annual revenue.",
      tags: ["Patient Acquisition", "PPC Performance", "Automated CRM"]
    },
    {
      id: "ecommerce",
      title: "E-commerce",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      ),
      description:
        "Personalized product discovery, hands-off email journeys, inventory demand forecasting, and AI customer care. Delivered systems that manage thousands of SKUs and more than six figures in monthly sales.",
      tags: ["Lifecycle Email", "AI Merchandising", "Support Assistants"]
    },
    {
      id: "investment",
      title: "Investment & finance",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      ),
      description:
        "Portfolio intelligence dashboards, self-running reporting workflows, and investor engagement tools. Engineered data foundations for fund managers overseeing millions in assets under management.",
      tags: ["Data Infrastructure", "Reporting Automation", "Investor Relations CRM"]
    },
    {
      id: "local-services",
      title: "Local services",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
      description:
        "Automated prospecting and appointment flows for home-service operators, cleaning businesses, landscaping teams, and contractors. Created outbound engines that keep calendars booked with minimal manual effort.",
      tags: ["Maps Lead Research", "Automated Scheduling", "Reputation Workflows"]
    },
    {
      id: "digital-marketing",
      title: "Digital marketing agencies",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      ),
      description:
        "Complete agency growth infrastructure—from cold-email acquisition and automatic client onboarding to AI dashboards and statement-of-work creation. Supported agencies in doubling their client rosters in fewer than six months.",
      tags: ["Email Outreach", "Onboarding Flows", "AI Performance Reports"]
    },
    {
      id: "photography",
      title: "Photography agencies",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      ),
      description:
        "Hands-free shoot scheduling, branded delivery portals, and AI-assisted gallery selection. Built scalable outreach pipelines that win corporate assignments and wedding contracts.",
      tags: ["Shoot Scheduling", "Delivery Portals", "Contract Outreach"]
    },
    {
      id: "ai-media",
      title: "AI image generation & media",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      ),
      description:
        "Custom image-generation chatbots, trained models, and creative-production automations. These systems helped ArtPoliceJoe generate more than $30K in revenue while replacing manual image generation and asset organization.",
      tags: ["Image Generation Chatbots", "Model Training", "Creative Automation"]
    },
    {
      id: "ai-agencies",
      title: "AI & automation agencies",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="10" rx="2" />
          <circle cx="12" cy="5" r="2" />
          <path d="M12 7v4" />
          <line x1="8" y1="16" x2="8" y2="16" />
          <line x1="16" y1="16" x2="16" y2="16" />
        </svg>
      ),
      description:
        "White-label AI products, partner fulfillment infrastructure, and automation packages built for resale. We create the delivery backend that agencies launch and sell under their own identity.",
      tags: ["Private-Label AI", "Partner Fulfillment", "Resale-Ready Systems"]
    },
    {
      id: "ppc-agencies",
      title: "PPC agencies",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      ),
      description:
        "Automated bidding, AI-assisted ad-copy experiments, unified campaign reporting, and intelligent lead distribution. Built the operating systems behind a PPC agency that grew from zero to $2M in annual revenue.",
      tags: ["Smart Bid Operations", "AI Creative Testing", "Unified Ad Reporting"]
    },
    {
      id: "creative-agencies",
      title: "Creative agencies",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="13.5" cy="6.5" r=".5" />
          <circle cx="17.5" cy="10.5" r=".5" />
          <circle cx="8.5" cy="7.5" r=".5" />
          <circle cx="6.5" cy="12.5" r=".5" />
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.563-2.512 5.563-5.563C22 6.5 17.5 2 12 2z" />
        </svg>
      ),
      description:
        "AI-assisted ad production, automated copy development, and instant creative-brief generation. Built systems that deliver performance-tested campaign variations at ten times the pace of a manual creative team.",
      tags: ["AI Ad Production", "Automated Copywriting", "Brief Generation"]
    },
    {
      id: "social-media",
      title: "LinkedIn & social media agencies",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
      description:
        "Sequenced outreach, AI ghostwriting for executive LinkedIn profiles, and automated collection of social proof. Created engagement engines that take audiences from zero to tens of thousands of followers.",
      tags: ["Sequenced Outreach", "Executive AI Writing", "Audience Expansion"]
    },
    {
      id: "msp",
      title: "Managed service providers",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
          <line x1="6" y1="6" x2="6.01" y2="6" />
          <line x1="6" y1="18" x2="6.01" y2="18" />
        </svg>
      ),
      description:
        "AI ticket classification, customer health monitoring, automated SLA reports, and prospecting for new MSP accounts. Developed systems that accelerate issue resolution and identify churn risk before clients leave.",
      tags: ["Intelligent Ticket Triage", "Account Health Signals", "Automated SLA Reports"]
    },
    {
      id: "real-estate",
      title: "Real estate development",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
          <path d="M9 22v-4h6v4" />
          <path d="M8 6h.01" />
          <path d="M16 6h.01" />
          <path d="M8 10h.01" />
          <path d="M16 10h.01" />
          <path d="M8 14h.01" />
          <path d="M16 14h.01" />
        </svg>
      ),
      description:
        "Automated investor CRM workflows, opportunity-pipeline tracking, and AI market intelligence. Built lead-qualification systems for pre-construction inventory and property-development marketing campaigns.",
      tags: ["Investor CRM Workflows", "Opportunity Tracking", "AI Market Intelligence"]
    },
    {
      id: "brokers",
      title: "Brokers & financial services",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
      description:
        "Regulation-conscious prospecting, streamlined client onboarding, and AI document handling. Engineered workflows that automate KYC checks and reduce the time required to close financial products.",
      tags: ["Automated KYC", "Intelligent Documents", "Compliant Prospecting"]
    },
    {
      id: "saas",
      title: "Software & SaaS companies",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
      description:
        "Product-led growth automation, AI-guided onboarding, churn forecasting, and hands-free customer support. Built scalable activation and retention engines for software-as-a-service products.",
      tags: ["PLG Workflows", "Retention Forecasting", "AI-Guided Onboarding"]
    },
    {
      id: "enterprise",
      title: "Enterprise & corporate",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      ),
      description:
        "Enterprise-scale AI programs for high-volume partners. Delivered tailored integrations, AI strategy workshops, and infrastructure that handles millions of data points across complex organizational structures.",
      tags: ["Custom Enterprise Systems", "AI Strategy Programs", "Scaled Data Operations"]
    },
    {
      id: "hr",
      title: "HR & recruiting",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="8.5" cy="7" r="4" />
          <polyline points="17 11 19 13 23 9" />
        </svg>
      ),
      description:
        "AI-assisted resume evaluation, automated candidate outreach, interview-booking pipelines, and intelligent talent scoring. Built recruitment funnels that shorten time-to-hire by multiple weeks.",
      tags: ["AI Candidate Screening", "Automated Talent Outreach", "Recruitment Pipelines"]
    },
    {
      id: "coaching",
      title: "Coaching & consulting",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
      ),
      description:
        "Client-acquisition journeys, automated session booking, AI follow-up sequences, and community operations for coaches, professional consultants, and digital course creators.",
      tags: ["Acquisition Journeys", "Session Scheduling", "Community Operations"]
    }
  ];

  return (
    <div className="services-page">
      {/* ========================================================= */}
      {/* Services Hero Section                                     */}
      {/* ========================================================= */}
      <section className="services-page__hero">
        <div className="services-page__hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="services-page__headline"
          >
            AI systems shaped
            <br />
            around your industry.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="services-page__supporting"
          >
            From healthcare and SaaS to agencies, finance, and real estate, every
            solution is adapted to the workflows and growth challenges of its
            market—proven in real operations before deployment.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.28 }}
            className="services-page__stats"
          >
            <div className="services-stat">
              <strong>100+</strong>
              <span>workflows built</span>
            </div>
            <div className="services-stat">
              <strong>10+</strong>
              <span>industries served</span>
            </div>
            <div className="services-stat">
              <strong>100%</strong>
              <span>client satisfaction</span>
            </div>
            <div className="services-stat">
              <strong>2+ yrs</strong>
              <span>building AI systems</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* Tech / Partner Marquee                                    */}
      {/* ========================================================= */}
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

      {/* ========================================================= */}
      {/* Proven Across Verticals - 18 Cards Matching Image & PDF   */}
      {/* ========================================================= */}
      <section className="verticals-section" id="verticals">
        <div className="verticals__inner">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="verticals__heading"
          >
            Proven across verticals.
          </motion.h2>

          <div className="verticals__grid">
            {verticals.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index % 3) * 0.06, duration: 0.45 }}
                className="vertical-card"
              >
                <div>
                  {/* Top-left Icon Badge - Matches Reference Screenshot */}
                  <div className="vertical-card__icon-badge">{item.icon}</div>

                  <h3 className="vertical-card__title">{item.title}</h3>
                  <p className="vertical-card__copy">{item.description}</p>
                </div>

                {/* Bottom Rounded Pill Tags */}
                <div className="vertical-card__tags">
                  {item.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="vertical-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* CTA Banner: Ready to put AI to work?                      */}
      {/* ========================================================= */}
      <section className="services-cta-section">
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
