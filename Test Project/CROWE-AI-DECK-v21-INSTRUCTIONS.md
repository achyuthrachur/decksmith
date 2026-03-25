# Crowe AI Strategy Deck — v21 Build Instructions

## Overview

Read this file in full before touching any code.

**Source file:** `Crowe-AI-Strategy-Presentation (Revised-v20).html`
**Output file:** `Crowe-AI-Strategy-Presentation (Revised-v21).html`
**Do not overwrite v20.** Duplicate the file first, then work on v21.

The deck is a single-file HTML presentation. All slides are `<div class="slide ...">` elements
inside `#deck`. Navigation, animations, and logo stamping are handled by the JavaScript block
at the bottom of the file. The design system (CSS variables, layout classes, component
classes) is defined in the `<style>` block in `<head>`. Do not modify the design system
unless a specific instruction below requires it.

---

## Final Slide Order (15 slides total)

| New # | Source  | Status     | Title                                        |
|-------|---------|------------|----------------------------------------------|
| 1     | s1      | Unchanged  | Title                                        |
| 2     | s3      | Modified   | Three Pillars                                |
| 3     | s4      | Modified   | Sell AI — Services & Pricing                 |
| 4     | s6      | Unchanged  | Pillar 2 — Improve                           |
| 5     | s8      | Modified   | Pillar 3 — Create Value                      |
| 6     | s9      | Modified   | Case Study                                   |
| 7     | s10     | Unchanged  | Demos                                        |
| 8     | s11     | Unchanged  | Operating Model                              |
| 9     | s12     | Unchanged  | 18-Month Goals                               |
| 10    | NEW     | New        | AI Strategy Execution Framework              |
| 11    | NEW     | New        | Incremental Improvement Playbook             |
| 12    | NEW     | New        | Create New Client Value Playbook             |
| 13    | NEW     | New        | Build, Scale & Monetize AI Services          |
| 14    | NEW     | New        | Operating Model & Governance                 |
| 15    | s13     | Modified   | Closing                                      |

**Slides to delete entirely:** s2, s5, s7, and the AI Opportunity Pipeline slide (if it was
added in a prior version). These IDs should not appear in v21 at all.

---

## Global Rules (apply to every slide, old and new)

### Animations
- **Keep** slide transition animations: `opacity` + `translateX` on `.slide`, `.slide.active`,
  `.slide.prev`. Do not change transition timing or easing.
- **Keep** `.ani` / `fadeUp` entry animations on existing slides exactly as they are.
- **No click-through or reveal animations on any slide.** All content must be fully visible
  the moment a slide becomes active. No staged reveals, no `onclick` content toggles,
  no elements that appear only after user interaction. If any existing slides use
  click-to-reveal patterns, remove them and make all content visible by default.

### Bullets
- All bullet lists across every slide — old and new — must use the `.slist` class pattern:
  `<ul class="slist">` with `<li>` items. The CSS for `.slist` already handles the amber `▸`
  marker. Do not use raw `<ul>`, `•`, `-`, or any other bullet style anywhere in the deck.
- When building new slides, always use `.slist` for any list of items.

### Logo
- The Crowe logo is stamped on every slide via the `#ltpl` template and the JavaScript at
  the bottom of the file. Verify this stamp logic runs on all new slides. Do not manually
  add `.logo-wrap` SVG blocks to individual slides — rely on the template stamp.

### Section tags
- Each slide has a `.stag` element (vertical right-edge label). Assign appropriate section
  tag text to all new slides. Use "PLAYBOOK" for slides 10–14.

### IDs
- Old slides retain their original IDs (s1, s3, s4, etc.) for reference, but renumber the
  `TOTAL` constant in JavaScript to `15` to reflect the new slide count.

---

## Slide-by-Slide Instructions

---

### Slide 1 — Title (s1)
No changes.

---

### Slide 2 — Three Pillars (was s3)

**Change:** Convert from the current full-bleed layout to a **side-by-side three-column pillar
layout**.

**Layout:** Use `.l-full` with a centered content area. Inside, place a header row above three
equal-width pillar cards in a CSS grid (`grid-template-columns: repeat(3, 1fr)`).

**Header:**
- Eyebrow: `Framework`
- H2: `Three things we will do with AI` (italicise "AI" in amber)

**Three pillar cards — each card contains:**
- Large ghost pillar number (01 / 02 / 03) using `.pnum` style — amber at low opacity for 01,
  teal for 02, cyan for 03
