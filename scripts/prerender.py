import os
import re

BUILD_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "build"))
INDEX_HTML = os.path.join(BUILD_DIR, "index.html")

if not os.path.exists(INDEX_HTML):
    print(f"Error: {INDEX_HTML} not found. Run 'npm run build' first.")
    exit(1)

with open(INDEX_HTML, "r", encoding="utf-8") as f:
    template = f.read()

# Common Navbar HTML
NAVBAR_HTML = """
<header class="header-floating-wrapper">
  <nav class="header-nav-container">
    <div class="nav-brand">
      <span class="brand-icon-badge">MRK</span>
      <span class="brand-name-text">MRKHANSERVICES</span>
    </div>
    <div class="nav-links-center">
      <a href="/services/" class="nav-link-btn">Services</a>
      <a href="/about/" class="nav-link-btn">About</a>
      <a href="/#projects" class="nav-link-btn">Work</a>
      <a href="/contact/" class="nav-link-btn">Contact</a>
    </div>
    <div class="nav-cta-wrapper">
      <a href="/contact/" class="talk-btn">
        <span class="talk-btn__label"><span class="talk-btn__label-current">Let's talk</span></span>
        <span class="talk-btn__arrow">→</span>
      </a>
    </div>
  </nav>
</header>
"""

# Common Footer HTML
FOOTER_HTML = """
<footer class="site-footer">
  <div class="footer-inner">
    <div class="footer-grid">
      <div class="footer-col footer-col--brand">
        <p class="footer-eyebrow">Work with us</p>
        <h4 class="footer-brand__cta">Start with a free, thirty-minute AI growth call.</h4>
        <a href="/contact/" class="talk-btn footer-talk-btn">
          <span class="talk-btn__label"><span class="talk-btn__label-current">Let's talk</span></span>
          <span class="talk-btn__arrow">→</span>
        </a>
      </div>
      <div class="footer-col">
        <h5 class="footer-col__title">SERVICES</h5>
        <ul class="footer-col__list">
          <li><a href="/services/">AI Lead Generation</a></li>
          <li><a href="/services/">Custom AI Agents</a></li>
          <li><a href="/services/">Workflow Automation</a></li>
          <li><a href="/services/">CRM &amp; Sales Automation</a></li>
          <li><a href="/services/">All Services</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5 class="footer-col__title">COMPANY</h5>
        <ul class="footer-col__list">
          <li><a href="/about/">About</a></li>
          <li><a href="/about/">What is MRKHANSERVICES?</a></li>
          <li><a href="/#projects">Projects</a></li>
          <li><a href="/services/">Industries</a></li>
          <li><a href="https://mrkhanservices.site">mrkhanservices.site</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5 class="footer-col__title">RESOURCES</h5>
        <ul class="footer-col__list">
          <li><a href="/services/">Technical Expertise</a></li>
          <li><a href="/about/">Results &amp; Impact</a></li>
          <li><a href="/#projects">Case Studies</a></li>
          <li><a href="/contact/">Contact</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5 class="footer-col__title">CONNECT</h5>
        <ul class="footer-col__list">
          <li><a href="https://www.linkedin.com/in/muhammad-roman-khan-8245a0328" target="_blank" rel="noreferrer">LinkedIn</a></li>
          <li><a href="https://github.com/mrkhan7x" target="_blank" rel="noreferrer">GitHub</a></li>
          <li><a href="https://www.instagram.com/mrkhan7x" target="_blank" rel="noreferrer">Instagram</a></li>
          <li><a href="https://wa.me/923285792098" target="_blank" rel="noreferrer">WhatsApp</a></li>
          <li><a href="mailto:info@mrkhanservices.site">Direct Email</a></li>
          <li><a href="/contact/">Book a Call</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-bottom__brand"><span class="footer-bottom__monogram">MRK</span></div>
      <div class="footer-bottom__legal"><a href="/">Privacy Policy</a><a href="/">Terms of Service</a></div>
      <span class="footer-bottom__copyright">© 2026 MRKHANSERVICES Media LLC. All rights reserved.</span>
    </div>
  </div>
</footer>
"""

