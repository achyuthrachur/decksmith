# decksmith

MCP server + skills sync CLI for Crowe-branded HTML presentation decks.
Works with Claude Code, Codex CLI, Cursor, and any stdio MCP client.

---

## Install

```bash
npm install -g github:achyuthrachur/decksmith
decksmith --version
```

---

## Sync skills to your agent

```bash
# Claude Code — installs to AI Coding Projects/.claude/skills/
decksmith skills sync --claude

# Codex CLI — installs to ~/.codex/skills/
decksmith skills sync --codex

# See what's available without installing
decksmith skills list

# Preview what would change without writing files
decksmith skills sync --claude --dry-run

# Sync only one skill
decksmith skills sync --codex --skill deck-builder

# Force overwrite existing
decksmith skills sync --claude --force
```

After syncing: restart your agent to pick up new skills.

---

## Register the MCP server

**Claude Code** (`~/.claude.json` or `.claude/settings.json`):
```json
{ "mcpServers": { "decksmith": { "command": "decksmith" } } }
```

**Codex CLI** (`~/.codex/config.toml` or `.codex/config.toml`):
```toml
[mcp_servers.decksmith]
command = "decksmith"
args = []
```

**Cursor** (`.cursor/mcp.json`):
```json
{ "mcpServers": { "decksmith": { "command": "decksmith", "args": [] } } }
```

Verify: `npx @modelcontextprotocol/inspector decksmith`

---

## Start a new deck

Once the MCP server is registered, use this kickoff prompt with your agent:

```
Read AGENT.md (or CLAUDE.md). Then call deck_interview (mode: "full")
from the decksmith MCP. Do not scaffold until the Deck Plan is confirmed.
After the interview, call deck_generate_asset_docs and write the four
documents to the project root. Wait for asset confirmation before building.
```

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

**Resources (read-only):**
`crowe://design-tokens`, `crowe://component-registry`, `crowe://slide-types`,
`crowe://templates/agent-md`, `crowe://templates/design-md`,
`crowe://templates/tailwind-config`, `crowe://templates/vite-config`,
`crowe://templates/pdf-export`, `crowe://templates/keyboard-nav`,
`crowe://design-variation-guide`, `crowe://motion-patterns`

**Tools:** `deck_scaffold`, `deck_generate_asset_docs`, `deck_quality_check`, `deck_get_kickoff_prompt`

**Prompts:** `deck_interview`

---

## Development

```bash
git clone github:achyuthrachur/decksmith
cd decksmith
npm install
npm run build      # tsc → dist/
npm install -g .   # install local build globally
```

To add a skill: create `skills/{name}/SKILL.md` and `skills/{name}/agents/openai.yaml`,
then add the entry to `src/data/skills-manifest.ts`.