- Pillar name as `h3` in the pillar accent colour
- One-line italic description in `rgba(255,255,255,.55)`
- A thin horizontal rule in the pillar accent colour
- Three bullet points as `.slist`

**Card 01 — Sell AI** (amber accent, use `.card-a`):
- Description: *Bring AI capability to market. Build a revenue line directly from our expertise.*
- Bullets:
  - Forward-deployed AI resources in client engagements
  - Assessment → Implementation → Managed Service
  - Industry-specific use cases that convert to revenue

**Card 02 — Improve** (teal accent, use `.card-t`):
- Description: *Use AI to make our delivery faster, more precise, and more scalable.*
- Bullets:
  - Decompose and accelerate core delivery processes
  - Build reusable accelerators that improve margin
  - 20–30% efficiency gain per offering

**Card 03 — Create Value** (cyan accent, use `.card-c`):
- Description: *Use AI to create new, differentiated value for clients that competitors cannot match.*
- Bullets:
  - Redesign offerings around client future-state needs
  - Subscriptions, managed services, outcome-based pricing
  - Do what competitors cannot do at scale

---

### Slide 3 — Sell AI: Services & Pricing (was s4)

**Change:** Full redesign. Two-column layout: main content on the left (~75% width), pricing
panel on the right (~25% width) separated by a subtle amber border.

**Header (left pane):**
- Eyebrow: `Pillar 01 · Sell AI`
- H2: `Turn our AI capability into revenue`
- Subtitle (italic, dimmed): *Position Crowe as the trusted AI implementation partner — not
  just an advisor*
- Amber rule below subtitle

**Four service cards in a `grid-template-columns: repeat(4, 1fr)` grid:**

Use `.card` as base. Accent colours: AI Strategy = amber (`.card-a`), AI Governance = cyan
(`.card-c`), AI Enablement = teal (`.card-t`), AI Data Transformation = default `.card`
(dimmed/neutral).

Each card has:
- Service name as a small all-caps label in the accent colour
- Sub-items as `.slist`

**Card 1 — AI Strategy** (amber):
- AI Value Lab
- AI Roadmap
- Planning and Execution

**Card 2 — AI Governance** (cyan):
- Program Build
- Assessment
- Execute

**Card 3 — AI Enablement** (teal):
- Enablement Workshops
- Accelerators
- Forward Deployed Engineers + Resource Enablement

**Card 4 — AI Data Transformation** (neutral/dimmed):
- Body text: *Roadmap in development* (italic, low opacity)

**How We Do It section** (below the four cards, full width of left pane):
- Small all-caps label: `How we do it`
- Three items in a `grid-template-columns: repeat(3, 1fr)` grid, each with a left amber border
  accent (border-left on a padded div, not a card):
  - AI Workshops to surface existing challenges and value opportunities
  - AI Roadmaps to show how and where AI can improve processes and create value
  - Launch accelerators with forward deployed engineers to build and enable

**Pricing panel (right pane):**
- Background: `rgba(245,168,0,.04)`, left border: `1px solid rgba(245,168,0,.13)`
- Small all-caps header: `Pricing` in amber
- Sections separated by thin amber dividers (`border-top: 1px solid rgba(245,168,0,.12)`):

  **AI Strategy**
  - Price: `$10K – $50K` (amber, larger weight)

  **AI Governance**
  - Program Build: `$25K – $75K`
  - Assessment: `$15K – $50K`
  - Execute: `$20K – $75K`
  (Sub-item label in small dimmed text, price in cyan)

  **AI Enablement**
  - Workshops: `$5K – $15K`
  - Accelerators: `$15K – $50K`
  - FDE + Resources: `$25K – $100K`
  (Sub-item label in small dimmed text, price in teal)

  **AI Data Transformation**
  - Price: `TBD` (italic, very low opacity)

---

### Slide 4 — Pillar 2: Improve (was s6)
No changes.

---

### Slide 5 — Pillar 3: Create Value (was s8)

**Change:** Reorder content so value outcomes appear **first**, then How We Do It below.

**Layout:** Keep the same layout class and background image currently on s8.

**Header:**
- Eyebrow: `Pillar 03 · Create Value`
- H2: `Transform how we serve clients`
- Italic subtitle: *Clients don't buy AI. They buy lower risk, faster growth, reduced cost,
  and better decisions.*

**Value outcomes grid (FIRST — top of content area):**
Four cards in `grid-template-columns: repeat(4, 1fr)`, all using `.card-t` (teal accent).

