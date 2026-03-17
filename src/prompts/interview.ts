import { z } from 'zod'

export const interviewSchema = z.object({
  mode: z.enum(['full', 'content_only', 'visual_only', 'questionnaire']).describe(
    'Interview mode: questionnaire (dump all questions as a fillable DECK-BRIEF.md template), full (conversational all 5 blocks), content_only (blocks B and E only), visual_only (blocks C, D, and E only)'
  ),
})

export type InterviewInput = z.infer<typeof interviewSchema>

const questionnaireTemplate = `# DECK-BRIEF.md

> Fill in your answers below — use an AI assistant or answer directly.
> Save this file as \`DECK-BRIEF.md\` at your project root.
> Then tell Claude Code: "DECK-BRIEF.md is ready, proceed."

---

## A · Foundation

**A1. What's this deck for?**
*(pitch to client, internal workshop, exec briefing, product demo, regulatory/exam prep, conference talk, other)*

> ANSWER:

**A2. Who is the audience?**
*(C-suite, technical team, regulators, auditors, compliance officers, mixed room?)*

> ANSWER:

**A3. Roughly how many slides? Or list the sections you want to cover.**

> ANSWER:

**A4. Is there a specific client or counterparty involved? If yes, whose logo or branding needs to appear?**

> ANSWER:

**A5. Dark theme (Crowe Indigo default) or Light theme? Any accent color preference?**
*(Standard options: Crowe Blue, Coral, Amber)*

> ANSWER:

---

## B · Narrative & Content

**B1. What's the narrative arc?**
*(e.g., problem → solution → proof → ask; or: context → capability → case studies → next steps)*

> ANSWER:

**B2. Walk through each section — headline and 2–3 bullet points per section.**
*(This becomes the raw material for slides.ts — be as detailed as you like)*

> ANSWER:

**B3. Any specific data points, metrics, or statistics that must appear?**
*(e.g., "70% of proposals now use AI", "$2.4B in fines issued in 2024")*

> ANSWER:

**B4. What's the single most important thing the audience leaves knowing?**

> ANSWER:

**B5. Is there a call-to-action slide? What does it ask for?**
*(e.g., "Schedule a 30-min discovery call", "Approve the pilot budget")*

> ANSWER:

---

## C · Visual Direction

**C1. What's the visual vibe?**
*(Pick one: Data-heavy/analytical · Story-driven/narrative · Product demo/walkthrough · Thought leadership/editorial · Mixed)*

> ANSWER:

**C2. Which slide types do you need?** *(check all that apply)*

- [ ] Title / hero slide with animation
- [ ] Section dividers
- [ ] Two-column text + visual
- [ ] Full-bleed image with overlay text
- [ ] Stat / metric callout cards (2-up, 3-up, or 4-up)
- [ ] Timeline or process flow
- [ ] Comparison table or side-by-side
- [ ] Chart or data visualization
- [ ] Quote / testimonial
- [ ] Team / people slide
- [ ] Logo showcase / partner logos
- [ ] Interactive tabs or toggle panel
- [ ] Step-by-step animated sequence
- [ ] Other (describe below)

> ANSWER / notes:

**C3. Any specific motion requirements beyond slide transitions?**
*(e.g., countUp numbers, staggered card reveals, typewriter title, particle/aurora background)*

> ANSWER:

**C4. Interactive slides — behavioral spec.**
For EACH slide that needs interactivity, write:
- Trigger (click / hover)
- Layout change (e.g., "cards collapse into left ~36% column, detail panel slides in from right ~62%")
- Content in expanded state
- How the user dismisses it

Common patterns: Two-panel split · In-card expand · Tab panel · Drawer
*Leave blank if no interactive slides.*

> ANSWER:

**C5. Data visualizations — exact spec.**
For EACH chart or graph, list:
- Chart type (bar, doughnut, line, etc.)
- Metric name(s) to display
- Exact data values
- Whether to show comparison/baseline data — if you don't mention a baseline here, none will be added

Example: *"Doughnut — 70% Proposals with AI — single segment only, no comparison bar."*
*Leave blank if no charts.*

> ANSWER:

---

## D · Assets

**D1. What company logos need to appear?**
*(Crowe logo is always included. List any client or partner logos.)*

> ANSWER:

**D2. Will any slides need custom hero or background imagery?**
For each: which slide, what feeling, any style direction?
*(e.g., "Slide 1 hero — abstract data network, dark blue, cinematic")*

> ANSWER:

**D3. Are there screenshots, UI mockups, or diagrams you'll provide?**
*Or should those be treated as placeholder zones?*

> ANSWER:

**D4. Will this be presented live in-browser, exported to PDF, or both?**
*(PDF export flattens animations — affects motion strategy)*

> ANSWER:
`

