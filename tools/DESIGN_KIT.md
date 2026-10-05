# MRKHANSERVICES design kit (read before touching any page)

Reference implementation: `/index.html` + `/css/pages/home.css` + `/js/home.js`. Open it, look at it, copy its patterns.
System files (DO NOT EDIT): `/css/site.css`, `/js/site.js`, `/tools/shell.py`.
Your page-specific CSS goes in `/css/pages/<page>.css`; page-specific JS in `/js/<page>.js` (or inline).

## Page skeleton (every page)
```html
<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
  <meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>... | MRKHANSERVICES</title>   <!-- use " | " never an em dash -->
  <meta name="description" content="..." />
  <link rel="canonical" href="https://mrkhanservices.site/<path>/" />
  <!-- og:title, og:description, og:url, og:image, twitter:card as in the current page, domain .site -->
  <!--SHELL:HEAD--><!--/SHELL:HEAD-->            <!-- favicons, fonts, site.css, js class -->
  <link rel="stylesheet" href="/css/pages/<page>.css" />
</head>
<body>
  <!--SHELL:TOP--><!--/SHELL:TOP-->
  <!--SHELL:NAV--><!--/SHELL:NAV-->
  <main id="main"> ... </main>
  <!--SHELL:FOOT--><!--/SHELL:FOOT-->
  <!--SHELL:MODAL--><!--/SHELL:MODAL-->
  <!--SHELL:SCRIPTS--><!--/SHELL:SCRIPTS-->      <!-- booking.js + site.js -->
  <script src="/js/<page>.js"></script>           <!-- optional -->
</body></html>
```
After writing run `python3 tools/shell.py` from the repo root: it fills every marker pair (nav with the active link, footer, booking modal, scripts). Never hand-write nav/footer/modal.
Any "Book an audit" CTA: `<a href="/contact/" class="btn ink" data-action="open-booking">Book an audit <span class="arr" aria-hidden="true">&rarr;</span></a>`. One CTA label only: "Book an audit".

## Tokens
Colours: `--bg #F5F4F2` limestone, `--paper #FCFBFA`, `--ink #0A0A0A`, `--muted #5B5852`, `--accent #FF6B00` (never as text colour on limestone; use ink text on orange), `--line`.
Fonts: `--display` Instrument Serif (headlines, big numbers; italic `<em>` for the emphasised phrase), `--mono` IBM Plex Mono (data tags, telemetry), `--sans` Manrope (body, buttons).
Easing: `var(--spring)` = cubic-bezier(.34,1.56,.64,1) for EVERY transition and animation. Durations 300 to 500ms (ambient loops may be longer). Only animate transform and opacity (plus SVG stroke-dashoffset).
Radii: surfaces `--r-surface` 20px, inputs `--r-input` 10px, pills 999px. Nothing else.