| Card | Label              | Headline              | Detail                                          |
|------|--------------------|-----------------------|-------------------------------------------------|
| 1    | ↓ Lower risk       | Continuous            | Continuous monitoring vs. periodic sampling     |
| 2    | ↑ Faster growth    | Predictive            | Predictive recommendations vs. static analysis  |
| 3    | ↓ Reduced cost     | Lower delivery cost   | At the same price point                         |
| 4    | ◆ Better decisions | Weekly, not quarterly | Insights delivered on a continuous cadence      |

**Thin horizontal rule / divider** between the two sections.

**How We Do It (SECOND — below divider):**
- Small all-caps label: `How we do it`
- Four step cards in `grid-template-columns: repeat(4, 1fr)`, each with a ghost step number
  and body text (use existing `.step` / `.step-n` classes from the deck's design system):
  1. Understand their needs in an AI-forward world
  2. Map the future of our client's business and accompanying transformation
  3. Evaluate our current offerings to align with the future client JTBD
  4. Expand offerings for the transition (1–5 years) and the future state (5+ years)

---

### Slide 6 — Case Study (was s9)

**Change:** Text only. Find every instance of "financial institution" or "Financial
Institution" in this slide and replace with "Organizations" / "organizations" (match the
capitalisation of each occurrence).

---

### Slide 7 — Demos (was s10)
No changes.

---

### Slide 8 — Operating Model (was s11)
No changes.

---

### Slide 9 — 18-Month Goals (was s12)
No changes.

---

### Slide 10 — AI Strategy Execution Framework (NEW)

**Layout:** `.l-full g-grid`
**Section tag:** `PLAYBOOK`

**Header:**
- Eyebrow: `Playbook`
- H2: `AI Strategy Execution Framework`
- Subtitle: *Crowe Consulting executes its AI strategy through three coordinated areas of focus*

**Two-column layout below header** (`grid-template-columns: 1fr 280px`):

**Left — Three focus areas** (stacked vertically, full height):

Three cards stacked using `.card`, each with a ghost number (1 / 2 / 3), bold `h3` title,
and italic description. Accent colours match the three pillars:
1 = amber (`.card-a`), 2 = teal (`.card-t`), 3 = cyan (`.card-c`).

1. **Incrementally Improve Existing Offerings**
   *Efficiency + Margin Expansion — make what we do today faster, cheaper, and more scalable*

2. **Create New Client Value Through AI-Enabled Offerings**
   *Differentiation + Growth — redesign how we serve clients around their AI-forward future state*

3. **Sell AI Strategy, Transformation & Implementation Services**
   *New Revenue Engine — position Crowe as the go-to AI transformation partner for clients*

**Right — Minimum Execution Standard panel:**
- `.card` with subtle border
- Small all-caps header: `Minimum Execution Standard`
- Italic subheading: *Each business line, per quarter:*
- Four items as `.slist`. Prepend a small inline phase badge before each item text:
  - [Ph.1] Identify **5–10** AI opportunities
  - [All]  Launch **2+** AI pilots
  - [Ph.2] Advance **1** offering transformation initiative
  - [Ph.3] Generate **3+** AI client engagements or conversations

Phase badges: small inline `<span>` with amber background at low opacity, amber text,
border-radius, ~8px font. Use the existing `.chip` class if it fits, or style inline.

---

### Slide 11 — Incremental Improvement Playbook (NEW)

**Layout:** `.l-full g-grid`
**Section tag:** `PLAYBOOK`

**Header:**
- Eyebrow: `Playbook · Phase 1`
- H2: `Incremental Improvement of Existing Offerings`
- Subtitle: *Increase delivery efficiency, expand margins, improve pricing flexibility, and
  free capacity to create new client value*

**Four step cards in a 2×2 grid** (`grid-template-columns: 1fr 1fr`, `gap: 14px`).
Each card uses `.card` base with a ghost step number (`.pnum` or `.step-n` style) and `h3`
step title.

**Step 1 — Decompose Offerings into Jobs-to-Be-Done**
`.slist` (two-column layout inside card using `columns: 2` or a sub-grid):
- Planning / scoping
- Data collection
- Risk assessment
- Testing execution
- Reporting / documentation
- Client communication
- UAT development
- Project management
- Quality review

Output badge at bottom of card: small amber `.chip` reading `Output → AI Opportunity Map`

