import { z } from 'zod';
export const generateAssetDocsSchema = z.object({
    interviewAnswers: z.string().describe('Full text of the interview answers from all 5 blocks (A–E). ' +
        'Paste the raw conversation or structured answers from the deck_interview prompt.'),
});
export async function runGenerateAssetDocs(input) {
    const { interviewAnswers } = input;
    // Parse key signals from the interview answers
    const hasStats = /stat|metric|number|percent|billion|million|\$\d/i.test(interviewAnswers);
    const hasHero = /hero|title slide|background image/i.test(interviewAnswers);
    const hasLogos = /logo|client|partner|company/i.test(interviewAnswers);
    const hasDark = /dark/i.test(interviewAnswers) && !/light/i.test(interviewAnswers);
    const isData = /data|analyt|chart|table/i.test(interviewAnswers);
    const isStory = /story|narrative|editorial/i.test(interviewAnswers);
    return `# Asset Elicitation Documents
Generated from interview answers.

---

## Document 1: COMPONENTS-NEEDED.md

\`\`\`markdown
# Components Needed

## From ReactBits (https://www.reactbits.dev)

| Component | Use | Slide(s) |
|-----------|-----|----------|
${hasHero ? '| SplitText | Hero title word-by-word reveal | Slide 1 |\n' : ''}${hasStats ? '| CountUp | Animated stat numbers | Stats slides |\n' : ''}${isData ? '| SpotlightCard | Feature cards with glow | Content slides |\n| AnimatedList | Staggered list reveals | Content slides |\n' : ''}${isStory ? '| BlurText | Subheading fade-in | Hero, section dividers |\n| Aurora | Hero background ambient | Slide 1 |\n' : ''}| TiltCard | Interactive hover on cards | Content slides |

## From 21st.dev (https://21st.dev)

Install via: npx shadcn@latest add "https://21st.dev/r/[component]"

| Component | Use | Slide(s) |
|-----------|-----|----------|
${isData ? '| bento-grid | Feature/capability grid layout | Content slides |\n| number-ticker | CountUp alternative | Stats slides |\n' : ''}| blur-fade-in | Standard entrance animation | All slides |
| border-beam | Animated border on highlight cards | Feature slides |

## From Framer Motion (already in stack, no install needed)
- Used for: slide transitions (AnimatePresence), stagger animations, entrance effects

## From Anime.js v4 (already in stack, no install needed)
- Used for: scroll-triggered reveals, hero sequence timing

## ACTION
Run these installs before scaffold:
npx jsrepo add github/DavidHDev/react-bits SplitText
npx jsrepo add github/DavidHDev/react-bits CountUp
npx jsrepo add github/DavidHDev/react-bits TiltCard
npx shadcn@latest add "https://21st.dev/r/blur-fade-in"
npx shadcn@latest add "https://21st.dev/r/border-beam"
\`\`\`

---

## Document 2: LOGOS-NEEDED.md

\`\`\`markdown
# Logos Needed

| Company | Slide(s) | Format Needed | Recommended Source |
|---------|----------|---------------|-------------------|
| Crowe LLP | All (footer/chrome) | SVG white + color | Already in project |
${hasLogos ? '| [Client name — extract from interview answers] | Title, closing | SVG preferred, PNG @2x fallback | Brand website / press kit |\n' : ''}

## Instructions
1. Download each logo in SVG format if available (PNG @2x minimum)
2. Place in \`/public/logos/[company-slug].[ext]\`
3. Confirm placement — wiring happens in the build step
\`\`\`

---

## Document 3: IMAGE-PROMPTS.md

\`\`\`markdown
# Image Generation Prompts

${hasHero ? `## Image 1
**File:** \`/public/images/hero-bg.jpg\`
**Slide:** Hero / Title
**Dimensions:** 1920 × 1080px
**Prompt:**
Abstract corporate data visualization, deep navy blue (#011E41) background,
subtle geometric network lines in electric blue (#0075C9) at 15% opacity,
cinematic lighting, photorealistic render, ultra-wide corporate photography style,
no text, no people, suitable as a presentation background overlay.
` : ''}
## Note
Extract specific image requirements from the interview answers (Block D, questions 16–17).
Generate one prompt per image needed, following this structure:
- Subject and setting
- Lighting direction
- Color palette anchored to Crowe Indigo (#011E41)
- Mood and emotional tone
- Style modifier (photorealistic / abstract / illustrative)
\`\`\`

---

## Document 4: CONTENT-LAYER.md

\`\`\`markdown
# Content Layer Draft

Review and edit this before building. This becomes \`/src/data/slides.ts\`.

## Slide 1 — Hero
type: "hero"
headline: "[Extract from interview Block B, question 9 — the single most important thing]"
subheadline: "[Client name + engagement context]"
eyebrow: "CONFIDENTIAL · FOR [CLIENT] · [MONTH YEAR]"
background: "/images/hero-bg.jpg"

## Slide 2 — Section Divider
type: "section-divider"
sectionNumber: "01"
label: "[First section from Block B narrative arc]"
tagline: "[Supporting context in one phrase]"

## [Continue for each section from the interview]

## Closing CTA
type: "cta"
headline: "Next Steps"
subheadline: "[Specific ask from Block B, question 10]"
contacts:
  - name: "Achyuth Rachur"
    email: "achyuth.rachur@crowe.com"
    role: "AI Innovation"
\`\`\`

---

## Summary

Based on the interview answers, here are the key signals detected:

- Theme: ${hasDark ? 'Dark' : 'Light or mixed'}
- Style: ${isData ? 'Data / Analytical' : isStory ? 'Story / Editorial' : 'Mixed'}
- Stats present: ${hasStats ? 'Yes — use CountUp components' : 'No'}
- Background images needed: ${hasHero ? 'Yes — see IMAGE-PROMPTS above' : 'TBD'}
- External logos needed: ${hasLogos ? 'Yes — see LOGOS-NEEDED above' : 'Crowe only'}

**Next step:** Confirm content in CONTENT-LAYER.md, place assets, then run \`deck_scaffold\`.
`;
}
//# sourceMappingURL=generate-asset-docs.js.map