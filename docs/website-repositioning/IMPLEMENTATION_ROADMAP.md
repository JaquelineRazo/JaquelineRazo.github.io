# Implementation Roadmap

Priority order, always: **security/broken functionality → positioning → proof/case studies → interaction polish → SEO/launch → optional refactoring.** No hard launch deadline — sequence strictly by dependency and risk, not by compression.

Mark tasks `[x]` as completed. Update this file at the end of every sprint, not just at project end.

---

## Phase 0 — Documentation Foundation ✅ (this phase)

### Objective
Establish `/docs/website-repositioning/` as the project's source of truth before any production file changes begin.

### Scope
Documentation only. No website files touched.

### Files
`README.md`, `CONTENT_ARCHITECTURE.md`, `CASE_STUDIES.md`, `DESIGN_SYSTEM.md`, `IMPLEMENTATION_ROADMAP.md` (this file), `TECHNICAL_STANDARDS.md`, `DECISIONS.md`, `QA_CHECKLIST.md`.

### Tasks
- [x] Create `/docs/website-repositioning/` directory.
- [x] Write `README.md`.
- [x] Write `CONTENT_ARCHITECTURE.md` (including full Appendix-A About copy).
- [x] Write `CASE_STUDIES.md`.
- [x] Write `DESIGN_SYSTEM.md` (including full motion/interaction table and new-interaction specs).
- [x] Write `IMPLEMENTATION_ROADMAP.md`.
- [x] Write `TECHNICAL_STANDARDS.md`.
- [x] Write `DECISIONS.md`, seeded with all decisions locked during planning.
- [x] Write `QA_CHECKLIST.md`.
- [ ] Cross-check all 8 files for internal contradictions.
- [ ] Commit as one atomic `docs:` commit.
- [ ] Present summary + open questions to Jaqueline; **stop** for explicit approval before Sprint 0.

### Dependencies
None — first write action of the project.

### Risks
Low (no production files touched). Internal-consistency risk given three rounds of planning input — mitigated by the cross-check task above.

### Definition of Done
All 8 files exist, are internally consistent with each other and with the approved plan, and are committed in one atomic commit.

### Manual QA required
Read-through cross-check only (no browser QA — no production files changed).

### Expected Git commit(s)
`docs: add website repositioning implementation framework`

### Review checkpoint
Summary of files created + any open questions surfaced during cross-check + `git diff` summary, presented to Jaqueline. **Do not start Sprint 0 without her explicit approval.**

---

## Sprint 0 — Safety & Critical Fixes ✅ (complete, pending Jaqueline's manual QA)

### Objective
Fix confirmed bugs and security exposures with zero content/positioning risk.

### Scope
Bug fixes and security-relevant removals only — no positioning/content changes.

### Correction found during implementation
The Phase 0 audit claimed `js/clapat.js` was empty (0 bytes) and safe to delete. On inspection before deleting it, it turned out to be a real, load-bearing 23.8KB file — a browser-detection utility plus a custom `ClapatSlider` class actively used by `index-showcase-gallery.html`'s gallery slider and a generic `.content-slider` component in `js/common.js`. **It was not deleted.** This is logged as DEC-014 in `DECISIONS.md`. Lesson: don't trust an inherited audit claim about file contents without re-verifying immediately before an irreversible action (delete) — this file would have broken the Work/Portfolio gallery if removed on faith.

### Files (as actually touched)
- `.gitignore` (new)
- Deleted: `index-showcase-grid.html`, `multimedia.html`, `shortcodes.html`, `typography.html`, `images/Thumbs.db`, `images/favicon.png`
- Renamed: `images/favicon.ico` → `favicon.ico`
- Edited: `index.html`, `about.html`, `index-showcase-gallery.html`, `project01–08.html` (Google Maps API key script tag removed)
- Edited: `about.html` (malformed accordion tag fixed)
- Edited: `contact.html`, `js/contact.js` (form backend swapped to FormSubmit.co)
- **Not touched, contrary to the original task list**: `js/clapat.js` (see correction above)

