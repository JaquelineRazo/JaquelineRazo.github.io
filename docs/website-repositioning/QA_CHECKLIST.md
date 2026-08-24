# Release QA Checklist

Reusable at every sprint checkpoint, not just before final launch. Copy this list's relevant subset into each sprint's review, or run it in full before Sprint 4's launch sign-off.

## Content & positioning
- [ ] Copy matches `CONTENT_ARCHITECTURE.md` / `CASE_STUDIES.md` verbatim source-of-truth text (no undocumented rewrites).
- [ ] No "Creative Portfolio" or other legacy template language remains anywhere (titles, meta, visible copy).
- [ ] Razo/Razzo usage matches `DECISIONS.md` DEC-006 — no blanket find/replace artifacts.
- [ ] Open items in `DECISIONS.md` (DEC-012, DEC-013, etc.) are either resolved or explicitly still tracked, not silently ignored.

## Confidentiality
- [ ] No flagship case study names a specific client, internal project, or investment figure beyond what's explicitly approved.
- [ ] No homepage or About client-logo wall exists.
- [ ] Agency-mediated employer relationships (Brainlabs/Mars, Hearts & Science/AT&T-Hallmark) are described as "supported through," never as direct clients.
- [ ] Capital Planning case imagery is anonymized (no real client-identifying UI) if real screenshots are used.

## Links & navigation
- [ ] Every nav link resolves (Home/Work/About/Contact).
- [ ] Every Work-page case card links to its correct case-study page.
- [ ] "Next Case" links form a complete loop across all 5 case studies.
- [ ] The Work-page "Earlier Work" link to UNODC (`project03.html`) resolves.
- [ ] No link points at a deleted or archived page from primary nav/sitemap.
- [ ] Archived pages (`archive/project0X.html`) still resolve directly (not deleted), just unlinked.
- [ ] `privacy.html`, `tos.html`, `contact.php`, the TikTok verification file are unreferenced from any new nav/sitemap/footer.

## Desktop / tablet / mobile
- [ ] Visual QA at each breakpoint: 1537px, 1466px, 1024px, 767px, 479px, and the landscape-phone edge case.
- [ ] No new ad hoc breakpoints introduced outside the existing ladder.
- [ ] Custom cursor and hover-parallax confirmed disabled on touch devices (not just assumed).
- [ ] No content is accessible only via hover on any device.

## Keyboard & reduced motion
- [ ] Full keyboard-only walkthrough: header, hamburger menu (open/close, `aria-expanded` toggles correctly), all case-study interactive elements.
- [ ] Visible `:focus-visible` state on every interactive element.
- [ ] OS-level reduced-motion toggled on: cursor, ScrollTrigger reveals, keyword ticker, page transitions, and preloader all degrade gracefully (instant/no-animation, nothing broken or stuck).

## Cross-browser
- [ ] Chrome, Safari, Firefox — at minimum.
- [ ] AJAX page-transition system tested across all new/renamed pages, not just the original set.

## Contact form
- [ ] Live test submission through each of the 3 paths (Executive Opportunities / Advisory & Consulting / Speaking & Workshops) delivers to Jaqueline's real inbox.
- [ ] No exposed secrets/keys in the form integration.

## Accessibility
- [ ] All images have deliberate `alt` text (`alt=""` only for genuinely decorative images).
- [ ] One `<h1>` per page, no skipped heading levels.
- [ ] `aria-live="polite"` announces AJAX page-swap completion.

## Metadata & SEO
- [ ] Unique `<title>` and `<meta name="description">` per real page.
- [ ] OG + Twitter Card tags present and validated with a social-share debugger.
- [ ] Canonical link present on every real page.
- [ ] JSON-LD `Person` schema validates with Google's Rich Results Test.
- [ ] `sitemap.xml` lists exactly the 4 primary pages + surviving case studies — nothing archived, nothing out-of-scope.
- [ ] `robots.txt` disallows `/archive/`, references the sitemap.

## Favicon & assets
- [ ] Favicon resolves with no 404 on any page.
- [ ] Full favicon set present (`favicon.ico`, 32×32, 16×16, apple-touch-icon, `site.webmanifest`).
- [ ] No image over ~500KB ships in the final page set without a documented reason.
- [ ] Every `[PLACEHOLDER — ...]` asset marker is either resolved with a real asset or intentionally still labeled as a placeholder (never silently left blank/broken).

## Performance
- [ ] No unused WebGL/Three.js code path remains after the Work-card reveal replacement ships.
- [ ] Lighthouse (or equivalent) pass on Home, Work, and one case-study page.

## Security
- [ ] No API keys or secrets anywhere in shipped HTML/JS (confirm the old Google Maps key is fully gone, not just unused).
- [ ] Form integration uses only client-safe identifiers, no secret keys in frontend code.

## Protected files
- [ ] `git diff` confirms zero changes to `privacy.html`, `tos.html`, `contact.php`, and the TikTok verification file, at every sprint checkpoint — not just at the end.

## Documentation
- [ ] `IMPLEMENTATION_ROADMAP.md` checkboxes updated to reflect what actually shipped this sprint.
- [ ] Any deviation from the approved plan is logged in `DECISIONS.md` before (not after) it ships.
- [ ] This checklist itself has been run and its results noted (pass/fail per item) at the sprint's review checkpoint.