# -------------------------------------------------------------
# 1. SERVICES PAGE HTML (All 18 Verticals with full descriptions)
# -------------------------------------------------------------
SERVICES_CONTENT = f"""
<div class="app">
  <div class="app-background"></div>
  <div class="grid-pattern-global"></div>
  {NAVBAR_HTML}
  <main class="services-page">
    <section class="services-hero">
      <div class="services-hero__inner">
        <h1 class="services-hero__title">AI systems shaped around your industry.</h1>
        <p class="services-hero__supporting">
          M R KHAN builds custom AI agents, automated funnels, and autonomous systems tailored to the exact workflows of your vertical.
        </p>
        <div>
          <a href="/contact/" class="talk-btn">
            <span class="talk-btn__label"><span class="talk-btn__label-current">Let's talk</span></span>
            <span class="talk-btn__arrow">→</span>
          </a>
        </div>
      </div>
    </section>

    <div class="company-marquee">
      <p class="company-marquee__label">MRKHANSERVICES WORKS WITH</p>
      <div class="company-marquee__track">
        <div class="company-marquee__group">
          <span>n8n Workflows</span><span>OpenAI Agents</span><span>Voiceflow</span><span>Make.com</span>
          <span>Supabase</span><span>HubSpot CRM</span><span>Airtable</span><span>Slack API</span>
          <span>WhatsApp API</span><span>Python Automation</span>
        </div>
      </div>
    </div>

    <section class="services-verticals">
      <div class="services-verticals__inner">
        <h2 class="services-verticals__title">Proven across verticals.</h2>
        <div class="services-verticals__grid">
          
          <article class="vertical-card" id="service-dental">
            <h3 class="vertical-card__title">Dental & healthcare</h3>
            <p class="vertical-card__desc">
              AI-led outreach engines, patient acquisition journeys, and paid-media optimization for dental practices and healthcare organizations. Helped grow a dental PPC agency to $2M in annual revenue.
            </p>
            <div class="vertical-card__tags">
              <span class="vertical-tag">Patient Acquisition</span>
              <span class="vertical-tag">PPC Performance</span>
              <span class="vertical-tag">Automated CRM</span>
            </div>
          </article>

          <article class="vertical-card" id="service-ecommerce">
            <h3 class="vertical-card__title">E-commerce</h3>
            <p class="vertical-card__desc">
              Personalized product discovery, hands-off email journeys, inventory demand forecasting, and AI customer care. Delivered systems that manage thousands of SKUs and more than six figures in monthly sales.
            </p>
            <div class="vertical-card__tags">
              <span class="vertical-tag">Lifecycle Email</span>
              <span class="vertical-tag">AI Merchandising</span>
              <span class="vertical-tag">Support Assistants</span>
            </div>
          </article>

          <article class="vertical-card" id="service-investment">
            <h3 class="vertical-card__title">Investment & finance</h3>
            <p class="vertical-card__desc">
              Portfolio intelligence dashboards, self-running reporting workflows, and investor engagement tools. Engineered data foundations for fund managers overseeing millions in assets under management.
            </p>
            <div class="vertical-card__tags">
              <span class="vertical-tag">Data Infrastructure</span>
              <span class="vertical-tag">Reporting Automation</span>
              <span class="vertical-tag">Investor Relations CRM</span>
            </div>
          </article>

          <article class="vertical-card" id="service-local">
            <h3 class="vertical-card__title">Local services</h3>
            <p class="vertical-card__desc">
              Automated prospecting and appointment flows for home-service operators, cleaning businesses, landscaping teams, and contractors. Created outbound engines that keep calendars booked with minimal manual effort.
            </p>
            <div class="vertical-card__tags">
              <span class="vertical-tag">Maps Lead Research</span>
              <span class="vertical-tag">Automated Scheduling</span>
              <span class="vertical-tag">Reputation Workflows</span>
            </div>
          </article>

          <article class="vertical-card" id="service-digital-marketing">
            <h3 class="vertical-card__title">Digital marketing agencies</h3>
            <p class="vertical-card__desc">
              Proposal generators, client onboarding automations, and white-label reporting pipelines. Give agency teams twenty-plus hours back each week per account manager.
            </p>
            <div class="vertical-card__tags">
              <span class="vertical-tag">Multi-Channel Dashboards</span>
              <span class="vertical-tag">Onboarding Automation</span>
              <span class="vertical-tag">Deliverable Triage</span>
            </div>
          </article>

          <article class="vertical-card" id="service-photography">
            <h3 class="vertical-card__title">Photography & visual studios</h3>
            <p class="vertical-card__desc">
              Automated intake, portfolio matching, proofing reminders, and client follow-ups. Cut out the admin headaches so busy commercial studios can focus on creative direction.
            </p>
            <div class="vertical-card__tags">
              <span class="vertical-tag">Automated Intake</span>
              <span class="vertical-tag">Gallery Follow-Ups</span>
              <span class="vertical-tag">Invoicing Workflows</span>
            </div>
          </article>

          <article class="vertical-card" id="service-ai-media">
            <h3 class="vertical-card__title">AI media & creative studios</h3>
            <p class="vertical-card__desc">
              Script-to-storyboard pipelines, dynamic subtitle automation, asset generation, and rendering queues. Power high-output production engines with minimal manual friction.
            </p>
            <div class="vertical-card__tags">
              <span class="vertical-tag">Script Automation</span>
              <span class="vertical-tag">Asset Generation</span>
              <span class="vertical-tag">Media Pipelines</span>
            </div>
          </article>

          <article class="vertical-card" id="service-ai-agencies">
            <h3 class="vertical-card__title">AI agencies & technical consultancies</h3>
            <p class="vertical-card__desc">
              Multi-agent orchestration, custom tool-use architectures, vector database retrieval, and evaluation benches. Built for agencies operating on the frontier of AI capabilities.
            </p>
            <div class="vertical-card__tags">
              <span class="vertical-tag">Multi-Agent Systems</span>
              <span class="vertical-tag">RAG Pipelines</span>
              <span class="vertical-tag">Tool Integrations</span>
            </div>
          </article>

          <article class="vertical-card" id="service-ppc">
            <h3 class="vertical-card__title">Pay-per-click (PPC) specialists</h3>
            <p class="vertical-card__desc">
              Creative testing pipelines, automated ad performance alerts, and dynamic negative-keyword monitors across Meta and Google Ads. Keep campaigns dialed in around the clock.
            </p>
            <div class="vertical-card__tags">
              <span class="vertical-tag">Creative Audit Bots</span>
              <span class="vertical-tag">Spend Alerts</span>
              <span class="vertical-tag">Performance Analytics</span>
            </div>
          </article>

          <article class="vertical-card" id="service-creative">
            <h3 class="vertical-card__title">Creative & design studios</h3>
            <p class="vertical-card__desc">
              Client brief analyzers, revision tracking, project status notifications, and feedback consolidation. Keep projects running smoothly from proposal to final handoff.
            </p>
            <div class="vertical-card__tags">
              <span class="vertical-tag">Creative Brief Parsing</span>
              <span class="vertical-tag">Revision Workflows</span>
              <span class="vertical-tag">Feedback Tracking</span>
            </div>
          </article>

          <article class="vertical-card" id="service-social-media">
            <h3 class="vertical-card__title">Social media agencies</h3>
            <p class="vertical-card__desc">
              Multi-platform scheduling, trend-monitoring listeners, engagement auto-responses, and monthly analytics reporting. Handle larger client rosters without burning out account leads.
            </p>
            <div class="vertical-card__tags">
              <span class="vertical-tag">Content Scheduling</span>
              <span class="vertical-tag">Engagement Triage</span>
              <span class="vertical-tag">Performance Reports</span>
            </div>
          </article>

          <article class="vertical-card" id="service-msps">
            <h3 class="vertical-card__title">Managed service providers (MSPs)</h3>
            <p class="vertical-card__desc">
              Ticket triage classification, SLA breach warnings, client onboarding checklists, and automated status communication. Improve response metrics and keep customers confident.
            </p>
            <div class="vertical-card__tags">
              <span class="vertical-tag">Ticket Classification</span>
              <span class="vertical-tag">SLA Monitoring</span>
              <span class="vertical-tag">Client Intake</span>
            </div>
          </article>

          <article class="vertical-card" id="service-real-estate">
            <h3 class="vertical-card__title">Commercial & residential real estate</h3>
            <p class="vertical-card__desc">
              Property inquiry routing, listing alert distribution, tenant screening intake, and automated contract workflows. Accelerate deal velocity across competitive markets.
            </p>
            <div class="vertical-card__tags">
              <span class="vertical-tag">Inbound Lead Triage</span>
              <span class="vertical-tag">Showing Coordination</span>
              <span class="vertical-tag">Document Pipelines</span>
            </div>
          </article>

          <article class="vertical-card" id="service-brokers">
            <h3 class="vertical-card__title">Brokers & advisory firms</h3>
            <p class="vertical-card__desc">
              NDA distribution, buyer qualification funnels, deal-room notification triggers, and investor matchmaking. Protect confidentiality while keeping deal momentum high.
            </p>
            <div class="vertical-card__tags">
              <span class="vertical-tag">Buyer Qualification</span>
              <span class="vertical-tag">Deal-Room Alerts</span>
              <span class="vertical-tag">Due Diligence Automation</span>
            </div>
          </article>

          <article class="vertical-card" id="service-saas">
            <h3 class="vertical-card__title">B2B software & SaaS</h3>
            <p class="vertical-card__desc">
              Free-to-paid product-led growth triggers, churn risk signals, in-app event triage, and sales notifications. Connect product usage data directly into revenue operations.
            </p>
            <div class="vertical-card__tags">
              <span class="vertical-tag">PLG Automation</span>
              <span class="vertical-tag">Churn Warning Bots</span>
              <span class="vertical-tag">Sales Handoffs</span>
            </div>
          </article>

          <article class="vertical-card" id="service-enterprise">
            <h3 class="vertical-card__title">Enterprise & corporate teams</h3>
            <p class="vertical-card__desc">
              Departmental request routing, cross-tool synchronization, internal knowledge retrieval, and compliance documentation. Built for security, scale, and clean auditing.
            </p>
            <div class="vertical-card__tags">
              <span class="vertical-tag">Cross-Platform Sync</span>
              <span class="vertical-tag">Knowledge Assistants</span>
              <span class="vertical-tag">Approval Workflows</span>
            </div>
          </article>

          <article class="vertical-card" id="service-hr">
            <h3 class="vertical-card__title">Recruiting & human resources</h3>
            <p class="vertical-card__desc">
              Candidate screening scorecards, interview scheduling automation, candidate status updates, and reference gathering. Deliver a top-tier candidate experience while halving time-to-hire.
            </p>
            <div class="vertical-card__tags">
              <span class="vertical-tag">Candidate Screening</span>
              <span class="vertical-tag">Interview Automation</span>
              <span class="vertical-tag">Onboarding Checklists</span>
            </div>
          </article>

          <article class="vertical-card" id="service-coaching">
            <h3 class="vertical-card__title">Executive coaching & consulting</h3>
            <p class="vertical-card__desc">
              Intake diagnostics, session preparation workflows, accountability check-ins, and resource delivery. Keep clients engaged between sessions with zero administrative friction.
            </p>
            <div class="vertical-card__tags">
              <span class="vertical-tag">Diagnostic Scoring</span>
              <span class="vertical-tag">Session Scheduling</span>
              <span class="vertical-tag">Accountability Workflows</span>
            </div>
          </article>

        </div>
      </div>
    </section>

    <section class="cta-banner">
      <h2 class="cta-banner__title">Ready to put AI to work?</h2>
      <p class="cta-banner__text">
        Book a free 30-minute AI growth call. We'll examine your funnel, pinpoint what's slowing growth, and show you where intelligent automation can create the biggest lift.
      </p>
      <a href="/contact/" class="talk-btn cta-banner__btn">
        <span class="talk-btn__label"><span class="talk-btn__label-current">Book a free strategy call</span></span>
        <span class="talk-btn__arrow">→</span>
      </a>
    </section>
  </main>
  {FOOTER_HTML}
</div>
"""

