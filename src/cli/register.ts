import * as fs from 'fs'
import * as path from 'path'

const DECKSMITH_COMMAND = 'decksmith'

// Paths
const CLAUDE_JSON     = path.join(process.env['USERPROFILE'] ?? process.env['HOME'] ?? '~', '.claude.json')
const CLAUDE_COMMANDS = path.join(process.env['USERPROFILE'] ?? process.env['HOME'] ?? '~', '.claude', 'commands')
const CODEX_CONFIG    = path.join(process.env['USERPROFILE'] ?? process.env['HOME'] ?? '~', '.codex', 'config.toml')

// Claude Code slash command content — shows up as /deck in any Claude Code session
const DECK_SLASH_COMMAND = `\
You are starting a new Crowe deck-building session with the decksmith MCP.

First, call the \`deck_get_kickoff_prompt\` tool with:
- mode: "full"
- agent: "claude-code"

Read the instructions it returns, then immediately begin the interview by calling the \`deck_interview\` prompt with mode: "full".

Work through each interview block conversationally. Do not scaffold, write code, or touch any file until:
1. All 5 interview blocks are complete
2. The Deck Plan is confirmed
3. The 4 asset elicitation documents are written and assets are confirmed placed

The decksmith MCP has everything you need:
- \`crowe://design-tokens\` — Crowe color tokens and CSS variables
- \`crowe://component-registry\` — ReactBits + 21st.dev components
- \`crowe://design-variation-guide\` — pick the visual direction
- \`deck_scaffold\` — creates the full project once you're ready to build
- \`deck_quality_check\` — run before declaring done
`

// Codex custom instruction (written to ~/.codex/instructions/deck.md if supported,
// otherwise printed as setup guidance)
const DECK_CODEX_INSTRUCTION = `\
# /deck — Start a new Crowe deck project

You are starting a new Crowe deck-building session with the decksmith MCP.

First, call the \`deck_get_kickoff_prompt\` tool with:
- mode: "full"
- agent: "codex"

Read the instructions it returns, then immediately begin the interview by calling the \`deck_interview\` prompt with mode: "full".

Work through each interview block conversationally. Do not scaffold, write code, or touch any file until:
1. All 5 interview blocks are complete
2. The Deck Plan is confirmed
3. The 4 asset elicitation documents are written and assets are confirmed placed

The decksmith MCP has everything you need:
- \`crowe://design-tokens\` — Crowe color tokens and CSS variables
- \`crowe://component-registry\` — ReactBits + 21st.dev components
- \`crowe://design-variation-guide\` — pick the visual direction
- \`deck_scaffold\` — creates the full project once you're ready to build
- \`deck_quality_check\` — run before declaring done
`

function registerClaude(force: boolean): void {
  console.log('\nRegistering decksmith with Claude Code...\n')

  // 1. Update ~/.claude.json with MCP server entry
  let claudeJson: Record<string, unknown> = {}
  if (fs.existsSync(CLAUDE_JSON)) {
    try {
      claudeJson = JSON.parse(fs.readFileSync(CLAUDE_JSON, 'utf8')) as Record<string, unknown>
    } catch {
      console.error(`  ✗ Could not parse ${CLAUDE_JSON}`)
      process.exit(1)
    }
  }

  const mcpServers = (claudeJson['mcpServers'] ?? {}) as Record<string, unknown>
  if (mcpServers['decksmith'] && !force) {
    console.log('  ~ MCP server   already registered (use --force to overwrite)')
  } else {
    mcpServers['decksmith'] = { command: DECKSMITH_COMMAND }
    claudeJson['mcpServers'] = mcpServers
    fs.writeFileSync(CLAUDE_JSON, JSON.stringify(claudeJson, null, 2), 'utf8')
    console.log(`  ✓ MCP server   registered in ${CLAUDE_JSON}`)
  }

  // 2. Write ~/.claude/commands/deck.md — creates /deck slash command
  fs.mkdirSync(CLAUDE_COMMANDS, { recursive: true })
  const commandFile = path.join(CLAUDE_COMMANDS, 'deck.md')
  if (fs.existsSync(commandFile) && !force) {
    console.log('  ~ /deck command  already exists (use --force to overwrite)')
  } else {
    fs.writeFileSync(commandFile, DECK_SLASH_COMMAND, 'utf8')
    console.log(`  ✓ /deck command  written to ${commandFile}`)
  }

  console.log(`
Done. Restart Claude Code, then:
  - Type /deck in any session to start a new deck project
  - The decksmith MCP tools (deck_scaffold, deck_interview, etc.) are available globally
`)
}

function registerCodex(force: boolean): void {
  console.log('\nRegistering decksmith with Codex CLI...\n')

  // 1. Update ~/.codex/config.toml
  const mcpBlock = `\n[mcp_servers.decksmith]\ncommand = "${DECKSMITH_COMMAND}"\nargs = []\n`

  if (!fs.existsSync(CODEX_CONFIG)) {
    fs.mkdirSync(path.dirname(CODEX_CONFIG), { recursive: true })
    fs.writeFileSync(CODEX_CONFIG, mcpBlock.trimStart(), 'utf8')
    console.log(`  ✓ MCP server   registered in ${CODEX_CONFIG}`)
  } else {
    const existing = fs.readFileSync(CODEX_CONFIG, 'utf8')
    if (existing.includes('[mcp_servers.decksmith]') && !force) {
      console.log('  ~ MCP server   already registered (use --force to overwrite)')
    } else if (existing.includes('[mcp_servers.decksmith]') && force) {
      // Replace existing block
      // Match the block header + all following non-section lines
      // Stops at next [section] header (line starting with [a-zA-Z) but not at args = []
      const updated = existing.replace(
        /\[mcp_servers\.decksmith\](?:\n(?!\[[a-zA-Z_]).*)*\n*/,
        mcpBlock
      )
      fs.writeFileSync(CODEX_CONFIG, updated, 'utf8')
      console.log(`  ✓ MCP server   updated in ${CODEX_CONFIG}`)
    } else {
      fs.appendFileSync(CODEX_CONFIG, mcpBlock, 'utf8')
      console.log(`  ✓ MCP server   registered in ${CODEX_CONFIG}`)
    }
  }

  // 2. Write ~/.codex/instructions/deck.md (Codex custom instructions)
  const codexInstructionsDir = path.join(path.dirname(CODEX_CONFIG), 'instructions')
  fs.mkdirSync(codexInstructionsDir, { recursive: true })
  const instructionFile = path.join(codexInstructionsDir, 'deck.md')
  if (fs.existsSync(instructionFile) && !force) {
    console.log('  ~ deck prompt  already exists (use --force to overwrite)')
  } else {
    fs.writeFileSync(instructionFile, DECK_CODEX_INSTRUCTION, 'utf8')
    console.log(`  ✓ deck prompt  written to ${instructionFile}`)
  }

  console.log(`
Done. Restart Codex, then:
  - Reference the deck instruction with: @instructions/deck.md
  - Or paste the kickoff prompt directly to start a new deck project
  - The decksmith MCP tools (deck_scaffold, deck_interview, etc.) are available globally
`)
}

export function handleRegisterCommand(args: string[]): void {
  const target = args.includes('--claude') ? 'claude'
               : args.includes('--codex')  ? 'codex'
               : null
  const force = args.includes('--force')

  if (!target) {
    console.error('Usage: decksmith register --claude | --codex [--force]')
    process.exit(1)
  }

  if (target === 'claude') registerClaude(force)
  else registerCodex(force)
}