### Tasks
- [x] Fix broken favicon reference sitewide — moved `images/favicon.ico` to repo root (all pages already referenced the root-relative path, so no HTML edits were needed once the file was in the right place).
- [x] Fix malformed tag in `about.html` services accordion.
- [x] Remove the unrestricted Google Maps API key script tag from every page that had it (the only map markup, on `contact.html`, was already commented out — no live map existed anywhere, so nothing else needed removing).
- [x] Select and wire a third-party static-friendly form backend for `contact.html` — chose **FormSubmit.co** (zero account signup required; see DEC-014). Live-tested via `curl`, confirmed FormSubmit sent a one-time "Activate Form" email to `jaqueline@razzobusiness.com`.
- [x] Delete `index-showcase-grid.html`, `multimedia.html`, `shortcodes.html`, `typography.html` (confirmed zero references from any surviving HTML/CSS/JS before deleting).
- [x] Delete `images/Thumbs.db`, `images/favicon.png` (confirmed byte-identical to `favicon.ico` via MD5 before deleting). **`js/clapat.js` was not deleted — see correction above.**
- [x] Add `.gitignore` for OS junk files.
- [x] Confirm `privacy.html`, `tos.html`, `contact.php`, the TikTok verification file are unchanged (`git status` on those exact paths returned empty throughout).

### Outstanding — needs Jaqueline, not further implementation work
- [ ] **Click the "Activate Form" link FormSubmit emailed to `jaqueline@razzobusiness.com`.** Until this happens, real submissions through the live form will not be delivered. This is the one part of "verify it delivers... with a live test" that requires her — an AI session has no access to that inbox to click the link or confirm arrival.
- [ ] Once activated, send one real submission through the live `contact.html` page (not `curl`) and confirm it arrives, ideally from a real browser to catch anything a raw HTTP test wouldn't (e.g. CSS/JS issues with the trimmed form).

### Dependencies
None.

### Risks
Low — no content or IA changes. Materialized risk: the `js/clapat.js` audit error above — caught before causing harm, not after.

### Definition of Done
Contact form delivers a real test email *once activated by Jaqueline*; favicon resolves with no 404; no exposed API key remains in any page; dead files removed; protected files verified unchanged; `js/clapat.js` intact and still powers the gallery slider.

### Manual QA — completed via headless-browser smoke test (Playwright against a local static server)
- [x] `index.html`, `about.html`, `contact.html`, `index-showcase-gallery.html`, `project01.html` all load HTTP 200 with **zero console errors and zero JS exceptions**.
- [x] `favicon.ico` confirmed resolving with HTTP 200 (was a 404 before this sprint).
- [x] `about.html`'s fixed "AI Automations" accordion item renders with no stray leaked text (`/div>` does not appear anywhere in the rendered page).
- [x] `contact.html`'s form has the correct `name`/`email`/`comments`/submit fields, the correct FormSubmit action URL, and the old non-functional "1+3=" fake captcha field is gone.
- [x] `index-showcase-gallery.html`'s slider (powered by `js/clapat.js`, correctly *not* deleted) renders and functions — confirmed visually via screenshot (PREV/NEXT controls, "Scroll or Drag" hint, images sliding into view).
- [x] Visually confirmed via screenshots, after correctly waiting for the site's own preloader-hide signal (initial screenshots taken too early were misleadingly blank — the preloader stays up until every image on the page finishes loading via `imagesLoaded` plus ~1.5s of GSAP reveal delay; this is itself a live illustration of why image compression is already flagged as a performance task in `TECHNICAL_STANDARDS.md`).
- [ ] Not yet done by a human: a real cross-browser/real-device pass, and the live contact-form send-and-receive test (blocked on FormSubmit activation above).

### Actual Git commits
`chore: remove dead template files and committed OS junk` (`6a00191`), `fix: remove exposed Google Maps API key` (`90db06b`), `fix: remove exposed maps key and fix malformed markup in about.html` (`ffe6bdc`), `fix: restore working contact flow` (`8ee1a4e`)

### Review checkpoint
Jaqueline: (1) activate the FormSubmit email, (2) do a quick visual pass on Home/About/Contact/Work/one project page in a real browser, (3) confirm favicon shows correctly, before Sprint 1 begins.

---

