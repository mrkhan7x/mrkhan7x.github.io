/**
 * MRKHANSERVICES — 30-Minute Growth Call Booking Engine
 * Pure Vanilla JavaScript implementation with dynamic business date generation,
 * time slot picking, n8n webhook dispatch, and mailto fallback.
 */

(function () {
  let selectedDate = "";
  let selectedTime = "";

  // Helper: Generate next N business days (skip Saturday & Sunday)
  function getUpcomingBusinessDates(count = 7) {
    const dates = [];
    let current = new Date();
    current.setDate(current.getDate() + 1); // Start tomorrow

    while (dates.length < count) {
      const day = current.getDay();
      if (day !== 0 && day !== 6) {
        // Not Sunday (0) or Saturday (6)
        const dateStr = current.toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "numeric",
        });
        const isoStr = current.toISOString().split("T")[0];
        dates.push({ label: dateStr, value: isoStr });
      }
      current.setDate(current.getDate() + 1);
    }
    return dates;
  }

  // Populate dynamic dates select
  function initDatePicker() {
    const dateSelect = document.getElementById("booking-date-select");
    if (!dateSelect) return;

    dateSelect.innerHTML = "";
    const businessDates = getUpcomingBusinessDates(7);
    businessDates.forEach((d, idx) => {
      const opt = document.createElement("option");
      opt.value = d.value;
      opt.textContent = d.label;
      if (idx === 0) {
        opt.selected = true;
        selectedDate = d.label;
      }
      dateSelect.appendChild(opt);
    });

    dateSelect.addEventListener("change", (e) => {
      const selectedOpt = e.target.options[e.target.selectedIndex];
      selectedDate = selectedOpt ? selectedOpt.textContent : e.target.value;
      updateSummary();
    });
  }

  // Handle time slot clicks
  function initTimeSlots() {
    const slotBtns = document.querySelectorAll(".time-slot-btn");
    slotBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        selectedTime = btn.getAttribute("data-time") || btn.textContent.trim();
        goToFormStep();
      });
    });
  }

  // Step transitions
  function goToFormStep() {
    const slotsCol = document.getElementById("booking-slots-column");
    const formStep = document.getElementById("booking-form-step");
    if (slotsCol) slotsCol.style.display = "none";
    if (formStep) formStep.classList.add("active");
    updateSummary();
  }

  function goBackToSlots() {
    const slotsCol = document.getElementById("booking-slots-column");
    const formStep = document.getElementById("booking-form-step");
    if (slotsCol) slotsCol.style.display = "block";
    if (formStep) formStep.classList.remove("active");
  }

  function updateSummary() {
    const summaryEl = document.getElementById("booking-selected-summary");
    if (summaryEl) {
      summaryEl.textContent = `${selectedDate || "Upcoming Date"} at ${selectedTime || "Select time"}`;
    }
  }

  // Handle form submission
  function initForm() {
    const form = document.getElementById("booking-form-element");
    const backBtn = document.getElementById("booking-back-btn");

    if (backBtn) {
      backBtn.addEventListener("click", (e) => {
        e.preventDefault();
        goBackToSlots();
      });
    }

    if (form) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector(".submit-booking-btn");
        const origBtnText = submitBtn ? submitBtn.innerHTML : "";
        if (submitBtn) {
          submitBtn.innerHTML = "Confirming reservation...";
          submitBtn.disabled = true;
        }

        const name = document.getElementById("client-name").value.trim();
        const email = document.getElementById("client-email").value.trim();
        const notes = document.getElementById("client-notes").value.trim();

        const payload = {
          name,
          email,
          notes,
          date: selectedDate,
          time: selectedTime,
          source: "portfolio_pure_html",
          timestamp: new Date().toISOString(),
        };

        try {
          // Send to production n8n webhook
          await fetch(
            "https://primary-production-4c8d.up.railway.app/webhook/portfolio-contact",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
              mode: "no-cors", // Allow opaque webhook responses
            }
          );
          showSuccess(name, email);
        } catch (err) {
          console.warn("Webhook dispatch fallback:", err);
          // Mailto fallback
          const subject = encodeURIComponent(
            `Growth Call Request: ${name} (${selectedDate} at ${selectedTime})`
          );
          const body = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\nPreferred Date: ${selectedDate}\nPreferred Time: ${selectedTime}\nNotes: ${notes}`
          );
          window.location.href = `mailto:mrkhan.officialsite@gmail.com?subject=${subject}&body=${body}`;
          showSuccess(name, email);
        } finally {
          if (submitBtn) {
            submitBtn.innerHTML = origBtnText;
            submitBtn.disabled = false;
          }
        }
      });
    }
  }

  function showSuccess(name, email) {
    const cardBody = document.querySelector(".cal-modal__body");
    const successView = document.getElementById("booking-success-view");
    const successDetails = document.getElementById("booking-success-details");

    if (cardBody) cardBody.style.display = "none";
    if (successView) successView.classList.add("active");
    if (successDetails) {
      successDetails.innerHTML = `We have reserved your slot for <strong>${selectedDate}</strong> at <strong>${selectedTime}</strong>.<br>Confirmation will be sent to <strong>${email}</strong>.`;
    }
  }

  function resetModal() {
    const cardBody = document.querySelector(".cal-modal__body");
    const slotsCol = document.getElementById("booking-slots-column");
    const formStep = document.getElementById("booking-form-step");
    const successView = document.getElementById("booking-success-view");
    const form = document.getElementById("booking-form-element");

    if (cardBody) cardBody.style.display = "grid";
    if (slotsCol) slotsCol.style.display = "block";
    if (formStep) formStep.classList.remove("active");
    if (successView) successView.classList.remove("active");
    if (form) form.reset();
  }

  // Global open / close
  window.openBookingModal = function () {
    const modal = document.getElementById("booking-modal");
    if (modal) {
      resetModal();
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  };

  window.closeBookingModal = function () {
    const modal = document.getElementById("booking-modal");
    if (modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    }
  };

  // Close on ESC and backdrop click
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      window.closeBookingModal();
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
    initDatePicker();
    initTimeSlots();
    initForm();

    const backdrop = document.getElementById("booking-modal");
    if (backdrop) {
      backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop) {
          window.closeBookingModal();
        }
      });
    }

    const closeBtn = document.getElementById("booking-close-btn");
    if (closeBtn) {
      closeBtn.addEventListener("click", window.closeBookingModal);
    }
  });
})();
