# Website Repositioning — Project Overview

This directory is the source of truth for repositioning `JaquelineRazo.github.io` from a freelance/data-analytics "Creative Portfolio" template into a senior Business & Technology Transformation platform. It is written for two audiences: a human reviewing the project later, and an AI coding agent continuing implementation in a future session with no memory of the planning conversation that produced it.

If anything in the live site or in another doc in this folder contradicts what's written here, **stop and reconcile before continuing** — see the maintenance rule at the bottom of this file.

## Project purpose

Jaqueline's career has moved well past the identity the current website communicates. The site was built on an unmodified commercial template ("Serano – Creative Portfolio" by ClaPat) years ago, when her positioning centered on freelance web development, dashboards, and data analytics. It no longer reflects her current level, direction, or the audiences she now needs to reach.

## Current positioning problem

- Homepage hero is name-first ("Jaqueline Razzo"), not proposition-first.
- The portfolio is 8 freelance websites / a Tableau dashboard / a personal data-science GitHub index — nothing connects to enterprise transformation, product strategy, or AI.
- About reads as a disordered CV with generic template filler: fake "design award" badges, a dead client-logo carousel, a tactical services list (Project Management, AI Automations, Web Design...).
- "Creative Portfolio" positioning language appears in 11 of 17 page titles.
- The site has real technical debt independent of positioning: a broken favicon, an exposed unrestricted Google Maps API key, a contact form that has likely never delivered a single message, zero SEO metadata (no OG/Twitter/canonical/JSON-LD/sitemap/robots.txt).

Full current-state audit detail: `CONTENT_ARCHITECTURE.md`, `CASE_STUDIES.md`, `DESIGN_SYSTEM.md`, and `TECHNICAL_STANDARDS.md` in this folder. An earlier planning conversation produced a local plan-mode file outside this repository before this documentation existed; that file is historical only — this `/docs/` folder is the maintained, portable source of truth going forward and should be self-sufficient without it.

## Desired positioning

Position Jaqueline as an **Executive + Builder + Speaker** — not a freelance developer, data analyst, or generic consultant — working across five domains:

1. **Enterprise Transformation** — business transformation, process redesign, investment cases, operating models.
2. **Digital Products** — product strategy, workflow design, digital platforms, UX, process digitization.
3. **Decision Intelligence** — advanced analytics, measurement strategy, KPI frameworks, executive decision support.
4. **AI-enabled Workflows** — AI use-case design, knowledge workflows, automation, applied AI.
5. **Customer Data Ecosystems** — first-party data, CRM, data governance, activation workflows.

**Core headline**: "I turn complex business problems into scalable products, systems and better decisions."

**Supporting positioning line**: "Business & Technology Transformation · AI · Product Strategy · Decision Intelligence."

## Target audiences

1. International recruiters and hiring managers (senior transformation/AI/product/technology-strategy roles).
2. Executives and founders considering selective advisory/consulting work.
3. Organizations considering speaking, workshops, or panels.

The site has to work for all three simultaneously without becoming generic for any of them.

## Experience principles

The site should feel: **Vanguardist · Editorial · Interactive · Strategic · Human · Technology-forward.**

It should explicitly **not** feel like:
- a traditional CV website
- a generic personal portfolio
- a SaaS landing page
- a generic AI-consultant template
- a standard corporate site
- a static case-study archive

A visitor should feel like they're exploring a point of view, not just reading credentials.

## Existing visual/interaction DNA to preserve

The current site has real strengths that must survive this repositioning, not be replaced by something more conventional:
- Black/white editorial palette, minimal color (one accent, currently a hardcoded terracotta driving cursor-hover color).
- Oversized, condensed typography (Six Caps + Poppins).
- Cinematic scrolling — GSAP/ScrollTrigger-driven pins and reveals.
- A custom "magic cursor" that follows the mouse and morphs on hover.
- Full-page AJAX transitions between pages (cover-layer fade + fetch/swap).
- Asymmetry, strong negative space, editorial/fashion influence.
- A genuinely well-built responsive breakpoint system (needs no rebuild).

Full detail: `DESIGN_SYSTEM.md`.

## What this is not

This project does **not** migrate to a new framework (React/Next.js/etc.) — the current plain HTML/CSS/JS static architecture is appropriate for a 4-page personal site and stays. See `TECHNICAL_STANDARDS.md` for what does change technically.

## How the rest of this folder is organized

| File | Contents |
|---|---|
| `CONTENT_ARCHITECTURE.md` | Approved IA, per-page objective/audience/message/sections/CTA, and the full finalized About-page copy |
| `CASE_STUDIES.md` | The 5 flagship case studies, shared template, confidentiality rules |
| `DESIGN_SYSTEM.md` | Visual DNA, interaction principles, full motion/interaction classification, new-interaction specs, accessibility principles |
| `IMPLEMENTATION_ROADMAP.md` | Phase 0 + Sprint 0–5, as checkboxed execution tasks |
| `TECHNICAL_STANDARDS.md` | Standing coding/security/SEO/accessibility/performance standards for all future work |
| `DECISIONS.md` | Architecture/product decision log (ADR-style) |
| `QA_CHECKLIST.md` | Reusable release checklist |

## Documentation maintenance rule

This documentation is not a one-time artifact. As implementation progresses:
- Mark completed roadmap tasks in `IMPLEMENTATION_ROADMAP.md`.
- Log new or changed decisions in `DECISIONS.md` (never silently change scope).
- Update asset requirements/risks/QA results as they're discovered.
- Document any deviation from the approved plan **before** implementing it, not after.

If implementation and documentation disagree at any point, stop and reconcile them before continuing.