# -------------------------------------------------------------
# 2. ABOUT PAGE HTML
# -------------------------------------------------------------
ABOUT_CONTENT = f"""
<div class="app">
  <div class="app-background"></div>
  <div class="grid-pattern-global"></div>
  {NAVBAR_HTML}
  <main class="about-page">
    <section class="about-page__hero">
      <h1 class="about-page__headline">The engineer behind your AI systems.</h1>
      <p class="about-page__supporting">
        Muhammad Roman Khan (M R KHAN) combines formal Artificial Intelligence (BS AI) education with real-world system architecture. Designing production AI agents, custom machine learning workflows, and data pipelines built for business growth.
      </p>
      <div>
        <a href="/contact/" class="talk-btn">
          <span class="talk-btn__label"><span class="talk-btn__label-current">Let's talk</span></span>
          <span class="talk-btn__arrow">→</span>
        </a>
      </div>
    </section>

    <div class="company-marquee">
      <p class="company-marquee__label">CORE STACK &amp; SPECIALTIES</p>
      <div class="company-marquee__track">
        <div class="company-marquee__group">
          <span>BS Artificial Intelligence</span><span>PyTorch &amp; Deep Learning</span>
          <span>Machine Learning (scikit-learn)</span><span>Python &amp; Data Engineering</span>
          <span>n8n Workflows</span><span>OpenAI API &amp; LLM Orchestration</span>
          <span>Supabase &amp; PostgreSQL</span><span>HubSpot &amp; CRM Sync</span>
        </div>
      </div>
    </div>

    <section class="about-story" id="about-story">
      <div class="about-story__inner">
        <h2 class="about-story__title">Engineering depth meets practical automation.</h2>
        <div class="about-story__layout">
          <div class="about-story__copy">
            <p>
              Muhammad Roman Khan is a software builder and <strong>BS Artificial Intelligence</strong> student with a singular focus: engineering practical, resilient AI systems that replace manual chaos with reliable autonomous workflows.
            </p>
            <p>
              Unlike surface-level tool integrators, his work is backed by a disciplined foundation in <strong>Machine Learning and Deep Learning</strong>. From training predictive models and decision tree ensembles to writing custom <strong>PyTorch</strong> neural network architectures, he understands how algorithms operate under the hood—ensuring models are chosen for accuracy, speed, and real operational fit.
            </p>
            <p>
              His engineering extends deeply into <strong>Data Analytics &amp; Data Engineering</strong>: building clean ingestion pipelines, structuring SQL databases, and automating statistical triage so that AI agents receive reliable, validated data rather than noisy assumptions.
            </p>
            <p>
              On the production side, his commercial automations—including custom AI generation pipelines for ArtPoliceJoe—have produced over $30K in revenue. Through MRKHANSERVICES, he builds complete lead intake engines, autonomous chatbots, and CRM sync systems that give growing businesses 20+ hours back every week.
            </p>
          </div>
          <figure class="about-story__media">
            <div class="about-story__media-frame">
              <img src="/static/media/mrk-profile.47ee575b4e152e4f2cb7.jpg" alt="Muhammad Roman Khan - M R KHAN Profile" />
            </div>
          </figure>
        </div>
      </div>
    </section>

    <section class="about-pillars">
      <div class="about-pillars__inner">
        <h2 class="about-pillars__title">Engineering, machine learning, &amp; performance.</h2>
        <div class="about-pillars__grid">
          <article class="about-pillar">
            <h3 class="about-pillar__title">BS Artificial Intelligence Foundation</h3>
            <p class="about-pillar__copy">Pursuing a degree in Artificial Intelligence (BS AI)—grounding every workflow in mathematical rigor, statistical modeling, and machine learning principles from the ground up.</p>
          </article>
          <article class="about-pillar">
            <h3 class="about-pillar__title">Deep Learning &amp; PyTorch Architectures</h3>
            <p class="about-pillar__copy">Hands-on experience building, training, and fine-tuning neural networks, supervised learning ensembles (XGBoost, Random Forests), and PyTorch models for targeted intelligence tasks.</p>
          </article>
          <article class="about-pillar">
            <h3 class="about-pillar__title">Data Engineering &amp; Analytics Pipelines</h3>
            <p class="about-pillar__copy">Designing robust data extraction pipelines, custom Python ETL flows, and normalized SQL/Supabase databases that supply clean, structured inputs to production AI agents.</p>
          </article>
          <article class="about-pillar">
            <h3 class="about-pillar__title">Production B2B Systems We Stand Behind</h3>
            <p class="about-pillar__copy">Translating advanced AI models and APIs into self-running business infrastructure that triages leads, connects CRMs, and returns 20+ hours each week to operating teams.</p>
          </article>
        </div>
      </div>
    </section>

    <section class="cta-banner">
      <h2 class="cta-banner__title">Ready to put AI to work?</h2>
      <p class="cta-banner__text">
        Book a free 30-minute AI growth call. We'll examine your funnel, pinpoint what's slowing growth, and show you where intelligent automation can create the biggest lift.
      </p>
      <a href="/contact/" class="talk-btn cta-banner__btn">
        <span class="talk-btn__label"><span class="talk-btn__label-current">Book a free strategy call</span></span>
        <span class="talk-btn__arrow">→</span>
      </a>
    </section>
  </main>
  {FOOTER_HTML}
</div>
"""

