/* MRKHANSERVICES shared behaviour. No window scroll listeners:
   reveals, nav state, SVG flow and counters all use IntersectionObserver. */
(function () {
  'use strict';

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasIO = 'IntersectionObserver' in window;
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  /* ---------- reveal, painted strokes, live SVG flows, counters ---------- */
  function countUp(el) {
    var to = parseFloat(el.getAttribute('data-count'));
    if (isNaN(to)) return;
    var suffix = el.getAttribute('data-suffix') || '';
    var dec = (String(to).split('.')[1] || '').length;
    if (reduce) { el.textContent = to.toFixed(dec) + suffix; return; }
    var t0 = performance.now(), dur = 900;
    (function step(now) {
      var k = Math.min(1, (now - t0) / dur);
      var e = 1 - Math.pow(1 - k, 3);
      el.textContent = (to * e).toFixed(dec) + suffix;
      if (k < 1) requestAnimationFrame(step);
    })(t0);
  }
  var targets = $$('.rv, .paint, svg.flow, [data-count]');
  if (hasIO) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var el = en.target;
        if (el.matches('svg.flow')) { el.classList.toggle('live', en.isIntersecting); if (en.isIntersecting) el.classList.add('seen'); return; }
        if (!en.isIntersecting) return;
        if (el.hasAttribute('data-count')) countUp(el); else el.classList.add('in');
        io.unobserve(el);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
    targets.forEach(function (el) { io.observe(el); });
  } else {
    targets.forEach(function (el) {
      if (el.hasAttribute('data-count')) countUp(el);
      else { el.classList.add('in'); el.classList.add('live'); el.classList.add('seen'); }
    });
  }

  /* ---------- nav state ---------- */
  var nav = $('#nav'), sentinel = $('#top-sentinel');
  if (nav && sentinel && hasIO) {
    new IntersectionObserver(function (e) { nav.classList.toggle('is-scrolled', !e[0].isIntersecting); }).observe(sentinel);
  }

  /* ---------- mobile menu ---------- */
  var burger = $('#mobile-burger-btn'), menu = $('#mobile-dropdown-menu');
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

  /* ---------- booking triggers and modal a11y ---------- */
  $$('[data-action="open-booking"]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      if (typeof window.openBookingModal === 'function') {
        e.preventDefault(); setMenu(false); window.openBookingModal();
      }
    });
  });
  var modal = $('#booking-modal');
  if (modal && 'MutationObserver' in window) {
    var lastFocus = null;
    new MutationObserver(function () {
      var open = modal.classList.contains('active');
      modal.setAttribute('aria-hidden', String(!open));
      if (open) { lastFocus = document.activeElement; var c = $('#booking-close-btn'); if (c) c.focus(); }
      else if (lastFocus && lastFocus.focus) { lastFocus.focus(); lastFocus = null; }
    }).observe(modal, { attributes: true, attributeFilter: ['class'] });
  }

  /* ---------- morphing word: spring scale and vertical translate ---------- */
  $$('[data-morph]').forEach(function (host) {
    var words = $$('.w', host);
    if (words.length < 2) return;
    var cur = 0;
    words[0].classList.add('is-active');
    if (reduce) return;
    setInterval(function () {
      if (document.hidden) return;
      var out = words[cur];
      cur = (cur + 1) % words.length;
      out.classList.remove('is-active'); out.classList.add('is-out');
      words[cur].classList.add('is-active');
      setTimeout(function () {
        out.style.transition = 'none'; out.classList.remove('is-out');
        void out.offsetWidth; out.style.transition = '';
      }, 520);
    }, parseInt(host.getAttribute('data-morph'), 10) || 2400);
  });

  /* ---------- tilt cards with moving sheen ---------- */
  if (!reduce && window.matchMedia && window.matchMedia('(hover: hover)').matches) {
    $$('.tilt').forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        card.style.setProperty('--ry', (x * 7).toFixed(2) + 'deg');
        card.style.setProperty('--rx', (-y * 7).toFixed(2) + 'deg');
        card.style.setProperty('--sx', (x * 120).toFixed(1) + '%');
      });
      card.addEventListener('pointerleave', function () {
        card.style.setProperty('--ry', '0deg'); card.style.setProperty('--rx', '0deg'); card.style.setProperty('--sx', '-60%');
      });
    });
  }

  /* ---------- live clock with milliseconds (the viewer's own local time) ---------- */
  var clocks = $$('[data-clock]');
  if (clocks.length && !reduce) {
    var pad = function (n, l) { n = String(n); while (n.length < l) n = '0' + n; return n; };
    var last = 0;
    (function tick(now) {
      if (now - last > 48 && !document.hidden) {
        last = now;
        var d = new Date();
        var s = pad(d.getHours(), 2) + ':' + pad(d.getMinutes(), 2) + ':' + pad(d.getSeconds(), 2) + '.' + pad(d.getMilliseconds(), 3);
        clocks.forEach(function (c) { c.textContent = s; });
      }
      requestAnimationFrame(tick);
    })(0);
  } else if (clocks.length) {
    var d0 = new Date();
    clocks.forEach(function (c) { c.textContent = d0.toTimeString().slice(0, 8); });
  }

  /* ---------- tabs ---------- */
  $$('[role="tablist"]').forEach(function (list) {
    var tabs = $$('[role="tab"]', list);
    if (!tabs.length) return;
    function select(i, focus) {
      tabs.forEach(function (t, j) {
        var on = i === j;
        t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1;
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
  });

  /* ---------- live voice demo (#demo-btn); same Vapi flow as the voice page ---------- */
  (function () {
    var btn = $('#demo-btn'), label = $('#demo-label'), status = $('#demo-status'), wave = $('#demo-wave');
    if (!btn || !label || !status || !wave || !window.VAPI_CONFIG) return;
    var bars = $$('i', wave), vapi = null, active = false, connecting = false;
    var factors = [0.3, 0.48, 0.68, 0.88, 1.0, 1.0, 0.88, 0.68, 0.48, 0.38, 0.28, 0.2];

    function ui(state) {
      if (state === 'active') {
        active = true; connecting = false; btn.classList.remove('busy'); wave.classList.add('active');
        label.textContent = 'End call'; status.textContent = 'live / speak naturally into your microphone';
      } else if (state === 'connecting') {
        connecting = true; active = false; btn.classList.add('busy');
        label.textContent = 'Connecting'; status.textContent = 'connecting / allow your microphone if prompted';
      } else {
        active = false; connecting = false; btn.classList.remove('busy'); wave.classList.remove('active');
        label.textContent = 'Start a call'; status.textContent = 'idle / ready when you are';
        bars.forEach(function (b) { b.style.height = ''; });
      }
    }
    function hook(inst) {
      if (!inst || inst.__siteHooked) return;
      inst.__siteHooked = true;
      inst.on('call-start', function () { ui('active'); });
      inst.on('call-end', function () { ui('idle'); });
      inst.on('speech-start', function () { if (active) status.textContent = 'live / the receptionist is speaking'; });
      inst.on('speech-end', function () { if (active) status.textContent = 'live / listening, go ahead'; });
      inst.on('volume-level', function (v) {
        if (!active) return;
        var x = Math.min(1, Math.max(0, v * 3.5));
        bars.forEach(function (b, i) { b.style.height = Math.max(16, Math.min(98, x * (factors[i] || 0.5) * 80 + 16)) + '%'; });
      });
      inst.on('error', function (err) {
        ui('idle');
        var s = String((err && (err.error || err.message)) || err);
        status.textContent = /NotAllowed|Permission|microphone/i.test(s)
          ? 'error / microphone blocked, allow it in browser settings'
          : 'error / connection problem, press the button to retry';
      });
    }
    function init() {
      if (window.vapiSDK && typeof window.vapiSDK.run === 'function') {
        try { vapi = window.vapiSDK.run(window.VAPI_CONFIG); window.vapiInstance = vapi; hook(vapi); }
        catch (e) { console.error('Vapi init failed:', e); }
      }
    }
    if (window.vapiSDK) init();
    else { var iv = setInterval(function () { if (window.vapiSDK) { clearInterval(iv); init(); } }, 100); setTimeout(function () { clearInterval(iv); }, 10000); }

    btn.addEventListener('click', async function () {
      if (connecting) return;
      if (active) {
        status.textContent = 'ending call';
        try { if (vapi) await vapi.stop(); } catch (e) {}
        setTimeout(function () { if (!active) ui('idle'); }, 400);
        return;
      }
      if (!vapi) { if (window.vapiSDK && window.vapiSDK.vapi) { vapi = window.vapiSDK.vapi; hook(vapi); } else init(); }
      if (!vapi) { status.textContent = 'audio engine still loading, try again in a moment'; return; }
      ui('connecting');
      try { await vapi.start(window.VAPI_CONFIG.assistant, window.VAPI_CONFIG.assistantOverrides); }
      catch (err) {
        ui('idle');
        status.textContent = (err && (err.name === 'NotAllowedError' || /Permission/.test(String(err))))
          ? 'error / microphone blocked, allow it in your address bar'
          : 'error / could not connect, press the button to retry';
      }
    });
  })();
})();
