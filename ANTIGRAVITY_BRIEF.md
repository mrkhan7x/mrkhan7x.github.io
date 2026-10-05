# MRKHANSERVICES redesign: strict build brief for Antigravity

Repo: github.com/mrkhan7x/mrkhan7x.github.io  (static HTML, no build step)
Work branch: `redesign`  (NEVER commit to `main`; merge only through a pull request after preview)
Owner: Romeo (Muhammad Roman Khan). Live domain: https://mrkhanservices.site

This file is the single source of truth. Follow it literally. When something here conflicts with your own taste, this file wins. When this file is silent, copy what `index.html` (the finished home page) does.

---------------------------------------------------------------------------

## 0. How to use this brief

1. Open the repo on branch `redesign` in Antigravity.
2. Tell the agent: "Read ANTIGRAVITY_BRIEF.md and tools/DESIGN_KIT.md completely. Then do ONE page from section 8 at a time, in the order listed in section 9. After each page run the checks in section 10 and show me screenshots before moving on."
3. One page per task. Review the screenshots. Commit that page. Next page.
4. Never let the agent edit the three system files (`css/site.css`, `js/site.js`, `tools/shell.py`) unless you are fixing a bug that affects every page. Page work lives in `css/pages/<page>.css` and `js/<page>.js`.

---------------------------------------------------------------------------

## 1. Current state of the repo (already done)

