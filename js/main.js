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

  // 4. Draggable Marquee
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
