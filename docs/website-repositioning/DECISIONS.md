# Decision Log

ADR-style record of every strategic or technical decision made for this project. Add new entries as decisions are made or changed during implementation — never silently change scope without logging it here.

**Format**: Decision ID · Date · Decision · Reason · Alternatives considered · Status (Approved / Experimental / Deferred / Rejected).

---

### DEC-001
**Date**: 2026-08-24
**Decision**: Replace the "Transform / Build / Advise" 3-category capability framework with a 5-domain model — Enterprise Transformation, Digital Products, Decision Intelligence, AI-enabled Workflows, Customer Data Ecosystems.
**Reason**: The 5-domain model is more specific and reads as domain expertise rather than a generic consulting-deck abstraction; the original 3-category framework was a placeholder from an earlier planning round.
**Alternatives considered**: Fusing the two frameworks (e.g. Transform = Enterprise Transformation, Build = Digital Products + AI Workflows, Advise = Decision Intelligence + Customer Data) — rejected in favor of using the 5-domain model directly, per explicit instruction not to force it back into 3 categories.
**Status**: Approved.

### DEC-002
**Date**: 2026-08-24
**Decision**: Selected Work uses 5 flagship case studies (Enterprise Transformation & Investment Strategy, Capital Planning & Asset Management Platform, Enterprise Measurement & Decision Intelligence, Customer Data Ecosystem Design, AI-enabled Workflow Design), not the original 7-project list. UNODC Mexico is a secondary "Earlier Work" proof point, not a flagship, despite being the only case with existing real assets.
**Reason**: The flagship portfolio should prioritize the current career narrative over historical asset availability.
**Alternatives considered**: Keeping UNODC as a 6th flagship since it has ready assets — rejected explicitly; asset availability should not drive narrative priority.
**Status**: Approved.

### DEC-003
**Date**: 2026-08-24
**Decision**: Perspectives (thought-leadership teaser) is cut from v1 entirely.
**Reason**: A visibly empty "coming soon" section undercuts the "intellectual curiosity" signal more than omitting it, and it adds length to an already dense homepage.
**Alternatives considered**: Ship with 2–3 real LinkedIn links; ship as a labeled teaser with placeholder cards. Both rejected in favor of cutting for v1.
**Status**: Approved. Revisit once there's real content to link.

### DEC-004
**Date**: 2026-08-24
**Decision**: No framework migration — the site stays plain HTML/CSS/JS, no build tool.
**Reason**: Appropriate architecture for a 4-page personal site; no concrete technical limitation identified that a framework would solve.
**Alternatives considered**: None seriously — this was confirmed, not contested, across all planning rounds.
**Status**: Approved.

### DEC-005
**Date**: 2026-08-24
**Decision**: No homepage or About-page client-logo wall. Flagship case studies remain fully anonymized (safe category descriptions only, no client names, no confidential figures). About may name real employers/agencies factually (Brainlabs, Mars Petcare, Hearts & Science, AT&T, Hallmark, UNODC Mexico) but must never imply agency-mediated relationships were direct consulting clients.
**Reason**: Some professional experience involved supporting large organizations through agencies/employers rather than contracting directly with them; presenting them as a logo wall or as direct clients would overstate the relationship and create a confidentiality/accuracy risk.
**Alternatives considered**: A homepage credibility strip using client names/logos (from the original, earlier planning round) — explicitly walked back once the agency-mediated nature of several relationships was clarified.
**Status**: Approved.

### DEC-006
**Date**: 2026-08-24
**Decision**: "Jaqueline Razo" is the personal name / site identity (titles, H1, meta author, JSON-LD `name`, LinkedIn `sameAs`). "Razzo" is intentionally the name of her independent consulting practice (used in the Career Timeline's "Razzo" entry, the `razzobusiness.com` email domain, the Instagram handle) and is **not** a typo. Do not perform a blanket find/replace of one for the other anywhere in the codebase — check context per occurrence.
**Reason**: Explicit correction from Jaqueline after an earlier planning round incorrectly treated "Razzo" as a spelling error to be globally normalized to "Razo."
**Alternatives considered**: Global normalization to "Razo" — rejected, this was the earlier (incorrect) assumption.
**Status**: Approved.

### DEC-007
**Date**: 2026-08-24
**Decision (flagged, not yet fully confirmed by Jaqueline)**: Merge Home's "Positioning/Experience" and "Operating Style" sections into one "Point of View" section, tightening Home from 8 to 6 sections (also reflecting DEC-003's Perspectives cut).
**Reason**: Both sections explain "how she thinks/works" from adjacent angles; kept separate, on top of an already dense homepage, they risk losing recruiters before Speaking/CTA. No copy is lost — only the section break is removed.
**Alternatives considered**: Keep both as separate sections (the literal original brief). Reverting is low-cost if the merged version doesn't read well once assembled — no content is deleted, only consolidated.
**Status**: Confirmed 2026-08-25 — Jaqueline reviewed the merged section live and asked only for a visual-hierarchy change (promote "Building at the intersection of business and technology" over the "Point of View" label — see DEC-031), not a split. The merge itself stands.

### DEC-008
**Date**: 2026-08-24
**Decision**: Differentiate Capabilities from Selected Work by register: Capabilities in methodology/verb register ("how I create value"), Selected Work in narrative/context register ("proof, in a specific situation") — even though both use the same 5-domain taxonomy and could otherwise read as the same list twice.
**Reason**: The two sections mirror each other almost 1:1 by name; without a deliberate register difference, the homepage risks feeling formulaic rather than exploratory.
**Alternatives considered**: Renaming one of the two sections' categories to avoid the mirror — rejected, since the 5-domain taxonomy should stay consistent (DEC-001); the fix is in the writing register, not the taxonomy.
**Status**: Approved.

### DEC-009
**Date**: 2026-08-24
**Decision**: Replace the Three.js WebGL "fit thumbnail to screen" grid effect with a lighter CSS/GSAP "Work-card reveal" interaction (full spec in `DESIGN_SYSTEM.md`) for the new Work index.
**Reason**: The WebGL effect was built for a dense image grid; the new Work page uses 5 large editorial cards, not a grid. The replacement cuts JS payload (performance priority) and is inherently simpler to make accessible (focus-visible, no hover-only gating).
**Alternatives considered**: Keep the WebGL effect and force the new card layout into a grid shape — rejected, doesn't fit the "5 flagship cases, not a dense archive" positioning.
**Status**: Approved.

