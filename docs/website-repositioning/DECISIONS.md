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
**Decision**: The About page's visual Career Timeline component uses only 4 curated recent entries (Hearts & Science ×2, Razzo, Brainlabs/Mars Petcare Mexico ×2), explicitly excluding older roles (Capital Digital, RBN Trade MX, Diageo, Massimo Dutti, Serpa AI, IMEF) from that component. The broader six-stage career-arc narrative (Business/Sales → ... → Business & Technology Transformation) still appears as prose, lightly touching earlier stages without CV-style entries for them.
**Reason**: The timeline should communicate current level and career progression, not function as a complete résumé. Jaqueline's own instruction: "I'd end the employment timeline there."
**Alternatives considered**: Including the full employment history in the visual timeline — explicitly rejected by Jaqueline.
**Status**: Approved.

### DEC-011
**Date**: 2026-08-24
**Decision**: A documentation phase (`Phase 0`, this `/docs/website-repositioning/` structure) precedes all production-code implementation, and is maintained as a living record throughout the project (not a one-time artifact).
**Reason**: Ensures implementation decisions, content, scope, and technical constraints remain traceable across sessions, for both human review and continuity if a future AI session picks up implementation without this conversation's context.
**Alternatives considered**: Relying solely on the plan file at `/Users/jaqueline.razo/.claude/plans/i-want-you-to-sequential-swan.md` — rejected as insufficient for long-term project continuity since plan files are not part of the repository and are not designed to be updated incrementally as implementation proceeds.
**Status**: Approved.

### DEC-012 (open, unresolved — track until closed)
**Date**: 2026-08-24
**Decision**: Not yet made. Home's Speaking section (approved copy) lists 4 topics; About's Speaking & Knowledge Sharing section (approved copy) lists 5 topics, adding "Career Ownership & Technology."
**Reason for tracking**: Both blocks of copy were independently approved as verbatim source-of-truth text; the mismatch was only surfaced during documentation cross-check, not resolved.
**Alternatives**: (a) Add the 5th topic to Home for consistency; (b) keep Home at 4 intentionally for space/tightness; (c) some other resolution.
**Status**: Deferred — resolve during Sprint 1 content review, then update this entry and `CONTENT_ARCHITECTURE.md`.

### DEC-014
**Date**: 2026-08-24
**Decision**: Use FormSubmit.co as the third-party contact-form backend (`https://formsubmit.co/jaqueline@razzobusiness.com`), replacing `contact.php`. `js/clapat.js` is **not** deleted, correcting the Phase 0 audit's claim that it was empty — it's a live 23.8KB browser-detection + `ClapatSlider` library actively powering `index-showcase-gallery.html`'s gallery slider and `js/common.js`'s `.content-slider` component.
**Reason**: FormSubmit requires no account signup (an AI session can't complete an account-creation/OAuth flow on Jaqueline's behalf) — the form just posts to the address directly, and FormSubmit emails a one-time "Activate Form" confirmation link on first use. This fits the "static-friendly, GitHub-Pages-compatible" requirement with the least setup friction. The `clapat.js` correction was caught by re-verifying file size/content immediately before the planned deletion, rather than trusting the inherited Phase 0 audit — the file would have broken the gallery slider if deleted on faith.
**Alternatives considered**: Formspree and Web3Forms — both require an account-creation or API-key-request step involving email verification an AI session can't complete unsupervised; rejected in favor of FormSubmit's zero-signup model. Deleting `js/clapat.js` as originally planned — rejected once its real (non-empty, in-use) contents were discovered.
**Status**: Approved (form backend). Corrected (clapat.js retention) — see `IMPLEMENTATION_ROADMAP.md` Sprint 0 for the full account of the error.
**Outstanding**: Jaqueline must click the "Activate Form" link sent to `jaqueline@razzobusiness.com` before real submissions are delivered — an AI session has no inbox access to do this step.

### DEC-013 (open, unresolved — track until closed)
**Date**: 2026-08-24
**Decision**: Not yet made. Whether `project07.html` (AI and Automation) folds into `case-ai-workflows.html` or archives with the other 5 legacy project pages.
**Reason for tracking**: Flagged as an evaluation, not decided, in the original planning conversation — depends on whether the existing content survives the confidentiality/anonymization pass.
**Status**: Deferred — resolve during Sprint 2.
