import * as fs from 'fs'
import * as path from 'path'
import { skillsManifest, type SkillEntry } from '../data/skills-manifest.js'

const REPO_OWNER = 'achyuthrachur'
const REPO_NAME  = 'decksmith'

const CLAUDE_DEFAULT_DEST = path.join(
  'C:\\Users\\RachurA\\AI Coding Projects\\.claude\\skills'
)
const CODEX_DEFAULT_DEST = path.join(
  process.env['CODEX_HOME'] ?? path.join(process.env['USERPROFILE'] ?? '~', '.codex'),
  'skills'
)

async function fetchRaw(url: string): Promise<string> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`)
  return res.text()
}

function rawUrl(ref: string, skillName: string, filePath: string): string {
  return `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${ref}/skills/${skillName}/${filePath}`
}

export async function syncSkills(options: {
  target: 'claude' | 'codex'
  skillName?: string
  dest?: string
  force?: boolean
  dryRun?: boolean
  ref?: string
}): Promise<void> {
  const { target, skillName, force = false, dryRun = false, ref = 'main' } = options
  const dest = options.dest ?? (target === 'claude' ? CLAUDE_DEFAULT_DEST : CODEX_DEFAULT_DEST)

  const skills: SkillEntry[] = skillName
    ? skillsManifest.filter(s => s.name === skillName)
    : skillsManifest

  if (skills.length === 0) {
    console.error(`No skill found with name: ${skillName}`)
    process.exit(1)
  }

  console.log(`\nSyncing ${skills.length} skill${skills.length !== 1 ? 's' : ''} to ${dest}\n`)

  const results: Array<{ name: string; status: string; note?: string }> = []
  const renameNotes: string[] = []

  for (const skill of skills) {
    const skillDest = path.join(dest, skill.name)
    const alias = skill.claudeAlias

    // Handle branding → crowe-brand rename (claude only)
    if (target === 'claude' && alias) {
      const oldPath = path.join(dest, alias)
      if (fs.existsSync(oldPath) && !fs.existsSync(skillDest)) {
        if (!dryRun) {
          fs.renameSync(oldPath, skillDest)
        }
        renameNotes.push(`crowe-brand replaced the old '${alias}' folder.`)
      }
    }

    if (target === 'claude') {
      const destFile = path.join(skillDest, 'SKILL.md')
      if (fs.existsSync(destFile) && !force) {
        results.push({ name: skill.name, status: 'already up to date' })
        continue
      }
      try {
        const content = await fetchRaw(rawUrl(ref, skill.name, 'SKILL.md'))
        if (!dryRun) {
          fs.mkdirSync(skillDest, { recursive: true })
          fs.writeFileSync(destFile, content, 'utf8')
        }
        results.push({ name: skill.name, status: dryRun ? 'would install' : 'installed' })
      } catch (err) {
        results.push({ name: skill.name, status: 'FAILED', note: String(err) })
      }
    } else {
      // codex: full folder
      const skillMdDest = path.join(skillDest, 'SKILL.md')
      const agentsDest  = path.join(skillDest, 'agents', 'openai.yaml')
      if (fs.existsSync(skillMdDest) && !force) {
        results.push({ name: skill.name, status: 'already up to date' })
        continue
      }
      try {
        const [skillMd, openaiYaml] = await Promise.all([
          fetchRaw(rawUrl(ref, skill.name, 'SKILL.md')),
          fetchRaw(rawUrl(ref, skill.name, 'agents/openai.yaml')),
        ])
        if (!dryRun) {
          fs.mkdirSync(path.join(skillDest, 'agents'), { recursive: true })
          fs.writeFileSync(skillMdDest, skillMd, 'utf8')
          fs.writeFileSync(agentsDest,  openaiYaml, 'utf8')
        }
        results.push({ name: skill.name, status: dryRun ? 'would install' : 'installed' })
      } catch (err) {
        results.push({ name: skill.name, status: 'FAILED', note: String(err) })
      }
    }
  }

  for (const r of results) {
    const nameCol = r.name.padEnd(22)
    console.log(`  ${r.status === 'FAILED' ? '✗' : '✓'} ${nameCol} ${r.status}${r.note ? `\n    ${r.note}` : ''}`)
  }

  console.log(`\nDone. Restart ${target === 'claude' ? 'Claude Code' : 'Codex'} to pick up new skills.`)

  if (renameNotes.length > 0) {
    for (const note of renameNotes) {
      console.log(`Note: ${note}`)
    }
    console.log('      Update your CLAUDE.md skill menu to reference crowe-brand/SKILL.md.')
  }
}

export async function listSkills(options: {
  mode: 'remote' | 'claude' | 'codex'
}): Promise<void> {
  const { mode } = options

  if (mode === 'remote') {
    console.log('\nSkills available in achyuthrachur/decksmith:\n')
    const maxName = Math.max(...skillsManifest.map(s => s.displayName.length))
    for (const skill of skillsManifest) {
      console.log(`  ${skill.displayName.padEnd(maxName + 2)} ${skill.description}`)
    }
    console.log(`\n${skillsManifest.length} skills total.`)
    return
  }

  const dest = mode === 'claude' ? CLAUDE_DEFAULT_DEST : CODEX_DEFAULT_DEST
  console.log(`\nSkills installed at ${dest}:\n`)

  if (!fs.existsSync(dest)) {
    console.log('  (directory does not exist — run skills sync first)')
    return
  }

  const entries = fs.readdirSync(dest, { withFileTypes: true })
    .filter(e => e.isDirectory())
    .map(e => e.name)

  if (entries.length === 0) {
    console.log('  (no skills installed)')
    return
  }

  for (const name of entries) {
    const manifest = skillsManifest.find(s => s.name === name || s.claudeAlias === name)
    const desc = manifest?.description ?? '(no description)'
    console.log(`  ${name.padEnd(24)} ${desc}`)
  }

  console.log(`\n${entries.length} skill${entries.length !== 1 ? 's' : ''} installed.`)
}

export async function handleSkillsCommand(args: string[]): Promise<void> {
  const sub = args[0]

  if (sub === 'list') {
    const mode = args.includes('--claude') ? 'claude'
                : args.includes('--codex')  ? 'codex'
                : 'remote'
    await listSkills({ mode })
    return
  }

  if (sub === 'sync') {
    const target = args.includes('--claude') ? 'claude'
                 : args.includes('--codex')  ? 'codex'
                 : null

    if (!target) {
      console.error('Usage: decksmith skills sync --claude | --codex')
      process.exit(1)
    }

    const skillIdx = args.indexOf('--skill')
    const skillName = skillIdx !== -1 ? args[skillIdx + 1] : undefined

    const destIdx = args.indexOf('--dest')
    const dest = destIdx !== -1 ? args[destIdx + 1] : undefined

    const refIdx = args.indexOf('--ref')
    const ref = refIdx !== -1 ? args[refIdx + 1] : 'main'

    await syncSkills({
      target,
      skillName,
      dest,
      force:  args.includes('--force'),
      dryRun: args.includes('--dry-run'),
      ref,
    })
    return
  }

  console.error('Usage: decksmith skills <list|sync> [--claude|--codex] [options]')
  process.exit(1)
}
