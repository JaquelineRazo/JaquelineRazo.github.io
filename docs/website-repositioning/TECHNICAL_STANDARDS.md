# Technical Standards

Standing rules for all implementation work on this project, not just one-time launch tasks. When in doubt, prefer the current architecture over a new one — see the framework-migration rule below.

## Architecture constraint

Reuse the current plain HTML/CSS/JS, no-build-tool static architecture. **Do not migrate to React, Next.js, or any other framework** simply to modernize the stack — recommend migration only if the current architecture creates a concrete, specific technical limitation encountered during implementation (not a hypothetical one). Reuse existing libraries (jQuery, GSAP/ScrollTrigger/Flip, Three.js only where still needed, Smooth Scrollbar, Font Awesome) and existing CSS architecture/interaction logic where reasonable. Do not introduce new dependencies unless they solve a clear, specific problem — document the reason in `DECISIONS.md` if one is added.

## HTML

- Semantic HTML5 elements over generic `<div>` soup where practical.
- Exactly one `<h1>` per page.
- Logical heading hierarchy — no skipped levels (the current `project0X.html` pages have 3–4 `<h1>`s each; this must not recur in the new case-study pages).
- Accessibility attributes where appropriate (`role`, `aria-*`) — see `DESIGN_SYSTEM.md` accessibility principles for the specific gaps being closed.
- Descriptive `alt` text on every meaningful image; `alt=""` deliberately for decorative images, never by omission or as a lazy default (the current site has ~100 images with empty or literal-placeholder `alt` text — do not add more of these).
- No unnecessary `<div>` nesting beyond what the existing theme's grid/component classes require.
- Valid markup — the current site has at least one confirmed malformed tag (`about.html`'s services accordion); don't introduce new ones.

## CSS

- Reuse the existing architecture (`style.css` + `css/content.css`/`showcase.css`/`shortcodes.css`/`assets.css`) where reasonable — don't restructure wholesale.
- Avoid unnecessary duplication; prefer reusable classes already established in the theme's grid/component system.
- Keep selectors understandable — no cryptic single-letter or numeric-only class names in new code.
- Document any new global token added to `css/tokens.css` (new, additive file) — what it replaces, where it's used.
- Avoid uncontrolled `!important` usage.
- Responsive-first: reuse the existing breakpoint ladder (1537/1466/1024/767/479px + landscape-phone edge case) — do not introduce new ad hoc breakpoints for new sections.
- Preserve the current visual system (black/white editorial, Poppins + Six Caps) — see `DESIGN_SYSTEM.md`.

## JavaScript

- Preserve current libraries unless there's a clear, documented reason to change (e.g. the Three.js WebGL grid-fit effect is being replaced because its use case — a dense image grid — no longer exists, not because Three.js is disliked).
- Do not add dependencies unnecessarily.
- Avoid global-state pollution — scope new code to its feature where possible.
- Defensive DOM querying — don't assume elements exist without checking, especially across pages with structurally different layouts (the new case studies intentionally vary in layout per `CASE_STUDIES.md`).
- Clean event handling — remove listeners where appropriate, don't stack duplicate bindings across the AJAX page-transition system's re-initialization.
- Respect `prefers-reduced-motion` in every new or modified animation-driving code path.
- Document complex animation behavior inline where the "why" isn't obvious from the code alone (per the project's general no-explanatory-comments default, only where a non-obvious constraint or workaround is involved).
- Do not silently break the AJAX page-transition system — any new page (case studies, `work.html`) must be tested against it, and any new interaction (partials, tickers) must be sequenced correctly with it (see the fetch-and-inject partial-loader risk noted in `IMPLEMENTATION_ROADMAP.md` Sprint 5).

## Performance

- Optimize images — convert to WebP/AVIF with responsive `srcset` where practical; the current repo has confirmed oversized files (a 24.6MB video, a 13.9MB image, several 1–2.5MB images) that must not carry forward into the shipping page set uncompressed.
- Lazy-load below-the-fold imagery where appropriate.
- Avoid unnecessary JS — the WebGL-to-CSS/GSAP replacement (see `DESIGN_SYSTEM.md`) is a direct instance of this principle in action.
- Avoid redundant animation work (e.g. don't re-run ScrollTrigger init on elements already initialized after an AJAX page swap).
- Minimize layout shift — new sections should reserve space for images/placeholders rather than causing reflow when assets load.

## Accessibility

- Keyboard interaction for every custom interactive component.
- Focus management, especially across the AJAX page-transition system (focus should land somewhere sensible after a page swap, not silently reset to `<body>`).
- `prefers-reduced-motion` support everywhere motion is scroll-linked, cursor-linked, or transition-linked.
- Appropriate ARIA — not blanket ARIA-everywhere, but targeted at the confirmed gaps (hamburger menu, page-transition announcements, icon-only interactive elements).
- No hover-exclusive functionality — every hover state needs a focus/tap equivalent.

## Security

- Never commit API secrets or keys. The current repo has a confirmed live, unrestricted Google Maps API key hardcoded client-side — this must be removed (Sprint 0), not just rotated, since the map itself is being removed per the content plan.
- No credentials in frontend code, ever — this is a static site with no backend, so any third-party service integration (contact form) must use that service's client-safe integration pattern (form-endpoint ID, not a secret key, in the HTML).
- Use environment-safe, static-site-friendly services where a backend would otherwise be required — this is why `contact.php` (which cannot execute on GitHub Pages) is being replaced rather than fixed.

## SEO

- Unique `<title>` per page (the current site has 11 pages sharing one literal duplicate title — this must not recur).
- Unique, specific `<meta name="description">` per page.
- Canonical link on every real page, pointing at the live `github.io` URL (no custom domain currently configured).
- Open Graph + Twitter Card tags on every real page (currently zero across all 17 pages).
- JSON-LD structured data (`Person` at minimum on Home/About).
- Semantic, non-skipped heading structure (see HTML section above).
- `sitemap.xml` listing only the 4 primary pages + surviving case-study pages; `robots.txt` referencing it and disallowing `/archive/`.

## Naming

- Personal identity ("Jaqueline Razo") vs. consulting brand ("Razzo") — see `DECISIONS.md` for the exact rule; **do not** perform a blanket find/replace of one for the other anywhere in the codebase. Check context before touching any occurrence of either name.
