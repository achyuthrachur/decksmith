# PRD: `decksmith` — MCP Server + Skills Sync

---

## Name

**`decksmith`** — recommended.

Evokes craft and intentionality. Short enough to type. Works as both command
name and metaphor. Pairs well as `@crowe/decksmith` if you ever scope it.

---

## What This Is

Two things in one package:

1. **A locally-installed MCP server** — makes the full Crowe deck-building
   capability available to any MCP-compatible coding agent (Claude Code, Codex
   CLI, Cursor, Windsurf) as native tools, resources, and prompts.

2. **A skills sync CLI** — two commands that install the Crowe skill library
   into the correct location and format for whichever agent you're using:
   - `decksmith skills sync --claude` → Claude Code format
   - `decksmith skills sync --codex`  → Codex format

Install once globally. Every agent, every project, gets the full system.

```bash
npm install -g github:achyuthrachur/decksmith
decksmith --version
```

---

## Model-Agnostic Design Principles

1. **stdio transport only.** Works with Claude Code, Codex CLI, Cursor, Windsurf,
   and any MCP client. Zero dependency on a specific model or host.

2. **No agent-specific API calls inside the server.** `decksmith` is a knowledge
   and scaffolding tool. The agent calling it brings its own model.

3. **`deck_scaffold` writes the right context file per agent.** `AGENT.md` is
   always written. Additionally: `CLAUDE.md` for Claude Code, `.codex/README.md`
   for Codex, `.cursorrules` for Cursor.

4. **`deck_get_kickoff_prompt` takes an `agent` param.** Returns the correct
   syntax and file references for the target agent.

5. **Tool descriptions use neutral language.** "The agent reads this" —
   no model names in tool descriptions or resource content.

6. **Skills have one canonical source, two install targets.** The `skills/`
   directory in this repo uses Codex format (SKILL.md + agents/openai.yaml).
   The sync command strips or preserves the `agents/` layer per target.

---

## Tech Stack

```
Runtime:       Node.js 20+ (LTS)
Language:      TypeScript 5
MCP SDK:       @modelcontextprotocol/sdk (latest)
Transport:     stdio
Schema:        Zod for all tool input validation
Build:         tsc → dist/
Entry:         dist/index.js  (#!/usr/bin/env node)
Binary name:   decksmith
```

---

## Project Structure

```
decksmith/
├── skills/                         ← canonical skill library (source of truth)
│   ├── animation-components/
│   │   ├── SKILL.md
│   │   └── agents/openai.yaml
│   ├── architecture/
│   │   ├── SKILL.md
│   │   └── agents/openai.yaml
│   ├── crowe-brand/
│   │   ├── SKILL.md
│   │   └── agents/openai.yaml
│   ├── deck-builder/               ← new skill, lives here
│   │   ├── SKILL.md
│   │   └── agents/openai.yaml
│   ├── deployment/
│   │   ├── SKILL.md
│   │   └── agents/openai.yaml
│   ├── frontend/
│   │   ├── SKILL.md
│   │   └── agents/openai.yaml
│   ├── qa/
│   │   ├── SKILL.md
│   │   └── agents/openai.yaml
│   └── tech-stack/
│       ├── SKILL.md
│       └── agents/openai.yaml
├── src/
│   ├── index.ts                    ← MCP server entry, registers all primitives
│   ├── cli/
│   │   ├── index.ts                ← CLI entry point (decksmith --version, skills sync)
│   │   └── skills-sync.ts          ← skills sync command implementation
│   ├── resources/
│   │   ├── design-tokens.ts
│   │   ├── component-registry.ts
│   │   ├── slide-types.ts
│   │   ├── vite-config.ts
│   │   ├── pdf-export.ts
│   │   ├── design-variation-guide.ts
│   │   ├── motion-patterns.ts
│   │   └── templates/
│   │       ├── agent-md.ts
│   │       ├── design-md.ts
│   │       ├── tailwind-config.ts
│   │       └── keyboard-nav.ts
│   ├── tools/
│   │   ├── scaffold.ts
│   │   ├── generate-asset-docs.ts
│   │   ├── quality-check.ts
│   │   └── kickoff-prompt.ts
│   ├── prompts/
│   │   └── interview.ts
│   └── data/
│       ├── crowe-tokens.ts
│       ├── components.ts
│       ├── skills-manifest.ts      ← list of all skills in the repo
│       └── quality-checklist.ts
├── docs/
│   ├── DECK-SKILL.md               ← full deck builder documentation
│   ├── DECK-CLAUDE-TEMPLATE.md     ← AGENT.md template for new deck projects
│   └── DESIGN-TEMPLATE.md          ← DESIGN.md template
├── package.json
├── tsconfig.json
└── README.md
```