# -------------------------------------------------------------
# 3. CONTACT PAGE HTML
# -------------------------------------------------------------
CONTACT_CONTENT = f"""
<div class="app">
  <div class="app-background"></div>
  <div class="grid-pattern-global"></div>
  {NAVBAR_HTML}
  <main class="contact-page">
    <section class="contact-hero">
      <div class="contact-hero__inner">
        <div class="contact-hero__heading">
          <p class="contact-hero__eyebrow">Contact</p>
          <h1 class="contact-hero__title">Let's talk.</h1>
          <p class="contact-hero__subtitle">Book a free 30-minute AI growth call, or reach out directly.</p>
        </div>

        <div class="contact-details-box">
          <p class="contact-details__intro">
            The fastest way to begin is with a focused growth call. We'll look at your current funnel and operations, identify the bottlenecks, and show you where AI or automation can create the clearest business impact. No hard pitch—just practical next steps.
          </p>
          <dl class="contact-details__list">
            <div class="contact-details__row">
              <dt>Book a call</dt>
              <dd><a href="/contact/" class="contact-details__booking-link">Reserve a 30-minute growth call (→)</a></dd>
            </div>
            <div class="contact-details__row">
              <dt>Email</dt>
              <dd><a href="mailto:info@mrkhanservices.site">info@mrkhanservices.site</a></dd>
            </div>
            <div class="contact-details__row">
              <dt>Website</dt>
              <dd><a href="https://mrkhanservices.site">mrkhanservices.site</a></dd>
            </div>
            <div class="contact-details__row">
              <dt>Serving</dt>
              <dd>Businesses worldwide</dd>
            </div>
          </dl>
        </div>

        <div class="contact-page__channels">
          <h3 class="contact-page__channels-title">Direct Channels &amp; Connections</h3>
          <div class="contact-page__channels-grid">
            <a href="https://www.linkedin.com/in/muhammad-roman-khan-8245a0328" target="_blank" rel="noopener noreferrer" class="contact-channel-card">
              <div class="contact-channel-card__info">
                <span class="contact-channel-card__name">LinkedIn</span>
                <strong class="contact-channel-card__handle">Muhammad Roman Khan</strong>
                <span class="contact-channel-card__label">Professional Profile &amp; Outreach</span>
              </div>
            </a>
            <a href="https://github.com/mrkhan7x" target="_blank" rel="noopener noreferrer" class="contact-channel-card">
              <div class="contact-channel-card__info">
                <span class="contact-channel-card__name">GitHub</span>
                <strong class="contact-channel-card__handle">@mrkhan7x</strong>
                <span class="contact-channel-card__label">Open Source Code &amp; Repos</span>
              </div>
            </a>
            <a href="https://www.instagram.com/mrkhan7x" target="_blank" rel="noopener noreferrer" class="contact-channel-card">
              <div class="contact-channel-card__info">
                <span class="contact-channel-card__name">Instagram</span>
                <strong class="contact-channel-card__handle">@mrkhan7x</strong>
                <span class="contact-channel-card__label">Direct Messages &amp; Updates</span>
              </div>
            </a>
            <a href="https://wa.me/923285792098" target="_blank" rel="noopener noreferrer" class="contact-channel-card">
              <div class="contact-channel-card__info">
                <span class="contact-channel-card__name">WhatsApp</span>
                <strong class="contact-channel-card__handle">+92 328 5792098</strong>
                <span class="contact-channel-card__label">Instant Inquiries &amp; Voice</span>
              </div>
            </a>
            <a href="mailto:info@mrkhanservices.site" class="contact-channel-card">
              <div class="contact-channel-card__info">
                <span class="contact-channel-card__name">Direct Email</span>
                <strong class="contact-channel-card__handle">info@mrkhanservices.site</strong>
                <span class="contact-channel-card__label">Detailed Scopes &amp; Inquiries</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-banner">
      <h2 class="cta-banner__title">Ready to put AI to work?</h2>
      <p class="cta-banner__text">
        Book a free 30-minute AI growth call. We'll examine your funnel, pinpoint what's slowing growth, and show you where intelligent automation can create the biggest lift.
      </p>
      <a href="/contact/" class="talk-btn cta-banner__btn">
        <span class="talk-btn__label"><span class="talk-btn__label-current">Book a free strategy call</span></span>
        <span class="talk-btn__arrow">→</span>
      </a>
    </section>
  </main>
  {FOOTER_HTML}
</div>
"""

