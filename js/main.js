/**
 * MRKHANSERVICES — Main Vanilla JS Interactive Controller
 * Mobile drawer, project detail popup modal, navbar scroll effect,
 * and drag-to-scroll marquee.
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Sticky Navbar Scroll Effect
  const navbar = document.querySelector(".header-floating-wrapper");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar?.classList.add("scrolled");
    } else {
      navbar?.classList.remove("scrolled");
    }
  });

  // 2. Mobile Menu Toggle
  const burgerBtn = document.getElementById("mobile-burger-btn");
  const mobileMenu = document.getElementById("mobile-dropdown-menu");

  if (burgerBtn && mobileMenu) {
    burgerBtn.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.contains("active");
      if (isOpen) {
        mobileMenu.classList.remove("active");
        burgerBtn.classList.remove("open");
      } else {
        mobileMenu.classList.add("active");
        burgerBtn.classList.add("open");
      }
    });

    // Auto-close on link click
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        burgerBtn.classList.remove("open");
      });
    });
  }

  // 3. Connect All Booking Modal Triggers
  document.querySelectorAll('[data-action="open-booking"], .talk-btn, .contact-details__booking-link').forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      // If it's on the contact page or an external link, let's still open the modal!
      e.preventDefault();
      if (window.openBookingModal) {
        window.openBookingModal();
      }
    });
  });

  // 4. Project Detail Modal (Home Page)
  const projectCards = document.querySelectorAll(".work-showcase__item");
  const projectModal = document.getElementById("project-modal");
  const projectModalClose = document.getElementById("project-modal-close");

  const projectData = {
    "dental-crm": {
      title: "Lead Qualification & Onboarding Engine",
      desc: "An intelligent multi-step intake pipeline engineered for high-ticket practices. Scrapes form inquiries, verifies insurance eligibility, runs preliminary qualification criteria, and orchestrates appointment bookings directly into CRM workflows.",
      stats: ["Patient Acquisition", "PPC Performance", "Automated CRM", "+38% Booking Rate"]
    },
    "b2b-outreach": {
      title: "Autonomous Multi-Channel Outreach Machine",
      desc: "A custom prospecting and engagement system built for high-growth B2B agencies. Automatically gathers real operational bottlenecks, crafts bespoke value propositions, and delivers them across LinkedIn and Email without generic automation spam.",
      stats: ["LinkedIn Outreach", "Signal Scraping", "CRM Sync", "20+ hrs saved/week"]
    },
    "generative-pipeline": {
      title: "High-Volume Generative Media Pipeline",
      desc: "Commercial asset production engine designed for ArtPoliceJoe. Integrates multi-model computer vision, automated render queues, metadata conditioning, and commercial distribution pipelines—generating over $30,000 in commercial revenue.",
      stats: ["PyTorch & Vision", "Asset Generation", "Commerce Automation", "$30K+ Revenue"]
    }
  };

  projectCards.forEach((card) => {
    card.addEventListener("click", () => {
      const pid = card.getAttribute("data-project-id");
      const p = projectData[pid];
      if (!p || !projectModal) return;

      const titleEl = document.getElementById("project-modal-title");
      const descEl = document.getElementById("project-modal-desc");
      const statsEl = document.getElementById("project-modal-stats");

      if (titleEl) titleEl.textContent = p.title;
      if (descEl) descEl.textContent = p.desc;
      if (statsEl) {
        statsEl.innerHTML = p.stats
          .map((s) => `<span class="project-modal-stat-pill">${s}</span>`)
          .join("");
      }

      projectModal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  if (projectModalClose && projectModal) {
    projectModalClose.addEventListener("click", () => {
      projectModal.classList.remove("active");
      document.body.style.overflow = "";
    });

    projectModal.addEventListener("click", (e) => {
      if (e.target === projectModal) {
        projectModal.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  }

  // 5. Draggable Marquee
  const marqueeViewport = document.querySelector(".company-marquee__viewport");
  if (marqueeViewport) {
    let isDown = false;
    let startX;
    let scrollLeft;

    marqueeViewport.addEventListener("mousedown", (e) => {
      isDown = true;
      startX = e.pageX - marqueeViewport.offsetLeft;
      scrollLeft = marqueeViewport.scrollLeft;
    });

    marqueeViewport.addEventListener("mouseleave", () => {
      isDown = false;
    });

    marqueeViewport.addEventListener("mouseup", () => {
      isDown = false;
    });

    marqueeViewport.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - marqueeViewport.offsetLeft;
      const walk = (x - startX) * 2;
      marqueeViewport.scrollLeft = scrollLeft - walk;
    });
  }
});
