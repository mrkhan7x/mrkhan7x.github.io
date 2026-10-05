/* Home page extras: shape morph and cost calculator. Shared behaviour lives in site.js */
(function () {
  'use strict';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function $(s) { return document.querySelector(s); }

  /* accent shape morph: 96 point polygon with eased radii */
  var path = $('#blob');
  if (path) {
    var N = 96;
    var fns = [
      function () { return 78; },
      function (t) { return 66 + 14 * Math.cos(5 * t); },
      function (t) { return 62 + 16 * Math.cos(3 * t + 0.6); },
      function (t) { var a = Math.abs(Math.cos(t)), b = Math.abs(Math.sin(t)); return 80 / Math.pow(Math.pow(a, 4) + Math.pow(b, 4), 0.25) * 0.86; },
      function (t) { return 60 + 18 * Math.cos(2 * t) * Math.cos(2 * t) + 8 * Math.cos(7 * t); }
    ];
    var radii = fns.map(function (fn) {
      var r = []; for (var i = 0; i < N; i++) r.push(Math.min(88, fn((i / N) * Math.PI * 2))); return r;
    });
    var draw = function (r) {
      var d = '';
      for (var i = 0; i < N; i++) { var a = (i / N) * Math.PI * 2; d += (i ? 'L' : 'M') + (Math.cos(a) * r[i]).toFixed(2) + ' ' + (Math.sin(a) * r[i]).toFixed(2); }
      path.setAttribute('d', d + 'Z');
    };
    draw(radii[0]);
    if (!reduce) {
      var from = 0, to = 1, start = performance.now(), dur = 900, hold = 1200, visible = true;
      var ease = function (t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };
      if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { visible = e[0].isIntersecting; }).observe(path);
      (function frame(now) {
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
        } else { start = now; }
        requestAnimationFrame(frame);
      })(performance.now());
    }
  }

  /* cost calculator */
  var ids = ['people', 'hours', 'rate', 'share'];
  var el = {}; ids.forEach(function (k) { el[k] = $('#calc-' + k); });
  var outH = $('#calc-hours-out'), outC = $('#calc-cost-out');
  if (el.people && outH && outC) {
    var shown = { h: 0, c: 0 }, raf = 0;
    var fmt = function (n) { return Math.round(n).toLocaleString('en-US'); };
    function paintLabels() {
      $('#o-people').textContent = el.people.value;
      $('#o-hours').textContent = el.hours.value;
      $('#o-rate').textContent = '$' + el.rate.value;
      $('#o-share').textContent = el.share.value + '%';
      ids.forEach(function (k) {
        var i = el[k], f = (i.value - i.min) / (i.max - i.min) * 100;
        i.style.setProperty('--fill', f + '%');
      });
    }
    function target() {
      var h = el.people.value * el.hours.value * (el.share.value / 100) * 48;
      return { h: h, c: h * el.rate.value };
    }
    function tween() {
      cancelAnimationFrame(raf);
      var t = target(), s = { h: shown.h, c: shown.c }, t0 = performance.now(), dur = reduce ? 1 : 420;
      (function step(now) {
        var k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3);
        shown.h = s.h + (t.h - s.h) * e; shown.c = s.c + (t.c - s.c) * e;
        outH.textContent = fmt(shown.h); outC.textContent = '$' + fmt(shown.c);
        if (k < 1) raf = requestAnimationFrame(step);
      })(t0);
    }
    ids.forEach(function (k) { el[k].addEventListener('input', function () { paintLabels(); tween(); }); });
    paintLabels(); tween();
  }
})();
