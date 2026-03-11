import { z } from 'zod';
export const interviewSchema = z.object({
    mode: z.enum(['full', 'content_only', 'visual_only']).describe('Interview mode: full (all 5 blocks), content_only (blocks B and E only), visual_only (blocks C, D, and E only)'),
});
export function getInterviewPrompt(input) {
    const { mode } = input;
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
`.trim();
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
`.trim();
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
    (tabs, hover states, expandable sections)
\`\`\`
`.trim();
    const blockD = `
### Block D: Asset Inventory

\`\`\`
Last block — assets.

15. What company logos need to appear? List them.
    (I'll generate a logo acquisition list with recommended sources.)

16. Will any slides need custom hero or background imagery?
    (e.g., "an image of a bank operations floor", "an abstract data network visual")
    For each one: what slide, what feeling, any style direction?

17. Are there any screenshots, UI mockups, or diagrams that you'll provide,
    or should those be treated as placeholder zones?

18. Will this be presented live in-browser, exported to PDF, or both?
    (Affects animation strategy — animations get flattened for PDF.)
\`\`\`
`.trim();
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
`.trim();
    let blocks;
    let intro;
    switch (mode) {
        case 'full':
            blocks = [blockA, blockB, blockC, blockD, blockE];
            intro = `# Deck Builder Interview — Full Protocol

Work through each block conversationally. Complete one block before moving to the next.
Do not ask all questions at once. Confirm answers before proceeding.`;
            break;
        case 'content_only':
            blocks = [blockB, blockE];
            intro = `# Deck Builder Interview — Content Only

The visual design is already established. Focus only on content and narrative.`;
            break;
        case 'visual_only':
            blocks = [blockC, blockD, blockE];
            intro = `# Deck Builder Interview — Visual Only

Content is frozen. Focus on visual direction, components, and assets only.
Do not ask about narrative arc or slide copy — those are already in slides.ts.`;
            break;
    }
    return [intro, ...blocks].join('\n\n');
}
//# sourceMappingURL=interview.js.map