**Step 2 — Identify AI Efficiency Opportunities**
Small all-caps sub-label: *Evaluate each component:*
`.slist`:
- Can AI reduce manual effort?
- Can AI increase speed?
- Can AI improve quality / consistency?
- Can AI expand scope coverage?

**Step 3 — Select Development Path**
Two side-by-side sub-cards inside Step 3 card (`grid-template-columns: 1fr 1fr`):

*No-code / Low-code* (`.card-t`, teal):
`.slist`:
- Built within business lines
- Supported by TBT group
- Rapid pilots (<60 days)

*Pro-code (AI Studio Required)* (`.card-c`, cyan):
`.slist`:
- Scalable, repeatable solutions
- Formal funding required
- Added to accelerator roadmap

**Step 4 — Monetization & Margin Strategy**
Three side-by-side option sub-cards (`grid-template-columns: 1fr 1fr 1fr`):

*Option A — Capture Margin* (`.card`, neutral):
`.slist`:
- Maintain pricing
- Increase profitability
- Fund AI investments

*Option B — Price Flexibility* (`.card`, neutral):
`.slist`:
- Adjust pricing to stay competitive
- Defend market share

*Option C — Reinvest Capacity into Client Value* (`.card-t`, teal, add small `Preferred`
badge in teal):
`.slist`:
- Expand engagement scope
- Deliver proactive insights
- Increase client interaction
- Create follow-on work

---

### Slide 12 — Create New Client Value Playbook (NEW)

**Layout:** `.l-full g-grid`
**Section tag:** `PLAYBOOK`

**Header:**
- Eyebrow: `Playbook · Phase 2`
- H2: `Create New Client Value Through AI`
- Subtitle: *Ensure offerings remain relevant as client operating models become AI-driven*

**Four step cards in a 2×2 grid** (`grid-template-columns: 1fr 1fr`, `gap: 14px`).

**Step 1 — Client Future-State Assessment**
Sub-label: *Assess:*
`.slist`:
- AI-driven changes to client operations
- Regulatory evolution
- Risk, compliance, finance transformation
- Future jobs-to-be-done (3–5 years)

Methods — render as `.chip` / `.chip-c` tags below the list:
- Executive roundtables
- AI value labs
- Client listening tours
- Market trend synthesis

**Step 2 — Gap Analysis**
Sub-label: *Current offerings → Future client needs*
Four transformation rows. Each row: dimmed "before" text + amber `→` + brighter "after" text.
Use a simple flex row per item, not a `<table>`:
- Annual audit → Continuous assurance
- Sample testing → Full-population monitoring
- Static reporting → Real-time insights
- Reactive compliance → Predictive risk management

**Step 3 — Redesign / Build Offerings**
`.slist`:
- Enhance existing offerings
- Bundle into AI-enabled managed services
- Launch new solution categories

Two development model sub-cards (`grid-template-columns: 1fr 1fr`):
- *Low-code innovation pods* (`.card-t`): Business-led
- *Pro-code accelerators* (`.card-c`): AI Studio-led

**Step 4 — Market Validation Loop**
Pill/chip sequence (use `.chip` for most, `.chip-t` for Scale):
`Hypothesize → Test → Refine → Pilot →` **Scale**

Then sub-label: *Each business line must produce:*
`.slist`:
- Future-State POV (3–5 years)
- Top 3 offering transformations
- At least 1 pilot per transformation

---

### Slide 13 — Build, Scale & Monetize AI Transformation Services (NEW)

**Layout:** `.l-full g-grid`
**Section tag:** `PLAYBOOK`

**Header:**
- Eyebrow: `Playbook · Phase 3`
- H2: `Build, Scale & Monetize AI Transformation Services`
- Subtitle: *Position Crowe as a trusted AI transformation partner*

**Three-column card grid** (`grid-template-columns: repeat(3, 1fr)`, `gap: 14px`):

**Land — Entry Offerings** (`.card-a`, amber):
Small `.chip` badge: `Land`
Two nested inner cards:

*AI Value Lab / Workshop*
`.slist`:
- 8–12 hours
- Identify use cases
- Pricing: $5K–$10K

*AI Roadmap Development*
`.slist`:
- Prioritized use-case portfolio
- Governance + data readiness
- Pricing: $10K–$40K

**Expand — Expansion Offerings** (`.card-c`, cyan):
Small `.chip-c` badge: `Expand`
`.slist`:
- AI governance frameworks
- Responsible AI / model risk
- Data architecture transformation
- AI implementation support
- AI operating model design

