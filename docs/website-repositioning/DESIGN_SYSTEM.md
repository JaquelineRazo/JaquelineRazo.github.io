# Design System — Visual DNA, Interaction Principles, Motion Plan

## Visual DNA to preserve

- Black/white/neutral editorial palette. The base in `style.css` is already correct — do not introduce corporate blue-gradient styling. One accent color exists (currently hardcoded `#8c6144` terracotta, driving cursor-hover state) — consolidate to a CSS token, don't remove the accent concept entirely.
- Typography: Poppins (body/UI) + Six Caps (display/oversized headline), both via Google Fonts. Large-headline treatment is a core signature.
- A genuinely well-built responsive breakpoint ladder (1537 / 1466 / 1024 / 767 / 479px + a landscape-phone edge case), applied consistently across all CSS partials. **Needs no rebuild** — only verify new sections reuse it rather than introducing ad hoc breakpoints.
- Asymmetry, strong negative space, editorial/fashion influence, a "dark, minimal, slightly experimental" personality.
- Cinematic scrolling and motion, treated as the site's identity, not decoration.

## Interaction principles (non-negotiable for every animation, existing or new)

Every interaction must support one of: **narrative, hierarchy, discovery, comprehension, personality.** Never add animation purely for decoration. Any new interaction must be documented here, in this file, before implementation — including where it appears, its trigger, what moves, duration/behavior, why it improves storytelling or usability, mobile fallback, accessibility consideration, and whether it uses existing libraries or requires something new.

## Full interaction/animation audit and classification

