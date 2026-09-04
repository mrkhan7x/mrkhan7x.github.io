import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import "../styles/BookingModal.css";

export default function BookingModal({ isOpen, onClose }) {
  // Generate 7 dynamic upcoming business dates
  const availableDates = useMemo(() => {
    const dates = [];
    const now = new Date();
    let count = 0;
    let offset = 1;
    while (count < 7) {
      const d = new Date(now);
      d.setDate(now.getDate() + offset);
      const day = d.getDay();
      // Skip Sundays (0)
      if (day !== 0) {
        const str = d.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric"
        });
        dates.push(str);
        count++;
      }
      offset++;
    }
    return dates;
  }, []);

  const [selectedDate, setSelectedDate] = useState(() => availableDates[0] || "Tomorrow");
  const [selectedTime, setSelectedTime] = useState(null);
  const [step, setStep] = useState("time"); // 'time' or 'form'
  const [formData, setFormData] = useState({ name: "", email: "", notes: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const times = [
    "9:00am",
    "9:30am",
    "10:00am",
    "10:30am",
    "11:00am",
    "11:30am",
    "1:00pm",
    "1:30pm",
    "2:00pm",
    "3:00pm",
    "4:00pm"
  ];

  const handleTimeSelect = (t) => {
    setSelectedTime(t);
    setStep("form");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      type: "growth_call_booking",
      name: formData.name,
      email: formData.email,
      notes: formData.notes,
      date: selectedDate,
      time: selectedTime,
      timestamp: new Date().toISOString()
    };

    const webhookUrl =
      process.env.REACT_APP_N8N_WEBHOOK_URL ||
      "https://primary-production-4c8d.up.railway.app/webhook/portfolio-contact";

    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.warn("Booking webhook error, fallback email triggered:", err);
      // Construct fallback mailto
      const subject = encodeURIComponent(`Growth Call Booking: ${formData.name} (${selectedDate} at ${selectedTime})`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nDate: ${selectedDate}\nTime: ${selectedTime}\n\nProject Notes:\n${formData.notes}`
      );
      window.open(`mailto:info@mrkhanservices.site?subject=${subject}&body=${body}`, "_blank");
    }

    setIsSubmitting(false);
    setSubmitted(true);
  };

  const resetAndClose = () => {
    onClose();
    setTimeout(() => {
      setStep("time");
      setSelectedTime(null);
      setSubmitted(false);
      setFormData({ name: "", email: "", notes: "" });
      setIsSubmitting(false);
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="cal-modal-backdrop" onClick={resetAndClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.3 }}
          className="cal-modal-card"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Bar */}
          <div className="cal-modal__header">
            <div className="cal-modal__brand">
              <span className="cal-modal__badge">MRK</span>
              <div>
                <h4 className="cal-modal__brand-name">MRKHANSERVICES</h4>
                <p className="cal-modal__title">Growth Mapping Call (30m)</p>
              </div>
            </div>
            <button className="cal-modal__close" onClick={resetAndClose}>
              ×
            </button>
          </div>

          {submitted ? (
            <div className="cal-modal__success">
              <div className="success-icon">✓</div>
              <h3>Call Scheduled Successfully!</h3>
              <p>
                We have reserved{" "}
                <strong>
                  {selectedDate} at {selectedTime}
                </strong>{" "}
                for your Growth Mapping Call. We look forward to analyzing your
                systems and growth opportunities.
              </p>
              <button className="talk-btn" onClick={resetAndClose} style={{ marginTop: "24px" }}>
                <span>Done</span>
              </button>
            </div>
          ) : (
            <div className="cal-modal__body">
              {/* Left Column: Call Info & Dynamic Date Selector */}
              <div className="cal-modal__left">
                <div className="cal-modal__meta">
                  <div className="meta-item">
                    <span>⏱ 30 min</span>
                  </div>
                  <div className="meta-item">
                    <span>📹 Google Meet</span>
                  </div>
                  <div className="meta-item">
                    <span>🌐 Asia/Karachi (GMT+5)</span>
                  </div>
                </div>

                <p className="cal-modal__desc">
                  We&apos;ll audit your workflows and operational bottlenecks live
                  on a 30-minute call and show you where automation creates the
                  largest impact before suggesting any scope. Completely free.
                </p>

                <div className="cal-modal__date-picker">
                  <label>Select Date:</label>
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="cal-select"
                  >
                    {availableDates.map((dateStr, idx) => (
                      <option key={idx} value={dateStr}>
                        {dateStr}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Right Column: Time Slots or Form */}
              <div className="cal-modal__right">
                {step === "time" ? (
                  <>
                    <h4 className="column-title">Select a Time</h4>
                    <div className="time-slots-grid">
                      {times.map((t, idx) => (
                        <button
                          key={idx}
                          className="time-slot-btn"
                          onClick={() => handleTimeSelect(t)}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <form onSubmit={handleFormSubmit} className="cal-booking-form">
                    <button
                      type="button"
                      className="back-btn"
                      onClick={() => setStep("time")}
                      disabled={isSubmitting}
                    >
                      ← Back to times
                    </button>
                    <h4 className="column-title">Enter Details</h4>
                    <p className="selected-summary">
                      {selectedDate} at {selectedTime}
                    </p>

                    <div className="form-group">
                      <label>Your Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Muhammad Roman Khan"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="form-group">
                      <label>Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="roman@company.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="form-group">
                      <label>What workflow or bottleneck do you want to solve?</label>
                      <textarea
                        rows="3"
                        placeholder="e.g. Lead response delay, manual client onboarding, CRM sync..."
                        value={formData.notes}
                        onChange={(e) =>
                          setFormData({ ...formData, notes: e.target.value })
                        }
                        disabled={isSubmitting}
                      />
                    </div>

                    <button
                      type="submit"
                      className="talk-btn submit-booking-btn"
                      disabled={isSubmitting}
                    >
                      <span>
                        {isSubmitting ? "Reserving slot..." : "Confirm Booking →"}
                      </span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