DONE and approved by Romeo ("more than amazing"):
- `index.html` + `css/pages/home.css` + `js/home.js`: the new home page. It is the reference implementation.
- `css/site.css`: the whole design system (tokens, nav, buttons, cards, tilt, morph word, SVG flow, tags, tabs, accordion, demo block, forms, prose, footer, booking modal, reduced motion).
- `js/site.js`: shared behaviour (reveal on scroll, nav state, mobile menu, booking modal triggers and accessibility, spring morph word, tilt, live ms clock, count-up, tabs, Vapi live-demo handler for #demo-btn).
- `tools/shell.py`: stamps the shared nav, footer, booking modal, head and scripts into every page between marker comments. Run `python3 tools/shell.py` after editing any page. Edit the shell ONCE in this file.
- `fonts/`: self-hosted Instrument Serif, IBM Plex Mono, Manrope (no Google Fonts request).
- `404.html`: rebuilt in the new style.
- Domain is `.site` in canonicals, sitemap, robots, llms.txt. Contact email is `contact@mrkhanservices.site` everywhere (Romeo's decision).

NOT DONE (this is your job): every other page still uses the OLD design (old CSS files, `js/main.js`, old markup):
`services/ about/ contact/ voice/ rag/ recruitment/ youtube/ demo/ privacy/ terms/`.
They work, but they look different from the home page. Convert them one by one to the new system, following section 8.

Old files that must NOT be loaded by converted pages: `css/global.css navbar.css hero.css marquee.css we-build.css process.css contact.css modal.css footer.css about.css services.css voice.css rag.css recruitment.css youtube.css projects.css legal.css` and `js/main.js`. Do not delete them until every page is converted and verified; then delete them in a final cleanup commit (also delete the unused React build in `static/` and `asset-manifest.json`, and the old `images/` folder only if nothing references it).

---------------------------------------------------------------------------

## 2. Non-negotiable business facts and copy rules

- Main domain: `.site`. Never write `.com` for the website. Email: `contact@mrkhanservices.site`.
- One CTA label everywhere: **Book an audit**. Secondary link on the home page: "Hear it work". Do not invent other CTA labels ("Let's talk", "Get started", "Strategy call").
- No prices anywhere. After the audit the client gets a fixed quote.
- The offer: GET (new clients: leads answered, qualified, booked), KEEP (onboarding, billing, follow-up), GROW (content, knowledge, reporting). Niche-agnostic systems builder.
- Guarantee: first working system in 7 days; if week one does not save at least 15 hours the client pays nothing; hours are measured on the workflow agreed in the audit. (Romeo must still confirm the exact wording. Keep it exactly as on the home page.)
- Capacity: "2 to 3 new clients each month" (honest scarcity). Never claim more.
- Ownership: the client owns everything. At handover: workflows, schemas, documentation, accounts in the client's name.
- Four production systems: Voice receptionist (/voice/), Knowledge Agent (/rag/), Candidate Qualification Pipeline (/recruitment/), YouTube Content Factory 5 agents (/youtube/). Zero-touch onboarding and billing is described on /services/.
- Builder: Muhammad Roman Khan, BS Artificial Intelligence student, based in Pakistan. LinkedIn https://www.linkedin.com/in/muhammad-roman-khan-8245a0328 , GitHub https://github.com/mrkhan7x , Instagram https://www.instagram.com/mrkhan7x , WhatsApp https://wa.me/923285792098 .
- NEVER publish unproven claims. Remove or rewrite: any percentage lift, hours saved per week, revenue or earnings figures, "zero hallucination", "100%" or "0%" absolutes, latency numbers like "sub-800ms", "replaces an entire team", "proven across verticals", "90% of the work". Describe the mechanism instead ("answers come from your own documents and cite their source"). Keep a list of every claim you removed and give it to Romeo at the end. Facts about the build itself are fine (5 agents, Mon/Wed/Fri schedule, which tools).
- Writing style: outcome first, jargon second, written for a business owner. Short sentences. No em dash or en dash anywhere (use comma, colon, "to", or " | " in titles). No emoji. No "STEP 01" style labels. No eyebrow labels.
- Page titles: `<Page> | MRKHANSERVICES`. Canonical `https://mrkhanservices.site/<path>/`. og:image absolute on the `.site` domain.

---------------------------------------------------------------------------

## 3. Design system (tokens)

Mood: bold editorial confidence on a warm stone canvas, jet black weight, one electric orange signal. Technical, precise, alive. Not beige "artsy", not corporate grey, no purple.

| token | value | use |
|---|---|---|
| --bg | #F5F4F2 | page canvas (limestone) |
| --paper | #FCFBFA | cards |
| --ink | #0A0A0A | text, primary buttons, dark blocks |
| --muted | #5B5852 | secondary text |
| --accent | #FF6B00 | signals, packets, highlights, orange blocks |
| --on-accent | #0A0A0A | text on orange (never white on orange) |
| --line | rgba(10,10,10,.14) | borders |

Rules for colour: orange is never body-text colour on limestone (fails contrast). Orange backgrounds always carry ink text. One accent only. No gradients except the radar sweep and the specular sheen. No shadows except nav-on-scroll and the modal.

Typography triad (all self-hosted in /fonts):
- Display: Instrument Serif 400 (and italic). h1, h2, big numbers, card titles. Put the emphasised phrase of a headline in `<em>` (italic). Letter-spacing -.02em, line-height about .94 to 1.
- Mono: IBM Plex Mono 400/500. Only for data: tags, telemetry, SVG labels, timestamps, clocks, counters, form meta.
- Body: Manrope 500 (800 for buttons and card headings).
Never use Inter, Geist, Playfair, system serif for headings.

Shape language (one system): surfaces 20px radius, inputs 10px, buttons and tags fully pill. No other radii.

Spacing: sections use `section.s` (padding from `--pad`). Content width `.wrap` (1240px max, 24px gutters). Do not add random margins; use the grid helpers.

---------------------------------------------------------------------------

## 4. Motion rules (strict)

1. EASING: only `cubic-bezier(.34, 1.56, .64, 1)` (CSS variable `var(--spring)`). Every transition and keyframe timing uses it. Exception: the radar sweep and the continuous SVG packet travel use `linear` because constant speed is the point.
2. DURATIONS: UI transitions 300 to 500 ms. Ambient loops (packets, bars, beacon) 1.2 to 5 s. Count-ups 900 ms. Nothing slower for a user-triggered response.
3. PROPERTIES: animate only `transform` and `opacity` (plus SVG `stroke-dashoffset`). Never animate width, height, top, left, margin, box-shadow, filter blur.
4. NO scroll listeners on `window`. Use IntersectionObserver (see site.js), CSS scroll-driven animation (`animation-timeline`, with an `@supports` fallback), or `position: sticky`.
5. Pause offscreen: SVG flows only run while visible (site.js toggles `.live` on `svg.flow`). Keep that contract.
6. `prefers-reduced-motion`: everything you add must have a reduced-motion rule that stops loops and shows the final state. site.css already handles the shared components.
7. Tap feedback: every button and clickable card has `:active { transform: scale(.97) }` (provided by `.btn`; copy it for custom controls).

### Shared motion components (already coded, just use them)

- Reveal on scroll: add class `rv` (optional `style="--rd:2"` for stagger, one step = 70ms).
- Morphing word: `<span class="morph" data-morph="2400"><span class="w">one</span><span class="w">two</span></span>`. Spring scale and vertical translate. 3 to 5 words, each short.
- Tilt card: `class="card tilt"`. Pointer-driven 3D tilt (max 7deg) and a diagonal specular sheen (`linear-gradient(120deg, ...)`) that follows the cursor. Touch devices get no tilt.
- Painted stroke: `<svg class="paint" viewBox="0 0 600 40"><path d="..." pathLength="1" stroke-width="12"/></svg>`. Draws itself when revealed; the global `#paint` filter (feTurbulence + displacement) makes it look brushed. Use it to "paint on top of" images: under a headline word, across the bottom of a screenshot, circling a node.
- Live clock: `<b data-clock>--:--:--</b>` shows the visitor's local time with milliseconds.
- Count-up: `<b data-count="4">0</b>` (optional `data-suffix="%"`). Only for true numbers.
- Radar beacon: `<span class="beacon"><i></i></span>` (two spring pings).
- Ticker (single marquee per page max): `.ticker` with `.ticker-track` containing duplicated `<span>` items. Text only.

### SVG pipeline recipe (the signature element)

Every schematic is inline SVG with class `flow`. A line and a travelling packet use the SAME path data:

```html
<svg class="flow" viewBox="0 0 600 200" role="img" aria-label="describe the flow">
  <path class="ln" d="M60 100 C 200 100, 220 40, 340 40" pathLength="100"/>
  <path class="pk" d="M60 100 C 200 100, 220 40, 340 40" pathLength="100" style="--pd:-1.2s"/>
  <circle class="nd" cx="60" cy="100" r="22"/>
  <circle class="nd hot" cx="340" cy="40" r="22"/>
  <text x="60" y="140" text-anchor="middle">inbound</text>
</svg>
```
- `pathLength="100"` on every path so the packet (`stroke-dasharray: 7 93`) is the same length everywhere.
- Offset several packets on one path with `--pd` negative delays so they chase each other.
- Branches: one `ln`+`pk` pair per branch. Merges the same.
- Dark background: wrap in an element with class `on-ink` (or put `on-ink` on a parent).
- Hot node (`.nd.hot`, orange) = the decision/router/AI step. Dark node (`.nd.dark`) = final record/log. Normal = plain step. Max one hot node per schematic.
- Labels: SVG `<text>` is mono 11 px. First line = what it is, optional second line (`class="dim"`) = the data (e.g. "n8n switch", "pinecone index", "POST /webhook/...").
- Interactivity (optional but encouraged on case-study pages): make nodes focusable (`tabindex="0"`, `role="button"`), on hover/focus/click show a detail panel beside the SVG (input, output, tool). Keyboard accessible.

### "Paint on top of elements"

Layer SVG over real screenshots and cards: (a) an orange glowing trace path with a packet travelling over an n8n canvas screenshot (see `.hero-card` in home.css), (b) glass mono tags (`.tag.glass`) pinned on the trace with real data ("POST /webhook/vapi-voice-router", "intent book"), (c) a painted brush stroke across the lower edge. Overlays are decorative: `aria-hidden="true"`.

---------------------------------------------------------------------------

## 5. SVG illustration rules (bespoke, no stock icons)

Banned: emoji, icon fonts, Font Awesome, Heroicons, the old `/icons/*.svg` brand logos, stock photography, 3 identical icon cards.

Style spec for every glyph/illustration:
- Stroke-only line art, `stroke="#0A0A0A"`, `stroke-width="1.8"`, `stroke-linecap="round"`, `stroke-linejoin="round"`, `fill="none"`. Optional single filled accent in orange or ink (a dot, a node).
- Drawn on a 48 x 48 box centred at (0,0), placed with `transform="translate(x y)"` inside a 56 to 68 px circle node.
- Geometry only: circles, rounded rects (rx 3 to 6), straight lines, simple arcs. No gradients, no detailed clip art.
- Consistency: same stroke weight, same corner rounding, same node sizes on one page.

Glyph library used on the home ribbon (copy these exactly):
- inbound (signal/phone): `<circle cx="-8" cy="6" r="2.4" fill="#0A0A0A"/><path d="M-4 -2 A 11 11 0 0 1 6 8"/><path d="M-5 -10 A 19 19 0 0 1 14 9"/>`
- qualify (funnel): `<path d="M-13 -10 H13 L3 3 V13 L-3 10 V3 Z"/>`
- route (fork): `<path d="M-14 0 H-3 M-3 0 L8 -10 H15 M-3 0 L8 10 H15 M11 -14 L15 -10 L11 -6 M11 6 L15 10 L11 14"/>`
- book (calendar): `<rect x="-11" y="-9" width="22" height="19" rx="3"/><path d="M-11 -2 H11 M-5 -12 V-6 M5 -12 V-6"/><circle cx="-4" cy="4" r="1.2" fill="#0A0A0A"/>`
- notify (envelope): `<rect x="-12" y="-8" width="24" height="16" rx="3"/><path d="M-12 -8 L0 2 L12 -8"/>`
- log (ledger rows, on a dark node, stroke #F5F4F2): `<path d="M-10 -8 H10 M-10 0 H10 M-10 8 H3"/><circle cx="9" cy="8" r="2" fill="#FF6B00" stroke="none"/>`
Invent new glyphs in the same language for: document, database/vector grid, microphone, calendar-check, person/candidate, score gauge, video frame, waveform, webhook, sheet, shield (handover/ownership).

Illustration patterns to reuse (all in index.html): waveform bars (scaleY loop), document stack + vector dot grid + answer bubble (knowledge), funnel bars (recruitment, scaleX with spring), five numbered agent nodes on a line (content factory), 7-day timeline with packet, radar with sweep and blips.

Accessibility for SVG: informative schematics get `role="img"` and an `aria-label` that states the flow in a sentence; decorative overlays get `aria-hidden="true"`.

---------------------------------------------------------------------------

## 6. Components cheat sheet (all in css/site.css)

`.wrap` `section.s` `.g2 .g3 .g4` `.split` `.split.rev` `.sticky-h` `.pad` | `h1 h2 h3 .lead .mono .muted .num .ink-hi` | `.tag (.ink .glass)` | `.btn (.ink .orange .ghost .sm)` + `<span class="arr">&rarr;</span>` | `.card (.ink .orange) .tilt` | `.morph` | `svg.flow .ln .pk .nd(.hot .dark)` | `.paint` | `.beacon` | `.telemetry` | `.ticker` | `.phero` (inner page hero) | `.tabs .tab .panel` | `details.acc` | `.demo-card.on-ink` `.wave` `.call` | `.field` | `.prose` | `.end` | `.foot` (stamped) | booking modal (stamped).

Primary CTA markup (use verbatim):
`<a href="/contact/" class="btn ink" data-action="open-booking">Book an audit <span class="arr" aria-hidden="true">&rarr;</span></a>`
(`data-action="open-booking"` opens the modal; without JS it falls through to /contact/.)

Page skeleton:
```html
<!DOCTYPE html><html lang="en" class="no-js"><head>
 <meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/>
 <title>Services | MRKHANSERVICES</title>
 <meta name="description" content="..."/>
 <link rel="canonical" href="https://mrkhanservices.site/services/"/>
 <!-- og:title og:description og:url og:image twitter:card -->
 <!--SHELL:HEAD--><!--/SHELL:HEAD-->
 <link rel="stylesheet" href="/css/pages/services.css"/>
</head><body>
 <!--SHELL:TOP--><!--/SHELL:TOP-->
 <!--SHELL:NAV--><!--/SHELL:NAV-->
 <main id="main"> ... </main>
 <!--SHELL:FOOT--><!--/SHELL:FOOT-->
 <!--SHELL:MODAL--><!--/SHELL:MODAL-->
 <!--SHELL:SCRIPTS--><!--/SHELL:SCRIPTS-->
 <script src="/js/services.js"></script> <!-- only if needed -->
</body></html>
```
Then run `python3 tools/shell.py`.

---------------------------------------------------------------------------

## 7. Composition rules (anti-slop)

- No eyebrow labels (small caps line above a heading). Mono tags live INSIDE cards or on figures and always carry data (a path, a stack, a value).
- Hero: headline at most 2 to 3 lines, one lead sentence (about 20 words), 2 CTAs max, a telemetry row. It must fit the first screen on desktop.
- Never three equal cards in a row as the main idea. Vary: bento with unequal spans, split layouts, sticky heading + scrolling column, sticky card stack, timeline, tabbed panel.
- One marquee per page at most. No scroll-down arrows. No fake dashboards made of divs: if it looks like data it must be a labelled schematic or real numbers.
- Each section earns its place by answering a client question: what do you do, can I trust it, how does it work, what does it cost me (not prices, the audit), what do I get, how do I start.
- Each page ends with the `.end` closing block (dark, big serif sentence, "Book an audit").
- Generous whitespace. Do not fill empty space with decoration.
- Mobile at 390px: single column, no horizontal page scroll (wide SVGs may scroll inside their own container), tap targets 44px or more.

---------------------------------------------------------------------------

## 8. Page specs (do in the order of section 9)

Common to all: keep real facts; rewrite copy per section 2; remove unproven claims; use the skeleton; add `.rv` reveals; at least one animated bespoke SVG schematic per page (except legal); end with `.end`.

### 8.1 /services/  (css/pages/services.css, optional js/services.js)
Current: 67 KB old page with industry lists, four systems, a Vapi script, a booking modal.
Becomes the home of all the detail removed from the home page.
1. `.phero`: serif h1 with italic phrase (e.g. "Systems that answer, onboard and *keep working*."), lead, `Book an audit` + ghost link to #systems.
2. GET / KEEP / GROW as a sticky heading column with three large stacked panels (not equal cards): GET = voice receptionist, lead and candidate intake; KEEP = zero-touch onboarding, billing, follow-up; GROW = content factory, knowledge agent, reporting. Each with a small bespoke SVG.
3. `#systems`: four tilt cards (unequal bento) each with a LARGER version of its home schematic, a data tag line, 2 to 3 outcome sentences, link to /voice/ /rag/ /recruitment/ /youtube/.
4. "Built around your industry": the old page lists many industries (dental and healthcare, e-commerce, finance, local services, marketing agencies, photography studios, PPC, creative studios, social agencies, MSPs, real estate, brokers, B2B SaaS, enterprise teams, executive coaching). Present as a compact ledger/ticker or two-column mono list with one-line "what gets automated" each. Reword "proven across verticals" to "adapts to" (no proof claims).
5. Process as a sticky stack of 4 big cards (pure CSS sticky, `--i` offsets): Audit, Scope, Build, Support (copy in home guide: audit = review tools, map where time is lost, no obligation; scope = written roadmap, timeline, exact deliverables, fixed quote; build = build, connect, test in staging with updates, launch; support = monitor logs, tune accuracy, extend as volume grows).
6. Guarantee block: `.num` 7 days, 15 hours (data-count), 7-day timeline SVG (copy from home), capacity line.
7. FAQ accordion (ownership, cost = fixed quote after audit, tool compatibility, after launch, capacity).
8. `.end`.

### 8.2 /about/  (css/pages/about.css)
Current content: "The engineer behind your AI systems", BS AI foundation, deep learning and PyTorch, data engineering, "production B2B systems we stand behind".
1. `.phero` with portrait (`/assets/images/mrk-profile.jpg`) in a tilt card + painted stroke + glass tag; keep `id="about-story"` on the story section (footer links to `/about/#about-story`).
2. Story in 3 to 4 short paragraphs in first person, serif pull quote.
3. "How I work" animated SVG: client problem -> map workflow -> build -> hand over, with packets.
4. Stack ledger in mono, TEXT only: n8n, Vapi, Pinecone, OpenAI, Make, JavaScript, Python, PyTorch (only items the old page actually lists).
5. Principles: 3 big serif statements (you own it; one person you can reach; measured in hours saved). Not equal cards: alternating split rows.
6. Education/foundation facts from the old page (BS Artificial Intelligence, deep learning/PyTorch, data engineering and analytics pipelines). No earnings or client-count claims.
7. Links: LinkedIn, GitHub. `.end`.

### 8.3 /contact/  (css/pages/contact.css)
Current: "Let's talk.", direct channels, booking modal.
1. `.phero`: h1 "Let's find the *hours* you are losing." (or similar), primary `Book an audit` (opens modal) and the guarantee line.
2. "What happens after you book": animated 3-beat SVG pipeline (booked -> 30 min audit on Google Meet -> written list of what to automate first).
3. Direct channels as rich cards with bespoke glyphs: email contact@mrkhanservices.site, WhatsApp, LinkedIn, GitHub, Instagram. Each a real link.
4. Live local-time telemetry and "2 to 3 new clients each month".
5. Small FAQ accordion. `.end`.
Booking modal is stamped by the shell. If the old page had a message form keep its submit logic exactly.

### 8.4 /voice/  (css/pages/voice.css, js/voice.js)
Current: hero with live sandbox call, architecture explanation (WebRTC stream via Vapi, vector search, deterministic router, database sync), "numbers that move revenue", canvas lightbox, blueprint download.
MUST PRESERVE exactly: the Vapi SDK script `https://cdn.jsdelivr.net/gh/VapiAI/html-script-tag@latest/dist/assets/index.js`; `window.VAPI_CONFIG` (apiKey 7adae33d-4975-462a-bcb0-ef90c937c684, assistant 9de09a23-7f03-473f-bcda-45f8435dd1f3, assistantOverrides serverUrl and server.url `https://n8n.mrkhanservices.site/webhook/vapi-voice-router`, position bottom-right, buttonConfig text "Talk to My AI Receptionist" color #141416) ; the start/stop logic (`vapi.start(assistant, assistantOverrides)`, `vapi.stop()`), events call-start, call-end, speech-start, speech-end, volume-level, error; the mic-permission messages; the blueprint link `/assets/blueprints/vapi-multi-tenant-voice-router.json`; canvas image `/assets/images/vapi-n8n-canvas.png`.
Easiest: reuse `#demo-btn #demo-label #demo-status #demo-wave` (12 `<i>` bars): site.js already runs the full Vapi flow when `window.VAPI_CONFIG` exists. If you build a different UI (orb, timer) write the logic in js/voice.js and do not reuse those ids.
Layout: hero + live-call card (dark `.demo-card.on-ink`); big interactive SVG architecture (nodes: caller, Vapi voice stream, n8n router, Pinecone lookup, calendar, Slack/email alert, sheet log) with hover/focus detail panel; real canvas screenshot card with painted orange trace and click-to-enlarge lightbox (accessible dialog, Esc closes); outcomes section without numbers; blueprint download button; `.end`.

### 8.5 /rag/  (css/pages/rag.css, js/rag.js)
Current: "Turn your company data into an autonomous knowledge engine", 3-stage pipeline (ingestion and cleansing, semantic chunking and Pinecone indexing, grounded agent and real-time webhook), four use cases (shopping assistant, technical knowledge base and onboarding bot, pre-qualification and appointment intake agent, internal SOP and handbook engine).
Layout: hero; big animated SVG of the 3 stages (documents -> cleanse -> chunks -> Pinecone vector grid -> grounded agent -> webhook answer with source); use cases as an unequal bento, each with a small bespoke SVG; honest wording: "answers are grounded in your own documents and show their source" (remove "zero hallucination"); keep any chat widget or Vapi snippet the old page includes working; `.end`.

### 8.6 /recruitment/  (css/pages/recruitment.css, js/recruitment.js)
Current: "Autonomous Candidate Intake and AI Qualification Pipeline", LangChain extractor, flow (instant webhook ingestion, AI skill and fit extraction, centralized database sync, high-priority team alert), an interactive canvas with tabs `tab-screenshot` / `tab-interactive` and a node inspector (`node-inspector`, `inspect-title`, `inspect-label`, `inspect-desc`), blueprint `/assets/blueprints/ai-recruitment-lead-qualification.json`, image `/assets/images/n8n-recruitment-canvas.png`.
Keep the interactive node-inspector concept and its facts; rebuild in the new style (SVG nodes focusable, panel updates, no "STEP 01" labels). Add an animated candidate "packet" travelling the pipeline while a score bar fills (spring). Real screenshot card with painted trace + enlarge. Blueprint download. `.end`.

### 8.7 /youtube/  (css/pages/youtube.css, js/youtube.js)
Current: "Autonomous 5-Agent YouTube Content Factory", What it does, What problem it solves, blueprint `/assets/blueprints/youtube-autonomous-content-factory.json`, image `/assets/images/youtube-autonomous-content-factory.png`.
Facts: agents = (1) Trend and Hook Strategist (Reddit API or webhook topic triggers), (2) Script and Scene Architect (8-second visual scene prompts), (3) ElevenLabs Voiceover Engine, (4) Video Assembly Specifier (durations, timestamps, cut points for Shotstack / Remotion / Creatomate), (5) Packaging and SEO Specialist (3 title variations, descriptions, tags, chapters); then logging to Google Sheets and the package returned via webhook; autopilot schedule Mon/Wed/Fri; stack n8n, Gemini/OpenAI, ElevenLabs, Reddit API, Google Sheets.
Signature interaction: horizontal chain of 5 agent nodes; selecting one shows input, output, tool in a panel while a packet travels to it. Remove "15-20 hours saved weekly", "replaces a content team", "90%". Blueprint download. `.end`.

### 8.8 /demo/  (css/pages/demo.css, js/demo.js)
Current: a jewelry-store sales and cash-on-delivery chatbot demo with a composer form (`#composer`), messages, webhook calls. FIRST read the current `demo/index.html` and its JS completely; keep every endpoint, payload shape and session handling unchanged.
New: paper chat card (message bubbles with spring entry, mono timestamps, typing indicator, quick-reply chips) beside an explanatory column with an animated SVG (message -> webhook -> agent -> order confirmation) and stack tags. Title "Live Sales Chatbot Demo | MRKHANSERVICES".

### 8.9 /privacy/ and /terms/  (shared css/pages/legal.css)
Keep the legal text word for word. Only: fix dashes, replace website URLs `.com` -> `.site`, email -> contact@mrkhanservices.site. Note privacy section 1 title contains the absolute "100% Client Ownership": flag it to Romeo, keep the text as is until he approves a rewrite. Layout: `.phero` + sticky table of contents (built from the h2s with a tiny script) + `.prose`.

### 8.10 Home page polish (optional, after all pages)
Do not redesign. Allowed: (a) the hero mini card (bottom-left) needs a slightly stronger border/shadow; (b) add alt text check; (c) test the Vapi call on the live preview. Everything else stays.

---------------------------------------------------------------------------

## 9. Order of work

1. services  2. contact  3. about  4. voice  5. rag  6. recruitment  7. youtube  8. demo  9. privacy + terms  10. cleanup commit (delete old CSS/JS, update sitemap lastmod if desired)  11. full-site QA (section 10) then pull request.

---------------------------------------------------------------------------

## 10. Verification (run after EVERY page; no exceptions)

1. `python3 tools/shell.py`
2. Serve the repo root: `python3 -m http.server 8000` and open http://localhost:8000/<page>/ in Antigravity's browser. Absolute paths (`/css/...`) only work when the repo root is the web root, never by double-clicking the file.
3. Look at desktop (1366 wide) and mobile (390 wide). Scroll the whole page. Check: no overlapping text, no clipped words, no empty voids, no horizontal scroll, headline hierarchy obvious, every SVG animates, nav and footer identical to home.
4. Browser console: 0 errors. (External CDN failures in a sandbox are not errors on the real site.)
5. Interactions: booking modal opens from every "Book an audit", picks a date and slot, form posts; mobile menu opens; tabs/accordions/inspectors work with the keyboard; Vapi call starts on /voice/ and home (microphone permission).
6. Banned-character scan (must print nothing): `grep -rnP "[\x{2013}\x{2014}]" --include=*.html . ; grep -rn "mrkhanservices\.com" --include=*.html --include=*.xml --include=*.txt . ; grep -rn "info@mrkhanservices" .`
7. Emoji scan: search the page for emoji; there must be none.
8. Link check: every `href`/`src` that starts with `/` exists on disk.
9. Reduced motion: enable "prefers-reduced-motion" in devtools; page must be calm and fully readable.
10. Lighthouse (desktop): Accessibility >= 95, Best practices >= 95. Fix contrast or label issues it flags.
11. Re-read section 2 and confirm no unproven claim slipped in.

Optional screenshot helper (needs `pip install playwright && playwright install chromium`): `python3 tools/shots.py http://localhost:8000/services/ /tmp/s- 1366 y=0 "#systems"`.

---------------------------------------------------------------------------

## 11. Git and release workflow

```
git checkout redesign
git pull
# work one page, verify (section 10)
git add -A
git commit -m "services: new design system page"
git push origin redesign
```
When all pages pass: open a pull request `redesign` -> `main`, check the host preview (Netlify/Vercel/Cloudflare build the branch; plain GitHub Pages does not preview), test the Vapi call and the booking modal on the preview, then merge. Never push to `main` directly. If anything looks wrong: do not merge.

---------------------------------------------------------------------------

## 12. Open decisions for Romeo (agent: do not decide these, list them in your final report)

1. Exact guarantee wording (7 days / 15 hours / measured on the audit workflow).
2. Proof for any removed number (if Romeo has real client data, it can come back with source).
3. Privacy page "100% Client Ownership" absolute.
4. Whether to keep the booking modal times (09:00 to 16:00 slots in booking.js) and the webhook `https://primary-production-4c8d.up.railway.app/webhook/portfolio-contact`; its mailto fallback now uses contact@mrkhanservices.site.
5. Hosting identification (GitHub Pages vs Netlify/Cloudflare). `_headers` and `_redirects` only work on Netlify/Cloudflare Pages; on GitHub Pages they are ignored.
6. Light theme only (the dark toggle was removed on purpose to match the brief).

---------------------------------------------------------------------------

## 13. Master prompt to paste into Antigravity (copy as is)

```
You are working in the repo mrkhan7x/mrkhan7x.github.io on branch redesign.
Read ANTIGRAVITY_BRIEF.md and tools/DESIGN_KIT.md completely before doing anything.
Reference implementation: index.html, css/site.css, css/pages/home.css, js/site.js, js/home.js. Open the home page in the browser and study it.

Task: convert the page <PAGE> to the new design system, following the page spec in section 8 of the brief, the motion rules in section 4, the SVG rules in section 5 and the composition rules in section 7. Preserve every functional integration listed for that page. Do not edit css/site.css, js/site.js or tools/shell.py. Put page CSS in css/pages/<page>.css and page JS in js/<page>.js.

Be ambitious: bespoke hand-drawn SVG schematics with travelling packets, painted strokes over real screenshots, spring motion, tilt cards with specular sheen, data-carrying mono tags, count-ups, clocks. Never fake data, never use stock icons or photos.

When done: run python3 tools/shell.py, serve the site, screenshot desktop and mobile, fix everything you see, run every check in section 10, then report: files changed, claims removed, open questions, screenshots reviewed. Do not start another page until I approve.
```
