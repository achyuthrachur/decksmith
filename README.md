# decksmith

MCP server + skills sync CLI for Crowe-branded HTML presentation decks.
Works with Claude Code, Codex CLI, Cursor, and any stdio MCP client.

---

## Install (one-time, global)

```bash
npm install -g github:achyuthrachur/decksmith
decksmith --version
```

> The `dist/` folder is pre-built in the repo — no compile step needed on install.

---

## Setup for Claude Code

**Step 1 — Sync skills** (loads deck-builder + 7 other skills into Claude's context):
```bash
decksmith skills sync --claude
```
Installs to: `AI Coding Projects/.claude/skills/`
Then restart Claude Code.

**Step 2 — Register MCP server** (gives Claude the `deck_*` tools and `crowe://` resources):

Global — add to `~/.claude.json`:
```json
{
  "mcpServers": {
    "decksmith": { "command": "decksmith" }
  }
}
```

Or per-project — add to `.claude/settings.json` in the project root:
```json
{
  "mcpServers": {
    "decksmith": { "command": "decksmith" }
  }
}
```

Then restart Claude Code.

---

## Setup for Codex CLI

**Step 1 — Sync skills** (loads deck-builder + 7 other skills into Codex's context):
```bash
decksmith skills sync --codex
```
Installs to: `~/.codex/skills/`
Includes `SKILL.md` + `agents/openai.yaml` per skill.
Then restart Codex.

**Step 2 — Register MCP server** (gives Codex the `deck_*` tools and `crowe://` resources):

Global — add to `~/.codex/config.toml`:
```toml
[mcp_servers.decksmith]
command = "decksmith"
args = []
```

Or per-project — add to `.codex/config.toml` in the project root:
```toml
[mcp_servers.decksmith]
command = "decksmith"
args = []
```

Then restart Codex.

---

## Setup for Cursor

Cursor uses MCP only (no skills system). Add to `.cursor/mcp.json`:
```json
{
  "mcpServers": {
    "decksmith": { "command": "decksmith", "args": [] }
  }
}
```

---

## Verify

```bash
# CLI works
decksmith --version
decksmith skills list

# MCP server starts (Ctrl+C to exit)
npx @modelcontextprotocol/inspector decksmith
# Should show: 11 resources, 4 tools, 1 prompt
```

---

## What each part gives you

| | Skills sync | MCP server |
|---|---|---|
| **What it is** | Markdown files loaded into agent context at session start | Live tools/resources the agent can call during a session |
| **Claude path** | `AI Coding Projects/.claude/skills/` | `~/.claude.json` or `.claude/settings.json` |
| **Codex path** | `~/.codex/skills/` | `~/.codex/config.toml` or `.codex/config.toml` |
| **What you get** | The agent knows the full deck-building workflow without being told | `deck_scaffold`, `deck_interview`, `crowe://design-tokens`, etc. |
| **When to re-run** | After `decksmith` updates (`--force` to overwrite) | One-time registration |

---

## Skills included

| Skill | Description |
|-------|-------------|
| `animation-components` | Anime.js v4, Framer Motion, ReactBits, 21st.dev |
| `architecture` | Folder structure, state, DB, API design |
| `crowe-brand` | Crowe LLP brand standards: colors, type, logo, voice |
| `deck-builder` | HTML deck builder: interview, scaffold, quality check |
| `deployment` | Vercel, Cloudflare Pages, GitHub Actions |
| `frontend` | React, Next.js, Tailwind, shadcn/ui |
| `qa` | Testing, linting, quality gates, accessibility |
| `tech-stack` | Stack choices, dependencies, config |

---

## MCP primitives

**Resources** (11) — read via `crowe://` URIs:
| URI | Contents |
|-----|----------|
| `crowe://design-tokens` | Tailwind config + CSS variables (empower-deck v3.3) |
| `crowe://component-registry` | ReactBits + 21st.dev components with slide mappings |
| `crowe://slide-types` | TypeScript types for all slide data shapes |
| `crowe://templates/agent-md` | AGENT.md template |
| `crowe://templates/design-md` | DESIGN.md template |
| `crowe://templates/tailwind-config` | Full tailwind.config.ts with Crowe tokens |
| `crowe://templates/vite-config` | vite.config.ts (viteSingleFile) |
| `crowe://templates/pdf-export` | Puppeteer PDF export script |
| `crowe://templates/keyboard-nav` | useKeyboardNav.ts hook |
| `crowe://design-variation-guide` | Vibe → layout/motion/accent decision table |
| `crowe://motion-patterns` | Animation strategy reference with code examples |

**Tools** (4):
- `deck_scaffold` — creates a complete Vite+React+TS deck project at a given path
- `deck_generate_asset_docs` — generates COMPONENTS-NEEDED, LOGOS-NEEDED, IMAGE-PROMPTS, CONTENT-LAYER from interview answers
- `deck_quality_check` — validates a project against the full quality checklist
- `deck_get_kickoff_prompt` — returns the correct session-start prompt per mode × agent

**Prompts** (1):
- `deck_interview` — 5-block interview protocol, modes: `full` / `content_only` / `visual_only`

---

## Start a new deck

Once registered, use this kickoff with your agent:

```
Call deck_get_kickoff_prompt (mode: "full", agent: "claude-code" or "codex").
Follow the instructions it returns.
```

---

## Sync flags

```bash
decksmith skills sync --claude [--skill <name>] [--dest <path>] [--force] [--dry-run] [--ref <branch>]
decksmith skills sync --codex  [--skill <name>] [--dest <path>] [--force] [--dry-run] [--ref <branch>]
decksmith skills list [--remote | --claude | --codex]
```

---

## Development

```bash
git clone github:achyuthrachur/decksmith
cd decksmith
npm install        # deps only, no build (dist/ is pre-built)
npm run build      # tsc → dist/ (only needed after src/ changes)
npm install -g .   # reinstall global from local build
```

To add a skill: create `skills/{name}/SKILL.md` + `skills/{name}/agents/openai.yaml`,
then add the entry to `src/data/skills-manifest.ts` and rebuild.
