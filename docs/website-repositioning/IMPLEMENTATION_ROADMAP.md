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

## Sprint 0 — Safety & Critical Fixes

### Objective
Fix confirmed bugs and security exposures with zero content/positioning risk.

### Scope
Bug fixes and security-relevant removals only — no positioning/content changes.

### Files
- `index.html`, `about.html`, `contact.html`, `project0X.html` `<head>` blocks (favicon path fix)
- `about.html` (malformed accordion tag)
- Every page's Google Maps `<script>` tag (unrestricted API key removal)
- `contact.html` + new third-party form-service integration
- Delete: `index-showcase-grid.html`, `multimedia.html`, `shortcodes.html`, `typography.html`, `js/clapat.js`, `images/Thumbs.db`, `images/favicon.png`
- New `.gitignore`

### Tasks
- [ ] Fix broken favicon reference sitewide (point to correct path or move file to root).
- [ ] Fix malformed tag in `about.html` services accordion (`<div>AI Automations/div></span>` → properly closed).
- [ ] Remove the unrestricted Google Maps API key script tag and associated map markup from every page that has it.
- [ ] Select and wire a third-party static-friendly form backend for `contact.html`; verify it delivers to Jaqueline's real inbox with a live test.
- [ ] Delete `index-showcase-grid.html`, `multimedia.html`, `shortcodes.html`, `typography.html`.
- [ ] Delete `js/clapat.js` (confirmed empty), `images/Thumbs.db`, `images/favicon.png` (confirmed dead duplicate).
- [ ] Add `.gitignore` for OS junk files.
- [ ] Confirm `privacy.html`, `tos.html`, `contact.php`, the TikTok verification file are unchanged.

### Dependencies
None.

### Risks
Low — no content or IA changes.

### Definition of Done
Contact form delivers a real test email; favicon resolves with no 404; no exposed API key remains in any page; dead files removed; protected files verified unchanged.

### Manual QA required
Smoke test across all real pages; send and confirm receipt of a real contact-form test message.

### Expected Git commit(s)
`fix: repoint broken favicon references`, `fix: remove exposed maps integration`, `fix: restore working contact flow`, `chore: remove dead template files`

### Review checkpoint
Quick walkthrough with Jaqueline before Sprint 1.

---

## Sprint 1 — Core Positioning & Page Structure

### Objective
Ship the new Home and About — the biggest positioning rewrite in the project.

### Scope
Full rebuild of `index.html` (6-section Home) and `about.html` (per `CONTENT_ARCHITECTURE.md`, using the finalized Appendix-A copy — no text placeholders needed). Nav relabel. `work.html` skeleton (full build in Sprint 2).

### Files
`index.html`, `about.html`, nav labels across all real pages, footer identity/copyright, `index-showcase-gallery.html` → `work.html` (skeleton), meta titles/descriptions on Home/About/Contact.

### Tasks
- [ ] Rebuild `index.html` hero with the approved anchor + supporting lines and two CTAs.
- [ ] Build the merged "Point of View" section (flagged deviation — confirm it reads well once assembled, see `DECISIONS.md`).
- [ ] Build the Capabilities section (5-domain model, methodology/verb register).
- [ ] Build the Selected Work teaser section (5 cards, narrative/context register, links to case pages — pages built in Sprint 2, can link to placeholders for now).
- [ ] Build the Speaking section (resolve 4-vs-5-topics open item, log resolution in `DECISIONS.md`).
- [ ] Build the Final CTA section.
- [ ] Rewrite `about.html` per `CONTENT_ARCHITECTURE.md`: narrative intro, career-arc prose, the 4-entry Career Timeline, Communities & Leadership, Speaking & Knowledge Sharing, Selected Executive Education, Selected Professional Exposure.
- [ ] Remove from `about.html`: Recognitions section (+ delete `images/aw01–06.jpg`), commented-out team-members block, old "My Services" accordion, old "Collaborators" client-logo strip.
- [ ] Relabel nav sitewide: Portfolio → Work; rename `index-showcase-gallery.html` → `work.html` (skeleton/teaser page).
- [ ] Fix footer identity/copyright (Razo as personal/site identity — see `DECISIONS.md` for the Razo/Razzo rule) and correct year.
- [ ] Update meta titles/descriptions on `index.html`, `about.html`, `contact.html` per `TECHNICAL_STANDARDS.md` templates.

### Dependencies
None blocking on copy (resolved via `CONTENT_ARCHITECTURE.md` Appendix A). Imagery remains on placeholders per `DESIGN_SYSTEM.md`.

### Risks
Medium — this is where most "does this read as senior/strategic" judgment calls live.