# -------------------------------------------------------------
# 4. HOME PAGE HTML
# -------------------------------------------------------------
HOME_CONTENT = f"""
<div class="app">
  <div class="app-background"></div>
  <div class="grid-pattern-global"></div>
  {NAVBAR_HTML}
  <main>
    <section class="hero hero--home" id="home">
      <div class="hero-content">
        <h1 class="hero-headline">Autonomous AI Systems Built For Real Business Outcomes.</h1>
        <p class="hero-subhead">
          We design and deploy custom AI agents, automated funnels, and enterprise workflow pipelines that eliminate manual bottlenecks and save businesses 20+ hours every week.
        </p>
        <div class="hero-cta-group">
          <a href="/contact/" class="talk-btn hero-primary-btn">
            <span class="talk-btn__label"><span class="talk-btn__label-current">Book a free strategy call</span></span>
            <span class="talk-btn__arrow">→</span>
          </a>
          <a href="/services/" class="explore-services-btn">Explore Industry Solutions →</a>
        </div>
      </div>
    </section>

    <div class="company-marquee">
      <p class="company-marquee__label">MRKHANSERVICES WORKS WITH</p>
      <div class="company-marquee__track">
        <div class="company-marquee__group">
          <span>n8n Workflows</span><span>OpenAI Agents</span><span>Voiceflow</span><span>Make.com</span>
          <span>Supabase</span><span>HubSpot CRM</span><span>Airtable</span><span>Slack API</span>
          <span>WhatsApp API</span><span>Python Automation</span>
        </div>
      </div>
    </div>

    <section class="projects-section" id="projects">
      <div class="projects-container">
        <div class="projects-header">
          <h2 class="projects-title">Some of our work.</h2>
        </div>
        <div class="projects-grid">
          <article class="project-card">
            <h3 class="project-card__title">Lead Qualification &amp; Onboarding Engine</h3>
            <p class="project-card__desc">Multi-step autonomous intake system that enriches lead data, assesses qualification criteria, and schedules calls automatically into HubSpot.</p>
          </article>
          <article class="project-card">
            <h3 class="project-card__title">Autonomous Multi-Channel Outreach Machine</h3>
            <p class="project-card__desc">Intelligent pipeline scraping targeted business problems, drafting personalized value propositions, and synchronizing across LinkedIn and Email.</p>
          </article>
          <article class="project-card">
            <h3 class="project-card__title">High-Volume Generative Media Pipeline</h3>
            <p class="project-card__desc">Custom computer vision and asset generation workflows for ArtPoliceJoe, driving over $30K in commercial revenue.</p>
          </article>
        </div>
      </div>
    </section>

    <section class="we-build-section" id="about-preview">
      <div class="we-build__inner">
        <h2 class="we-build__heading">We don't just advise. We build.</h2>
        <div class="we-build__grid">
          <div class="we-build__card">
            <h3 class="we-build__card-title">Built for real business outcomes</h3>
            <p class="we-build__card-text">We create AI agents, chatbots, and automations designed to save time, capture demand, and move your business forward.</p>
          </div>
          <div class="we-build__card">
            <h3 class="we-build__card-title">Fixed scope or hourly support</h3>
            <p class="we-build__card-text">Choose a clearly scoped, fixed-price project or flexible hourly support for ongoing improvements, strategy, and technical help.</p>
          </div>
          <div class="we-build__card">
            <h3 class="we-build__card-title">Proven in the field</h3>
            <p class="we-build__card-text">Our work is shaped by real client needs across industries, with systems built to perform reliably beyond the demo.</p>
          </div>
          <div class="we-build__card">
            <h3 class="we-build__card-title">Systems we stand behind</h3>
            <p class="we-build__card-text">We build practical tools you can own, understand, and improve—so your team can keep getting value long after launch.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="contact" id="contact">
      <div class="contact-container">
        <div class="process-section">
          <div class="process-header"><h2 class="process-heading">From first call to launch.</h2></div>
          <div class="process-grid">
            <div class="process-card">
              <span class="process-card__step">STEP 01</span>
              <h3 class="process-card__title">Discovery and audit</h3>
              <p class="process-card__text">We start with a focused conversation to understand your goals, current systems, bottlenecks, and where AI can create the highest value.</p>
            </div>
            <div class="process-card">
              <span class="process-card__step">STEP 02</span>
              <h3 class="process-card__title">Scope and proposal</h3>
              <p class="process-card__text">You receive a clear plan, timeline, and scope tailored to your needs. Choose a fixed-price project or flexible hourly support.</p>
            </div>
            <div class="process-card">
              <span class="process-card__step">STEP 03</span>
              <h3 class="process-card__title">Build and launch</h3>
              <p class="process-card__text">We design, build, test, and deploy your custom solution with regular progress updates—making sure your solution operates cleanly.</p>
            </div>
            <div class="process-card">
              <span class="process-card__step">STEP 04</span>
              <h3 class="process-card__title">Ongoing support</h3>
              <p class="process-card__text">After launch, we stay close by, monitoring performance, updating workflows, and expanding your system through flexible support.</p>
            </div>
          </div>
        </div>

        <div class="cta-banner">
          <h2 class="cta-banner__title">Ready to put AI to work?</h2>
          <p class="cta-banner__text">
            Book a free 30-minute AI growth call. We'll examine your funnel, pinpoint what's slowing growth, and show you where intelligent automation can create the biggest lift.
          </p>
          <a href="/contact/" class="talk-btn cta-banner__btn">
            <span class="talk-btn__label"><span class="talk-btn__label-current">Book a free strategy call</span></span>
            <span class="talk-btn__arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  </main>
  {FOOTER_HTML}
</div>
"""