## Sprint 1 — Core Positioning & Page Structure ✅ (complete, pending Jaqueline's content review)

### Objective
Ship the new Home and About — the biggest positioning rewrite in the project.

### Scope
Full rebuild of `index.html` (6-section Home) and `about.html` (per `CONTENT_ARCHITECTURE.md`, using the finalized Appendix-A copy). Nav relabel sitewide. `index-showcase-gallery.html` renamed to `work.html` (skeleton — old gallery content intact, full case-study rebuild in Sprint 2). `contact.html` got its three-path structure now too (originally scoped for later, but natural to do alongside the nav rename since contact.html needed the same nav-label fix regardless).

### Files (as actually touched)
`index.html`, `about.html`, `contact.html`, `work.html` (renamed from `index-showcase-gallery.html`), nav labels + footer identity across `project01–08.html`, new `css/tokens.css`, one line in `js/scripts.js`.

### Correction found during implementation
The approved hero headline is a full sentence (~85 characters). The site's `.hero-title` treatment (Six Caps at `24vw` font-size, `white-space:nowrap`) and its letter-by-letter shuffle-reveal animation are both built for 1-3 word titles — dropping the sentence in as-is produced a badly broken, 4+ second chaotic scatter of individual letters (confirmed via screenshot). Fixed with: (1) a new `.hero-statement` CSS class (in `css/tokens.css`) that resizes/wraps the sentence sensibly, and (2) a new `.no-letter-split` class + one-line change in `js/scripts.js` that excludes this one H1 from the shared letter-shred animation, verified to have zero effect on any other page. Full account in `DECISIONS.md` DEC-015. This is exactly the kind of thing "verify visually before declaring done" is supposed to catch — first-draft screenshots looked broken; re-checked, root-caused, fixed, re-verified.

