import { z } from 'zod'

export const kickoffPromptSchema = z.object({
  mode:  z.enum(['full', 'content_only', 'visual_only']).describe(
    'Build mode: full (new deck from scratch), content_only (update slide content only), visual_only (redesign without content changes)'
  ),
  agent: z.enum(['claude-code', 'codex', 'cursor', 'generic']).default('generic').describe(
    'Target agent — returns the correct syntax and file references for this agent'
  ),
})

export type KickoffPromptInput = z.infer<typeof kickoffPromptSchema>

export async function runKickoffPrompt(input: KickoffPromptInput): Promise<string> {
  const { mode, agent } = input

  const agentInstructions: Record<string, string> = {
    'claude-code': `
**Agent setup:**
- Read CLAUDE.md first (if present), then AGENT.md
- MCP resources available via \`crowe://\` URIs (use Read resource tool)
- Use \`deck_interview\` prompt to start, \`deck_scaffold\` to scaffold, \`deck_quality_check\` to validate
`.trim(),
    'codex': `
**Agent setup:**
- Read AGENT.md first, then DESIGN.md
- MCP resources available via \`crowe://\` URIs
- Use \`deck_interview\` prompt to start, \`deck_scaffold\` to scaffold, \`deck_quality_check\` to validate
- Skills installed at ~/.codex/skills/ — load deck-builder skill if available
`.trim(),
    'cursor': `
**Agent setup:**
- Read .cursorrules or AGENT.md at project root
- MCP resources available via \`crowe://\` URIs (registered in .cursor/mcp.json)
- Use \`deck_interview\` prompt to start, \`deck_scaffold\` to scaffold
`.trim(),
    'generic': `
**Agent setup:**
- Read AGENT.md at project root before anything else
- MCP resources available via \`crowe://\` URIs if decksmith MCP is registered
- Use \`deck_interview\` prompt to start the session
`.trim(),
  }

  const modeSection: Record<string, string> = {
    full: `
## MODE: Full Build (new deck from scratch)

**Phase sequence:**
1. Run the \`deck_interview\` prompt (mode: "full") — complete all 5 blocks before touching any file
2. Produce the 4 asset elicitation documents (COMPONENTS-NEEDED, LOGOS-NEEDED, IMAGE-PROMPTS, CONTENT-LAYER)
3. Wait for confirmation that assets are placed
4. Run \`deck_scaffold\` to create the project structure
5. Build slide components one at a time — start with HeroSlide, validate it before moving on
6. Run \`deck_quality_check\` before declaring done

**Critical constraints:**
- Zero hardcoded content strings in JSX — all content from \`src/data/slides.ts\`
- Token values must match empower-deck v3.3 (read \`crowe://design-tokens\` for reference)
- Pick ONE animation pattern and execute it consistently — never mix 3+ patterns
- Every \`.ts/.tsx\` file must be valid TypeScript — no \`any\` types, no placeholder comments
`.trim(),

    content_only: `
## MODE: Content Only (update slide content, no visual changes)

**Instructions:**
1. Read AGENT.md and DESIGN.md — understand the existing design decisions
2. Read the current \`src/data/slides.ts\` — understand the data schema
3. Read the current \`src/data/config.ts\` — note theme, accent, client
4. Make ALL content changes in \`src/data/slides.ts\` only
5. Do NOT touch any component files in \`src/components/\`
6. After edits: run \`npm run build\` and verify \`dist/index.html\` renders correctly

**What to edit:**
- \`src/data/slides.ts\` — all slide content, headlines, stats, copy
- \`src/data/config.ts\` — if deck title or client changed

**What NOT to touch:**
- Any file in \`src/components/\`
- \`tailwind.config.ts\`, \`vite.config.ts\`
- \`src/index.css\`
`.trim(),

    visual_only: `
## MODE: Visual Only (redesign without content changes)

**Instructions:**
1. Read AGENT.md and DESIGN.md — understand what's changing and why
2. Read current slide components to understand existing structure
3. Do NOT touch \`src/data/slides.ts\` — content is frozen
4. Redesign slide components, animation patterns, and/or theme

**Design variation guide:** Read \`crowe://design-variation-guide\` — pick a new vibe
**Motion patterns:** Read \`crowe://motion-patterns\` — pick a different dominant pattern
**Component options:** Read \`crowe://component-registry\` — swap components

**Rules:**
- All content must still come from the existing slides.ts data shapes
- TypeScript types in \`src/data/types.ts\` define the contract — do not break it
- After redesign: run \`deck_quality_check\` to verify brand compliance
`.trim(),
  }

  return `# Decksmith Session Kickoff

${agentInstructions[agent]}

---

${modeSection[mode]}

---

## Reference Resources (read as needed)

| Resource | URI | When to read |
|----------|-----|--------------|
| Design tokens | \`crowe://design-tokens\` | Before writing any Tailwind config or CSS |
| Component registry | \`crowe://component-registry\` | When selecting UI components |
| Slide types (TypeScript) | \`crowe://slide-types\` | When defining data shapes |
| AGENT.md template | \`crowe://templates/agent-md\` | When scaffolding (auto-applied by deck_scaffold) |
| DESIGN.md template | \`crowe://templates/design-md\` | After interview — fill this in |
| tailwind.config template | \`crowe://templates/tailwind-config\` | Scaffold step |
| vite.config template | \`crowe://templates/vite-config\` | Scaffold step |
| Keyboard nav hook | \`crowe://templates/keyboard-nav\` | Scaffold step |
| PDF export script | \`crowe://templates/pdf-export\` | Final delivery |
| Design variation guide | \`crowe://design-variation-guide\` | Visual direction decisions |
| Motion patterns | \`crowe://motion-patterns\` | Animation implementation |

---

## Quality Gate

Before declaring the deck done, run \`deck_quality_check\` and ensure:
- 0 failing items in Brand & Design category
- 0 failing items in Technical category
- All stats have sources
- \`npm run build\` exits 0
- \`dist/index.html\` opens in Chrome without console errors
`
}
