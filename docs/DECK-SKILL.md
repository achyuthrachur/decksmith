---
name: deck-builder
description: >
  Build polished, branded HTML presentation decks for Crowe client engagements.
  Use when the user asks to create a pitch deck, workshop slide deck, executive
  presentation, or any slide-based HTML deliverable. Captures the full Crowe
  design system, Vite/React/Tailwind build pipeline, PDF export process, and
  an interview-driven workflow for asset elicitation. The output is always a
  single portable HTML file built to the standard of empower-deck v3.3.
---

# Deck Builder Skill

This skill governs the creation of HTML presentation decks for Achyuth Rachur at
Crowe LLP. Every deck built with this skill must match the quality bar set by
`empower-deck_v3.3.html`: pixel-perfect Crowe branding, slide-based navigation,
smooth transitions, data-separated architecture, and a single portable HTML output.

**Decks must never look the same.** Layouts, motion patterns, accent color usage,
and UI component selection should vary per project. What stays constant is:
correctness, brand compliance, and build quality.

---

## PHASE 0 — READ THIS SKILL FIRST

When starting a new deck project, the agent must:

1. Read this entire SKILL.md before touching any file
2. Run the **INTERVIEW PROTOCOL** (Phase 1 below) before scaffolding anything
3. After the interview, produce the four **ASSET ELICITATION DOCUMENTS** (Phase 2)
4. Wait for confirmation that assets are placed before building
5. Scaffold and build per the **ARCHITECTURE SPEC** (Phase 3)
6. Validate against the **QUALITY CHECKLIST** (Phase 4) before declaring done

---

## PHASE 1 — INTERVIEW PROTOCOL

**Run this interview before writing a single line of code.** Ask questions in
conversational blocks — not all at once. Work through each block, confirm answers,
then move to the next.

---

### Block A: Deck Foundation

```
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
```

---

### Block B: Narrative & Content

```
Now let's map the content.

6. What's the narrative arc? (e.g., problem → solution → proof → ask;
   or: context → capability → case studies → next steps)

7. Walk me through each section — headline and 2–3 bullet points per section.
   We'll refine these, but I need the raw material first.

8. Are there any specific data points, metrics, or statistics that must appear?
   (e.g., "$X billion in fines issued", "83% of examiners flagged X")

9. What's the single most important thing the audience leaves knowing?

10. Is there a call to action slide? What does it ask for?
```

---

### Block C: Visual Direction

```
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
```

---

### Block D: Asset Inventory

```
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
```

---

### Block E: Confirm & Plan

After all blocks are answered, output a **DECK PLAN** in this format:

```
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
```

Confirm or revise before proceeding to Phase 2.

---

## PHASE 2 — ASSET ELICITATION DOCUMENTS

After the Deck Plan is confirmed, produce four markdown documents.

---

### Document 1: `COMPONENTS-NEEDED.md`

List every UI component needed from 21st.dev and ReactBits.
Use the Component Registry (below) to map slide types to specific components.

```markdown
# Components Needed

## From ReactBits (https://www.reactbits.dev)

| Component | Use | Slide(s) |
|-----------|-----|----------|
| SplitText | Hero title word-by-word reveal | Slide 1 |
| CountUp | Animated stat numbers | Slides 3, 7 |
| ...

## From 21st.dev (https://21st.dev)
Install via: npx shadcn@latest add "https://21st.dev/r/[component]"

| Component | Use | Slide(s) |
|-----------|-----|----------|
| ...

## From Framer Motion (already in stack, no install needed)
- Used for: [list]

## From Anime.js v4 (already in stack, no install needed)
- Used for: [list]

## ACTION
Run these installs before scaffold:
[list of exact install commands]
```

---

### Document 2: `LOGOS-NEEDED.md`

```markdown
# Logos Needed

| Company | Slide(s) | Format Needed | Recommended Source |
|---------|----------|---------------|-------------------|
| Crowe LLP | All (footer/chrome) | SVG white + color | Already in project |
| [Client name] | [slides] | SVG preferred, PNG fallback | [source URL] |

## Instructions
1. Download each logo in SVG format if available (PNG @2x minimum)
2. Place in `/public/logos/[company-slug].[ext]`
3. Confirm placement and I'll wire them in
```

---

### Document 3: `IMAGE-PROMPTS.md`