pages = [
    {
        "path": "",
        "title": "MRKHANSERVICES — AI Automation & Growth Systems",
        "description": "MRKHANSERVICES — AI Automation & Growth Systems. Autonomous AI agents, custom workflow engineering, and B2B systems that scale operations and save 20+ hours per week.",
        "canonical": "https://mrkhanservices.site/",
        "content": HOME_CONTENT
    },
    {
        "path": "services",
        "title": "AI Automation Services — MRKHANSERVICES",
        "description": "Custom AI agents, chatbots, lead-generation systems, and workflow automation built across 18 business verticals.",
        "canonical": "https://mrkhanservices.site/services/",
        "content": SERVICES_CONTENT
    },
    {
        "path": "about",
        "title": "About Us — MRKHANSERVICES",
        "description": "Learn about Muhammad Roman Khan (M R KHAN), BS in Artificial Intelligence, PyTorch & Deep Learning architectures, and commercial automation track record.",
        "canonical": "https://mrkhanservices.site/about/",
        "content": ABOUT_CONTENT
    },
    {
        "path": "contact",
        "title": "Contact & Strategy Call — MRKHANSERVICES",
        "description": "Book a free 30-minute AI growth call or contact Muhammad Roman Khan directly via LinkedIn, GitHub, Instagram, WhatsApp, or Email.",
        "canonical": "https://mrkhanservices.site/contact/",
        "content": CONTACT_CONTENT
    }
]