### DEC-010
**Date**: 2026-08-24
**Decision**: The About page's visual Career Timeline component uses only 5 curated recent entries (Hearts & Science ×2, Razzo, Brainlabs/Mars Petcare Mexico ×2), explicitly excluding older roles (Capital Digital, RBN Trade MX, Diageo, Massimo Dutti, Serpa AI, IMEF) from that component. The broader six-stage career-arc narrative (Business/Sales → ... → Business & Technology Transformation) still appears as prose, lightly touching earlier stages without CV-style entries for them.
**Reason**: The timeline should communicate current level and career progression, not function as a complete résumé. Jaqueline's own instruction: "I'd end the employment timeline there."
**Alternatives considered**: Including the full employment history in the visual timeline — explicitly rejected by Jaqueline.
**Status**: Approved.

### DEC-011
**Date**: 2026-08-24
**Decision**: A documentation phase (`Phase 0`, this `/docs/website-repositioning/` structure) precedes all production-code implementation, and is maintained as a living record throughout the project (not a one-time artifact).
**Reason**: Ensures implementation decisions, content, scope, and technical constraints remain traceable across sessions, for both human review and continuity if a future AI session picks up implementation without this conversation's context.
**Alternatives considered**: Relying solely on the plan file at `/Users/jaqueline.razo/.claude/plans/i-want-you-to-sequential-swan.md` — rejected as insufficient for long-term project continuity since plan files are not part of the repository and are not designed to be updated incrementally as implementation proceeds.
**Status**: Approved.

### DEC-012 (resolved)
**Date**: 2026-08-24 (opened) → 2026-08-25 (resolved during Sprint 1 build)
**Decision**: Home's Speaking section keeps 4 topics (AI & Business Transformation, Building With AI, Turning Ideas Into Products, Women, Technology & Ambition); About's Speaking & Knowledge Sharing section keeps all 5 (adds Career Ownership & Technology).
**Reason**: Home is a tight teaser — 4 topics fits its 2-column card layout cleanly. About is the fuller biographical treatment, where the 5th topic belongs. No content is lost; it's just not repeated identically on both pages.
**Alternatives considered**: Making both lists match (either 4 or 5 everywhere) — rejected, the asymmetry is intentional register variation, not an inconsistency to fix.
**Status**: Approved. Implemented in `index.html` (Speaking section) and `about.html` (Speaking & Knowledge Sharing section).

### DEC-015
**Date**: 2026-08-25
**Decision**: Exclude the Home hero `<h1>` from the shared per-letter shred+shuffle reveal animation (`generateSpans()` in `js/scripts.js`) via a new `.no-letter-split` class, rather than modifying the shared animation logic or removing `.height-title` from the hero container.
**Reason**: `generateSpans()` splits hero-title text into one `<span>` per letter, then a shuffle animation staggers each letter in at 0.05s intervals in random order. This looks great for a 1-3 word title ("CONTACT", "ABOUT ME" — confirmed via screenshot) but for the new ~85-character sentence-length headline it produced a 4+ second, visually chaotic reveal — scattered letters appearing out of order across multiple wrapped lines. Confirmed via Playwright screenshot before and after the fix.
**Alternatives considered**: Removing `.height-title` from `#hero-caption` entirely — rejected, that class also controls `height:100vh` positioning and several other CSS/JS branches used consistently across every other page's hero; changing it risked side effects I couldn't fully trace across a 2,247-line shared script. The `.no-letter-split` exclusion is a single additive class + a one-line `:not()` selector change, with zero effect on any other page (nothing else uses that class).
**Status**: Approved. Verified via headless-browser screenshot: clean two-line wrap, single fade+scale-in reveal, no console errors.