| Interaction | Current state | Proposed state | Reason | Mobile behavior | Accessibility |
|---|---|---|---|---|---|
| Custom "magic cursor" | Follows mouse, morphs on hover, color hardcoded from `data-primary-color="#8c6144"` | Keep; hover color driven by a CSS token; explicit `matchMedia('(pointer: coarse)')` guard to fully disable on touch (verify current gating, don't assume) | Strong, already-working editorial signature; the fix is precision, not redesign | Disabled entirely on touch devices | Disabled under `prefers-reduced-motion` |
| AJAX full-page transitions | Cover-layer fade + fetch/swap on internal links (`js/scripts.js`) | Keep; re-wire link selectors for renamed/new files; add an `aria-live="polite"` announcement on page-swap completion | Core to the cinematic feel; shrinking page count lowers fragility risk | Same behavior, already touch-compatible (click-based) | Currently silent to screen readers — closing this gap is in scope, not new scope |
| ScrollTrigger pins/reveals/clipped-image effects | Hero pin, `.panels` horizontal pinning, `.zoom-gallery`, `.clipped-image-wrapper` (`js/common.js`) | Keep; re-verify pin recalculation against the new, structurally different case-study layouts | This *is* the "cinematic scrolling" explicitly meant to be preserved | Pins already respect the responsive breakpoints; re-test at 767px/479px on new layouts | Wrap all ScrollTrigger init in a `prefers-reduced-motion` check → instant, unpinned layout |
| `.has-opacity` per-word scroll-fade | Splits copy into per-word spans, scroll-scrubs opacity 0→1; used on hero-adjacent copy on `index.html` | **Remove** from all positioning-critical copy (hero, capability descriptions, case-study headlines). Where a fade is still wanted decoratively, **replace** with a one-time block-level fade-up on entry (ScrollTrigger `toggleActions`, not continuous scrub) | Confirmed readability defect — text passes through near-zero contrast mid-scroll | New block-level version: simple CSS transition, no special mobile handling needed | Text fully legible immediately on entry; comprehension never gated by scroll position |
| Moving-gallery marquee | Horizontal scroll-scrubbed client-logo strip on `about.html` | **Remove** as a logo wall (prohibited by the confidentiality rule — see `DECISIONS.md`). **Repurpose**: Home keyword ticker (full spec below) | Mechanism reusable, content isn't appropriate anymore | Same scroll-scrub behavior, already breakpoint-aware | Ticker text is real, meaningful copy — add `aria-hidden` only if a static equivalent list already exists nearby |
| List-rotator (skills ticker) | Rotates tactical skill words | Keep mechanism, replace copy with positioning keywords | Low-risk repurposing, no new interaction | No change | No change |
| Three.js WebGL grid-fit effect | Shader-driven "fit thumbnail to screen" on the old dense portfolio grid (`js/scripts.js`) | **Replace** — full spec below (Work-card reveal) | Built for a dense image grid the new Work page no longer has (5 large editorial cards, not a grid); removing cuts JS payload | New treatment is CSS/GSAP only, simpler on mobile by construction | Simpler DOM, easier to make focus-visible/keyboard-navigable than the WebGL version |
| Lightbox/video popups | Click-to-expand image/video overlay | Keep as-is | Still useful for image-heavy case content (e.g. Capital Planning mockups) | Already touch-compatible | Add close-on-Escape and focus-trap if not already present (verify during implementation) |
| Fullscreen hamburger menu | Overlay nav, jQuery `.click()` only, `#burger-wrapper` | Keep visual/interaction design; **refine**: add `role="button"`, `tabindex="0"`, `aria-expanded`, keydown (Enter/Space) handling | Strong editorial pattern worth preserving; currently a real keyboard-accessibility gap | No change | Closes the single biggest a11y gap on the site |
| Preloader/intro reveal | Page-load animation, letter/word shuffle-reveal | Keep; refine to be brief and skippable; skip entirely under reduced-motion | Good curtain-rise moment fitting the editorial identity | No change | Reduced-motion users see content immediately, no forced wait |
| Mouse-move hover-parallax | Buttons/icons shift slightly on mouse proximity (`.parallax-wrap`/`.parallax-element`) | Keep as-is | Subtle, low-risk personality touch | Verify disabled on touch (mouse-event-driven, should no-op automatically — confirm, don't assume) | Disabled under reduced-motion |
| Google Map (Contact) | Interactive map, wrong location, exposed API key | **Remove** | Address de-emphasis + standing security/cost exposure | N/A | N/A |

## New interaction — full specs (required before implementation, per the interaction principle above)

### 1. Work-card reveal (replaces the WebGL grid-fit effect)
1. **Where**: `work.html`, the 5 flagship case cards.
2. **Trigger**: scroll-into-view (once) for the initial reveal; mouse-hover (desktop) for the secondary state.
3. **What moves/changes**: on scroll-entry, each card's title and framing line fade/slide up once (ScrollTrigger `toggleActions`, one-time — not the removed continuous-scrub `.has-opacity`); on hover, a restrained image/visual crop reveals behind the text via a CSS `clip-path` or opacity transition. No WebGL, no shader.
4. **Duration/behavior**: ~400–600ms ease-out for entry reveal; ~250ms for hover crossfade.
5. **Why**: preserves the "editorial card, not template tile" feel while removing a heavy, single-purpose WebGL dependency that no longer matches the new card layout — cuts JS payload, aligned with the performance priority.
6. **Mobile fallback**: no hover state on touch — image is either always partially visible or revealed on tap/focus; no content is hover-gated.
7. **Accessibility**: on touch/keyboard, the image reveal happens on focus/tap, never hidden behind hover-only — satisfies "no critical content should depend exclusively on hover."
8. **Library**: existing GSAP/ScrollTrigger already in the stack — no new dependency.

### 2. Repurposed keyword ticker
1. **Where**: Home, directly under the Hero.
2. **Trigger**: scroll-scrubbed, same mechanism as the current moving-gallery marquee.
3. **What moves**: a horizontal strip of positioning keywords/domains ("Enterprise Transformation · Digital Products · Decision Intelligence · AI-enabled Workflows · Customer Data") scrolls continuously, tied to scroll position.
4. **Duration/behavior**: continuous, scroll-position-linked — matches existing marquee behavior, no new timing logic.
5. **Why**: gives the hero's supporting line room to breathe while reinforcing the 5-domain positioning kinetically, without duplicating the Capabilities section's language wholesale.
6. **Mobile fallback**: same scroll-scrub mechanism already works at narrow breakpoints — no special-casing needed.
7. **Accessibility**: real text content, readable by screen readers if `aria-hidden` isn't applied; add `aria-hidden="true"` only if the same keyword list already appears as static text elsewhere on the page.
8. **Library**: existing GSAP/ScrollTrigger — no new dependency.

### 3. AI-workflows applied-example cards ticker (proposed, not yet fully approved)
Referenced in `CASE_STUDIES.md` as a candidate for `case-ai-workflows.html`'s small applied-example cards (Research / Meeting prep / Follow-ups / Documentation / Project memory / Opportunity tracking). **Not yet specified in full** — do not implement until this section is filled in with the same 8-point spec as above and logged in `DECISIONS.md`. Flagged here explicitly so it isn't implemented informally during Sprint 2.

### 4. Signature portrait section (Home)
1. **Where**: Home (`index.html`), a new full-width row placed immediately after the Hero and before the Positioning Ticker.
2. **Trigger**: (a) one-time scroll-into-view entrance for the whole framed card group; (b) continuous scroll-scrub parallax on the portrait image itself while the section is in view; (c) a continuous, non-scroll-linked decorative background drift behind the card.
3. **What moves/changes**: (a) the card group (image + offset accent-color backdrop panel + decorative dot field) fades/slides up once on entry, using the same mechanism as every other card sitewide (`.has-animation`); (b) the portrait image shifts vertically and scales down slightly as the section scrolls through the viewport, via a small dedicated GSAP/ScrollTrigger block (not the vendor `.has-parallax` mechanism — see note below); (c) a low-opacity dot pattern behind the card drifts diagonally on an infinite loop, echoing the fine topographic-line texture already present in the photo's own background.
4. **Duration/behavior**: entrance reveal ~0.5s ease-out (matches sitewide `.has-animation` timing); image parallax is scroll-scrubbed (tied to scroll position, not time); background drift is a slow 50s linear infinite loop.
5. **Why**: the site's one new "signature" visual moment on Home — gives the personal-brand portrait presence and warmth (comprehension/personality) right after the hero statement, using motion to make the image feel alive rather than a static photo, while giving this section its own container language (an offset "mounted print" frame) distinct from both the flat `.content-row` sections used everywhere else and the full-bleed circle-clip treatment already used on About.
6. **Mobile fallback**: the asymmetric offset collapses to a centered, full-width card at ≤1024px (existing breakpoint ladder); scroll parallax and entrance reveal behave identically on mobile (both already scroll/touch-compatible sitewide); the decorative background drift is unaffected by viewport size.
7. **Accessibility**: the continuous decorative background drift and the image scroll-parallax are both gated behind `prefers-reduced-motion: reduce`; the portrait is a real photo of the site owner, not decorative filler, so it carries descriptive `alt` text, not `alt=""`; the two purely-decorative layers (backdrop panel, dot field) are `aria-hidden="true"`.
8. **Library**: existing GSAP/ScrollTrigger — the entrance reveal reuses `.has-animation` as-is. The image parallax intentionally does **not** reuse the vendor `.has-parallax` mechanism: that class is also targeted by an unrelated mobile-only fix elsewhere in `js/common.js` (`isMobile()` block, `$('.smooth-scroll main, .has-parallax, nav, ...').css({'height': winHeight})`) that forces matching elements to exactly `window.innerHeight` — correct for that block's full-viewport background use cases, but it silently broke this card's `aspect-ratio` sizing on mobile when tried. Fixed with a small, purpose-built GSAP/ScrollTrigger block scoped to `.signature-card` instead (same fromTo recipe, own trigger) — no new dependency, no vendor code touched. See `DECISIONS.md`.

## Accessibility principles (standing, applies sitewide)

- `prefers-reduced-motion` must gate: the custom cursor, all ScrollTrigger-scrubbed motion, the AJAX transition cover-layer fade, and the preloader.
- No critical content may depend exclusively on hover — every hover-triggered reveal needs a focus/tap-triggered equivalent.
- Visible `:focus-visible` styles are required sitewide (currently absent anywhere in the CSS, combined with a global `user-select: none` — a real, confirmed gap).
- Keyboard operability is required for the hamburger menu and any custom interactive component (`role`, `tabindex`, `aria-expanded`/`aria-controls` as appropriate, keydown handling alongside click).
- Text must be fully legible at rest — no interaction may leave positioning-critical copy at reduced opacity/contrast as a resting state (this is why `.has-opacity` is being removed/replaced, not just refined).
- Semantic heading structure: one `<h1>` per page, no skipped levels.
- Descriptive `alt` text on every meaningful image; decorative images get `alt=""` deliberately, not by omission.

## Visual asset plan

| Section | Asset needed | Existing asset? | Placeholder needed? | Recommended direction |
|---|---|---|---|---|
| Hero | Editorial portrait (vertical or horizontal) | No suitable existing photo confirmed in `images/` | **Yes** — `[PLACEHOLDER — Editorial portrait, executive but not corporate]` | Strong, clean, high-contrast black/white treatment consistent with the site's palette; not a headshot-farm style photo |
| Point of View | Ambient/contextual photo (working, traveling, professional setting) | Check personal archive first — not in repo | **Yes** — `[PLACEHOLDER — Ambient professional photo]` | Candid over posed; supports the "human" pillar |
| Capabilities (×5) | Small conceptual micro-diagrams or one abstract editorial composition | None in repo | **Yes** — `[PLACEHOLDER — Capability micro-diagram: {name}]` ×5 | Typographic/geometric, not icon-clipart; consistent visual grammar across all 5 |
| Case: Enterprise Transformation | Abstract transformation framework diagram (Business Goals → Opportunity Areas → Prioritization → Execution → Value) | None | **Yes** — `[PLACEHOLDER — Transformation framework diagram]` | Fully abstract/diagrammatic — no real screenshots needed or wanted |
| Case: Capital Planning | Product UI mockups (desktop + mobile), before/after diagram | Real product screenshots may exist but need anonymizing | **Yes**, until anonymized — `[PLACEHOLDER — Product interface mockup, anonymized]` | Most visual case in the set; do not block build on real screenshots |
| Case: Decision Intelligence | Abstract decision-flow diagram + a conceptual executive-reporting mockup with dummy data | None (do not reuse the old real Tableau dashboard) | **Yes** — `[PLACEHOLDER — Decision-flow diagram]`, `[PLACEHOLDER — Conceptual reporting mockup, dummy data]` | Explicitly avoid the old dashboard hero visual |
| Case: Customer Data Ecosystem | Architecture diagram (Touchpoints → Capture → CRM/Data Layer → Governance → Activation) | None | **Yes** — `[PLACEHOLDER — Data ecosystem architecture diagram]` | Systems-map style, not stock "data flow" clipart |
| Case: AI-enabled Workflows | "Second-brain" workflow diagram + small applied-example cards | Possibly partial reuse from `project07.html` if folded in | **Yes** — `[PLACEHOLDER — AI workflow diagram]` | Most visually experimental case; real photo of her speaking/working with AI tools if available |
| About: timeline | Portrait photo alongside the timeline | Possibly — `images/AJ.jpg` (verify quality/fit) | Only if `AJ.jpg` isn't suitable | Reuse if appropriate |
| About: international/speaking callout | Real photo from a workshop/conference/panel | Not in repo | **Yes** — `[PLACEHOLDER — Speaking/workshop photo]` | Must be real, not staged — a credibility signal |
| Speaking (Home) | Real photo, speaking | Not in repo | **Yes** — `[PLACEHOLDER — Real speaking photo]` | No generic stock photo substitution |
| Final CTA | Portrait or editorial detail shot | Not in repo | **Yes** — `[PLACEHOLDER — Editorial portrait or detail shot, more human/less corporate]` | Closing note should feel personal, not transactional |
| Social share (OG images) | 1200×630 per primary page + case study | None exist | **Yes** — `[PLACEHOLDER — OG share image: {page}]` | Typographic, on-brand, not screenshots of the page itself |
| Favicon set | `favicon.ico`, 32×32, 16×16, apple-touch-icon, `site.webmanifest` | Partial (`images/favicon.ico`, broken path) | Path fix is Sprint 0; full set production is Sprint 4 | Simple monogram/mark consistent with `images/logo.png` |

Do not block structural implementation on missing assets — every section above ships with a clearly labeled placeholder and swaps in real assets as they're produced/supplied.