**Scale — Accelerator-Led Implementation** (`.card-t`, teal):
Small `.chip-t` badge: `Scale`

Sub-label: *Leverage firm accelerators:*
`.slist`:
- Pre-built models
- Workflow orchestration
- Monitoring dashboards

Sub-label: *Commercial model:*
`.slist`:
- License / deployment fees
- Implementation services
- Managed services annuity

**Overarching Capability banner** (full width below the three cards):
A single `.card` with `border-left: 3px solid var(--amber)` containing:
- Small all-caps `.eyebrow`-style label: `Overarching Capability`
- `h3`: `Enterprise AI Strategy Advisory`
- `<p>` dimmed: Define enterprise AI strategy · Align AI to business value ·
  Prioritize investments · Establish governance

---

### Slide 14 — Operating Model & Governance (NEW)

**Layout:** `.l-full g-grid`
**Section tag:** `PLAYBOOK`

**Header:**
- Eyebrow: `Playbook`
- H2: `Operating Model & Governance`

**Two-column layout** (`grid-template-columns: 1fr 1fr`, `gap: 14px`):

**Left column — Decision Rights:**
Section sub-label: `Decision Rights`
Three stacked `.card` variants:

*Business Lines Own* (`.card-a`, amber):
`.slist`:
- Use-case identification
- Client relevance
- Commercialization
- Accelerator development ← **this item belongs here per Troy**

*AI Studio Owns* (`.card-c`, cyan):
`.slist`:
- Scalable builds
- Technical standards
*(Only these two items. Accelerator development was moved to Business Lines Own.)*

*Joint Ownership* (`.card-t`, teal):
`.slist`:
- Pro-code prioritization
- Investment decisions

**Right column — two stacked sections:**

*Success Metrics* ← **header reads exactly "Success Metrics", not "Firm-Wide Success Metrics"**
`.card`:
`.slist`:
- AI revenue ($)
- AI-influenced margin improvement (%)
- Number of scaled AI solutions
- Pipeline velocity (idea → production)
- Client adoption of AI-enabled offerings

*Crowe AI Value Narrative*
`.card-a` (subtle amber card):
Italic subheading: *Each business line must clearly articulate:*
Numbered list rendered as `.slist` with inline number prefixes (1 / 2 / 3) instead of `▸`:
1. How AI is transforming the client's world
2. How Crowe offerings evolve in response
3. Why Crowe is differentiated in delivering this value

---

### Slide 15 — Closing (was s13)

**Change:** Remove all subtitle and supporting body text. Keep only these four elements:

1. The closing headline question:
   *In 12 months, what headline do we want to be true about AI in Crowe Consulting?*

2. The call to action:
   *If you can define where AI should improve outcomes, Crowe can help imagine the solution,
   build it, and operationalize it into measurable business value.*

3. The line:
   *Let's define it — and go build it.*

4. The hashtag: `#SmartDecisions`

Remove everything else currently on this slide (any labels, subtitles, section tags, or
supporting copy beyond the four items above).

---

## JavaScript Updates

After all slide changes are complete:

1. Update `const TOTAL = 13` → `const TOTAL = 15`
2. Verify the logo stamp loop iterates over all 15 slides
3. Verify keyboard navigation (arrow keys) and button navigation work across all 15 slides
4. Verify the progress bar calculates correctly against 15 slides
5. Verify the slide counter (e.g. "1 / 15") displays correctly

---

## Final Checklist Before Saving v21

- [ ] v20 source file is untouched
- [ ] All 15 slides present, in correct order
- [ ] s2, s5, s7, and AI Opportunity Pipeline slide are fully deleted
- [ ] No click-through or reveal animations anywhere — all content visible on slide load
- [ ] All bullet lists use `.slist` class — no raw `<ul>`, `•`, or `-` bullets anywhere
- [ ] Crowe logo appears on every slide (via `#ltpl` template stamp)
- [ ] Section tags present on all slides; new slides 10–14 use `PLAYBOOK`
- [ ] "Financial Institution" / "financial institution" replaced with "Organizations" /
      "organizations" on slide 6 (match capitalisation)
- [ ] Closing slide (15) contains only the four elements listed — no other text
- [ ] Slide 14 Decision Rights: Accelerator development is listed under Business Lines Own
- [ ] Slide 14 right column header reads exactly "Success Metrics"
- [ ] `const TOTAL` updated to `15`
- [ ] Slide counter and progress bar work correctly end-to-end
- [ ] File opens and navigates correctly in browser before saving