### Definition of Done
New Home and About live, structurally complete and copy-complete, placeholder imagery acceptable.

### Manual QA required
Full read-through with Jaqueline — the natural checkpoint to catch narrative issues before they propagate into 5 more pages.

### Expected Git commit(s)
`feat: rebuild homepage positioning`, `feat: rebuild about career narrative`, `chore: relabel navigation to Work`

### Review checkpoint
Full content review with Jaqueline before starting Sprint 2.

---

## Sprint 2 — Work & Flagship Case Studies

### Objective
Build the full new Work section — the biggest structural build in the project.

### Scope
`work.html` full build, 5 new case-study pages, archive relocation for old projects, UNODC reframe.

### Files
`work.html`, 5 new `case-*.html` files, new `archive/` directory + 6 relocated project pages, `project03.html` (UNODC reframe), `project07.html` (fold-in evaluation).

### Tasks
- [ ] Build `work.html` (intro, 5 case cards using the Work-card reveal interaction, Earlier Work line, closing section).
- [ ] Build `case-enterprise-transformation.html` per the shared template + `CASE_STUDIES.md` differentiation notes.
- [ ] Build `case-capital-planning.html`.
- [ ] Build `case-decision-intelligence.html`.
- [ ] Build `case-customer-data.html`.
- [ ] Build `case-ai-workflows.html` (decide `project07.html` fold-in first).
- [ ] Create `archive/` directory; relocate `project01.html`, `project02.html`, `project04.html`, `project05.html`, `project06.html`, `project08.html` (and `project07.html` if not folded in); update any internal links.
- [ ] Reframe `project03.html` as "Earlier Work" (light edit, not full flagship rebuild).
- [ ] Update `index.html` Selected Work section links to point at the real case pages.

### Dependencies
Sprint 1's nav/IA must be in place first.

### Risks
Medium-high — five new pages, a shared template that must not feel repetitive, confidentiality treatment needs care.

### Definition of Done
Full new Work section live with placeholder imagery where needed; all 5 cases follow the shared template with case-specific differentiation; confidentiality rules applied throughout.

### Manual QA required
Review each case study's copy and confidentiality treatment specifically — highest legal/reputational-risk content on the site.

### Expected Git commit(s)
`feat: add work index`, `feat: add enterprise transformation case study`, `feat: add capital planning case study`, `feat: add decision intelligence case study`, `feat: add customer data case study`, `feat: add ai workflows case study`, `chore: archive legacy project pages`

### Review checkpoint
Narrative + confidentiality review with Jaqueline before finalizing.

---

## Sprint 3 — Interaction, Responsive & Accessibility Polish

### Objective
Implement the full motion/interaction plan from `DESIGN_SYSTEM.md` across the pages built in Sprints 1–2.

### Scope
`.has-opacity` replacement, WebGL replacement (Work-card reveal), reduced-motion handling, keyboard nav, focus-visible styles, mobile hover-only audit.

### Files
`js/common.js`, `js/scripts.js`, `style.css`, `css/*.css`.

### Tasks
- [ ] Remove `.has-opacity` from positioning-critical copy; implement the one-time block-level fade-up replacement where still wanted.
- [ ] Implement the Work-card reveal interaction (replacing the WebGL grid-fit effect); remove/retire the WebGL code path.
- [ ] Implement the repurposed keyword ticker on Home.
- [ ] Add `prefers-reduced-motion` handling to cursor, ScrollTrigger reveals, page transitions, and preloader.
- [ ] Add keyboard accessibility to the hamburger menu (`role`, `tabindex`, `aria-expanded`, keydown).
- [ ] Add `:focus-visible` styles sitewide.
- [ ] Add `aria-live="polite"` announcement on AJAX page-swap completion.
- [ ] Audit and confirm touch-device fallbacks for cursor and hover-parallax.
- [ ] Re-verify ScrollTrigger pin recalculation on the new case-study layouts.
- [ ] Full responsive QA across the breakpoint ladder on all new/rewritten sections.

### Dependencies
Sprints 1–2 pages must exist to test interactions against.

### Risks
Medium — re-testing ScrollTrigger pins against genuinely new layouts is the main technical unknown.

### Definition of Done
All items in `DESIGN_SYSTEM.md`'s accessibility principles section pass manual QA; no interaction depends exclusively on hover; reduced-motion fully respected.

### Manual QA required
Keyboard-only walkthrough; reduced-motion toggle test; real mobile device pass.

### Expected Git commit(s)
`a11y: improve navigation and reduced motion`, `feat: replace webgl grid effect with work-card reveal`, `fix: remove readability-harming scroll-fade effect`

### Review checkpoint
Keyboard/reduced-motion/mobile walkthrough, reviewed together.

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
