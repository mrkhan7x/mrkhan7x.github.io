#!/usr/bin/env python3
"""Stamp the shared site shell into every page.

Pages contain empty marker pairs, e.g. <!--SHELL:NAV--><!--/SHELL:NAV-->.
Run:  python3 tools/shell.py        (from the repo root)
Edit the shell ONCE here and every page updates.
"""
import re, sys, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent

HEAD = """<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="icon" type="image/png" sizes="64x64" href="/favicon.png" />
  <link rel="alternate icon" href="/favicon.ico" />
  <link rel="apple-touch-icon" href="/favicon.png" />
  <meta name="theme-color" content="#F5F4F2" />
  <link rel="preload" href="/fonts/instrument-serif-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="preload" href="/fonts/manrope-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin />
  <script>document.documentElement.className='js';</script>
  <link rel="stylesheet" href="/css/site.css" />"""

TOP = """<a class="skip" href="#main">Skip to content</a>
  <div id="top-sentinel" aria-hidden="true" style="position:absolute;top:0;height:40px;width:1px"></div>
  <svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">
    <filter id="paint" x="-5%" y="-30%" width="110%" height="160%">
      <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="4" result="n" />
      <feDisplacementMap in="SourceGraphic" in2="n" scale="7" />
    </filter>
  </svg>"""

NAV_LINKS = [("/services/", "Services"), ("/about/", "About"), ("/contact/", "Contact")]

def nav(page):
    def cur(href):
        return ' aria-current="page"' if page.startswith(href) else ""
    lis = "\n".join(f'        <li><a href="{h}"{cur(h)}>{t}</a></li>' for h, t in NAV_LINKS)
    mob = "\n".join(f'      <a href="{h}" style="--i:{i}">{t}</a>' for i, (h, t) in enumerate(NAV_LINKS))
    return f"""<header>
    <nav class="nav" id="nav" aria-label="Main">
      <a href="/" class="brand" aria-label="MRKHANSERVICES home">
        <span class="badge">MRK</span>
        <span class="name">MRKHANSERVICES</span>
      </a>
      <ul>
{lis}
      </ul>
      <div class="right">
        <a href="/contact/" class="btn ink sm" data-action="open-booking">Book an audit</a>
        <button class="burger" id="mobile-burger-btn" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-dropdown-menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
    <div class="menu" id="mobile-dropdown-menu" aria-hidden="true">
{mob}
      <a href="/contact/" class="btn orange" data-action="open-booking">Book an audit</a>
    </div>
  </header>"""

FOOT = """<footer class="foot">
    <div class="wrap">
      <div class="foot-cols">
        <div>
          <a href="/" class="brand"><span class="badge">MRK</span><span class="name">MRKHANSERVICES</span></a>
          <p class="muted" style="margin-top:16px;max-width:30ch">Automation systems that run in the background, built by one person you can reach directly.</p>
        </div>
        <div>
          <h4>Systems</h4>
          <ul>
            <li><a href="/voice/">Voice receptionist</a></li>
            <li><a href="/rag/">Knowledge agent</a></li>
            <li><a href="/recruitment/">Recruitment pipeline</a></li>
            <li><a href="/youtube/">Content factory</a></li>
            <li><a href="/services/">All services</a></li>
          </ul>
        </div>
        <div>
          <h4>Company</h4>
          <ul>
            <li><a href="/about/">About</a></li>
            <li><a href="/about/#about-story">My story</a></li>
            <li><a href="/contact/">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4>Connect</h4>
          <ul>
            <li><a href="https://www.linkedin.com/in/muhammad-roman-khan-8245a0328" target="_blank" rel="noopener">LinkedIn</a></li>
            <li><a href="https://github.com/mrkhan7x" target="_blank" rel="noopener">GitHub</a></li>
            <li><a href="https://www.instagram.com/mrkhan7x" target="_blank" rel="noopener">Instagram</a></li>
            <li><a href="https://wa.me/923285792098" target="_blank" rel="noopener">WhatsApp</a></li>
            <li><a href="mailto:info@mrkhanservices.com">info@mrkhanservices.com</a></li>
          </ul>
        </div>
      </div>
      <div class="foot-bottom">
        <span>&copy; 2026 MRKHANSERVICES &middot; local time <b data-clock style="font-weight:500;color:var(--ink)">--:--:--</b></span>
        <nav aria-label="Legal"><a href="/privacy/">Privacy</a><a href="/terms/">Terms</a></nav>
      </div>
    </div>
  </footer>"""