export function getInterviewPrompt(input: InterviewInput): string {
  const { mode } = input

  if (mode === 'questionnaire') {
    return `# Deck Builder — Brief Questionnaire

Output the template below verbatim as a code block so the user can copy it cleanly.
Then tell the user:

> "Copy the template above into a new file called \`DECK-BRIEF.md\` at your project root.
> Fill in every \`ANSWER:\` line — you can paste the questions into an AI assistant to help.
> Once it's saved, come back here and say **'DECK-BRIEF.md is ready'** and I'll proceed."

Do not ask any follow-up questions. Do not start building. Wait for the file.

---

\`\`\`markdown
${questionnaireTemplate}
\`\`\``
  }

  const blockA = `
### Block A: Deck Foundation

Ask these questions conversationally — not all at once.

\`\`\`
Let's build this deck. A few foundation questions first:

1. What's this deck for? (pitch to client, internal workshop, exec briefing,
   product demo, regulatory/exam prep, conference talk, other?)

2. Who is the audience? (C-suite, technical team, regulators, auditors,
   compliance officers, mixed room?)

3. Roughly how many slides? (or: what sections do you want to cover?)

4. Is there a specific client or counterparty involved? If yes, whose logo
   or branding needs to appear?

5. Dark theme (Crowe Indigo default) or Light theme? Any accent color
   preference beyond standard Crowe Blue/Coral/Amber?
\`\`\`
`.trim()

  const blockB = `
### Block B: Narrative & Content

\`\`\`
Now let's map the content.

6. What's the narrative arc? (e.g., problem → solution → proof → ask;
   or: context → capability → case studies → next steps)

7. Walk me through each section — headline and 2–3 bullet points per section.
   We'll refine these, but I need the raw material first.

8. Are there any specific data points, metrics, or statistics that must appear?
   (e.g., "$X billion in fines issued", "83% of examiners flagged X")

9. What's the single most important thing the audience leaves knowing?

10. Is there a call to action slide? What does it ask for?
\`\`\`
`.trim()

  const blockC = `
### Block C: Visual Direction

\`\`\`
Now let's figure out the UI.

11. What's the visual vibe? Pick the closest:
    - Data-heavy / analytical (charts, tables, stat callouts)
    - Story-driven / narrative (big visuals, minimal text)
    - Product demo / walkthrough (UI mockups, step sequences)
    - Thought leadership / editorial (bold typography, sparse)
    - Mixed

12. Which slide types will you need? Check all that apply:
    - Title / hero slide with animation
    - Section dividers
    - Two-column text + visual
    - Full-bleed image with overlay text
    - Stat / metric callout cards (e.g., 3-up or 4-up stat blocks)
    - Timeline or process flow
    - Comparison table or side-by-side
    - Chart or data visualization (what type?)
    - Quote / testimonial
    - Team / people slide
    - Logo showcase / partner logos
    - Interactive tabs or toggle (left nav panel style)
    - Step-by-step animated sequence
    - Other (describe)

13. Any specific motion requirements beyond slide transitions?
    (e.g., countUp numbers, staggered card reveals, typewriter title,
     particle/aurora background, animated beam/line connectors)

14. Any slides that need to feel "interactive" in the browser?
    For EACH interactive element, write a behavioral spec:
    - What triggers the interaction (click? hover?)
    - What layout change happens? (e.g., "cards collapse into a left column,
      detail panel slides in from the right at 62% width")
    - What content appears in the expanded/secondary state?
    - How does the user close or dismiss it?
    Be precise — vague answers here cause the most revision rounds.

    Common interactive patterns (name the one you want or describe your own):
    - Two-panel split: cards collapse left (~36%), detail panel slides in right (~62%)
    - In-card expand: clicked card expands in place, pushing others down
    - Tab panel: left nav tabs, content pane on the right
    - Drawer: side panel overlays the slide content

15. For each data visualization (chart, graph, table) in the deck, specify:
    - Chart type (bar, doughnut, line, etc.)
    - Metric name(s) shown on the chart
    - The exact data values or ranges
    - Whether to show comparison/baseline data (e.g., "Current vs Target")
      — if you do NOT mention a baseline here, none will be added.
    Example: "Doughnut showing 70% proposals with AI — single segment, no comparison bar."
\`\`\`
`.trim()

  const blockD = `
### Block D: Asset Inventory

\`\`\`
Last block — assets.

16. What company logos need to appear? List them.
    (I'll generate a logo acquisition list with recommended sources.)

17. Will any slides need custom hero or background imagery?
    (e.g., "an image of a bank operations floor", "an abstract data network visual")
    For each one: what slide, what feeling, any style direction?

18. Are there any screenshots, UI mockups, or diagrams that you'll provide,
    or should those be treated as placeholder zones?

19. Will this be presented live in-browser, exported to PDF, or both?
    (Affects animation strategy — animations get flattened for PDF.)
\`\`\`
`.trim()

  const blockE = `
### Block E: Confirm & Plan

After all blocks are answered, output a DECK PLAN in this format:

\`\`\`
DECK PLAN — [Deck Title]
========================
Audience: [...]
Theme: Dark / Light
Accent: [color]
Slide count: [N]
Sections:
  1. [Section name] — [slide type] — [key content]
  2. ...

Motion strategy: [brief description]
Interactive elements: [list or none]
Asset dependencies: [list from blocks C/D]
\`\`\`

Confirm or revise before proceeding to Phase 2.
`.trim()

  let blocks: string[]
  let intro: string

  switch (mode) {
    case 'full':
      blocks = [blockA, blockB, blockC, blockD, blockE]
      intro = `# Deck Builder Interview — Full Protocol

Work through each block conversationally. Complete one block before moving to the next.
Do not ask all questions at once. Confirm answers before proceeding.`
      break

    case 'content_only':
      blocks = [blockB, blockE]
      intro = `# Deck Builder Interview — Content Only

The visual design is already established. Focus only on content and narrative.`
      break

    case 'visual_only':
      blocks = [blockC, blockD, blockE]
      intro = `# Deck Builder Interview — Visual Only

Content is frozen. Focus on visual direction, components, and assets only.
Do not ask about narrative arc or slide copy — those are already in slides.ts.`
      break
  }

  return [intro, ...blocks].join('\n\n')
}