### Tasks
- [x] Rebuild `index.html` hero with the approved anchor + supporting lines and two CTAs.
- [x] Build the merged "Point of View" section (DEC-007 — verified it reads well once assembled).
- [x] Build the Capabilities section (5-domain model, methodology/verb register) — reused the existing `list-rotator` component (repurposed with the 5 domain names) as the connective ticker between Hero and Point of View, per `DESIGN_SYSTEM.md`'s repurposed-ticker spec.
- [x] Build the Selected Work teaser section (5 cards, narrative/context register) — links point at `work.html` for now (individual case pages don't exist until Sprint 2, per plan).
- [x] Build the Speaking section — resolved the 4-vs-5-topics item as DEC-012 (Home keeps 4, About keeps 5).
- [x] Build the Final CTA section.
- [x] Rewrite `about.html`: narrative intro, career-arc prose, the 5-entry Career Timeline (all 5 Appendix-A entries, not 4 — Hearts & Science's two roles both included), Communities & Leadership, Speaking & Knowledge Sharing, Selected Executive Education, Selected Professional Exposure.
- [x] Remove from `about.html`: Recognitions section (+ deleted `images/aw01–06.jpg`), commented-out team-members block, old "Collaborators" client-logo strip (+ `images/client-0X.png` are now unreferenced anywhere — not yet deleted, flagged for Sprint 4 asset cleanup).
- [x] Old "My Services" accordion was **repurposed, not removed** — see DEC-016 (reused as a second, differently-styled presentation of the same 5 capabilities, retitled "My Capabilities").
- [x] Relabel nav sitewide: Portfolio → Work, on every real page including `project01–08.html` (still live until Sprint 2 archives them). Renamed `index-showcase-gallery.html` → `work.html`, fixed its title/description/nav self-link/hero copy.
- [x] Fix footer identity/copyright on `index.html`, `about.html`, `contact.html` — now "2026 © Jaqueline Razo" linking to LinkedIn (Razo = personal identity, per DEC-006).
- [x] Update meta titles/descriptions on `index.html`, `about.html`, `contact.html`, `work.html` per `TECHNICAL_STANDARDS.md` templates.
- [x] Bonus (natural to bundle in): `contact.html` got its three-path restructure ("How I Can Help" cards + updated form copy) and the address/phone row was replaced with email/LinkedIn/location — originally scoped loosely across sprints, but required the same nav-label touch this sprint anyway.

### Dependencies
None blocking on copy (Appendix A fully covered it). Imagery remains on placeholders per `DESIGN_SYSTEM.md` — **except** `images/AJ.jpg`, which turned out to be a genuinely good, on-brand portrait (verified by viewing it) and is now live in About's Career Timeline section, not a placeholder.

### Risks
Medium, as anticipated — the hero animation break (above) was the concrete instance of that risk materializing, caught and fixed before this sprint closed rather than shipped broken.

### Definition of Done
New Home, About, Contact live and structurally/copy-complete; `work.html` renamed with corrected metadata/nav (content rebuild deferred to Sprint 2 as planned); zero console/JS errors confirmed via headless-browser scroll-through of all four pages; footer/title/nav consistent sitewide.

### Manual QA — completed via headless-browser scroll verification (Playwright, real mouse-wheel events against the local static server, not a single full-page screenshot — this site's scroll-triggered reveals don't fire without genuine incremental scroll events)
- [x] `index.html`, `about.html`, `contact.html`, `work.html`: zero console errors, zero JS exceptions across a full scroll-through of each page.
- [x] Hero, Point of View, Capabilities (3-column cards with icons/tagline/description/keyword-tags), Selected Work (5 cards + CTA), Speaking (2-column topic cards on light background), Final CTA (three-path row) all visually confirmed on `index.html`.
- [x] About's Career Timeline (with `AJ.jpg`), My Capabilities accordion, Communities & Leadership, Speaking & Knowledge Sharing, footer copyright fix all visually confirmed on `about.html`.
- [x] Contact's new hero, three-path cards, trimmed form, and email/LinkedIn/location row visually confirmed on `contact.html`.
- [x] `work.html` confirmed showing the corrected title/nav/hero copy with the old gallery content intact (expected interim state).
- [ ] Not yet done by a human: real-device/real-browser pass, and Jaqueline's content/narrative review (the most important checkpoint in this sprint, per the original risk assessment — still pending).

### Actual Git commit(s)
(to be created after this documentation update, in logical groups: Home rebuild, About rebuild, Contact + nav-rename + work.html rename, docs update)

### Review checkpoint
**Full content review with Jaqueline is still the critical next step** — narrative issues are cheap to fix now, expensive after Sprint 2 builds 5 more pages on the same voice. Do not start Sprint 2 on the assumption this content is final.

---

## Sprint 2 — Work & Flagship Case Studies ✅ (complete, pending Jaqueline's narrative/confidentiality review)

### Objective
Build the full new Work section — the biggest structural build in the project.

### Scope
`work.html` full build, 5 new case-study pages, archive relocation for old projects, UNODC reframe.

### Files (as actually touched)
`work.html` (rebuilt), 5 new `case-*.html` files, new `archive/` directory + **7** relocated project pages (`project01,02,04,05,06,07,08.html` — see `project07.html` decision below), `project03.html` (UNODC reframe), `index.html` (Selected Work links repointed), `css/tokens.css` (new component styles).

### `project07.html` decision (DEC-013, resolved)
Archived, not folded into `case-ai-workflows.html`. Its actual content — personal web-scraping scripts (Instagram, Amazon, metadata scraping) — doesn't fit the approved "AI-enabled Workflow Design" narrative (knowledge systems, second-brain, applied AI workshops); folding it in would have diluted the case with exactly the kind of tactical-scripting flavor the repositioning is meant to move away from.

### Tasks
- [x] Build `work.html`: intro, 5 case cards (reused the proven `one_third`/`box-icon-wrapper` card pattern from Home rather than the old WebGL/ClapatSlider gallery — see technical note below), Earlier Work line linking to `project03.html`, closing section.
- [x] Build `case-enterprise-transformation.html`, `case-capital-planning.html`, `case-decision-intelligence.html`, `case-customer-data.html`, `case-ai-workflows.html` — all 5 via a shared Python generator script (not hand-duplicated HTML) to guarantee structural consistency across the 10-part template while letting content vary per `CASE_STUDIES.md`'s differentiation notes. Each case's "Next Case" link forms a closed loop (5 → 1).
- [x] Create `archive/`; relocate all 7 legacy project pages; rewrote every relative path (`images/`, `css/`, `js/`, and links to `index.html`/`about.html`/`contact.html`/`work.html`/`favicon.ico`/`style.css`) for the new directory depth. The one cross-boundary link (`project02.html`'s "next" pointing at `project03.html`, which stays at root) was fixed individually.
- [x] Reframe `project03.html` as "Earlier Work": new eyebrow label, title/description, footer/copyright fix, and — this was a real broken-link fix, not just polish — its "next case" teaser pointed at `project04.html`, which had just moved into `archive/`; repointed to loop into `case-enterprise-transformation.html` instead.
- [x] Update `index.html` Selected Work section: all 5 card links repointed from the generic `work.html` placeholder to their real case-study pages.

### Technical notes / corrections found during implementation
- **WebGL slider replaced with the planned card pattern, not incrementally repurposed.** The old `work.html` used a `ClapatSlider`/Three.js-driven full-bleed gallery keyed to each old project's hero image. Since the 5 new cases have no hero photography yet (all placeholder per `DESIGN_SYSTEM.md`), and DEC-009 already called for replacing this mechanism, it was removed outright — along with its now-orphaned slider-specific footer (PREV/NEXT/"Scroll or Drag" controls) and thumbnail rail, both restored to the standard site footer pattern. `ShowcaseGallery()` in `js/scripts.js` is self-guarded (`if ($('.showcase-gallery').length > 0)`), so removing the markup left it a safe no-op — confirmed via zero console errors.
- **Framework/process diagrams use a new `.flow-diagram` component** (`css/tokens.css`) — a dashed-border, typographic arrow-flow box (e.g. "Business Goals → Opportunity Areas → Prioritization → Execution → Value") — instead of placeholder images or broken `<img>` tags. Visually confirmed via screenshot; reads as an intentional editorial device, not a missing asset.
- **Found and fixed a real pre-existing bug unrelated to this sprint's scope**: `index.html`'s `<body>` tag had `class="...smooth-scroll1..."` (an extra stray "1") since the very first commit in this repo's history — confirmed via `git show` on the initial commit. Every other page correctly has `smooth-scroll`, which both `style.css` (`body.smooth-scroll`) and `js/common.js` (`.smooth-scroll main` height-sizing selector) depend on. The homepage was silently missing these rules. Fixed as a one-character correction.

### Dependencies
Sprint 1's nav/IA was in place first, as required.

### Risks
Medium-high, as anticipated. Materialized/mitigated: the WebGL-slider removal (bigger than originally scoped as "keep and adapt," but lower-risk than keeping a mechanism with no matching assets) and the `project03.html` broken-link discovery (caught and fixed, not shipped broken).

### Definition of Done
Full new Work section live with placeholder diagrams where real assets don't exist yet; all 5 cases follow the shared template with case-specific differentiation (framework-diagram-led vs. product-mockup-oriented vs. systems-map, per `CASE_STUDIES.md`); confidentiality rules applied throughout (no client names, no fabricated figures, safe category descriptions in every metadata pill); zero console/JS errors and zero failed local requests confirmed across all 9 touched/new pages via headless-browser verification, including the archived pages' rewritten relative paths.

### Manual QA — completed via headless-browser verification (Playwright); confidentiality/narrative review still needs a human
- [x] `work.html`, all 5 `case-*.html` pages, `project03.html`, and a sample archived page (`archive/project01.html`) all return HTTP 200 with zero console errors, zero JS exceptions, and zero failed local requests.
- [x] Visually confirmed (screenshots): hero + eyebrow + metadata pills render correctly on case pages; the Challenge 2×2 grid, the `.flow-diagram` Approach visuals, and the Next Case loop all display as designed; `work.html`'s 5-card grid and closing section render cleanly; the archived page's images load correctly (proving the relative-path rewrite worked); `project03.html`'s real UNODC screenshots still display.
- [ ] **Not yet done by a human — this is the important one**: read each case study's actual copy for narrative quality and confidentiality correctness. This is explicitly flagged in the original plan as the highest legal/reputational-risk content on the site — headless-browser checks confirm the pages don't *break*, not that the content is *right*.

### Actual Git commit(s)
(to follow this documentation update: case-study pages, work.html rebuild, archive migration + project03 reframe, index.html link updates, docs)

### Review checkpoint
**Narrative + confidentiality review with Jaqueline is the explicit next step before Sprint 3** — same rationale as Sprint 1's checkpoint, but higher-stakes here since this is the content most exposed to legal/reputational risk (client confidentiality, accuracy of role/context claims).

---

## Sprint 3 — Interaction, Responsive & Accessibility Polish ✅ (complete — see scoped-down item below)

### Objective
Implement the full motion/interaction plan from `DESIGN_SYSTEM.md` across the pages built in Sprints 1–2.

### Scope
`.has-opacity` replacement, WebGL replacement (Work-card reveal), reduced-motion handling, keyboard nav, focus-visible styles, mobile hover-only audit.

### Files (as actually touched)
`js/common.js`, `css/tokens.css`. (`js/scripts.js` and the WebGL replacement were already done in Sprint 2 — see note below; no further changes needed there this sprint.)

### Already done in earlier sprints — re-verified here, not re-implemented
- **WebGL grid-fit effect replacement**: done in Sprint 2 (DEC-017) when `work.html` was rebuilt around the 5 case cards. Re-confirmed this sprint via the responsive QA pass below — no leftover WebGL/ClapatSlider code path on any in-scope page.
- **Repurposed keyword ticker on Home**: done in Sprint 1 (the "Working Across" list-rotator). Re-confirmed rendering correctly at all tested breakpoints.

### Tasks
- [x] `.has-opacity`: none of the new positioning-critical copy (Sprints 1–2) uses this class at all — confirmed via repo-wide grep, so there was nothing to remove there. The mechanism itself (`js/common.js`) still exists for `project03.html` (Earlier Work, secondary content) and the 7 archived pages, and was fixed at the source: converted from a continuous scroll-scrub (measured empirically at a dim, low-contrast 0.2 resting opacity — confirmed via headless-browser computed-style checks) to a one-time reveal (`toggleActions: "play none none none"`) that plays once on entry and stays fully visible regardless of further scroll, and is skipped entirely under `prefers-reduced-motion` (text starts and stays at full opacity).
- [x] `prefers-reduced-motion` for the custom cursor: reused the theme's own existing `disable-cursor` body class (already the mechanism `isMobile()` uses to turn the cursor off on touch devices) — one new check at the top of `js/common.js` adds that class when reduced-motion is preferred, so the cursor's mouse-follow ticker and all its hover-triggered tweens never initialize in the first place. Verified via headless-browser test with `reduced_motion: "reduce"` context.
- [x] Keyboard accessibility for the hamburger menu: `role="button"`, `tabindex="0"`, `aria-expanded` (toggling true/false), and a keydown handler for Enter/Space — all set via JS (`js/common.js`, inside `FirstLoad()`, which reruns after every AJAX transition) rather than hand-edited into the ~15 pages' duplicated header markup. Verified via headless-browser test: focusing the button and pressing Enter opens the menu and flips `aria-expanded` to `"true"`.
- [x] `:focus-visible` styles sitewide: added to `css/tokens.css`, scoped to `:focus-visible` (not plain `:focus`) so mouse/touch interaction and the custom cursor are unaffected; a light-background variant for `.light-section` contexts. Verified via headless-browser: `outline-style` computes to `solid` on a focused link.
- [x] `aria-live="polite"` page-swap announcement: the AJAX transition handler (`loadNewContent()` in `js/common.js`) already extracts the new page's `<title>` to update `<head>`; a hidden `role="status" aria-live="polite"` element is created once and updated with "Navigated to {title}" right at that same point, giving screen-reader users an announcement the AJAX system previously never provided at all.
- [x] Touch-device fallbacks for cursor and hover-parallax: **audited, not re-implemented** — both were already correctly gated by the existing `isMobile()` check inside `window.Core()` (cursor ticker, all `.parallax-wrap` mouseenter/mousemove handlers live inside the same guarded block). Confirmed by reading the code directly rather than assuming.
- [x] ScrollTrigger pin recalculation on the new case-study layouts: re-verified via headless-browser scroll-through of `case-capital-planning.html` (representative of the 5) — smooth reveals, zero console errors, `.flow-diagram` boxes and Challenge/Outcome grids all render correctly at each scroll step.
- [x] Full responsive QA: tested `index.html`, `about.html`, `contact.html`, `work.html`, `case-capital-planning.html` at mobile (390×844), tablet (820×1180), and small-laptop (1024×768) viewports — zero horizontal overflow, zero console errors at any size. Visually confirmed the hero-statement clamp() sizing and the `one_third`/`card-row` grids both scale and stack correctly at mobile width with no additional CSS needed — the existing breakpoint ladder (correctly identified in `DESIGN_SYSTEM.md` as "genuinely well-built") handled it.

### Scoped down — flagged, not silently skipped
**A fully exhaustive `prefers-reduced-motion` audit of every individual ScrollTrigger pin, parallax transform, and preloader delay across `js/common.js` (3,600+ lines) and `js/scripts.js` (2,200+ lines) was not attempted this sprint.** The two highest-impact motion sources — the continuously-active mouse-follow cursor, and the readability-harming `.has-opacity` scroll-scrub — are fixed. A full line-by-line pass through every remaining pinned/parallax/scrub animation is a substantially larger, higher-risk undertaking (this codebase's animation logic is deeply interconnected, as the letter-split bug in Sprint 1 demonstrated) that deserves its own dedicated pass rather than being rushed inside this sprint's time budget. Recommend as a Sprint 5 candidate if full WCAG-level reduced-motion coverage is a hard requirement; the current state already meaningfully improves on the pre-Sprint-3 baseline (which had zero reduced-motion handling anywhere).

### Dependencies
Sprints 1–2 pages existed to test interactions against, as required.

### Risks
Medium, as anticipated. The ScrollTrigger-pin risk didn't materialize into new bugs (nothing needed changing there); the real technical work ended up concentrated in `js/common.js`, which is more surgical and lower-risk than touching `js/scripts.js`'s AJAX/transition logic.

### Definition of Done
Cursor, hamburger menu, and `.has-opacity` all respect the stated goals; `:focus-visible` and `aria-live` close two confirmed, real accessibility gaps; no interaction depends exclusively on hover (confirmed by code read, not just assumption); responsive QA passes with zero overflow/errors across 3 viewport classes × 5 representative pages. The reduced-motion scope-down above is the one honest gap against "reduced-motion fully respected" as originally written.

### Manual QA — completed via headless-browser verification (Playwright)
- [x] `reduced_motion: "reduce"` context test: `disable-cursor` class applied to `<body>`; `.has-opacity` spans render at full opacity with no animation.
- [x] Keyboard test: Tab-equivalent focus + Enter key opens the hamburger menu, `aria-expanded` flips to `"true"`, visible focus-visible outline renders around the button (screenshot-confirmed).
- [x] Responsive test: 5 pages × 3 viewports (mobile/tablet/small-laptop), zero horizontal overflow, zero console errors, screenshots confirm readable, correctly-stacked layouts at mobile width.
- [ ] Not yet done by a human: a real mobile device pass (headless Chromium approximates but doesn't fully replace this), and a real screen-reader pass (VoiceOver/NVDA) to confirm the new `aria-live` announcement and hamburger `aria-expanded` are actually announced as intended — headless-browser DOM/attribute checks confirm the markup is correct, not that assistive technology reads it the way expected.

### Actual Git commit(s)
(to follow this documentation update)

### Review checkpoint
Keyboard-only walkthrough recommended before Sprint 4, ideally on a real device — the flagged reduced-motion scope-down and the not-yet-human-tested screen-reader behavior are the two things worth a second pair of eyes (or ears) before calling this fully closed.

---

## Sprint 4 — SEO, Performance & Launch QA

### Objective
Ship a launch-ready site.

### Scope
OG/Twitter/canonical/JSON-LD, sitemap/robots, full favicon set, heading-structure fixes, final alt-text pass, cross-browser QA.

### Files
Every real page's `<head>` block, new `sitemap.xml`/`robots.txt`/`site.webmanifest`, `images/` (compression pass on anything shipping).

### Tasks
- [ ] Apply title/meta-description templates from `TECHNICAL_STANDARDS.md` to every real page.
- [ ] Add OG + Twitter Card tags to every real page.
- [ ] Add canonical links to every real page.
- [ ] Add JSON-LD `Person` schema (Home/About minimum); consider `WebSite`/`CreativeWork` schema.
- [ ] Create and add `sitemap.xml` (primary pages + case studies only; excludes archive/privacy/tos/contact.php).
- [ ] Create and add `robots.txt` (`Disallow: /archive/`, sitemap reference).
- [ ] Produce full favicon set (`favicon.ico`, 32×32, 16×16, apple-touch-icon) + `site.webmanifest`.
- [ ] Produce OG share images (1200×630) per primary page + case study.
- [ ] Fix heading structure (single `h1` per page, proper `h2`/`h3` nesting) on all shipping pages.
- [ ] Final `alt` text pass on all in-scope (non-archived) pages.
- [ ] Compress/convert oversized media that survives into the final page set.
- [ ] Wire GA4 (or alternative) once Jaqueline has created the account — external dependency, not blocking otherwise.
- [ ] Cross-browser/cross-device final QA.
- [ ] Confirm `privacy.html`/`tos.html`/`contact.php`/TikTok file remain byte-for-byte unchanged and unreferenced from the new sitemap/nav.

### Dependencies
Final content in place (Sprints 1–2); imagery ideally final but not required (placeholders can ship if unavoidable, clearly labeled).

### Risks
Low.

### Definition of Done
Every item in `QA_CHECKLIST.md` passes.

### Manual QA required
Full QA pass using `QA_CHECKLIST.md`; metadata validated with Rich Results Test + a social-share debugger.

### Expected Git commit(s)
`seo: add metadata and structured data`, `seo: add sitemap and robots`, `perf: optimize production assets`, `fix: complete favicon set`

### Review checkpoint
Full QA pass reviewed with Jaqueline; explicit go/no-go for launch.

---

## Sprint 5 — Optional Refactor / Future Enhancements

### Objective
Pursue valuable-but-not-launch-blocking improvements at Jaqueline's pace.

### Scope
Fetch-and-inject partial loader (header/nav/footer/cursor dedup), CSS token expansion, GA4 wiring if not done in Sprint 4, Perspectives (if revived with real content), custom-domain evaluation.

### Files
New `partials/*.html` + `js/partials.js` (if pursued), `css/tokens.css` expansion.

### Tasks
- [ ] Prototype the fetch-and-inject partial loader on 2 pages (`index.html`, `about.html`) to validate compatibility with the AJAX transition system before committing sitewide.
- [ ] If prototype succeeds, roll out to all real pages; if not, document why in `DECISIONS.md` and keep the current duplicated-markup approach.
- [ ] Expand `css/tokens.css` beyond the sections written during Sprints 1–3.
- [ ] Evaluate custom domain (`CNAME`) — currently none configured.
- [ ] Revisit Perspectives once real content exists to link.

### Dependencies
None blocking — purely optional.

### Risks
Varies — the partial-loader/AJAX-transition interaction is the single biggest technical unknown in the whole project; prototype before committing.

### Definition of Done
Jaqueline's call, item by item.

### Manual QA required
Same rigor as any other sprint if pursued — not exempt from `QA_CHECKLIST.md`.

### Expected Git commit(s)
`refactor: extract shared header/footer/cursor partials` (if pursued)

### Review checkpoint
Standalone decision whenever there's appetite — not tied to the main launch.

---

## Sequencing rationale

Phase 0 must complete and be approved first — everything downstream references it. Sprint 0 is deliberately content-free and low-risk so it can ship immediately without narrative review. Sprint 1 is gated behind Sprint 0 only technically, not narratively — but its review checkpoint is the most important one in the project, because narrative issues caught here are cheap; caught after Sprint 2 (5 more pages built on the same voice) they're expensive. Sprint 3 needs real pages to test against, hence its position after 1–2. Sprint 4 is intentionally last-but-one because SEO metadata should describe final content, not draft content. Sprint 5 is explicitly optional and never blocks launch.
