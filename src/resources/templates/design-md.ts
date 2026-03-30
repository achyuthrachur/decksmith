export const designMdUri = 'crowe://templates/design-md'

export function getDesignMdContent(): string {
  return `# DESIGN.md — [DECK NAME]

> Visual design decisions for this specific deck.
> The agent reads this alongside AGENT.md at the start of every session.
> Do not infer design decisions not documented here — ask first.

---

## Visual Identity

| Decision | Value |
|----------|-------|
| Background color | \`#011E41\` (crowe-indigo-dark) |
| Primary accent | \`#0075C9\` (crowe-blue) |
| Secondary accent | [crowe-coral / crowe-amber / none] |
| Surface card | \`rgba(255,255,255,.04)\` |
| Border | \`rgba(255,255,255,.08)\` |
| Default theme | Dark |
| Theme toggle | [Yes / No] |

---

## Typography Scale

| Role | Font | Size | Weight | Class |
|------|------|------|--------|-------|
| Deck title (hero) | Helvetica Now Display | 72–80px | 700 | \`font-display text-7xl font-bold\` |
| Slide headline | Helvetica Now Display | 48–56px | 700 | \`font-display text-5xl font-bold\` |
| Section label | Helvetica Now Display | 36px | 700 | \`font-display text-4xl font-bold\` |
| Body / supporting text | Helvetica Now Text | 18–20px | 400 | \`font-body text-lg\` |
| Stat value | Helvetica Now Display | 56–72px | 700 | \`font-display text-6xl font-bold\` |
| Stat label | Helvetica Now Text | 14px | 400 | \`font-body text-sm\` |
| Badge / eyebrow | Helvetica Now Text | 11–12px | 500 | \`font-body text-xs tracking-widest uppercase\` |
| Source / footnote | Helvetica Now Text | 11px | 400 | \`font-body text-xs text-tint-500\` |

---

## Layout System

**Slide viewport:** 1440 × 810px (16:9)
**Slide padding:** \`px-16 py-12\` (standard content slides)
**Hero padding:** \`px-16\` with vertical centering
**Section divider padding:** \`px-16 py-16\`
**Grid columns:** [e.g., "2-col 55/45 split for content slides"]
**Card gap:** \`gap-6\` (standard), \`gap-4\` (dense grids)

---

## Motion Decisions

**Dominant pattern:** [e.g., "staggered bottom-up fade — cards enter with 60ms stagger"]
**Slide transition:** [e.g., "Framer Motion AnimatePresence, y: 20→0 + opacity: 0→1, 300ms"]
**Hero sequence:** [e.g., "SplitText word-by-word 40ms stagger, then BlurText 200ms delay"]
**Stats:** [e.g., "CountUp on slide enter, 1200ms, easeOut"]
**Card hover:** [e.g., "TiltCard maxTilt 8° + border-beam on hover"]
**Background:** [e.g., "Aurora, 8s loop, 55% opacity"]
**Reduced motion:** disable all transitions, show end state

---

## Slide-by-Slide Layout Notes

### Slide 1 — Hero
- Full-bleed background image with \`rgba(1,30,65,.7)\` overlay
- Eyebrow badge top-left, \`tracking-widest uppercase text-xs\`
- Headline centered, 80px, SplitText word reveal
- Subhead centered, 20px, BlurText 300ms delay
- Aurora subtle drift behind image

### Slide 2 — [Section Divider]
- Large section number, \`text-9xl font-bold text-crowe-blue opacity-10\`
- Section label over it, \`text-6xl font-bold\`
- Tagline below, \`text-tint-300\`
- Horizontal rule \`bg-crowe-blue h-0.5 w-24 mb-8\`

### [Add remaining slides...]

---

## Card Styles

**Standard:**
\`\`\`
bg: var(--slide-surface-card)
border: 1px solid var(--slide-border)
border-radius: 12px
padding: p-7
\`\`\`

**Elevated:**
\`\`\`
bg: var(--slide-surface-card)
border: 1px solid var(--slide-border-strong)
border-radius: 16px
padding: p-7
box-shadow: 0 8px 32px rgba(0,0,0,.24)
\`\`\`

**Stat callout:**
\`\`\`
bg: transparent
border: 1px solid var(--slide-border)
border-radius: 12px
accent top-border: 2px crowe-blue
\`\`\`

---

## Color Usage Rules

| Element | Color |
|---------|-------|
| Primary CTA | \`bg-crowe-blue\` hover \`bg-crowe-blue-dark\` |
| Risk highlight | \`bg-crowe-coral\` |
| Warning highlight | \`bg-crowe-amber\` |
| Progress bar fill | \`bg-crowe-blue\` |
| Accent rule / divider | \`bg-crowe-blue h-0.5\` |
| Section number (bg) | \`text-crowe-blue opacity-10\` |
| Quote mark | \`text-crowe-coral text-9xl font-display\` |

---

## Logo Usage

- Dark slides: white SVG logo
- Light slides: full-color logo
- Co-branded: logos on same baseline, separated by \`bg-tint-500 w-px h-8\`
- Footer chrome: always white, \`h-8\`
- Never add drop shadow to SVG logos

---

## Aspect Ratio Enforcement

The deck is locked to 16:9. On screens wider or taller than 16:9 the remaining space fills with the slide background colour (dark navy bars — no stretching).

\`\`\`css
/* body */
body { display: flex; align-items: center; justify-content: center; margin: 0; }

/* deck container */
#deck {
  width:  min(100vw, calc(100vh * 16 / 9));
  height: min(100vh, calc(100vw * 9 / 16));
  position: relative; overflow: hidden; flex-shrink: 0;
}
\`\`\`

---

## Numbered List Style

Decorative section numbers (large pnum style): **single digit** — use \`1\`, \`2\`, \`3\`, never \`01\`, \`02\`, \`03\`.

Inline bullet list numbers (replacing circle badges):
\`\`\`
plain <div> — no border-radius, no background, no border
font-size: 22px; font-weight: 700; min-width: 26px; line-height: 1.4
colour: matches section accent (amber for Discover phase, teal for Build phase)
\`\`\`
Text paragraph alongside: \`margin-top: 0\` so first-line baseline aligns with the number.

---

## SVG Colour Rules

- **Never** use CSS custom properties (\`var(--amber)\`) inside SVG attribute values (\`fill=\`, \`stroke=\`). They are silently ignored in SVG attribute context.
- Use hardcoded \`rgba()\` values in SVG attributes.
- CSS vars work normally in inline \`style=""\` on HTML elements that wrap or overlay the SVG.

---

## HTML Entity Rules

- Em dash: always \`&mdash;\` — **never** insert a literal \`—\` character.
- Right arrow: \`&rarr;\` or \`&#x2192;\`
- Ampersand in HTML attributes / text: \`&amp;\`

Reason: PS1 scripts written as UTF-8 files are read by Windows PowerShell 5.x as ANSI/CP-1252, silently corrupting non-ASCII characters into mojibake (\`â€"\`) that survive undetected into the output HTML.

---

## Out of Scope for This Deck

- [e.g., "No interactive quiz elements"]
- [e.g., "No video embeds"]
- [e.g., "No presenter notes / speaker view"]
- [e.g., "No mobile responsive layout — 16:9 only"]
`
}