### DEC-016
**Date**: 2026-08-25
**Decision**: About's old "My Services" accordion is reused (not replaced with a bare cross-reference link as originally planned in `CONTENT_ARCHITECTURE.md`) — repopulated with the same 5-capability model, retitled "My Capabilities," in the same light-background pinned-accordion layout.
**Reason**: On reflection while implementing, a full second presentation of the 5 capabilities — in a different visual register (light-background accordion vs. Home's dark-background card grid) — gives About real substance for a visitor who lands there first without visiting Home, and reinforces DEC-008's "different layouts, same info hierarchy" principle rather than under-serving About with just a link.
**Alternatives considered**: The original plan's "short cross-reference is enough" — superseded by this decision once the accordion component was in front of me and clearly had room for real content.
**Status**: Approved. Implemented in `about.html`.

### DEC-014
**Date**: 2026-08-24
**Decision**: Use FormSubmit.co as the third-party contact-form backend (`https://formsubmit.co/jaqueline@razzobusiness.com`), replacing `contact.php`. `js/clapat.js` is **not** deleted, correcting the Phase 0 audit's claim that it was empty — it's a live 23.8KB browser-detection + `ClapatSlider` library actively powering `index-showcase-gallery.html`'s gallery slider and `js/common.js`'s `.content-slider` component.
**Reason**: FormSubmit requires no account signup (an AI session can't complete an account-creation/OAuth flow on Jaqueline's behalf) — the form just posts to the address directly, and FormSubmit emails a one-time "Activate Form" confirmation link on first use. This fits the "static-friendly, GitHub-Pages-compatible" requirement with the least setup friction. The `clapat.js` correction was caught by re-verifying file size/content immediately before the planned deletion, rather than trusting the inherited Phase 0 audit — the file would have broken the gallery slider if deleted on faith.
**Alternatives considered**: Formspree and Web3Forms — both require an account-creation or API-key-request step involving email verification an AI session can't complete unsupervised; rejected in favor of FormSubmit's zero-signup model. Deleting `js/clapat.js` as originally planned — rejected once its real (non-empty, in-use) contents were discovered.
**Status**: Approved (form backend). Corrected (clapat.js retention) — see `IMPLEMENTATION_ROADMAP.md` Sprint 0 for the full account of the error.
**Outstanding**: Jaqueline must click the "Activate Form" link sent to `jaqueline@razzobusiness.com` before real submissions are delivered — an AI session has no inbox access to do this step.

### DEC-013 (resolved)
**Date**: 2026-08-24 (opened) → 2026-08-25 (resolved during Sprint 2 build)
**Decision**: `project07.html` archives with the other 6 legacy project pages; it is not folded into `case-ai-workflows.html`.
**Reason**: Its actual content is personal web-scraping scripts (Instagram scraping, Amazon scraping, metadata scraping) and Power Automate report generation — tactical automation work, not the approved "AI-enabled Workflow Design" narrative (knowledge systems, second-brain workflows, applied AI workshops). Folding it in would have diluted the flagship case with exactly the kind of generic "AI Tools" flavor the repositioning explicitly moves away from.
**Alternatives considered**: Extracting only the Power Automate/reporting-automation thread and reframing it — rejected as more effort than value, given the case already has strong original content per `CASE_STUDIES.md`.
**Status**: Approved. `archive/project07.html`.

### DEC-017
**Date**: 2026-08-25
**Decision**: Replace `work.html`'s WebGL/`ClapatSlider`-driven full-bleed gallery outright with a 5-card grid (the same `one_third`/`box-icon-wrapper` pattern used on Home), rather than adapting the slider to show 5 items.
**Reason**: The slider mechanism is keyed to a large hero image per slide; the 5 new flagship cases have no hero photography yet (all placeholder per `DESIGN_SYSTEM.md`), and DEC-009 had already decided this mechanism should be replaced, not preserved. Adapting a photo-dependent slider to a set of image-less cases would have meant either broken images or fake placeholder photography neither the brief nor `DESIGN_SYSTEM.md` calls for.
**Alternatives considered**: Keeping the slider with blank/placeholder slide images — rejected, would look broken rather than intentional. Waiting on real case photography before touching `work.html` at all — rejected, blocks the whole sprint on an asset dependency the plan explicitly says not to block on.
**Status**: Approved. `ShowcaseGallery()` in `js/scripts.js` confirmed self-guarded (no-ops when `.showcase-gallery` markup is absent) — zero console errors after removal.

### DEC-018
**Date**: 2026-08-25
**Decision**: Framework/process diagrams across the 5 case studies (the "Approach" visuals, and the "My Role" process-flow line) use a new typographic `.flow-diagram` CSS component — a dashed-border box with arrow-flow text (e.g. "Business Goals → Opportunity Areas → Prioritization → Execution → Value") — instead of an `[PLACEHOLDER — ...]`-labeled empty box or a broken `<img>` reference.
**Reason**: `DESIGN_SYSTEM.md`'s asset table calls for these to be "fully abstract/diagrammatic" even once real assets exist — a typographic treatment achieves that intent immediately, reads as an intentional editorial device rather than a missing asset, and needs no image file at all (present or future).
**Status**: Approved. Visually confirmed via screenshot.

### DEC-019
**Date**: 2026-08-25
**Decision**: Fixed a pre-existing bug found during this sprint's QA, out of original scope: `index.html`'s `<body>` tag had `class="...smooth-scroll1..."` (confirmed present since the repository's very first commit, via `git show`) instead of `smooth-scroll`, which both `style.css` and `js/common.js` depend on for height-sizing behavior. Every other page had the correct class.
**Reason**: A one-character, unambiguous, zero-risk correction discovered while verifying the homepage after this sprint's link updates — worth fixing on sight rather than filing away, per the general principle of not shipping a known bug forward once found.
**Status**: Approved.

### DEC-020
**Date**: 2026-08-25
**Decision**: Fix `.has-opacity` at the mechanism level (`js/common.js`), not by removing it from `project03.html`'s copy. Convert from a continuous scroll-scrub (measured empirically at a dim, low-contrast 0.2 resting opacity) to a one-time reveal, gated behind `prefers-reduced-motion`.
**Reason**: All new positioning-critical copy (Sprints 1–2) already doesn't use this class at all — there was nothing to remove there. `project03.html` (Earlier Work, secondary content) and the 7 archived pages still use it; fixing the shared mechanism benefits all of them without touching 8 separate files individually, and without deciding on their behalf whether the word-reveal effect itself should be removed from content that's explicitly de-emphasized already.
**Status**: Approved. Verified via headless-browser computed-style check: spans render at 0.2 opacity at rest (confirmed the defect), reach 1 on scroll-entry, and stay at 1 regardless of further scroll (confirmed the fix); under `prefers-reduced-motion`, spans render at 1 immediately with no animation at all.

### DEC-021
**Date**: 2026-08-25
**Decision**: Set the hamburger menu's `role`, `tabindex`, `aria-expanded`, and keydown handling entirely via JS (`js/common.js`, inside the `FirstLoad()` function that already reruns after every AJAX page transition) rather than hand-editing the attributes into each of the ~15 pages' duplicated header markup.
**Reason**: The header/nav/footer duplication across every page (no templating system exists — see `TECHNICAL_STANDARDS.md`) makes any markup-level fix an error-prone find-and-replace across many files. Setting these attributes in the one shared script that already initializes on every page load and every AJAX transition achieves the same result with a single, low-risk change point, and stays consistent automatically as new pages (the 5 case studies, future ones) are added.
**Alternatives considered**: Editing `#burger-wrapper` in every HTML file directly — rejected as higher-risk (more files touched, more chances for a typo or an inconsistency to slip through) for no benefit over the JS approach, given `FirstLoad()` already reliably runs on every page.
**Status**: Approved. Verified via headless-browser: focusing the button and pressing Enter opens the menu and flips `aria-expanded` to `"true"`; visible focus-visible outline confirmed via screenshot.

### DEC-022
**Date**: 2026-08-25
**Decision**: Reuse the theme's existing `disable-cursor` body class — already the mechanism `isMobile()` uses to turn off the custom cursor on touch devices — to also disable the cursor under `prefers-reduced-motion`, rather than adding new reduced-motion checks scattered across the cursor's individual GSAP tweens.
**Reason**: `window.Core()` (the cursor system) is already fully gated by a single `if (!isMobile() && !$('body').hasClass("disable-cursor"))` check at its top. Adding the class before `Core()` initializes achieves complete cursor disablement (the mouse-follow ticker never starts, none of its hover-triggered tweens ever bind) through the codebase's own existing, already-tested gate, rather than a new one.
**Status**: Approved. Verified via headless-browser test with a `reduced_motion: "reduce"` browser context: `disable-cursor` class confirmed present on `<body>`.

### DEC-023 (scope decision, not deferred silently)
**Date**: 2026-08-25
**Decision**: A fully exhaustive `prefers-reduced-motion` audit of every individual ScrollTrigger pin, parallax transform, and preloader delay across `js/common.js` (3,600+ lines) and `js/scripts.js` (2,200+ lines) was not attempted in Sprint 3.
**Reason**: The two highest-impact, most continuously-active motion sources (the mouse-follow cursor, and the readability-harming `.has-opacity` scroll-scrub) are fixed — see DEC-020 and DEC-022. A full pass through every remaining pinned/parallax/scrub animation in this deeply interconnected animation codebase (the Sprint 1 letter-split bug is a concrete example of how non-obvious the interactions between these systems can be) is a substantially larger and riskier undertaking than fits this sprint's scope, and rushing it risks introducing new bugs rather than genuinely improving accessibility.
**Alternatives considered**: Attempting a sweeping change across both files in this sprint — rejected as too high-risk given the demonstrated fragility of this animation system under rapid, broad changes.
**Status**: Approved as a conscious scope reduction, flagged for Sprint 5 if full reduced-motion coverage becomes a hard requirement. Not a silent gap — recorded here and in `IMPLEMENTATION_ROADMAP.md` Sprint 3.

### DEC-024
**Date**: 2026-08-25
**Decision**: Generate the 10 OG share images programmatically (Python/Pillow: DIN Condensed Bold + Arial on the site's own `#0c0c0c` background with the accent-color rule) rather than treating real photography/design as a blocking dependency.
**Reason**: `DESIGN_SYSTEM.md`'s own visual asset plan calls for OG images to be "typographic, on-brand, not screenshots of the page itself" — a programmatic approach satisfies that directly, ships now instead of blocking Sprint 4 on a design-asset dependency, and is trivially regenerable if the copy changes.
**Status**: Approved. Visually confirmed via screenshot — clean, legible, on-brand.

### DEC-025
**Date**: 2026-08-25
**Decision**: Regenerate `favicon.ico` as a proper multi-size icon (16/32/48px) plus a full supporting set (`favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `site.webmanifest`), all derived from `images/logo-white.png` (the site's own mark).
**Reason**: Sprint 0's favicon fix only corrected the file's *path* (it was being requested from repo root but lived in `images/`); the file itself was still just the single original 16px icon, not a real favicon set. Discovered while doing this sprint's favicon task properly.
**Status**: Approved. All new files confirmed serving HTTP 200.

### DEC-026
**Date**: 2026-08-25
**Decision**: Every card/grid title built across Sprints 1–2 (90 elements across 8 files: Capabilities, Selected Work, Speaking, Final CTA, and every case study's Challenge/Built/Outcome grids) used `<h6>`, skipping `<h3>`–`<h5>` entirely (`<h2>` straight to `<h6>`). Fixed by adding a `.card-title` CSS class (`css/tokens.css`) that exactly replicates `h6`'s existing 18px/36px sizing, and changing the element itself to `<h3>`.
**Reason**: `<h6>` was a deliberate, pre-existing theme convention for compact card-title text (h3's default fluid sizing is ~45px+, meant for full section headings, not grid cards) — the *sizing* choice was correct, but skipping heading levels is a real hierarchy issue. The `.card-title` class preserves the exact visual result while fixing the semantic level, at zero visual-regression risk (confirmed via screenshot).
**Alternatives considered**: Leaving `<h6>` as-is (matches the original theme's own pattern, low risk) — rejected since this project has an explicit "no skipped heading levels" requirement from the original SEO audit, and a safe fix was available.
**Status**: Approved.

### DEC-027 (flagged, not decided)
**Date**: 2026-08-25
**Decision**: `images/about.mp4` (9.3MB, the background video behind `about.html`'s hero portrait) was left uncompressed and untouched.
**Reason**: No video-compression tooling (`ffmpeg`) is available in this environment. The only alternative without that tooling — removing the video and keeping just the now-compressed static image — is a visual/content decision about the site's identity (does the ambient motion matter to Jaqueline, or is it purely decorative weight), not a technical call this project should make unilaterally on performance grounds alone.
**Status**: Open. Needs either a pre-compressed version supplied by Jaqueline, or an explicit decision from her to drop the video in favor of the static image.

### DEC-028
**Date**: 2026-08-25
**Decision**: Removed the dead placeholder Universal Analytics snippet (`ga('create', 'code_here', 'auto')`) from the 5 pages that still had it. Did not replace it with anything.
**Reason**: The snippet was confirmed inert since the original audit (placeholder tracking ID, deprecated UA product) — shipping known-dead code forward serves no purpose. A real GA4 property requires Jaqueline to create the account first; that's an external dependency this project can't complete on her behalf.
**Status**: Approved (removal). GA4 wiring itself remains open, blocked on her account creation.

### DEC-029
**Date**: 2026-08-25
**Decision**: Hero (`index.html`) headline scaled up to `clamp(5.4rem, 4.4rem + 4vw, 8.4rem)` (from `clamp(2.4rem, 5.2vw, 4.6rem)`), with `line-height` tightened to `1.05` and the wrap column widened to `1500px`. `js/common.js`'s `setHeroProperties()` was patched to size `#hero-caption` to `Math.max(window.innerHeight, scrollHeight)` instead of a flat `window.innerHeight`, since at the new scale a wrapped sentence can exceed one viewport on short/narrow screens and the prior fixed height would have clipped it. Also added a new "Signature portrait section" on Home (`images/JaquelineRazo_RAZZO.png`, re-encoded and renamed to `images/jaqueline-signature[.@2x].{webp,jpg}`, served via `<picture>`) directly after the Hero. Its scroll-scrub image parallax was initially implemented by reusing the vendor `.has-parallax` class/mechanism, but browser testing (Playwright, 390px mobile viewport) caught that `.has-parallax` is also targeted by an unrelated, pre-existing mobile-only fix a few hundred lines earlier in the same file (`isMobile()` block: `$('.smooth-scroll main, .has-parallax, nav, ...').css({'height': winHeight})`), which forcibly set the card's height to `window.innerHeight`, destroying its `aspect-ratio` sizing and stretching the portrait. Switched to a small, dedicated GSAP/ScrollTrigger block scoped to `.signature-card` (same fromTo recipe: `y`/`scale` scrub) instead of touching that shared vendor selector list, and dropped `has-parallax` from the new markup entirely. The dedicated block is gated behind `prefers-reduced-motion` per `TECHNICAL_STANDARDS.md`'s "respect prefers-reduced-motion in every new or modified animation-driving code path" (this is new code, not a retrofit of an already-shipped effect, so it's not covered by the deferred "Sprint 5" full-audit item).
**Reason**: The hero and signature-section specifics were requested directly by Jaqueline (font-scale values, image, placement). The height-patch, line-height/max-width tuning, the `.has-parallax`→dedicated-script switch, and the reduced-motion gate are implementation judgment calls required to ship those requests without regressions, made under the standing rules in `TECHNICAL_STANDARDS.md`/`DESIGN_SYSTEM.md` rather than against them. The `.has-parallax` collision specifically was only caught by actually running the page in a real viewport, not from reading the CSS/JS in isolation — a reminder that this class carries a non-obvious sitewide side effect and needs care before reuse elsewhere.
**Status**: Approved (implemented this pass, verified in-browser at 390/1440/1920px viewports). `cwebp`/`libwebp` installed via Homebrew to produce the WebP asset — the repo's first WebP usage; original `images/JaquelineRazo_RAZZO.png` left in place, unreferenced, as a source file (not deleted unilaterally).

### DEC-030
**Date**: 2026-08-25
**Decision**: Shortened the "Working Across" positioning ticker's (`.list-rotator-wrapper`) pinned scroll range from `window.innerHeight * 3` to `window.innerHeight * 1` in `js/common.js` (both the item-stagger timeline's `end` and the list's vertical-translate tween's `end`).
**Reason**: Jaqueline reported the ticker felt slow — at 3 full viewport-heights of pinned scroll to cycle through 5 items, it read as the user having to keep scrolling in place rather than a single continuous motion. GSAP's scrubbed timeline maps its whole duration proportionally onto whatever pixel range `end` specifies, so shrinking that one multiplier compresses the whole sequence without touching the per-item stagger/duration values or any other mechanic.
**Status**: Approved (implemented this pass).

### DEC-031
**Date**: 2026-08-25
**Decision**: Redesigned Home's "Point of View" section. The "Point of View" H2 is demoted to a small `.eyebrow` label; "Building at the intersection of business and technology" (previously a `<p><strong>`) is promoted to the section's real `<h2>`, styled with a new reusable `.editorial-statement` class (`clamp(2.4rem, 5.2vw, 4.6rem)` — reusing the hero's pre-DEC-029 clamp values, now free since the hero moved to a larger range). Layout switched from a single centered text column to the site's existing `.pinned-section`/`.pinned-element.left`/`.scrolling-element.right` component (already used on `about.html`'s Capabilities section) — the eyebrow+headline pin in place while the supporting paragraphs scroll past, no new JS. Added a small original SVG motif (`.pov-mark`, two overlapping accent-stroked circles with a slow opposing drift) next to the headline, visually reinforcing the "intersection" thesis.
**Reason**: Jaqueline felt "Point of View" as the dominant headline buried the actual thesis statement, and asked for the section to be redesigned per the site's established editorial-differentiation direction rather than keep the flat centered-text-block treatment shared by every other section. Reusing `.pinned-section` (proven, already shipped) instead of a new sticky mechanism follows `TECHNICAL_STANDARDS.md`'s "prefer reusable classes already established" rule and avoids stacking another custom pin on a page that already has several ScrollTrigger pins.
**Status**: Approved (implemented this pass). See `DESIGN_SYSTEM.md` for the `.pov-mark` interaction spec (required there before implementation, per that file's own rule).

### DEC-032
**Date**: 2026-08-25
**Decision**: Replaced Capabilities' flat 3-up `.card-row`/`.one_third` grid with a full-bleed horizontal mega-card strip (`.capabilities-strip`): 5 bordered cards (accent top border, large ghost index numeral, two-tone mixed-size title, icon tinted accent) in a native `overflow-x`/`scroll-snap` row, plus prev/next buttons and a scroll-progress bar. No copy changed — same 5 capabilities, same descriptions/tags.
**Reason**: Jaqueline referenced the Lando Norris site (built by OFF+Brand) as a layout she likes — bold mixed-size typography and strong color-accent use — and asked for something horizontal with "mega-cards" for Capabilities specifically. Chose native scroll-snap over a new GSAP horizontal-pin mechanism (the codebase has an unused "Horizontal Panels" component that could have done this via pin+scrub) because the page already carries several ScrollTrigger pins (hero, ticker, Point of View) and today's `.has-parallax` incident (DEC-029) showed reused vendor motion mechanisms in this codebase can carry non-obvious side effects — native CSS is simpler, easier to verify, and gets mobile touch-swipe for free.
**Status**: Superseded same day by DEC-033 — Jaqueline sent a much larger, more specific brief (bento grid, focus-mode swap, generative particle field, new AI-accent colors) right after seeing this shipped; the horizontal-strip version above was live for one round only.

### DEC-033
**Date**: 2026-08-25
**Decision**: Replaced the horizontal mega-card strip (DEC-032) with an asymmetric editorial bento grid (`.cap2-*` classes): a 3-column/2-row CSS Grid with one "featured" card (tall center slot, violet glow, full description/tags) and 4 standard cards (compact, 2-line-clamped copy). Clicking any card — or a nav-rail dot, or the prev/next arrows — swaps which capability is featured, animated with GSAP Flip (already loaded/registered for the hero's own Flip usage; no new dependency). Added: cursor-reactive parallax on each card's index/icon (mouse-driven CSS custom properties, skipped on touch/reduced-motion); an ambient 2D-canvas particle field behind the whole section (~70 points, very low opacity, drifts toward the cursor and tints near the active card, skipped entirely under reduced-motion); a `STRATEGY × SYSTEMS × DATA × AI → IMPACT` taxonomy line under the section statement. On mobile (≤767px) the bento collapses to a single-column accordion — tapping a card expands its description/tags in place, only one open at a time — rather than attempting the desktop layout at a narrow width. Introduced three new CSS tokens (`--accent-ai-violet` #7c3aed, `--accent-ai-orchid` #c084fc, `--accent-ai-ice` #7dd3fc), used only for this section's active/hover/particle states — `--color-accent` (copper) remains the one sitewide accent everywhere else. No capability copy changed.
**Reason**: Jaqueline sent a detailed brief asking for a "highly interactive, premium editorial-tech experience" — asymmetric bento composition, a changeable "protagonist" card, generative AI-adjacent visual texture, and a violet/orchid/icy-blue interaction-accent trio layered on top of (not replacing) the existing warm accent — explicitly scoped to this one section, not a sitewide palette change. GSAP Flip was already loaded and used elsewhere (hero, zoom gallery, move-thumbs gallery) for exactly this "animate a layout reflow, not a modal" pattern, so reusing it here (rather than hand-rolling FLIP math) followed `TECHNICAL_STANDARDS.md`'s reuse-existing-libraries rule. Canvas (not Three.js, not a new library) was used for the particle field per the brief's own "no large dependency purely for decorative motion" constraint.
**Status**: Approved (implemented this pass, verified in-browser: desktop bento + featured-swap + hover dim/glow + keyboard activation, mobile accordion, and `prefers-reduced-motion` — confirmed the canvas draws zero pixels and Flip becomes an instant swap with no transition). See `DESIGN_SYSTEM.md` interaction spec 6 (revised). Color scheme reverted same day — see DEC-034.

### DEC-034
**Date**: 2026-08-25
**Decision**: Reverted DEC-033's violet/orchid/icy-blue "AI accent" trio — removed `--accent-ai-violet`/`--accent-ai-orchid`/`--accent-ai-ice` from `css/tokens.css` entirely. Capabilities is now strictly black/white/copper (`--color-accent`), matching the rest of the site. The featured card's emphasis is now an inversion (white background, black text/icon/index) instead of a colored glow; hover states, the divider fill, and the nav-rail's active dot all use `--color-accent` instead of the removed trio. Also replaced the flat 2D-canvas ambient particle field with a Three.js `THREE.Points` wave-mesh: ~5,400 points on a 90×60 grid, GPU-displaced in a custom GLSL vertex shader (simplex noise + sine waves) into a slowly undulating 3D surface, rendered in warm copper/bronze/gold tones with distance fog fading the edges to black, and a subtle cursor-driven camera/wave response.
**Reason**: Jaqueline asked to pull the palette back to black/white/one accent — the violet/blue trio from DEC-033 wasn't wanted — and separately asked for an abstract 3D particle/data-art visual (specific brief: wavy luminous point-mesh, copper/gold tones, GLSL shaders, Three.js, subtle cursor interaction, "elegant and organic, not water"). Three.js was already loaded sitewide (`TECHNICAL_STANDARDS.md`'s approved-libraries list, currently powering the WebGL grid-fit effect elsewhere) so this uses an existing dependency, not a new one; GSAP Flip and the bento/accordion mechanics from DEC-033 are unchanged.
**Status**: Approved (implemented this pass, verified in-browser: colors confirmed black/white/copper only, featured card confirmed white-bg/black-text, wave mesh renders correctly on desktop and mobile with no console errors, and renders one static frame with no RAF loop under `prefers-reduced-motion`). See `DESIGN_SYSTEM.md` interaction spec 6 (revised again).

### DEC-035
**Date**: 2026-08-25
**Decision**: Removed the "Featured" pill badge from the Capabilities bento cards entirely (Jaqueline reported the top-edge-ribbon fix from earlier the same day still wasn't working for her) — no badge markup, no CSS, at all. Replaced the sitewide `.has-animation`/`.has-mask-fill` entrance on Capabilities' eyebrow/title/statement/taxonomy/cards with a bespoke GSAP timeline: the title scrambles through random characters before resolving to "Capabilities," the taxonomy segments pop in staggered, and the 5 cards fly in from different directions with rotation/scale keyed to each card's fixed identity (`data-cap`, not the mutable `data-slot`) and settle with a `back.out` overshoot.
**Reason**: The badge, even repositioned, wasn't reading correctly for her — simplest fix is removing a decorative label that isn't earning its place rather than iterating further on its position. The entrance was a direct ask for something "innovadora y cautivante" beyond the generic sitewide fade-up, appropriate specifically for the one section built around an AI/data-art visual language (the 3D wave mesh, the taxonomy line) — keyed to card identity rather than slot so a later featured-swap doesn't make the entrance direction look wrong on revisit.
**Status**: Superseded same day by DEC-036 — Jaqueline didn't like the badge fix's follow-on entrance treatment either.

### DEC-036
**Date**: 2026-08-25
**Decision**: Reverted DEC-035's bespoke Capabilities entrance. Title/eyebrow/statement/taxonomy go back to the sitewide `.has-animation`/`.has-mask-fill` defaults — the same treatment as Point of View's promoted "Building at the intersection..." statement. The scramble-text effect is removed entirely. Cards now use a **scroll-scrubbed** descent instead of the one-time fly-in-with-rotation: they start 90px above their resting position and transparent, then move into place tracking scroll position 1:1 (`scrub: true` on a `ScrollTrigger` spanning `.cap2-grid`, `ease: 'none'`) rather than playing once on scroll-enter. Gated behind `prefers-reduced-motion` (unlike the one-time reveal it replaced) since it's now genuinely scroll-scrubbed motion, which this project's own accessibility principles require gating.
**Reason**: Jaqueline asked for the title to match Point of View's existing treatment, and for the cards to enter from above "para que el efecto acompañe el scroll" — referencing this codebase's dormant `.move-thumbs-wrapper` gallery effect as the touchstone for scroll-accompanying motion. That mechanism's actual implementation (two DOM states, GSAP Flip repositioning individual thumbnails between a scattered intro layout and a final grid, each with its own `data-start`/`data-stop` scroll offsets) is built for photos changing position between two layouts, not text cards — replicating it literally would mean inventing a second card layout with no content reason to exist. Reused its underlying principle (`scrub: true`, motion driven directly by scroll delta, not a triggered timeline) instead of its literal structure, and said so plainly rather than silently building something unrelated to what was asked.
**Status**: Superseded same day by DEC-037 — the scrub was too subtle/short to register on a fast scroll.

### DEC-037
**Date**: 2026-08-25
**Decision**: Made the Capabilities cards' entrance (DEC-036) much larger and pinned on desktop: cards now start ~65vh above their resting position (was 90px) and scaled to 0.88, and the whole `.cap2-shell` section pins for `window.innerHeight * 1.3` of scroll while a scrubbed GSAP timeline cascades the 5 cards in one at a time (`i * 0.35` stagger offset), using the same pin+scrub technique already used elsewhere on this page (hero, ticker, Point of View). On mobile (checked via the sitewide `isMobile()` device check, not viewport width) there's no pin — cards just settle in via a normal scroll-triggered reveal, matching how the ticker and `.pinned-element` mechanism already degrade on mobile.
**Reason**: Jaqueline reported the DEC-036 version was "muy pequeño el movimiento" and barely noticeable on a fast scroll, and asked for the same level of visual drama as the `.move-thumbs-wrapper` "Recognitions" effect she remembered. A short, non-pinned scrub over a small pixel range is exactly the kind of thing a fast scroll skips past in a single frame — pinning is the fix, since it holds the section in view for a fixed scroll distance no matter how fast the user scrolls, which is the actual mechanism (not just the visual size of the travel) that made the original effect impossible to miss.
**Status**: Superseded (partially) same day by DEC-038 — the pin itself worked, but engaged too early and left a large empty gap above the section.

### DEC-038
**Date**: 2026-08-25
**Decision**: Two changes to fix the empty-space problem in DEC-037's pin: (1) changed the pin's `start` from `'top 80%'` to `'top top'`, matching this page's other pins (hero, ticker) — pinning at `'top 80%'` froze the section while it was still mostly below the viewport, leaving a tall empty gap above it (the previous section having already scrolled away) for the entire pinned duration. (2) Restructured Capabilities' layout: the title/eyebrow moved out of a narrow ~340px side column into a horizontal band (`.cap2-intro-left` + `.cap2-intro-right`, flex row) above the now full-width card grid, instead of sitting beside it. Pin duration also trimmed from `window.innerHeight * 1.3` to `1.0`.
**Reason**: Jaqueline pointed out the pinned frame was mostly empty black space with the title/cards crammed at the bottom, and asked specifically for the titles to move above the cards so that space gets used while the cascade plays out. Both changes work together: `'top top'` alone would still have shown a title column with empty space beside it (since the intro column didn't fill the frame's height), and the layout change alone wouldn't have helped without also fixing when the pin engages.
**Status**: Approved (implemented this pass).

### DEC-039
**Date**: 2026-08-25
**Decision**: Two small sizing tweaks to Capabilities: `.cap2-title` ("Capabilities") recomputed as a fluid clamp reaching 9.2rem at 1600px viewport width (floor unchanged at 2.6rem/400px, same fluid-clamp method as the hero) instead of the previous 4.2rem ceiling; `.cap2-taxonomy` font-size raised from 12px to 14px.
**Reason**: Direct request. The title's previous ceiling (4.2rem) was set for the horizontal-band layout introduced in DEC-038 but was smaller than wanted once seen in browser.
**Status**: Approved (implemented this pass). Note (not asked for, flagging for awareness only): at the new title size, the entrance cascade's card-1 briefly overlaps the title area for a few frames while descending from -65vh (unrelated to this change — the same transient overlap existed before, just less visually prominent against the smaller title); the final settled state is unaffected and renders cleanly. Left as-is since it wasn't part of what was asked and resolves on its own by the time the cascade completes.

### DEC-040
**Date**: 2026-08-25
**Decision**: Replaced Selected Work's flat 5-up `.card-row`/`.one_third` grid (the same pattern Capabilities used before its own redesign) with an editorial "index" list: 5 full-width rows, each a single `<a>` link (ghost index number, work-tag, lowercase Six Caps title, 2-line-clamped description, "View case study →"), separated by thin dividers, with a hover state that tints the row, brightens the index, and nudges the title/arrow right. Entrance uses the plain sitewide `.has-animation` default, not a bespoke effect. No copy changed.
**Reason**: Continuing the section-by-section editorial redesign. Deliberately gave Selected Work a different container language from Capabilities' bento/mega-card treatment (variety across sections) while reusing the shared vocabulary established so far (ghost index numerals, `--color-accent`, lowercase Six Caps titles) — a vertical list also fits "entries in one body of work" better than a card grid, and needs no images, which the case-study pages don't have. Used the plain sitewide entrance default rather than inventing another bespoke animation, given how much back-and-forth the Capabilities entrance took — a full-row link with simple hover/shift feedback doesn't need more than that.
**Status**: Superseded same day by DEC-041 — before committing, Jaqueline asked for a different concept (a file-folder/archive metaphor) instead of the plain index list.

### DEC-041
**Date**: 2026-08-25
**Decision**: Replaced Selected Work's editorial-index-list version (DEC-040) with a "case files" concept: 5 rows alternating left/right, each a folder-tab (index number + work-tag) pinned to the row's outer edge with a detail area (title always dimly visible; description + CTA reveal on hover/focus) filling the rest. Entrance drops each tab in from its own side with a slight rotation, settling flat. Confirmed the specific direction with Jaqueline via two quick questions before building it (alternating left/right vs. grouped-by-side vs. tilted-book-stack; literal skeuomorphic folder styling vs. an abstracted/editorial version) — she chose alternating sides and the abstracted style, consistent with the site's existing visual language rather than literal paper texture/shadows.
**Reason**: Direct request, described verbally as a file-folder/archive metaphor with tabs on the "laterals" and files/books "falling toward the center" on entrance. Given how much back-and-forth the Capabilities entrance took, and that this was a genuinely novel/ambiguous concept with several plausible interpretations, confirmed direction before implementing rather than guessing and risking another long iteration cycle.
**Status**: Superseded (scale only, concept confirmed) same day by DEC-042 — right concept, needed to be much bigger and more physically assertive.

### DEC-042
**Date**: 2026-08-26
**Decision**: Enlarged the "case files" tabs (DEC-041) to a fixed 505×408px (scaling down at ≤1024px and stacking full-width on mobile), made `.work-files` full-bleed so each tab sits flush against the true viewport edge (not just the content column's inset), moved the title into the tab itself (alongside the index number and work-tag — previously it was in the hover-revealed detail area), and increased the vertical gap between rows so the much taller tabs don't crowd each other.
**Reason**: Jaqueline confirmed the folder-tab concept was right but wanted it far more prominent — literal pixel dimensions given, plus "que sí vea esta ilusión de que se están asomando" (the peeking-out-from-the-edge illusion needs to actually read), which only works if the tab touches the real screen edge rather than sitting inset within the padded content column. She also confirmed titles belong inside the tab (part of what's always visible), leaving only the description + CTA as the hover reveal.
**Status**: Proposed — implemented and verified in-browser (505×408px confirmed via computed styles, tab flush at x=0/right edge confirmed, responsive scaling and mobile stacking checked, no console errors); awaiting Jaqueline's review before commit.

### DEC-043
**Date**: 2026-08-26
**Decision**: Replaced the "case files" tab version (DEC-041/042) with a "suspended dossier" concept: 5 mega-cards freely scattered across a full-bleed black canvas in a two-stack diagonal composition (01/03/05 descending left, 02/04 descending right), deliberately overflowing the canvas edges into the surrounding light frame, each with a fixed base rotation/depth plus a bounded, lerped cursor-follow (tilt/lift toward the pointer with edge resistance, never straightening the base pose). Structurally, each card is 3 layers — an untouched outer anchor for position/rotation, a motion wrapper JS drives via CSS custom properties, and a rigid content surface that never gets its own transform — so the physics and the base pose never fight each other, and card text never inherits jittery per-frame transforms. Mobile drops the scattered composition entirely for a static vertical stack with tap-to-reveal-then-navigate (no hover, no physics).
**Reason**: Jaqueline sent an extremely detailed 40-section technical brief specifying this exact composition, physics model, and layering — a full step up in complexity and physical presence from the file-tab metaphor, explicitly evoking documents pinned/suspended in space rather than folder tabs. The 3-layer split and the lerped/bounded (not 1:1) cursor physics were both explicit, specific requirements in the brief, not judgment calls.
**Status**: Proposed — implemented and verified in-browser across desktop hover/physics, mobile tap, and `prefers-reduced-motion`; all 5 `ajax-link`/`data-type="page-transition"`/href values confirmed unchanged. Two real bugs surfaced during verification and were fixed before reporting back: (1) the vendor theme's `.light-content .light-section h3/p/a` rules (`style.css`) — 3-part selectors more specific than this section's single-class card-text rules — were forcing card titles/tags/descriptions to near-black on the black card surface regardless of source order; fixed with matching-specificity overrides scoped to `.light-content .light-section .work-file*` in `tokens.css`. (2) On mobile, the site's own ajax-link/page-transition click handlers (bound to the same `<a>` and via delegation on `#main`) fired unconditionally on the very first tap, starting real navigation instead of just revealing the description as intended — `preventDefault()` alone doesn't stop them since they don't rely on native link navigation; fixed by adding `stopImmediatePropagation()` to the first-tap interception in `js/common.js`. Superseded same day by DEC-044 — Jaqueline didn't want the description/CTA layered inside the card at all.

### DEC-044
**Date**: 2026-08-26
**Decision**: Reduced the "suspended dossier" card face (DEC-043) to exactly two pieces of copy — the work-tag and a much larger title, now a fluid clamp reaching 4.6rem (was 1.6rem) — and moved the description + "View case study →" out of the card entirely into a new `.work-file-reveal` element, a plain sibling placed right after each card in the markup. On hover/focus, that sibling fades/slides in from whichever side of the card faces the canvas center (`data-side="right"` for the left-hand stack — cards 01/03/05, `data-side="left"` for the right-hand stack — 02/04), landing in the empty middle space the composition already leaves for this. Its offset is computed from two shared tokens (`--work-card-w`, `--work-reveal-w` — half of each, plus a fixed gap) instead of a hand-picked pixel value, so the clearance can't silently fall out of sync with the actual card/reveal size the way the first attempt at this did. Cards themselves also grew (`--work-card-w` raised to `clamp(360px, 30vw, 540px)`, from `clamp(300px, 27vw, 460px)`) to give the bigger title room. On mobile, `.work-file-reveal` switches to a `max-height`-collapsible block directly below its card instead of a side panel, since a phone-width stack has no horizontal void to project into.
**Reason**: Jaqueline explicitly said the card should carry only the tag and the (much bigger) title — "esos son los dos que tienen que tener" — and that everything else which used to appear on hover (description, CTA) needed to appear **outside** the card, specifically in the empty horizontal space the composition leaves in the middle, which she confirmed was the deliberate reason that space was left empty in the first place. She also asked for the cards themselves to be a bit bigger, and explicitly said overlapping between cards is acceptable as long as it doesn't hurt legibility of the content.
**Status**: Proposed — implemented and verified in-browser. A real bug surfaced mid-implementation and was fixed before reporting back: the first offset formula accounted for half the *card's* width but not half the *reveal panel's own* width (the transform re-centers the panel before offsetting it), so on cards with a big rotated footprint — worst case, card 04 — the reveal landed partly underneath the card's own title instead of clear of it. Fixed by deriving the offset from both widths via shared tokens (`--work-card-w`/`--work-reveal-w`) plus a fixed gap, then confirmed a zero-overlap bounding-box check for all 5 cards. Desktop hover (all 5 cards, correct side, no overlap with own or neighboring cards), mobile tap-to-expand-then-navigate, color contrast, and `prefers-reduced-motion` all re-verified after the change with no console errors. Approved and committed.

### DEC-045
**Date**: 2026-08-26
**Decision**: Two unrelated cosmetic changes. (1) Capabilities featured-card styling: `.cap2-card--featured .cap2-card-title` now renders at a fixed 4.8rem with `letter-spacing: 0.1em` on desktop (was a fluid clamp topping out at 2.8rem) — stepped down to 3.2rem at ≤1024px and 2.6rem at ≤767px so it doesn't overflow the narrower card at those widths, since a bare fixed value wouldn't scale down on its own. `.cap2-card-tagline` loses its italic style sitewide (was `font-style: italic`); on the featured card specifically it becomes a solid copper (`#8c6144`) banner with centered white text and small padding, instead of translucent black-on-cream text. (2) The "Ideas That Move People to Act" (Speaking) row gets a new background: `images/ideas that move people to act.png`, a particle-art microphone illustration, anchored `center right` with `background-size: cover` on desktop/tablet. Added a `.speaking-row` class to the row to scope this (it previously had no dedicated hook).
**Reason**: Direct request, with literal CSS given for the featured-card title/tagline changes — "para que la tarjeta sea más llamativa y tenga mejor lectura." The Speaking row background was a direct asset swap request (file already placed in `images/` by Jaqueline).
**Status**: Approved — implemented and verified in-browser (computed font-size/letter-spacing/colors match, non-featured taglines confirmed non-italic, background image loads with no request/console errors). One judgment call made without asking, flagged here for visibility: `cover` sizing on the Speaking background looked correct on desktop/tablet but blew the wide illustration up far past its actual density on mobile's narrow+tall viewport, burying the text under solid dot texture — added a `≤767px` override switching to `background-size: contain` (own proportions, no crop/zoom) so the mobile section stays legible; nothing else about the row changed at that breakpoint. Approved and committed.

**Separately noted, not part of this decision**: while re-verifying Capabilities for the above, found a pre-existing, reproducible bug unrelated to today's changes — scrolling through the pinned cascade can leave a stale card (e.g. capability 04) rendered on top of another slot's card (e.g. capability 01) at the same position, persisting indefinitely rather than resolving once scrolling stops. Confirmed via computed bounding rects (both cards' `getBoundingClientRect()` overlapping) that this is a stuck state, not a transient animation frame. Not touched — outside the scope of today's ask, and worth a dedicated look at the Flip-based featured-slot-swap logic (`js/common.js`) rather than a quick patch.

### DEC-046
**Date**: 2026-08-26
**Decision**: Rebuilt the "Explore Selected Work" CTA (the dark row right below the Selected Work cards) from a small centered pill button into a full-bleed clickable band: the entire row, edge to edge and at a generous vertical padding (`clamp(64px, 9vw, 120px)`), is now one `<a>` element. On hover/focus the whole band inverts (black background → white, white text → black) and the text runs the vendor's own text-swap trick (`data-hover` + `::before`, the same mechanism the small button already used) at a bigger scale — reused rather than reinvented, since it's specifically the effect Jaqueline pointed to. Text size increased from the button's 16px to a fluid clamp topping out at 2rem (roughly double, "un poquito más grande" per her caution not to overdo it). Dropped the vendor `clapat-button`/`button-border`/magnetic-pull (`parallax-wrap`) wrapper markup entirely, since a magnetic cursor-pull is a small-target effect that doesn't translate to a full-viewport-width band; kept `ajax-link`, `data-type="page-transition"`, `has-animation`, and `fadeout-element` on the new single `<a>` so entrance, navigation, and the page-transition fade-out all still work.
**Reason**: Direct request — Jaqueline wanted the existing button's hover "change" effect extended from just the small pill to the entire dark strip, so the whole visible band reads as the clickable/animated surface rather than a small target floating inside a static dark section, with a modest text-size bump alongside it.
**Status**: Proposed — implemented and verified in-browser (full 100vw width confirmed via computed rect at both desktop and mobile widths, hover color invert and text-swap transform confirmed via computed styles, `ajax-link`/`data-type`/`href` all preserved, no console errors). Awaiting Jaqueline's review before commit.
