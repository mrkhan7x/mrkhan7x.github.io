/* MRKHANSERVICES home page behaviour.
   No window scroll listeners: reveals and the nav use IntersectionObserver,
   the zoom section runs on CSS scroll-driven animation. */
(function () {
  'use strict';

  var doc = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  /* ---------- theme ---------- */
  var themeBtn = $('#theme-toggle');
  function paintThemeLabel() {
    if (!themeBtn) return;
    var dark = doc.getAttribute('data-theme') === 'dark';
    themeBtn.textContent = dark ? 'Light' : 'Dark';
    var meta = $('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', dark ? '#0C0F14' : '#F2F4F7');
  }
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = doc.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      doc.setAttribute('data-theme', next);
      try { localStorage.setItem('mrk-theme', next); } catch (e) {}
      paintThemeLabel();
    });
  }
  paintThemeLabel();

  /* ---------- reveals and painted strokes ---------- */
  var revealTargets = $$('.rv, .paint');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- nav state ---------- */
  var nav = $('#nav');
  var sentinel = $('#top-sentinel');
  if (nav && sentinel && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      nav.classList.toggle('is-scrolled', !entries[0].isIntersecting);
    }).observe(sentinel);
  }

  /* ---------- mobile menu ---------- */
  var burger = $('#mobile-burger-btn');
  var menu = $('#mobile-dropdown-menu');
  function setMenu(open) {
    if (!burger || !menu) return;
    burger.classList.toggle('open', open);
    menu.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  }
  if (burger && menu) {
    burger.addEventListener('click', function () { setMenu(!menu.classList.contains('open')); });
    $$('a', menu).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  }

  /* ---------- booking triggers ---------- */
  $$('[data-action="open-booking"]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      if (typeof window.openBookingModal === 'function') {
        e.preventDefault();
        setMenu(false);
        window.openBookingModal();
      }
      /* otherwise the link falls through to /contact/ */
    });
  });

  var modal = $('#booking-modal');
  if (modal && 'MutationObserver' in window) {
    var lastFocus = null;
    new MutationObserver(function () {
      var open = modal.classList.contains('active');
      modal.setAttribute('aria-hidden', String(!open));
      if (open) {
        lastFocus = document.activeElement;
        var c = $('#booking-close-btn');
        if (c) c.focus();
      } else if (lastFocus && lastFocus.focus) {
        lastFocus.focus();
        lastFocus = null;
      }
    }).observe(modal, { attributes: true, attributeFilter: ['class'] });
  }

  /* ---------- morphing word (letters slide through a mask) ---------- */
  (function () {
    var host = $('#morph');
    if (!host) return;
    var words = $$('.w', host);
    if (words.length < 2) return;
    words.forEach(function (w) {
      var text = w.textContent;
      w.textContent = '';
      for (var i = 0; i < text.length; i++) {
        var s = document.createElement('span');
        s.className = 'ch';
        s.style.setProperty('--i', i);
        s.textContent = text.charAt(i);
        w.appendChild(s);
      }
    });
    var cur = 0;
    words[0].classList.add('no-t', 'is-active');
    void host.offsetWidth;
    words[0].classList.remove('no-t');
    if (reduce) return;

    setInterval(function () {
      if (document.hidden) return;
      var out = words[cur];
      cur = (cur + 1) % words.length;
      var inn = words[cur];
      out.classList.remove('is-active');
      out.classList.add('is-out');
      inn.classList.add('is-active');
      setTimeout(function () {
        out.classList.add('no-t');
        out.classList.remove('is-out');
        void out.offsetWidth;
        out.classList.remove('no-t');
      }, 1300);
    }, 2800);
  })();

  /* ---------- accent shape morph (96 point polygon, eased radii) ---------- */
  (function () {
    var path = $('#blob');
    if (!path) return;
    var N = 96;
    var shapes = [
      function () { return 78; },
      function (t) { return 66 + 14 * Math.cos(5 * t); },
      function (t) { return 62 + 16 * Math.cos(3 * t + 0.6); },
      function (t) { var a = Math.abs(Math.cos(t)), b = Math.abs(Math.sin(t)); return 80 / Math.pow(Math.pow(a, 4) + Math.pow(b, 4), 0.25) * 0.86; },
      function (t) { return 60 + 18 * Math.cos(2 * t) * Math.cos(2 * t) + 8 * Math.cos(7 * t); }
    ];
    var radii = shapes.map(function (fn) {
      var r = [];
      for (var i = 0; i < N; i++) r.push(Math.min(88, fn((i / N) * Math.PI * 2)));
      return r;
    });
    function draw(r) {
      var d = '';
      for (var i = 0; i < N; i++) {
        var a = (i / N) * Math.PI * 2;
        d += (i ? 'L' : 'M') + (Math.cos(a) * r[i]).toFixed(2) + ' ' + (Math.sin(a) * r[i]).toFixed(2);
      }
      path.setAttribute('d', d + 'Z');
    }
    draw(radii[0]);
    if (reduce) return;
    var from = 0, to = 1, start = performance.now(), dur = 1600, hold = 1400, visible = true;
    function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (e) { visible = e[0].isIntersecting; }).observe(path);
    }
    function frame(now) {
      if (visible && !document.hidden) {
        var t = (now - start) / dur;
        if (t >= 1) {
          draw(radii[to]);
          if (now - start >= dur + hold) { from = to; to = (to + 1) % radii.length; start = now; }
        } else {
          var k = ease(Math.max(0, t)), a = radii[from], b = radii[to], r = [];
          for (var i = 0; i < N; i++) r.push(a[i] + (b[i] - a[i]) * k);
          draw(r);
        }
      } else {
        start = now;
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  })();

  /* ---------- bottleneck tabs ---------- */
  (function () {
    var tabs = $$('[role="tab"]');
    if (!tabs.length) return;
    function select(i, focus) {
      tabs.forEach(function (t, j) {
        var on = i === j;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        var p = document.getElementById(t.getAttribute('aria-controls'));
        if (p) { p.classList.toggle('on', on); if (on) p.removeAttribute('hidden'); else p.setAttribute('hidden', ''); }
      });
      if (focus) tabs[i].focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(i, false); });
      t.addEventListener('keydown', function (e) {
        var n = tabs.length;
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); select((i + 1) % n, true); }
        else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); select((i - 1 + n) % n, true); }
        else if (e.key === 'Home') { e.preventDefault(); select(0, true); }
        else if (e.key === 'End') { e.preventDefault(); select(n - 1, true); }
      });
    });
  })();

  /* ---------- live voice demo (same Vapi flow as the voice page) ---------- */
  (function () {
    var btn = $('#demo-btn');
    var label = $('#demo-label');
    var status = $('#demo-status');
    var wave = $('#demo-wave');
    if (!btn || !label || !status || !wave) return;
    var bars = $$('i', wave);
    var vapi = null, active = false, connecting = false;
    var factors = [0.3, 0.48, 0.68, 0.88, 1.0, 1.0, 0.88, 0.68, 0.48, 0.38, 0.28, 0.2];

    function ui(state) {
      if (state === 'active') {
        active = true; connecting = false;
        btn.classList.remove('busy'); wave.classList.add('active');
        label.textContent = 'End call';
        status.textContent = 'Live. Speak naturally into your microphone.';
      } else if (state === 'connecting') {
        connecting = true; active = false;
        btn.classList.add('busy');
        label.textContent = 'Connecting';
        status.textContent = 'Allow your microphone if prompted.';
      } else {
        active = false; connecting = false;
        btn.classList.remove('busy'); wave.classList.remove('active');
        label.textContent = 'Start a call';
        status.textContent = 'Ready when you are.';
        bars.forEach(function (b) { b.style.height = ''; });
      }
    }

    function hook(inst) {
      if (!inst || inst.__homeHooked) return;
      inst.__homeHooked = true;
      inst.on('call-start', function () { ui('active'); });
      inst.on('call-end', function () { ui('idle'); });
      inst.on('speech-start', function () { if (active) status.textContent = 'The receptionist is speaking.'; });
      inst.on('speech-end', function () { if (active) status.textContent = 'Listening. Go ahead.'; });
      inst.on('volume-level', function (v) {
        if (!active) return;
        var x = Math.min(1, Math.max(0, v * 3.5));
        bars.forEach(function (b, i) {
          var h = Math.max(16, Math.min(98, x * (factors[i] || 0.5) * 80 + 16));
          b.style.height = h + '%';
        });
      });
      inst.on('error', function (err) {
        ui('idle');
        var s = String((err && (err.error || err.message)) || err);
        status.textContent = /NotAllowed|Permission|microphone/i.test(s)
          ? 'Microphone blocked. Allow it in your browser settings and try again.'
          : 'Connection problem. Press the button to retry.';
      });
    }

    function init() {
      if (window.vapiSDK && typeof window.vapiSDK.run === 'function') {
        try {
          vapi = window.vapiSDK.run(window.VAPI_CONFIG);
          window.vapiInstance = vapi;
          hook(vapi);
        } catch (e) { console.error('Vapi init failed:', e); }
      }
    }
    if (window.vapiSDK) { init(); }
    else {
      var iv = setInterval(function () { if (window.vapiSDK) { clearInterval(iv); init(); } }, 100);
      setTimeout(function () { clearInterval(iv); }, 10000);
    }

    btn.addEventListener('click', async function () {
      if (connecting) return;
      if (active) {
        status.textContent = 'Ending call.';
        try { if (vapi) await vapi.stop(); } catch (e) {}
        setTimeout(function () { if (!active) ui('idle'); }, 400);
        return;
      }
      if (!vapi) {
        if (window.vapiSDK && window.vapiSDK.vapi) { vapi = window.vapiSDK.vapi; hook(vapi); }
        else init();
      }
      if (!vapi) { status.textContent = 'The audio engine is still loading. Try again in a moment.'; return; }
      ui('connecting');
      try {
        await vapi.start(window.VAPI_CONFIG.assistant, window.VAPI_CONFIG.assistantOverrides);
      } catch (err) {
        ui('idle');
        status.textContent = (err && (err.name === 'NotAllowedError' || /Permission/.test(String(err))))
          ? 'Microphone blocked. Allow it in your address bar and try again.'
          : 'Could not connect. Press the button to retry.';
      }
    });
  })();
})();
