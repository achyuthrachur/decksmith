export const agentMdUri = 'crowe://templates/agent-md';
export function getAgentMdContent() {
    return `# AGENT.md — [DECK NAME]

> Drop this file in the project root. Rename to CLAUDE.md for Claude Code,
> or leave as AGENT.md for Codex/Cursor. Fill in the [brackets].
> The agent reads this at the start of every session.

---

## Project

**Deck title:** [e.g., "Empower CU — Compliance AI Pitch"]
**Client / audience:** [e.g., "Empower Credit Union — CFO and Compliance team"]
**Deliverable:** Single-file HTML deck (\`dist/index.html\`) + optional PDF export
**Status:** [Scaffolding / In progress / Content pass / Final polish / Done]
**Path:** \`C:\\\\Users\\\\rachura\\\\OneDrive - Crowe LLP\\\\VS Code Programming Projects\\\\[project-folder]\\\\\`

---

## Stack

\`\`\`
Framework:     Vite 5 + React 18 + TypeScript
Styling:       Tailwind CSS 3 with Crowe tokens (see tailwind.config.ts)
Animation:     Framer Motion + Anime.js v4
               [LIST SPECIFIC PATTERNS CHOSEN FOR THIS DECK]
UI Components: Shadcn/ui + ReactBits + 21st.dev
               [LIST SPECIFIC COMPONENTS INSTALLED — update as you add them]
Fonts:         [Helvetica Now / Plus Jakarta Sans] (fallback: Arial, system-ui)
Build output:  vite-plugin-singlefile → dist/index.html (all assets inlined)
PDF export:    scripts/export-pdf.ts via Puppeteer
\`\`\`

---

## Design Direction

**Theme:** [Dark (default) / Light / Dual toggle]
**Accent color:** [Crowe Blue / Crowe Coral / Crowe Amber]
**Vibe:** [Executive/Luxury / Data-Analytical / Product Demo / Regulatory / Story-Editorial]
**Motion strategy:** [ONE dominant pattern, e.g. "staggered bottom-up card reveal + countUp for stats"]
**Layout pattern:** [e.g., "wide margins, 1 idea per slide, borderless cards"]

See DESIGN.md for full visual decisions.

---

## Architecture Rules

### Data Layer
- ALL slide content lives in \`src/data/slides.ts\` as typed \`Slide[]\`
- ALL config (deck title, client, theme default, slide count) in \`src/data/config.ts\`
- Zero hardcoded content strings in JSX — components receive only typed props
- Adding or editing a slide = editing \`slides.ts\` only, zero component changes needed

### Component Rules
- One file per slide type in \`src/components/slides/\`
- Chrome elements (nav, progress, counter) in \`src/components/chrome/\`
- Shared primitives in \`src/components/ui/\`
- No component reads from any source other than its props
- No inline styles — Tailwind classes only (with \`cn()\` for conditional classes)

### Naming Conventions
\`\`\`
src/data/slides.ts          ← Slide[] array export, named \`slides\`
src/data/config.ts          ← DeckConfig export, named \`config\`
src/data/types.ts           ← All TypeScript types/interfaces
src/components/slides/      ← PascalCase: HeroSlide.tsx, StatGridSlide.tsx
src/components/chrome/      ← PascalCase: SlideNav.tsx, ProgressBar.tsx
src/hooks/                  ← camelCase: useKeyboardNav.ts, useSlideNav.ts
\`\`\`

---

## Slide Types in This Deck

> Update this section as the deck is built.

| Slide type | File | Data shape | Status |
|------------|------|------------|--------|
| \`hero\` | \`HeroSlide.tsx\` | \`HeroSlide\` | [ ] |
| \`section-divider\` | \`SectionDividerSlide.tsx\` | \`SectionDividerSlide\` | [ ] |
| \`stat-grid\` | \`StatGridSlide.tsx\` | \`StatGridSlide\` | [ ] |
| [add more] | | | |

---

## Asset Inventory

### Images
| File | Slide | Status |
|------|-------|--------|
| \`public/images/hero-bg.jpg\` | Hero | [ ] Generated / [ ] Placed |

### Logos
| File | Appears on | Status |
|------|-----------|--------|
| \`public/logos/crowe.svg\` | All slides (footer chrome) | [ ] |

---

## Installed Components

### ReactBits
\`\`\`bash
# [list each install command used]
\`\`\`

### 21st.dev
\`\`\`bash
# [list each npx shadcn@latest add "..." command used]
\`\`\`

### Other deps added
\`\`\`bash
# npm install -D vite-plugin-singlefile
# npm install -D puppeteer tsx
\`\`\`

---

## Build Commands

\`\`\`bash
npm run dev          # local dev server
npm run build        # production build → dist/index.html (singlefile)
npx serve dist       # verify build locally
npx tsx scripts/export-pdf.ts   # export PDF
\`\`\`

---

## Environment Notes

- Windows + Git Bash; corporate SSL proxy on Crowe network
- If npm fails on VPN: \`npm config set strict-ssl false\` (temporary)
- No admin rights — all installs at user scope
- \`gh repo create achyuthrachur/[repo-name] --public --source=. --remote=origin --push\`

---

## Correctness Standards

- [ ] \`npm run build\` exits 0, zero errors
- [ ] \`dist/index.html\` is a single self-contained file
- [ ] All content comes from \`src/data/slides.ts\` — no hardcoded strings in JSX
- [ ] Dark and light themes both render correctly across all slides
- [ ] Keyboard navigation works (← →, \`f\` fullscreen, \`t\` theme toggle)
- [ ] Slide counter and progress bar visible on all slides
- [ ] No console errors in Chrome DevTools on load
- [ ] All logos display correctly (white on dark, color on light)
- [ ] PDF export captures all slides without mid-animation artifacts
- [ ] File opens and runs correctly when sent as email attachment

---

## What NOT to Do

- Do not hardcode slide content in JSX — ever
- Do not add inline \`style={{}}\` when a Tailwind class exists
- Do not use \`any\` TypeScript type
- Do not pull a component from a library without adding it to Installed Components
- Do not start the next slide until the previous one passes the quality checklist
- Do not make the deck look like the last deck — vary layouts and motion patterns
- Do not use Inter as a display font
- Do not use purple gradient on white

---

## Session Continuity

At the start of each new session:
1. Re-read this file
2. Re-read DESIGN.md
3. Check which slides in the table above are not yet marked done
4. Continue from the first incomplete slide

---

## Reference

Skill documentation: \`DECK-SKILL.md\` (or \`crowe://deck-builder\` if decksmith MCP is installed)
Visual design decisions: \`DESIGN.md\`
Slide content source of truth: \`src/data/slides.ts\`
`;
}
//# sourceMappingURL=agent-md.js.map