## Components (all in site.css)
- Layout: `.wrap` (max-width + gutters), `section.s` (vertical padding), `.g2/.g3/.g4` grids, `.split` (5fr/7fr) and `.split.rev`, `.sticky-h` (sticky heading column), `.pad`.
- Type: `h1`,`h2` (serif), `h3` (sans bold), `.lead` (muted intro paragraph), `.mono`, `.muted`, `.display`, `.num` (huge serif number), `.ink-hi` (orange underline highlight).
- `.tag`: mono pill that ALWAYS carries data (a path, stack, value). Variants `.ink`, `.glass`. `<b>` inside = orange separator/value. Example `<span class="tag">vapi <b>/</b> n8n <b>/</b> pinecone</span>`.
- Buttons: `.btn` + `.ink` | `.orange` | `.ghost`, `.sm`, with `<span class="arr">` arrow chip.
- Cards: `.card` (paper surface) + `.ink` | `.orange`; add `.tilt` for 3D tilt + specular sheen on hover (needs `position:relative; overflow:hidden`, already in .card).
- Morph word: `<span class="morph" data-morph="2400"><span class="w">one</span><span class="w">two</span></span>` (spring scale + vertical translate).
- Painted stroke over things: `<svg class="paint" viewBox=...><path d="..." pathLength="1" stroke-width="12"/></svg>` (draws itself on reveal; the shared `#paint` filter roughens it).
- SVG schematics: `<svg class="flow" viewBox=...>` containing `<path class="ln" pathLength="100" d=...>` (base line) and `<path class="pk" pathLength="100" d=... style="--pd:-1.2s">` (glowing packet travelling along the same d via stroke-dashoffset; starts automatically when the svg is on screen). Nodes: `<circle class="nd">`, `.nd.hot` (orange), `.nd.dark`. Labels: `<text>` (mono, 11px) and `<text class="dim">`. Wrap in `.on-ink` for dark backgrounds.
- Telemetry: `.telemetry` row with `<b data-clock>` (live ms clock), `<b data-count="4">0</b>` (count-up on reveal, optional `data-suffix`). `.beacon` = radar ping dot: `<span class="beacon"><i></i></span>`. Only show numbers that are TRUE (counts of things that exist, the viewer's local time). Never fake live stats.
- Reveal: add `.rv` (and optional `style="--rd:2"` stagger index) to anything that should rise in on scroll.
- Tabs: `[role=tablist]` with `.tab` buttons and `.card.panel` panels (see home). Accordion: `<details class="acc"><summary>Q <span class="pm">+</span></summary><div class="in2">A</div></details>`.
- Inner page hero: `<section class="phero"><div class="wrap"> <h1>..</h1> <p class="lead">..</p> <div class="cta">..</div></div></section>`.
- Dark demo block: `.demo-card.on-ink`. Closing block: `.end` (see home; radar svg is in home.css `.radar`, copy it if wanted). Forms: `.field` (label+input/textarea/select). Legal text: `.prose`. Single marquee max: `.ticker`.
- Bespoke SVG icons: draw your own (1.8px ink strokes, round caps, 48px box, see the ribbon glyphs in index.html: phone/signal, funnel, fork, calendar, envelope, ledger). NEVER use stock icon packs, emoji, the old `/icons/*.svg` logos or stock photos.

## Hard rules (the "no slop" list)
1. No eyebrow labels (a small caps line above a headline). Mono tags live inside cards/figures and must hold data.
2. No em dash or en dash anywhere (use commas, colons, "to", or " | " in titles). No emoji. No "STEP 01" labels.
3. No three-equal-cards rows as the main idea; vary sizes (bento, split, sticky stack, timeline). Max one marquee per page.
4. Copy: keep the meaning and technical facts of the existing page, rewrite for clarity and a business-owner reader (outcome first, jargon second). Do NOT carry over unproven performance or revenue claims (percent lifts, hours saved, revenue figures, "zero hallucination", "100%/0%" absolutes, latency numbers, award/earnings claims). Instead describe what the system does. Keep a list of every claim you removed and report it.
5. Domain is `.site`. Email stays info@mrkhanservices.com. Keep every functional integration (webhook URLs, Vapi config, fetch endpoints, form handlers, blueprint download links in /assets/blueprints/) working exactly as before.
6. Accessibility: one h1, landmarks, alt text, visible focus (provided), `prefers-reduced-motion` handled for anything you add, tap targets >= 44px, contrast AA (ink on limestone / limestone on ink / ink on orange).
7. Nothing from the old css (global.css, navbar.css, etc.) or js/main.js is loaded any more. If old main.js behaviour mattered on your page (project popup, marquee drag, lightbox), re-implement the part you keep in your own page JS or drop it deliberately.
8. Mobile first-class: check 390px width. No horizontal page scroll.

## Verify before you finish
- `python3 tools/shell.py`
- Serve: `python3 -m http.server <your port>` from repo root (background). Screenshot: `python3 tools/shots.py http://localhost:<port>/<page>/ /tmp/claude-0/<name>- 1366 y=0 "#id" ...` then Read the png files. Also 390 wide. (External CDNs fail in this sandbox; ignore ERR_TUNNEL.) Look at every section, fix overlap, empty space, clipped text, weak hierarchy. Do at least two rounds.
- Console errors must be 0 (script prints them).
- `grep -nP "\x{2014}|\x{2013}" yourfile` must be empty (use `grep -nP "[\xE2\x80\x94\xE2\x80\x93]"` style if needed), no emoji.
- All local href/src paths exist.