MODAL = """<div class="cal-modal-backdrop" id="booking-modal" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="booking-title">
    <div class="cal-modal-card">
      <div class="cal-modal__header">
        <div class="cal-modal__brand">
          <span class="cal-modal__badge">MRK</span>
          <span class="cal-modal__brand-name">MRKHANSERVICES</span>
        </div>
        <div class="cal-modal__title" id="booking-title">Workflow audit</div>
        <button class="cal-modal__close" id="booking-close-btn" type="button" aria-label="Close">&times;</button>
      </div>
      <div class="cal-modal__body">
        <div class="cal-modal__left">
          <div class="cal-modal__meta">
            <span class="meta-item">30 min</span>
            <span class="meta-item">Google Meet</span>
            <span class="meta-item">no obligation</span>
          </div>
          <p class="cal-modal__desc">We review how your work flows today, find where time is lost, and list what to automate first.</p>
          <div class="cal-modal__date-picker">
            <label for="booking-date-select">Select a date</label>
            <select id="booking-date-select" class="cal-select"></select>
          </div>
        </div>
        <div class="cal-modal__right">
          <div id="booking-slots-column">
            <div class="column-title">Available times</div>
            <div class="time-slots-grid">
              <button class="time-slot-btn" type="button" data-time="09:00 AM">09:00 AM</button>
              <button class="time-slot-btn" type="button" data-time="10:00 AM">10:00 AM</button>
              <button class="time-slot-btn" type="button" data-time="11:00 AM">11:00 AM</button>
              <button class="time-slot-btn" type="button" data-time="01:00 PM">01:00 PM</button>
              <button class="time-slot-btn" type="button" data-time="02:00 PM">02:00 PM</button>
              <button class="time-slot-btn" type="button" data-time="03:00 PM">03:00 PM</button>
              <button class="time-slot-btn" type="button" data-time="04:00 PM">04:00 PM</button>
            </div>
          </div>
          <div id="booking-form-step" class="cal-booking-form">
            <button id="booking-back-btn" class="back-btn" type="button">&larr; Back to times</button>
            <div id="booking-selected-summary" class="selected-summary">Date and time</div>
            <form id="booking-form-element">
              <div class="form-group">
                <label for="client-name">Your name</label>
                <input type="text" id="client-name" required placeholder="e.g. Alex Morgan" />
              </div>
              <div class="form-group">
                <label for="client-email">Work email</label>
                <input type="email" id="client-email" required placeholder="alex@company.com" />
              </div>
              <div class="form-group">
                <label for="client-notes">What takes up most of your team's time?</label>
                <textarea id="client-notes" rows="3" placeholder="Lead replies, onboarding, reporting..."></textarea>
              </div>
              <button type="submit" class="btn ink submit-booking-btn">Confirm audit</button>
            </form>
          </div>
        </div>
      </div>
      <div id="booking-success-view" class="cal-modal__success">
        <div class="success-icon" aria-hidden="true">&#10003;</div>
        <h3 class="cal-modal__title">Audit booked.</h3>
        <p id="booking-success-details" class="cal-modal__desc"></p>
        <button class="btn ink" type="button" onclick="window.closeBookingModal()">Done</button>
      </div>
    </div>
  </div>"""

SCRIPTS = """<script src="/js/booking.js"></script>
  <script src="/js/site.js"></script>"""

def stamp(path):
    text = path.read_text(encoding="utf8")
    rel = "/" + str(path.relative_to(ROOT)).replace("index.html", "").replace("\\", "/")
    parts = {"HEAD": HEAD, "TOP": TOP, "NAV": nav(rel), "FOOT": FOOT, "MODAL": MODAL, "SCRIPTS": SCRIPTS}
    changed = False
    for k, v in parts.items():
        pat = re.compile(rf"<!--SHELL:{k}-->.*?<!--/SHELL:{k}-->", re.S)
        if pat.search(text):
            text = pat.sub(lambda m: f"<!--SHELL:{k}-->\n  {v}\n  <!--/SHELL:{k}-->", text)
            changed = True
    if changed:
        path.write_text(text, encoding="utf8")
        print("stamped", path.relative_to(ROOT))

if __name__ == "__main__":
    for p in sorted(ROOT.rglob("*.html")):
        if any(s in p.parts for s in ("static", "node_modules", "tools")):
            continue
        stamp(p)