---

## CLI: `decksmith skills sync`

This is the key addition to the PRD. Two commands, one for each agent.

### How It Works

The `skills/` directory in the decksmith repo is the single source of truth.
Every skill folder contains:
- `SKILL.md` — the skill content (works for both agents)
- `agents/openai.yaml` — Codex-specific interface metadata

The sync commands pull from the GitHub repo and install to the local machine:

```
--claude target:   C:\Users\RachurA\AI Coding Projects\.claude\skills\
--codex  target:   C:\Users\RachurA\.codex\skills\
```

The difference is **what gets installed**:
- `--claude` installs only `SKILL.md` per skill (Claude Code doesn't use agents/)
- `--codex` installs the full folder (SKILL.md + agents/openai.yaml)

---

### Command: `decksmith skills sync --claude`

```bash
decksmith skills sync --claude [--skill <name>] [--dest <path>] [--dry-run]
```

**Default behavior (no --skill flag):** sync all skills from the repo.

**What it does:**
1. Fetches the skills manifest from `github:achyuthrachur/decksmith/skills/`
2. For each skill in the manifest:
   a. Downloads `skills/{name}/SKILL.md` from the repo
   b. Creates `{dest}/{name}/SKILL.md` on the local machine
   c. Skips if the destination already exists (unless `--force`)
3. Prints a summary: installed / skipped / failed per skill

**Default dest:** `C:\Users\RachurA\AI Coding Projects\.claude\skills\`
Override with `--dest <path>`.

**Output format:**
```
decksmith skills sync --claude

Syncing 8 skills to C:\...\AI Coding Projects\.claude\skills\

  ✓ animation-components   installed
  ✓ architecture           installed
  ✓ crowe-brand            updated (was: branding)
  ✓ deck-builder           installed  ← new
  ✓ deployment             installed
  ✓ frontend               installed
  ✓ qa                     installed
  ✓ tech-stack             installed

Done. Restart Claude Code to pick up new skills.
Note: crowe-brand replaced the old 'branding' folder.
      Update your CLAUDE.md skill menu to reference crowe-brand/SKILL.md.
```

**Folder rename handling:** The existing Claude skill is `branding/` but the
canonical name is `crowe-brand/`. On sync, if `branding/SKILL.md` exists and
`crowe-brand/` does not, rename the folder and note it in the output.

---

### Command: `decksmith skills sync --codex`

```bash
decksmith skills sync --codex [--skill <name>] [--dest <path>] [--dry-run]
```

**Default behavior (no --skill flag):** sync all skills from the repo.

**What it does:**
1. Fetches the skills manifest from `github:achyuthrachur/decksmith/skills/`
2. For each skill in the manifest:
   a. Downloads the full `skills/{name}/` folder (SKILL.md + agents/openai.yaml)
   b. Creates `{dest}/{name}/` on the local machine
   c. Skips if the destination already exists (unless `--force`)
3. Prints a summary

**Default dest:** `C:\Users\RachurA\.codex\skills\`
Override with `--dest <path>`.

**Output format:**
```
decksmith skills sync --codex

Syncing 8 skills to C:\Users\RachurA\.codex\skills\

  ✓ animation-components   installed
  ✓ architecture           installed
  ✓ crowe-brand            already up to date
  ✓ deck-builder           installed  ← new
  ✓ deployment             installed
  ✓ frontend               installed
  ✓ qa                     installed
  ✓ tech-stack             installed

Done. Restart Codex to pick up new skills.
```

---

### Command: `decksmith skills list`

```bash
decksmith skills list [--remote | --claude | --codex]
```

- `--remote` (default): list skills available in the GitHub repo
- `--claude`: list skills currently installed at the Claude target
- `--codex`: list skills currently installed at the Codex target

---

### Flags (all sync commands)

| Flag | Description |
|------|-------------|
| `--skill <name>` | Sync only this specific skill |
| `--dest <path>` | Override the default install destination |
| `--force` | Overwrite existing skills |
| `--dry-run` | Print what would happen without writing any files |
| `--ref <branch>` | Install from a specific branch (default: main) |

---

### Implementation: `src/cli/skills-sync.ts`

```typescript
import { Octokit } from '@octokit/rest'  // or plain fetch — no auth needed for public repo
import * as fs from 'fs'
import * as path from 'path'

const REPO_OWNER = 'achyuthrachur'
const REPO_NAME  = 'decksmith'
const SKILLS_DIR = 'skills'

const CLAUDE_DEFAULT_DEST = path.join(
  'C:\\Users\\RachurA\\AI Coding Projects\\.claude\\skills'
)
const CODEX_DEFAULT_DEST = path.join(
  process.env.CODEX_HOME ?? path.join(process.env.USERPROFILE ?? '~', '.codex'),
  'skills'
)

// For --claude: download only SKILL.md per skill
// For --codex: download full folder (SKILL.md + agents/openai.yaml)
export async function syncSkills(options: {
  target: 'claude' | 'codex'
  skillName?: string
  dest?: string
  force?: boolean
  dryRun?: boolean
  ref?: string
}) { ... }
```

**Download strategy:** Use the GitHub raw content API for public repos:
```
https://raw.githubusercontent.com/{owner}/{repo}/{ref}/skills/{name}/SKILL.md
https://raw.githubusercontent.com/{owner}/{repo}/{ref}/skills/{name}/agents/openai.yaml
```

No authentication required for a public repo. Falls back to `git sparse-checkout`
on error (same pattern as Codex's own install-skill-from-github.py).

---

### Entry Point Routing

```typescript
// src/cli/index.ts
const args = process.argv.slice(2)

if (args[0] === '--version' || args[0] === '-v') {
  console.log(require('../package.json').version)
  process.exit(0)
}

if (args[0] === 'skills') {
  // Handle: decksmith skills sync --claude/--codex
  //         decksmith skills list --remote/--claude/--codex
  handleSkillsCommand(args.slice(1))
  process.exit(0)
}

// Default: start MCP server (stdio)
startMcpServer()
```

The same binary is both the CLI and the MCP server. When invoked by an MCP client
(no args), it starts the MCP server on stdio. When invoked with `skills` as the
first arg, it runs the skills CLI and exits.

---

## Installation & Configuration

### Install

```bash
npm install -g github:achyuthrachur/decksmith
decksmith --version
```

### Sync skills for your agent

```bash
# Claude Code
decksmith skills sync --claude

# Codex CLI
decksmith skills sync --codex

# Both (run both commands)
decksmith skills sync --claude && decksmith skills sync --codex
```

### Register MCP server with your agent

**Claude Code** — global (`~/.claude.json`):
```json
{
  "mcpServers": {
    "decksmith": { "command": "decksmith" }
  }
}
```

**Claude Code** — per-project (`.claude/settings.json`):
```json
{
  "mcpServers": {
    "decksmith": { "command": "decksmith" }
  }
}
```

**Codex CLI** — global (`~/.codex/config.toml`):
```toml
[mcp_servers.decksmith]
command = "decksmith"
args = []
```

**Codex CLI** — per-project (`.codex/config.toml`):
```toml
[mcp_servers.decksmith]
command = "decksmith"
args = []
```

**Cursor** (`.cursor/mcp.json`):
```json
{
  "mcpServers": {
    "decksmith": { "command": "decksmith", "args": [] }
  }
}
```

### Verify MCP server

```bash
npx @modelcontextprotocol/inspector decksmith
# Should show: 11 resources, 4 tools, 1 prompt
```

---

## MCP Resources (11 total)

| URI | Description |
|-----|-------------|
| `crowe://design-tokens` | Tailwind config + CSS variables (dark + light) |
| `crowe://component-registry` | ~50 ReactBits + 21st.dev components with slide mappings |
| `crowe://slide-types` | TypeScript type definitions for all slide data shapes |
| `crowe://templates/agent-md` | AGENT.md template |
| `crowe://templates/design-md` | DESIGN.md template |
| `crowe://templates/tailwind-config` | tailwind.config.ts with Crowe tokens |
| `crowe://templates/vite-config` | vite.config.ts (viteSingleFile) |
| `crowe://templates/pdf-export` | Puppeteer PDF export script |
| `crowe://templates/keyboard-nav` | useKeyboardNav.ts hook |
| `crowe://design-variation-guide` | Vibe → layout/motion/accent decision table |
| `crowe://motion-patterns` | Animation strategy reference |

---

## MCP Tools (4 total)

### `deck_scaffold`
Creates a complete deck project at a given path. Every file fully implemented.
`agent` param controls which context files are written alongside `AGENT.md`.

### `deck_generate_asset_docs`
Given interview answers, generates COMPONENTS-NEEDED, LOGOS-NEEDED,
IMAGE-PROMPTS, and CONTENT-LAYER documents as text.

### `deck_quality_check`
Reads an existing project and validates against the full quality checklist.
Returns pass/fail per item with specific fixes.

### `deck_get_kickoff_prompt`
Returns the correct session-start prompt for a given `mode × agent` combination.

---

## MCP Prompt (1 total)

### `deck_interview`
The full 5-block interview protocol. Args: `mode: "full" | "content_only" | "visual_only"`.

---

## `src/data/skills-manifest.ts`

```typescript
// Drives both skills sync and the decksmith skills list command.
// Add new skills here when they're added to the skills/ directory.

export type SkillEntry = {
  name:         string   // folder name in skills/ (canonical, used for both agents)
  claudeAlias?: string   // old folder name in .claude/skills/ if it differs (for rename handling)
  displayName:  string   // human-readable (used in list output)
  description:  string   // one-liner
}

export const skillsManifest: SkillEntry[] = [
  {
    name: 'animation-components',
    displayName: 'Animation Components',
    description: 'Animated UI: Anime.js v4, Framer Motion, ReactBits, 21st.dev',
  },
  {
    name: 'architecture',
    displayName: 'Architecture',
    description: 'Folder structure, state management, DB, API design',
  },
  {
    name: 'crowe-brand',
    claudeAlias: 'branding',   // renames branding/ → crowe-brand/ on sync
    displayName: 'Crowe Brand',
    description: 'Crowe LLP brand standards: colors, type, logo, voice, data viz',
  },
  {
    name: 'deck-builder',
    displayName: 'Deck Builder',
    description: 'HTML pitch deck builder — interview, scaffold, quality check',
  },
  {
    name: 'deployment',
    displayName: 'Deployment',
    description: 'Vercel, Cloudflare Pages, GitHub Actions, CI/CD',
  },
  {
    name: 'frontend',
    displayName: 'Frontend',
    description: 'React, Next.js, Tailwind, shadcn/ui, component patterns',
  },
  {
    name: 'qa',
    displayName: 'QA',
    description: 'Testing, linting, quality gates, accessibility',
  },
  {
    name: 'tech-stack',
    displayName: 'Tech Stack',
    description: 'Stack choices, dependencies, config, environment',
  },
]
```

---

## package.json

```json
{
  "name": "decksmith",
  "version": "1.0.0",
  "description": "MCP server + skills sync CLI for Crowe-branded HTML decks. Works with Claude Code, Codex CLI, Cursor, and any stdio MCP client.",
  "main": "dist/index.js",
  "bin": {
    "decksmith": "dist/cli/index.js"
  },
  "scripts": {
    "build":   "tsc",
    "dev":     "tsc --watch",
    "start":   "node dist/cli/index.js",
    "prepare": "npm run build"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.0.0",
    "zod": "^3.23.0"
  },
  "devDependencies": {
    "typescript":  "^5.4.0",
    "@types/node": "^20.0.0"
  },
  "engines": {
    "node": ">=20.0.0"
  }
}
```

Note: no `node-fetch` or `octokit` dependency needed — use Node 20's built-in
`fetch` for GitHub raw content downloads.

---

## Out of Scope

- No npm publish to public registry (install via GitHub URL)
- No authentication — public repo only (GitHub raw content API, no token needed)
- No HTTP MCP transport — stdio only
- No Crowe brand assets bundled — logos sourced externally per project
- No Figma MCP integration — separate connected MCP
- No auto-deployment — scaffold writes files, you run the build

---

## Deliverable Checklist

- [ ] `npm run build` exits 0, zero TypeScript errors
- [ ] `decksmith --version` works after global install
- [ ] `decksmith skills sync --claude` installs all 8 skills to `.claude/skills/`,
      renames `branding/` → `crowe-brand/` if present
- [ ] `decksmith skills sync --codex` installs all 8 skills (full folder with agents/) to `.codex/skills/`
- [ ] `decksmith skills sync --claude --skill deck-builder` installs only deck-builder
- [ ] `decksmith skills sync --codex --dry-run` prints plan without writing files
- [ ] `decksmith skills list` shows all 8 skills with descriptions
- [ ] `npx @modelcontextprotocol/inspector decksmith` shows 11 resources, 4 tools, 1 prompt
- [ ] `deck_scaffold --agent claude-code` creates both `AGENT.md` and `CLAUDE.md`
- [ ] `deck_scaffold --agent codex` creates `AGENT.md` and `.codex/README.md`
- [ ] Every scaffolded `.ts/.tsx` file is valid TypeScript (no placeholder comments)
- [ ] `crowe://design-tokens` returns token values matching empower-deck v3.3 exactly
- [ ] `deck_quality_check` correctly flags hardcoded content strings in JSX
- [ ] `deck_get_kickoff_prompt` returns different output for each agent × mode combination
- [ ] README.md covers: install, skills sync for both agents, MCP config for all 3 agents,
      all primitives with examples

---

## Kickoff Prompt for Claude Code

```
Read the MCP builder skill at /mnt/skills/examples/mcp-builder/SKILL.md first.

Then build the decksmith package per this PRD.

Build in this order:
1. package.json, tsconfig.json, src/ directory structure
2. src/data/ — crowe-tokens.ts, components.ts, skills-manifest.ts, quality-checklist.ts
3. src/cli/skills-sync.ts — the sync command (this is net new vs the old PRD)
4. src/cli/index.ts — routes `skills` args to CLI, default to MCP server
5. All 11 MCP resources
6. MCP tools: deck_scaffold → deck_generate_asset_docs → deck_quality_check → deck_get_kickoff_prompt
7. MCP prompt: deck_interview
8. src/index.ts — MCP server setup
9. Wire bin entry in dist/cli/index.js
10. Build: npm run build (must exit 0)
11. Verify MCP: npx @modelcontextprotocol/inspector decksmith
12. Verify CLI: decksmith skills list, decksmith skills sync --claude --dry-run

Critical constraints:
- Token values must match empower-deck v3.3 exactly (extract from docs/DECK-SKILL.md)
- skills sync must use Node 20 built-in fetch — no extra dependencies
- Folder rename: branding → crowe-brand handled gracefully with output message
- No Anthropic/OpenAI API calls inside the server
- All skill content in src/data/ — no hardcoded strings in tool handlers

Project path: C:\Users\RachurA\AI Coding Projects\decksmith\
GitHub: gh repo create achyuthrachur/decksmith --public --source=. --remote=origin --push
```
