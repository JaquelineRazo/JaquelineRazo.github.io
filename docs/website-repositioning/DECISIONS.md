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
**Status**: Experimental — confirm during Sprint 1 content review; revert to two sections if the merge doesn't work in practice.

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
