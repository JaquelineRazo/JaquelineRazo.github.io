# Case Studies — 5 Flagship + 1 Secondary

## Shared template (identical information hierarchy across all 5 flagship cases)

1. **Hero** — eyebrow label (e.g. "DIGITAL PRODUCTS / CASE STUDY") + title + 1–2 line description + 3 metadata pills: **Role** / **Context** / **Focus**. No confidential names in the pills — use safe category descriptions ("global consumer organization," "U.S.-based capital planning and construction business").
2. **The Context** — 2–3 paragraphs on how the business/situation operated before her involvement. No technology yet.
3. **The Challenge** — max 4 problem statements.
4. **My Role** — Discover → Structure → Design → Build → Implement (demonstrates end-to-end ownership, not just delivery of one artifact).
5. **The Approach** — one big visual per case (framework/architecture/before-after diagram — the primary asset for the page).
6. **What I Built / Changed** — concept-labeled, never a bare unexplained screenshot.
7. **Outcome** — qualitative business change only. No fabricated KPIs, no specific investment figures, no internal project names.
8. **What This Project Taught Me** — present in every case, not optional. This is the reflection/judgment beat that most differentiates the site from a standard case-study archive — it's the single highest-value section for the recruiter/executive audience because it signals judgment, not just execution.
9. **Capabilities Demonstrated** — tag band, referencing the 5-domain model.
10. **Next Case** — cinematic full-bleed link, reusing the existing AJAX transition + page-navigation-teaser pattern already present elsewhere on the site.

## The 5 flagship cases

| # | File | Public title | Capability represented | Business question it answers |
|---|---|---|---|---|
| 1 | `case-enterprise-transformation.html` | Enterprise Transformation & Investment Strategy | Enterprise Transformation | How do we decide what transformation is worth investing in? |
| 2 | `case-capital-planning.html` | Capital Planning & Asset Management Platform | Digital Products | How do we turn operational complexity into a usable system? |
| 3 | `case-decision-intelligence.html` | Enterprise Measurement & Decision Intelligence | Decision Intelligence | How do we turn measurement into better decisions? |
| 4 | `case-customer-data.html` | Customer Data Ecosystem Design | Customer Data Ecosystems | How do we turn fragmented interactions into usable intelligence? |
| 5 | `case-ai-workflows.html` | AI-enabled Workflow Design | AI-enabled Workflows | How do we turn AI into real operating leverage? |

Framing each case as a **business question**, not a project name, is deliberate — it's what keeps the portfolio from reading as five deliverables and makes it read as five demonstrations of judgment.

### Where cases intentionally differ (so the shared template doesn't feel repetitive)

- **Enterprise Transformation** — framework-diagram-led, minimal UI, most abstract/strategic visual treatment. No real screenshots needed or wanted.
- **Capital Planning** — the most product-visual case: UI mockups (desktop + mobile), before/after screens. Closest to a traditional product case study, but anonymized. Real product screenshots may exist and need anonymizing before use — do not block the build on this, ship with clearly-labeled placeholder mockups first.
- **Decision Intelligence** — decision-flow diagram + a conceptual (dummy-data) reporting mockup. Deliberately does **not** reuse the old real Tableau dashboard imagery from the archived `project04.html` — that was explicitly flagged as an "outdated dashboard hero visual" to avoid, not reframe.
- **Customer Data Ecosystem** — systems/architecture-map led, no product screens at all.
- **AI-enabled Workflows** — the most experimental layout of the five. Workflow diagram + small applied-example cards; candidate for a lighter version of the repurposed keyword-ticker interaction (see `DESIGN_SYSTEM.md`) since this case is explicitly about her point of view on AI, not a client deliverable. `project07.html`'s content (Python/scraping/Power Automate) was evaluated and **not** folded in — see `DECISIONS.md` DEC-013 — it archived with the rest instead.

Same grid/typography/motion system runs through all five (so the site still reads as one coherent whole) — only the Approach visual and hero treatment vary by content type. The intended effect is five features in one magazine issue, not five instances of one template stamped out.

## Secondary proof point (not flagship)

**UNODC Mexico Digital Platform** — `project03.html`, kept and reframed as "Earlier Work," not deleted, not rebuilt to the flagship template. It's the one existing case with real, usable assets already in the repo. Linked from `work.html`'s de-emphasized Earlier Work line, and optionally from About's international-experience framing. Does not use the 10-part flagship template — light edit only.

## Archived (not flagship, not secondary — fully out of primary navigation)

`project01.html` (Boho House), `project02.html` (Anjana Bhardwaj), `project04.html` (Dashboards/Tableau), `project05.html` (Data Analysis), `project06.html` (Eduardo Estrada), `project07.html` (AI and Automation — evaluated for folding into `case-ai-workflows.html`, not folded in, see DEC-013), `project08.html` (Slaughter Ranch) — all relocated to `archive/`, removed from nav/sitemap. `robots.txt` disallow rule still pending (Sprint 4). Not deleted, in case of existing external links.

## Confidentiality treatment (applies to all 5 flagship cases, non-negotiable)

