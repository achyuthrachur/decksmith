# decksmith Setup Instructions

## What is decksmith?

decksmith is a tool that gives AI coding agents (Claude Code and Codex CLI) the full capability to build polished, Crowe-branded HTML presentation decks. It has two parts:

1. **A CLI** — installs and manages the skill library for your agents
2. **An MCP server** — gives agents live tools they can call during a session (`deck_scaffold`, `deck_interview`, `deck_quality_check`, etc.)

Once installed, you type `/deck` in Claude Code (or reference `@instructions/deck.md` in Codex) and the agent walks you through building a deck from scratch — interview, asset planning, scaffolding, and quality check — without any manual setup per project.

---

## Prerequisites

- Windows machine
- [Node.js 20+](https://nodejs.org) installed
- [Git](https://git-scm.com) installed
- [Claude Code](https://claude.ai/code) and/or [Codex CLI](https://github.com/openai/codex) installed
- PowerShell (built into Windows — no install needed)

---

## Install — One Command

Open PowerShell and run:

```powershell
irm https://raw.githubusercontent.com/achyuthrachur/decksmith/main/install.ps1 | iex
```

That's it. The script does everything:

| Step | What happens |
|------|-------------|
| 1 | Clones the decksmith repo to `~/.decksmith` |
| 2 | Builds and installs the `decksmith` CLI globally |
| 3 | Registers the MCP server with Claude Code and Codex |
| 4 | Syncs all 8 skills to both agents |

Total time: ~15 seconds.

---

## After Install

**Restart Claude Code and Codex** to pick up the new MCP server and skills.

Then verify:

```powershell
decksmith --version    # should print 1.0.0
decksmith skills list  # should show 8 skills
```

---

## Starting a New Deck

**In Claude Code:**
Type `/deck` at the start of any session. The kickoff prompt autofills and the interview begins immediately.

**In Codex:**
At the start of a session, reference: `@instructions/deck.md`

Both routes walk through a 5-block interview before writing any code:
- Block A: Deck foundation (purpose, audience, theme)
- Block B: Narrative and content
- Block C: Visual direction and slide types
- Block D: Asset inventory (logos, images)
- Block E: Confirm the Deck Plan

No files are touched until the plan is confirmed.

---

## What Gets Installed

### Skills (8 total)
Markdown files loaded into the agent's context at the start of every session.

| Skill | Location | Description |
|-------|----------|-------------|
| `deck-builder` | `.claude/skills/deck-builder/SKILL.md` | Full deck-building workflow |
| `crowe-brand` | `.claude/skills/crowe-brand/SKILL.md` | Crowe brand standards |
| `animation-components` | `.claude/skills/animation-components/SKILL.md` | Anime.js, Framer Motion, ReactBits |
| `architecture` | `.claude/skills/architecture/SKILL.md` | Folder structure, state, APIs |
| `deployment` | `.claude/skills/deployment/SKILL.md` | Vercel, GitHub Actions |
| `frontend` | `.claude/skills/frontend/SKILL.md` | React, Tailwind, shadcn/ui |
| `qa` | `.claude/skills/qa/SKILL.md` | Testing, linting, quality gates |
| `tech-stack` | `.claude/skills/tech-stack/SKILL.md` | Stack choices, config |

Codex gets the same skills at `~/.codex/skills/`.

### MCP Server
Registered globally. Gives agents 11 resources, 4 tools, and 1 prompt they can call during a session.

**Resources** — reference design system data:
- `crowe://design-tokens` — Crowe color tokens and CSS variables
- `crowe://component-registry` — ReactBits + 21st.dev component list
- `crowe://slide-types` — TypeScript types for all slide shapes
- `crowe://templates/agent-md` — AGENT.md template
- `crowe://templates/design-md` — DESIGN.md template
- `crowe://templates/tailwind-config` — Full tailwind.config.ts
- `crowe://templates/vite-config` — vite.config.ts (single-file build)
- `crowe://templates/pdf-export` — Puppeteer PDF export script
- `crowe://templates/keyboard-nav` — useKeyboardNav hook
- `crowe://design-variation-guide` — Vibe → layout/motion/accent table
- `crowe://motion-patterns` — Animation strategy reference with code

**Tools** — actions the agent can take:
- `deck_scaffold` — creates a complete Vite + React + TypeScript deck project
- `deck_generate_asset_docs` — generates component, logo, image, and content planning docs from interview answers
- `deck_quality_check` — validates a project against the full quality checklist
- `deck_get_kickoff_prompt` — returns the correct session-start prompt per agent and mode

**Prompt:**
- `deck_interview` — the 5-block interview protocol (full / content-only / visual-only)

### Slash Command (Claude Code only)
`/deck` — written to `~/.claude/commands/deck.md`. Autofills the kickoff prompt when typed.

### Kickoff Prompt (Codex only)
Written to `~/.codex/instructions/deck.md`. Reference with `@instructions/deck.md`.

---

## Updating

Re-run the same install command to update:

```powershell
irm https://raw.githubusercontent.com/achyuthrachur/decksmith/main/install.ps1 | iex
```

The script detects the existing install at `~/.decksmith`, pulls the latest, rebuilds, and re-syncs skills. Restart Claude Code / Codex after updating.

---

## Installing for One Agent Only

By default the script sets up both Claude Code and Codex. To set up only one:

```powershell
# Claude Code only
$env:DECKSMITH_AGENT = "claude"
irm https://raw.githubusercontent.com/achyuthrachur/decksmith/main/install.ps1 | iex

# Codex only
$env:DECKSMITH_AGENT = "codex"
irm https://raw.githubusercontent.com/achyuthrachur/decksmith/main/install.ps1 | iex
```

---

## Manual Setup (if the one-liner fails)

```powershell
git clone https://github.com/achyuthrachur/decksmith.git $env:USERPROFILE\.decksmith
cd $env:USERPROFILE\.decksmith
npm config set strict-ssl false
npm install
npm install -g .
decksmith register --claude
decksmith register --codex
decksmith skills sync --claude --force
decksmith skills sync --codex --force
```

---

## MCP Configuration Reference

The installer writes these automatically. For reference:

**Claude Code** (`~/.claude.json`):
```json
{
  "mcpServers": {
    "decksmith": { "command": "decksmith" }
  }
}
```

**Codex** (`~/.codex/config.toml`):
```toml
[mcp_servers.decksmith]
command = "decksmith"
args = []
```

---

## Troubleshooting

**`decksmith` not found after install**
Close and reopen PowerShell. The global npm bin path needs a fresh shell to be recognized.

**Skills sync shows FAILED / fetch errors**
This is an SSL proxy issue on the Crowe network. The install script copies skills from the local clone so this shouldn't occur. If running `decksmith skills sync` manually, prefix with:
```powershell
$env:NODE_TLS_REJECT_UNAUTHORIZED = "0"
decksmith skills sync --claude --force
```

**MCP server not showing in Claude Code**
Confirm `~/.claude.json` has the `mcpServers.decksmith` entry, then fully quit and relaunch Claude Code (not just a new window).

**`/deck` command not appearing in Claude Code**
Confirm `~/.claude/commands/deck.md` exists. If not, run `decksmith register --claude --force`.

---

## Source

GitHub: [achyuthrachur/decksmith](https://github.com/achyuthrachur/decksmith)
