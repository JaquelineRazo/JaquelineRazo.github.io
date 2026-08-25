# Content Architecture

## Approved information architecture

Primary pages: **Home, Work, About, Contact.** Perspectives (thought-leadership teaser) is explicitly excluded from v1 — cut for launch, revisit once there's real content to link (not a "coming soon" placeholder).

| Nav label | File | Status |
|---|---|---|
| Home | `index.html` | rewritten |
| Work | `work.html` (new — repurposes `index-showcase-gallery.html`) | new build |
| About | `about.html` | rewritten |
| Contact | `contact.html` | rewritten |

5 case-study pages hang off Work (not in primary nav): `case-enterprise-transformation.html`, `case-capital-planning.html`, `case-decision-intelligence.html`, `case-customer-data.html`, `case-ai-workflows.html`.

`project03.html` (UNODC) is kept and reframed as a secondary "Earlier Work" link — not a flagship case, not deleted. `project01.html`, `project02.html`, `project04.html`, `project05.html`, `project06.html`, `project07.html`, `project08.html` (all 7 — `project07.html`'s fold-in was evaluated and rejected, see `DECISIONS.md` DEC-013) relocated to an unlinked `archive/` directory (not deleted, not in nav/sitemap).

Out of scope, untouched throughout: `privacy.html`, `tos.html`, `contact.php`, the TikTok verification file (unrelated Mars Petcare/TikTok API compliance surface hosted on this same domain).

---

## Home — `index.html`

**Objective**: convert a visitor in under a minute into "I understand what she does and I want to know more," for all three target audiences at once.
**Primary audience**: all three, sequenced so recruiters/executives get the value prop and proof fast, speaking opportunities get their own clear section.
**Primary message**: "I turn complex business problems into scalable products, systems and better decisions."
**CTA**: three-path prompt into Contact (Executive Opportunities / Advisory & Consulting / Speaking & Workshops).

**Sections (6, final)**:
1. **Hero** — anchor line + supporting line + two CTAs ("Explore selected work" / "About my work").
2. **Point of View** — merged Positioning/Experience + Operating Style (flagged deviation from the original 8-section brief — see `DECISIONS.md` DEC for rationale; revert to two sections is low-cost if it reads awkwardly once assembled).
3. **Capabilities** — the 5-domain model, written in methodology/verb register ("how I create value").
4. **Selected Work** — 5 flagship case teasers, written in narrative/context register ("proof, in a specific situation") — deliberately differentiated from Capabilities so the site doesn't read the same list twice.
5. **Speaking** — 4 topics (see open item below) + "Invite me to speak."
6. **Final CTA** — three-path prompt into Contact.

**Content dependency**: none blocking — all copy is finalized (see the approved-copy sections below). **Open item**: About's Speaking section lists 5 topics (adds "Career Ownership & Technology"); Home's approved copy has 4. Resolve during Sprint 1 content review — either add the 5th to Home or keep Home at 4 intentionally (space/tightness reasons). Not yet decided; log the resolution in `DECISIONS.md` once settled.
**Asset dependency**: see `DESIGN_SYSTEM.md` visual asset table — hero portrait and Point of View ambient photo are the two blocking placeholders for a fully "real" Home; the page ships and reads fine with labeled placeholders in the interim.

### Approved Home copy (verbatim source of truth)

**Hero**
> I turn complex business problems into scalable products, systems and better decisions.
>
> Business & Technology Transformation · AI · Product Strategy · Decision Intelligence
>
> I work across strategy, technology and execution — helping turn ambiguous business challenges into structured initiatives, digital products, data-driven decisions and more scalable ways of working.

CTAs: "Explore selected work" / "About my work"

**Point of View — source A (originally "Positioning/Experience")**
> Building at the intersection of business and technology.
>
> My experience spans enterprise transformation, digital products, decision intelligence, AI-enabled workflows and customer data ecosystems.
>
> I've worked across global organizations, technology teams, startups and independent consulting engagements in Mexico, the United States, Europe and Türkiye — often stepping into environments where the problem is complex, the answer is not obvious and multiple stakeholders need to move in the same direction.
>
> What connects the work is simple: understand the problem, structure the path forward and build what makes the business work better.

**Point of View — source B (originally "Operating Style")**
> Strategy means very little without execution.
>
> I'm most useful in environments where the problem crosses functions.
>
> I work by combining business context, research, data, technology and conversations with the people closest to the problem. From there, I map the system, challenge assumptions, identify leverage points and move toward something that can actually be implemented.
>
> My background is intentionally multidisciplinary. I've worked across analytics, product, technology, marketing science, startups, consulting and international business. That breadth allows me to see connections that are often missed when problems are approached from a single discipline.

Both sources A and B run adjacent, uninterrupted by a section break, as the merged "Point of View" section (DEC-007) — no sentence from either is cut.

**Capabilities (5 blocks, methodology/verb register — verbatim)**

1. **Enterprise Transformation** — *"Turning priorities into executable transformation."* I help structure complex initiatives around business value — defining the problem, aligning stakeholders, prioritizing opportunities and building the roadmap required to move from idea to implementation. Keywords: Business transformation · Investment cases · Process redesign · Strategic innovation · Operating models · Cross-functional leadership
2. **Digital Products** — *"Turning operational problems into scalable solutions."* I translate fragmented processes and real business needs into digital products, platforms and workflows that improve visibility, consistency and execution. Keywords: Product strategy · Workflow design · Digital platforms · Business systems · UX · Process digitization
3. **Decision Intelligence** — *"Turning information into better decisions."* I combine analytics, measurement frameworks and business context to help organizations understand performance, evaluate investments and make more informed decisions. Keywords: Advanced analytics · Measurement strategy · Learning agendas · KPI frameworks · Forecasting · Executive decision support
4. **AI-enabled Workflows** — *"Turning AI into practical operating leverage."* I explore and design AI-enabled workflows that improve how people organize information, document knowledge, identify patterns and execute work. Keywords: AI use-case design · Knowledge workflows · Automation · AI-assisted research · Second-brain systems · Applied AI
5. **Customer Data Ecosystems** — *"Turning fragmented interactions into usable customer intelligence."* I design and support customer data flows that connect collection, governance, storage and activation across digital experiences, CRM and first-party data strategies. Keywords: First-party data · CRM · Salesforce · Data capture · Activation workflows · Customer journeys · Identity

**Selected Work (5 homepage teaser blocks, narrative/context register — verbatim; each links to its `case-*.html` page per `CASE_STUDIES.md`)**

1. **Enterprise Transformation & Investment Strategy** (tag: Enterprise Transformation) — Structured a transformation framework to evaluate and prioritize initiatives across digital capabilities, customer data, measurement, retail and brand-building — connecting investment decisions with expected business value and long-term capability development.
2. **Capital Planning & Asset Management Platform** (tag: Digital Product) — Designed a digital operating platform for a U.S.-based capital planning and construction business, consolidating assessments, documentation, project visibility and client reporting into a single interactive system.
3. **Enterprise Measurement & Decision Intelligence** (tag: Decision Intelligence) — Built measurement and decision-support foundations used to evaluate investment effectiveness, structure learning agendas and improve visibility across complex business initiatives.
4. **Customer Data Ecosystem Design** (tag: Customer Data) — Designed customer data capture and activation workflows connecting digital experiences, CRM platforms and first-party data strategies — from collection and governance through activation.
5. **AI-enabled Workflow Design** (tag: Applied AI) — Designed and tested AI-enabled workflows focused on knowledge organization, documentation, pattern recognition and execution — exploring how AI can operate as a practical second brain rather than another isolated tool.

Each links via "View case study →".

**Speaking (Home — verbatim, 4 topics; see the 4-vs-5 open item above)**
> I speak about technology, AI, business transformation, careers and the role women can play in shaping the next generation of innovation.

- **AI & Business Transformation** — How organizations can move from AI experimentation to practical business value.
- **Building With AI** — Using AI as a tool for research, thinking, prototyping and execution.
- **Turning Ideas Into Products** — How to move from an ambiguous problem to something people can actually use.
- **Women, Technology & Ambition** — Career ownership, technology, leadership and building economic opportunity.

CTA: "Invite me to speak →"

**Final CTA (verbatim)**
> Have a complex problem worth solving?
>
> I'm always interested in conversations around technology transformation, AI, digital products, strategic innovation and ambitious ideas.

Three paths: **Executive Opportunities** / **Advisory & Consulting** / **Speaking & Workshops**. CTA: "Start a conversation →"

**Perspectives (excluded from v1 per DEC-003)** — original copy included 3 article-teaser titles ("AI is making execution cheaper. Judgment is becoming more valuable." / "Why transformation should start with the business case — not the technology." / "What building digital products for traditional industries has taught me about innovation.") and a "Read more →" CTA. Not implemented now; kept here only so the copy isn't lost if the section is revived later.

---

## Work — `work.html` (new, repurposes `index-showcase-gallery.html`)

**Objective**: prove the positioning with 5 anonymized, judgment-demonstrating case studies — not an archive of past deliverables.
**Primary audience**: recruiters/executives evaluating depth; advisory prospects evaluating fit.
**Primary message**: "Different problems. One operating principle: make complexity usable."
**Sections**: intro block ("Complex problems. Structured solutions.") → 5 large editorial case cards (not a dense grid) → a de-emphasized "Earlier Work" line linking to the UNODC case → closing section ("The technology changes. The operating principle doesn't") linking to About.
**CTA**: each card → its case-study page; closing section → About.
**Content dependency**: none — Work-page intro/card copy is finalized (see approved copy). Each case study's full body copy is finalized per `CASE_STUDIES.md`.
**Asset dependency**: see `DESIGN_SYSTEM.md` — every case needs at least one hero-level visual; all currently placeholder except UNODC (has real assets in `images/`).

---

## About — `about.html`

**Objective**: tell a coherent career story that shows *why* she can operate at this level now — not a creative CV, not a full résumé.
**Primary audience**: recruiters/executives verifying depth and credibility; secondarily, advisory/speaking prospects wanting to understand her background.
**Primary message**: "Every stage added another layer to how I solve problems."
**CTA**: soft — links into Work and Contact, no hard sell.

**Sections (final)**:
1. Hero/intro — drops the "creative CV" framing.
2. Career-arc narrative prose — the broader six-stage arc (Business/Sales → Technology → Data & Marketing Science → Product/Startups → International Consulting → Business & Technology Transformation) as a few paragraphs, not CV entries.
3. **Career Timeline** (visual component) — exactly the 5 curated recent entries below. Earlier roles are deliberately excluded from this component (not deleted from her real history — just not part of the site's visual narrative).
4. Communities & Leadership.
5. Speaking & Knowledge Sharing.
6. Selected Executive Education.
7. Selected Professional Exposure.

**Content dependency**: none — fully resolved, see approved copy below. This was the single biggest open dependency earlier in planning; it is now closed.
**Asset dependency**: existing `images/AJ.jpg` may work as a timeline-adjacent portrait (verify fit/quality before reuse); a real speaking/workshop photo is needed and does not currently exist in the repo (placeholder until supplied).

### Approved About copy (verbatim source of truth)

Framing rule: this is a *curated* career timeline, not a complete résumé. It emphasizes the last five years, where her current professional identity was built. Do not add earlier jobs, academic programs, or side projects beyond what's below. Do not infer dates, employment relationships, titles, or client relationships not stated here. "Brainlabs" is used consistently below (source materials used "Brains Labs" once, treated as a typo and normalized).

**Career arc (prose framing)**: Data & Analytics → Marketing Science → Leadership → Independent Product & Technology Consulting → Enterprise Transformation.

#### Career Timeline (most recent first)

**Brainlabs — supporting Mars Petcare Mexico**
*Data Transformation Manager* — Dec 2025–Present
Promoted into a broader transformation role operating across business strategy, technology, analytics, customer data and digital innovation. Work now focuses on translating business priorities into transformation initiatives, investment cases, measurement strategies and technology-enabled solutions. Scope includes: transformation and business-case development; investment prioritization; advanced analytics and measurement; customer data ecosystems and CRM; retail and digital commerce capabilities; digital products and automation; SEO/digital discoverability; cross-functional technology initiatives; agency and stakeholder leadership.
*Narrative purpose*: the current evolution — moving beyond analyzing performance into shaping how transformation initiatives are prioritized, implemented and measured.
*Relationship note*: employed through Brainlabs, supporting Mars Petcare Mexico. Do not represent Mars as a direct Razzo consulting client.

**Brainlabs — supporting Mars Petcare Mexico**
*Senior Data Manager* — Mar 2025–Nov 2025
Joined to support Data Driven Marketing and advanced measurement initiatives. Initially focused on Marketing Mix Modeling, data consolidation, reporting automation, measurement frameworks and cross-channel analytics; expanded into broader transformation and technology initiatives.
*Narrative purpose*: the bridge between Marketing Science and Enterprise Transformation.

**Razzo**
*Independent Technology & Business Transformation Consultant* — Feb 2024–Present
Independent work with international clients involving digital products, business systems, automation, AI-enabled workflows and process digitization. Work frequently starts with an unstructured business problem and spans discovery, requirements, process mapping, product thinking, design, development and implementation. Selected contexts: U.S.-based real estate and construction businesses; international entrepreneurs and businesses; digital platforms; operational automation; AI-enabled workflows.
*Narrative purpose*: demonstrates applying strategy, technology and execution directly to real business problems outside a corporate environment. Overlaps intentionally with other professional roles.

**Hearts & Science**
*Marketing Science Supervisor* — Sep 2023–May 2024
Promoted from Senior Marketing Science Analyst into a leadership role supporting complex analytics and marketing-science operations for a major U.S. telecommunications business. Worked across data infrastructure, attribution, forecasting, advanced analytics, executive reporting, team leadership, international stakeholder management. Led an international team.
*Narrative purpose*: the shift from technical individual contributor into leadership, scale and executive-facing decision support.
*Relationship note*: AT&T was supported through Hearts & Science. Do not represent AT&T as a direct Razzo consulting client.

**Hearts & Science**
*Senior Marketing Science Analyst* — May 2021–Sep 2023
Worked across analytics, automation, forecasting, attribution and data operations supporting large U.S. businesses, including exposure to organizations such as AT&T and Hallmark through Hearts & Science. Combined technical work with increasing responsibility for business reporting, stakeholder communication and process improvement.
*Narrative purpose*: the stage where data, technology and business decision-making became one integrated professional skill set.

**Explicitly excluded from this visual component**: Capital Digital, RBN Trade MX, Diageo, Massimo Dutti, Serpa AI, IMEF.

#### Communities & Leadership
"Technology has never been an individual journey for me. I have actively participated in national and international communities focused on women in technology, entrepreneurship, innovation and business. Across Mexico, Europe and Türkiye, these communities have given me access to founders, technology leaders, executives, investors and women building careers and companies across multiple industries. My participation includes: women-in-technology associations and communities; entrepreneurship and startup ecosystems; technology and innovation events; international business communities; mentoring and professional-development initiatives; conversations around gender, technology and economic opportunity. I am particularly interested in creating more spaces where women can participate not only as users or employees of technology, but as builders, leaders and owners of the systems shaping the future."

#### Speaking & Knowledge Sharing
"Alongside my professional work, I speak and facilitate conversations around technology, AI, careers, business and innovation. My experience includes: AI workshops; technology training; professional-development sessions; client training and enablement; talks for students and early-career professionals; conversations around women in technology; commercial and business presentations; executive and client-facing presentations. I have also supported commercial conversations involving corporate organizations, public institutions and government-related stakeholders."
Current speaking interests: AI & Business Transformation · Building with AI · Turning Ideas into Products · Career Ownership & Technology · Women, Technology & Ambition. (5 topics here vs. 4 on Home — see open item above.)

#### Selected Executive Education
"Tecnológico de Monterrey — High-Performance Management Executive Program. Computer Engineering background. International academic and professional exposure across Mexico, Canada, Spain and Türkiye." No further credentials — deliberate ceiling on credential volume.

#### Selected Professional Exposure
"My work has included corporate, consulting and collaborative environments involving organizations such as: Brainlabs, Mars Petcare, Hearts & Science, AT&T, Hallmark, UNODC Mexico, international real-estate businesses, technology startups, private-sector organizations, public-sector and government-related stakeholders. Company names are presented only where they accurately reflect my professional experience. Agency-supported organizations should not be presented as direct consulting clients." Presentation is editorial/typographic prose — explicitly not a logo wall (see `CASE_STUDIES.md` and `DECISIONS.md` for the no-logo-wall rule).

---

## Contact — `contact.html`

**Objective**: route each of the three audiences to the right next step with minimal friction and minimal personal exposure.
**Sections**: three paths — Executive Opportunities / Advisory & Consulting / Speaking & Workshops — each with a short framing line and a route into one form.
**CTA**: "Start a conversation."
**Content dependency**: none — copy finalized (three-path framing already approved in the original brief).
**Technical dependency**: form backend must move to a third-party static-friendly service (current `contact.php` cannot execute on GitHub Pages and was never wired to Jaqueline's real email). Physical address, phone numbers, and the Google Map are removed entirely (also resolves an exposed, unrestricted Maps API key — see `TECHNICAL_STANDARDS.md`).

---

## Menu/Nav (shared across all real pages)

Nav becomes **Home / Work / About / Contact**. Currently duplicated byte-for-byte across ~17 files with no templating; deduplication via a fetch-and-inject partial loader is an optional Sprint 5 item (see `IMPLEMENTATION_ROADMAP.md`) — not required for launch, but the single highest-leverage maintainability improvement available without a framework migration.