- Metadata pills and body copy use safe category descriptions, never specific client names, in the flagship cases (contrast with About, where real employer names are permitted as factual employment history — see `CONTENT_ARCHITECTURE.md`).
- No internal project names, no specific investment figures beyond anything Jaqueline has explicitly approved for public use.
- Agency-mediated work is described as "supported X through Y" only where accurate — never implied as a direct consulting engagement (this mirrors the About-page relationship notes for Brainlabs/Mars and Hearts & Science/AT&T-Hallmark).
- No homepage or About "client logo wall" — see `DECISIONS.md`.
- Outcomes are qualitative business change statements, never fabricated metrics.

## Required visual assets per case

See the full table in `DESIGN_SYSTEM.md` — every case ships with a labeled placeholder where a real asset doesn't exist yet; nothing blocks structural build on missing imagery.

## Approved Work-page copy (verbatim source of truth)

**Work-page hero/intro**
> SELECTED WORK
>
> Complex problems. Structured solutions.
>
> I work across transformation, digital products, decision intelligence, AI-enabled workflows and customer data ecosystems.
>
> The projects below represent different industries and contexts, but they share the same principle: understand the system, identify where value is being lost, and redesign the way the business operates.

Optional secondary line: "Strategy · Technology · Product · Data · Execution." No additional copy above this block on the page.

**Closing section**
> The technology changes. The operating principle doesn't.
>
> Whether the problem starts with an investment portfolio, a spreadsheet-heavy process, fragmented customer data or a new AI capability, I approach it the same way:
>
> Understand the business. Map the system. Find the leverage. Build the solution. Measure what changed.

CTA: "About how I work →" (links to About).

## Approved per-case lead copy (verbatim — richer than the Home teaser blurbs; use as each case's Context/opening material, adapted into the 10-part template)

**Case 01 — Enterprise Transformation.** *From scattered initiatives to a structured transformation agenda.* Organizations often invest in innovation across multiple capabilities without a consistent way to determine what should be prioritized, how success should be measured or how each initiative contributes to business value. I worked across a portfolio of transformation initiatives spanning customer data, digital commerce, measurement, search, brand-building and new ways of working. My role was to help translate these initiatives into a structured business framework — defining expected value, prioritization logic, measurement approaches and the capabilities required to move from experimentation toward sustained business impact.
*Areas involved*: Business cases · Transformation strategy · Investment prioritization · CRM & first-party data · Retail & digital commerce · SEO & digital discoverability · Influencer measurement · Measurement frameworks.

**Case 02 — Digital Products (Capital Planning).** *Turning fragmented capital planning into a connected digital operating system.* A U.S.-based business operated a complex capital planning and construction advisory process across spreadsheets, folders, documents and individual workflows. The information existed. The system around it did not. I mapped the underlying business process, consolidated the information architecture and designed a digital platform that gives both internal teams and clients real-time visibility into assessments, documentation, project priorities and financial planning. The result is not simply another dashboard — it is a digital layer around the way the business operates.
*Areas involved*: Product strategy · Process digitization · Information architecture · UX design · Client experience · Data governance · Workflow design · AI-assisted development.

**Case 03 — Decision Intelligence.** *Building the infrastructure behind better investment decisions.* Data only becomes useful when it changes a decision. Across advanced analytics and measurement initiatives, I have worked on the systems that connect business questions with data, models, learning agendas and executive decision-making. The objective is not simply to report performance — it is to create a repeatable learning system that helps organizations understand where investment is generating value, what needs to change and what should be tested next.
*Areas involved*: Marketing Mix Modeling · Learning agendas · Forecasting · Measurement strategy · KPI architecture · Executive reporting · Investment effectiveness · Analytics governance.

**Case 04 — Customer Data Ecosystems.** *Designing the journey from data collection to activation.* Organizations collect customer information across websites, forms, campaigns, QR experiences, chatbots, sampling programs and CRM systems. But collecting data is not the same as creating value from it. I have worked on customer data ecosystems that connect the full lifecycle: Capture → Store → Govern → Access → Activate. The work includes defining where information comes from, how it should be captured, where it lives, who needs access and how it can later support customer communication, audience activation and business decision-making.
*Areas involved*: First-party data · CRM · Salesforce · Digital sampling · QR journeys · Chatbots · Lead capture · Audience activation · Customer journeys · Data governance.

**Case 05 — Applied AI.** *Designing AI as a working system, not another isolated tool.* The biggest opportunity in AI is not simply generating content faster — it is building systems that help people think, organize, remember and execute better. I experiment with AI-enabled workflows that connect documentation, structured knowledge and pattern recognition to create practical second-brain systems for business and personal operations. The same thinking informs the workshops I design: identifying where AI genuinely creates leverage, where humans should remain in control and how workflows need to change before automation actually creates value.
*Areas involved*: Applied AI · Knowledge systems · AI-assisted workflows · Process automation · Prompt design · Second-brain systems · AI adoption · Workshops & training.

## Page-specific interaction ideas already approved

- Work-index cards use the new "Work-card reveal" interaction (replaces the removed Three.js WebGL grid-fit effect) — full spec in `DESIGN_SYSTEM.md`.
- AI-enabled Workflows may use a lighter version of the repurposed keyword-ticker mechanism for its "applied example" cards — not yet fully specified; specify fully in `DESIGN_SYSTEM.md` before implementing, per the site's own rule that no new interaction ships undocumented.