For every image needed, produce a Midjourney/DALL-E ready prompt.

Each prompt must include: subject, setting, lighting, color palette anchored to
Crowe Indigo (#011E41), mood, style modifier. Generic prompts are not acceptable.

```markdown
# Image Generation Prompts

## Image 1
**File:** `/public/images/hero-bg.jpg`
**Slide:** Hero / Title
**Dimensions:** 1920 × 1080px
**Prompt:**
[Detailed, generation-ready prompt]
```

---

### Document 4: `CONTENT-LAYER.md`

Structured draft of all slide content in the exact format `slides.ts` will consume.

```markdown
# Content Layer Draft

Review and edit this before I build. This becomes `/src/data/slides.ts`.

## Slide 1 — [Title Slide]
type: "hero"
headline: "[main headline]"
subheadline: "[subheadline]"
eyebrow: "[label above headline]"
...
```

---

## PHASE 3 — ARCHITECTURE SPEC

### Stack

```
Framework:     Vite 5 + React 18 + TypeScript
Styling:       Tailwind CSS 3 with Crowe custom tokens (see below)
Animation:     Framer Motion (layout, page transitions, stagger)
               Anime.js v4 (scroll-triggered, countUp, hero sequences)
UI Primitives: Shadcn/ui
Components:    ReactBits + 21st.dev (per COMPONENTS-NEEDED.md)
Fonts:         Helvetica Now Display (display) / Helvetica Now Text (body)
               Fallback: Plus Jakarta Sans, Arial, system-ui
Export:        Vite build → single HTML (all assets base64-inlined via vite-plugin-singlefile)
PDF:           Puppeteer headless print (scripts/export-pdf.ts)
```

---

### Project Structure

```
[project-name]/
├── public/
│   ├── images/          ← drop generated images here
│   ├── logos/           ← drop downloaded logos here
│   └── fonts/           ← Helvetica Now woff2 files if licensed
├── src/
│   ├── data/
│   │   ├── slides.ts    ← ALL slide content, zero hardcoded strings in components
│   │   ├── config.ts    ← deck metadata (title, client, theme, slide count)
│   │   └── types.ts     ← TypeScript types for all slide data shapes
│   ├── components/
│   │   ├── slides/      ← one file per slide type
│   │   ├── chrome/      ← SlideNav, ProgressBar, SlideCounter, ThemeToggle
│   │   └── ui/          ← shared primitives
│   ├── hooks/
│   │   ├── useSlideNav.ts
│   │   └── useKeyboardNav.ts
│   ├── lib/
│   │   └── utils.ts
│   ├── App.tsx
│   └── main.tsx
├── scripts/
│   └── export-pdf.ts
├── AGENT.md
├── DESIGN.md
├── tailwind.config.ts
├── vite.config.ts
└── package.json
```

---

### Data Layer Rule (CRITICAL)

**Zero hardcoded strings in components.** All content comes from `/src/data/slides.ts`.

```typescript
export const slides: Slide[] = [
  {
    id: "hero",
    type: "hero",
    headline: "Compliance AI for the Modern Credit Union",
    subheadline: "From alert triage to exam response — AI-native workflows",
    eyebrow: "CONFIDENTIAL · FOR EMPOWER CU · MARCH 2026",
    background: "/images/hero-bg.jpg",
  },
  // ...
]
```

---

### Crowe Design Tokens

```typescript
// tailwind.config.ts — theme.extend.colors
colors: {
  'crowe-blue':          '#0075C9',
  'crowe-blue-dark':     '#0050AD',
  'crowe-blue-light':    '#32A8FD',
  'crowe-coral':         '#E5376B',
  'crowe-coral-dark':    '#992A5C',
  'crowe-amber':         '#F5A800',
  'crowe-amber-dark':    '#D7761D',
  'crowe-indigo':        '#002E62',
  'crowe-indigo-bright': '#003F9F',
  'crowe-indigo-dark':   '#011E41',
  'tint': {
    50:  '#F6F7FA',
    300: '#C8CBD6',
    500: '#8B90A0',
    700: '#545968',
    900: '#2D3142',
    950: '#1A1D2B',
  },
},
fontFamily: {
  display: ['Helvetica Now Display', 'Plus Jakarta Sans', 'Arial', 'system-ui', 'sans-serif'],
  body:    ['Helvetica Now Text',    'Plus Jakarta Sans', 'Arial', 'system-ui', 'sans-serif'],
  mono:    ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
},
```

---

### CSS Variables

```css
:root {
  --slide-bg:                  #011E41;
  --slide-text:                #F6F7FA;
  --slide-text-secondary:      #C8CBD6;
  --slide-text-muted:          #8B90A0;
  --slide-surface-card:        rgba(255,255,255,.04);
  --slide-surface-card-hover:  rgba(255,255,255,.08);
  --slide-border:              rgba(255,255,255,.08);
  --slide-border-strong:       rgba(255,255,255,.16);
  --slide-badge-outline-border:rgba(255,255,255,.5);
  --slide-badge-bg:            rgba(255,255,255,.12);
  --slide-icon-muted:          rgba(246,247,250,.4);
  --slide-chrome-muted:        rgba(246,247,250,.45);
  --slide-chrome-disabled:     rgba(246,247,250,.15);
  --slide-progress-track:      rgba(255,255,255,.08);
}

[data-theme="light"] {
  --slide-bg:                  #F8F9FC;
  --slide-text:                #011E41;
  --slide-text-secondary:      #545968;
  --slide-text-muted:          #6B7280;
  --slide-surface-card:        rgba(1,30,65,.04);
  --slide-surface-card-hover:  rgba(1,30,65,.07);
  --slide-border:              rgba(1,30,65,.1);
  --slide-border-strong:       rgba(1,30,65,.18);
  --slide-badge-outline-border:rgba(1,30,65,.45);
  --slide-badge-bg:            rgba(1,30,65,.08);
  --slide-icon-muted:          rgba(1,30,65,.4);
  --slide-chrome-muted:        rgba(1,30,65,.45);
  --slide-chrome-disabled:     rgba(1,30,65,.15);
  --slide-progress-track:      rgba(1,30,65,.1);
}
```

---

### Vite Config (Single HTML Export)

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 100_000_000,
    cssCodeSplit: false,
  },
})
```

---

### Keyboard Navigation

```typescript
// src/hooks/useKeyboardNav.ts
export function useKeyboardNav(total: number) {
  const [current, setCurrent] = useState(0)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown')
        setCurrent(c => Math.min(c + 1, total - 1))
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp')
        setCurrent(c => Math.max(c - 1, 0))
      if (e.key === 'f')
        document.fullscreenElement
          ? document.exitFullscreen()
          : document.documentElement.requestFullscreen()
      if (e.key === 't')
        document.documentElement.dataset.theme =
          document.documentElement.dataset.theme === 'light' ? '' : 'light'
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [total])
  return { current, setCurrent, total }
}
```

---

### Animation Strategy

Vary the motion pattern per deck. Pick one dominant strategy and execute it
consistently. Never use all patterns in one deck.

| Pattern | When to use | Libraries |
|---------|-------------|-----------|
| Staggered card reveal (bottom-up fade) | Data-heavy, analytical | Framer Motion `staggerChildren` |
| Word-by-word text split | Story-driven, editorial | ReactBits `SplitText` |
| Kinetic number countUp | Stats-heavy | ReactBits `CountUp` or Anime.js |
| Slide wipe (horizontal clip) | Product walkthroughs | Framer Motion `clipPath` |
| Scale + blur entrance | Luxury, executive | Framer Motion `scale` + `filter` |
| Particle / aurora ambient | Hero backgrounds | CSS keyframes or ReactBits `Particles` |
| Magnetic / physics hover | Interactive demos | ReactBits hover components |

---

## PHASE 4 — QUALITY CHECKLIST

### Brand & Design
- [ ] All text uses `font-display` or `font-body` — no system font fallbacks visible
- [ ] Crowe color tokens used — no hardcoded hex values outside `tailwind.config.ts`
- [ ] Dark/light theme toggle works; all elements switch cleanly
- [ ] Logo appears correctly on both themes (white on dark, color on light)
- [ ] Slide padding consistent: `px-16 py-12` on standard slides
- [ ] Progress bar and slide counter visible on all slides
- [ ] No slide exceeds the viewport — no scrollbars

### Content & Data
- [ ] No content strings hardcoded in JSX — all from `src/data/slides.ts`
- [ ] All stats include sources
- [ ] No lorem ipsum or "TBD" in the delivered deck
- [ ] Call to action slide has a clear, specific ask

### Technical
- [ ] `vite build` exits 0, zero errors
- [ ] Output is a single HTML file, all assets inlined
- [ ] Keyboard navigation works: ← → arrows, `f` fullscreen, `t` theme
- [ ] No console errors on load in Chrome
- [ ] Opens correctly when sent as email attachment (no server needed)
- [ ] PDF export captures all slides without animation artifacts

### Performance
- [ ] File size < 50MB (audit for uncompressed images if over)
- [ ] First slide renders immediately
- [ ] Slide transitions < 400ms

---

## COMPONENT REGISTRY

### ReactBits (https://www.reactbits.dev)

| Component | Slug | Best for |
|-----------|------|----------|
| SplitText | `SplitText` | Hero titles, section headers — word/char reveal |
| BlurText | `BlurText` | Subheadings that fade in from blur |
| GradientText | `GradientText` | Accent headlines, stat labels |
| ShimmerButton | `ShimmerButton` | CTA buttons |
| MagneticButton | `MagneticButton` | Interactive nav or CTA |
| TiltCard | `TiltCard` | Feature/capability cards with 3D hover |
| Aurora | `Aurora` | Hero section ambient background |
| Particles | `Particles` | Hero or divider backgrounds |
| CountUp | `CountUp` | Animated stat numbers |
| AnimatedNumber | `AnimatedNumber` | Precision number animation with decimals |
| Marquee | `Marquee` | Logo cloud, scrolling partner logos |
| SpotlightCard | `SpotlightCard` | Cards with cursor-tracked spotlight glow |
| AnimatedList | `AnimatedList` | List items that animate in on reveal |
| Ribbons | `Ribbons` | Animated stripe/ribbon background |
| TextPressure | `TextPressure` | Bold display type that responds to cursor |

### 21st.dev (https://21st.dev)

Install: `npx shadcn@latest add "https://21st.dev/r/[component-path]"`

| Component | Search term | Best for |
|-----------|-------------|----------|
| Animated beam | `animated-beam` | Connecting nodes, flow diagrams |
| Bento grid | `bento-grid` | Feature/capability grids |
| Timeline | `timeline` | Process flows, roadmaps |
| Number ticker | `number-ticker` | CountUp alternative |
| Border beam | `border-beam` | Animated border on cards |
| Word rotate | `word-rotate` | Headline that cycles through words |
| Typing animation | `typing-animation` | Typewriter title effect |
| Blur fade in | `blur-fade-in` | Standard entrance animation |
| Orbit | `orbit` | Circular rotating elements |

---

## DESIGN VARIATION GUIDE

| Vibe | Layout pattern | Motion strategy | Accent | Card treatment |
|------|----------------|-----------------|--------|----------------|
| Executive / luxury | Wide margins, 1 idea per slide | Scale + blur, slow | Amber | Borderless, generous spacing |
| Data / analytical | Dense info grids, bento layouts | Stagger reveal, countUp | Blue | Subtle border, low-opacity bg |
| Product demo | Left rail nav, content pane right | Slide wipe, step sequence | Blue | Clean, UI-style |
| Regulatory / risk | Two-column text heavy, structured | Fade up, minimal motion | Coral | Outlined, formal |
| Workshop / interactive | Tab/toggle panels, diagram slides | Physics hover, magnetic | Amber | Elevated shadow, hover glow |
| Story / editorial | Full-bleed images, large type | Word split, cinematic | Coral | Overlay only, no outlines |

---

## FONT NOTES

- **Licensed Helvetica Now:** Place woff2 files in `/public/fonts/`, reference via `@font-face`. Inlined by viteSingleFile on build.
- **Unlicensed fallback:** Use `'Plus Jakarta Sans'` (Google Fonts) — closest acceptable substitute.
- **Never** use Inter as a display font.

---

## SYNTHETIC DOCUMENT STANDARDS

For fake supporting materials in slides (MRAs, exam findings, validation excerpts):

- Real regulatory language: SR 11-7, FFIEC examination manual terminology
- Real examiner phrasings: "examiner noted", "institution is directed to", "within 90 days"
- Real finding structure: Condition / Cause / Criteria / Effect / Recommendation
- Plausible fictional institution names: "Lakeshore Community Bank", "Northfield Federal Credit Union"
- Never: "ACME Bank" or obviously synthetic names