for p in pages:
    page_html = template
    # Replace title
    page_html = re.sub(r"<title>.*?</title>", f"<title>{p['title']}</title>", page_html)
    # Replace meta description
    page_html = re.sub(r'<meta name="description" content=".*?"/?>', f'<meta name="description" content="{p["description"]}"/>', page_html)
    # Insert canonical
    canonical_tag = f'<link rel="canonical" href="{p["canonical"]}"/>'
    page_html = page_html.replace("</head>", f"{canonical_tag}</head>")
    # Inject content inside <div id="root"></div>
    page_html = page_html.replace('<div id="root"></div>', f'<div id="root">{p["content"]}</div>')

    if p["path"] == "":
        out_file = os.path.join(BUILD_DIR, "index.html")
    else:
        out_dir = os.path.join(BUILD_DIR, p["path"])
        os.makedirs(out_dir, exist_ok=True)
        out_file = os.path.join(out_dir, "index.html")

    with open(out_file, "w", encoding="utf-8") as out_f:
        out_f.write(page_html)

    print(f"Pre-rendered: {out_file} ({len(page_html)} bytes)")

# Also create 404.html for SPA fallback on Cloudflare Pages
with open(os.path.join(BUILD_DIR, "404.html"), "w", encoding="utf-8") as f404:
    f404.write(template)
print("Generated 404.html SPA fallback.")
print("All static pages successfully pre-rendered!")
