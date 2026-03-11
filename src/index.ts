import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

// Resources
import { designTokensUri, getDesignTokensContent }               from './resources/design-tokens.js'
import { componentRegistryUri, getComponentRegistryContent }     from './resources/component-registry.js'
import { slideTypesUri, getSlideTypesContent }                   from './resources/slide-types.js'
import { agentMdUri, getAgentMdContent }                         from './resources/templates/agent-md.js'
import { designMdUri, getDesignMdContent }                       from './resources/templates/design-md.js'
import { tailwindConfigUri, getTailwindConfigContent }           from './resources/templates/tailwind-config.js'
import { viteConfigUri, getViteConfigContent }                   from './resources/vite-config.js'
import { pdfExportUri, getPdfExportContent }                     from './resources/pdf-export.js'
import { keyboardNavUri, getKeyboardNavContent }                 from './resources/templates/keyboard-nav.js'
import { designVariationGuideUri, getDesignVariationGuideContent } from './resources/design-variation-guide.js'
import { motionPatternsUri, getMotionPatternsContent }           from './resources/motion-patterns.js'

// Tools
import { scaffoldSchema, runScaffold }               from './tools/scaffold.js'
import { generateAssetDocsSchema, runGenerateAssetDocs } from './tools/generate-asset-docs.js'
import { qualityCheckSchema, runQualityCheck }       from './tools/quality-check.js'
import { kickoffPromptSchema, runKickoffPrompt }     from './tools/kickoff-prompt.js'

// Prompts
import { interviewSchema, getInterviewPrompt }       from './prompts/interview.js'

export async function startMcpServer(): Promise<void> {
  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  const pkgPath = path.resolve(__dirname, '../package.json')
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8')) as { name: string; version: string }

  const server = new McpServer({
    name: pkg.name,
    version: pkg.version,
  })

  // --- Resources (11) ---

  server.resource(
    'design-tokens',
    designTokensUri,
    { description: 'Tailwind config + CSS variables for Crowe design tokens (empower-deck v3.3)' },
    async () => ({ contents: [{ uri: designTokensUri, text: getDesignTokensContent(), mimeType: 'text/markdown' }] })
  )

  server.resource(
    'component-registry',
    componentRegistryUri,
    { description: '~24 ReactBits + 21st.dev components with slide type mappings and install commands' },
    async () => ({ contents: [{ uri: componentRegistryUri, text: getComponentRegistryContent(), mimeType: 'text/markdown' }] })
  )

  server.resource(
    'slide-types',
    slideTypesUri,
    { description: 'TypeScript type definitions for all Crowe deck slide data shapes' },
    async () => ({ contents: [{ uri: slideTypesUri, text: getSlideTypesContent(), mimeType: 'text/plain' }] })
  )

  server.resource(
    'templates/agent-md',
    agentMdUri,
    { description: 'AGENT.md template for new deck projects — rename to CLAUDE.md for Claude Code' },
    async () => ({ contents: [{ uri: agentMdUri, text: getAgentMdContent(), mimeType: 'text/markdown' }] })
  )

  server.resource(
    'templates/design-md',
    designMdUri,
    { description: 'DESIGN.md template — visual design decisions for a specific deck project' },
    async () => ({ contents: [{ uri: designMdUri, text: getDesignMdContent(), mimeType: 'text/markdown' }] })
  )

  server.resource(
    'templates/tailwind-config',
    tailwindConfigUri,
    { description: 'Full tailwind.config.ts with all Crowe design tokens' },
    async () => ({ contents: [{ uri: tailwindConfigUri, text: getTailwindConfigContent(), mimeType: 'text/plain' }] })
  )

  server.resource(
    'templates/vite-config',
    viteConfigUri,
    { description: 'vite.config.ts using viteSingleFile — builds to a single portable HTML file' },
    async () => ({ contents: [{ uri: viteConfigUri, text: getViteConfigContent(), mimeType: 'text/plain' }] })
  )

  server.resource(
    'templates/pdf-export',
    pdfExportUri,
    { description: 'Puppeteer PDF export script — outputs all slides as a single PDF' },
    async () => ({ contents: [{ uri: pdfExportUri, text: getPdfExportContent(), mimeType: 'text/plain' }] })
  )

  server.resource(
    'templates/keyboard-nav',
    keyboardNavUri,
    { description: 'useKeyboardNav.ts hook — arrow key navigation, fullscreen (f), theme toggle (t)' },
    async () => ({ contents: [{ uri: keyboardNavUri, text: getKeyboardNavContent(), mimeType: 'text/plain' }] })
  )

  server.resource(
    'design-variation-guide',
    designVariationGuideUri,
    { description: 'Vibe → layout/motion/accent decision table — use to vary the visual direction per deck' },
    async () => ({ contents: [{ uri: designVariationGuideUri, text: getDesignVariationGuideContent(), mimeType: 'text/markdown' }] })
  )

  server.resource(
    'motion-patterns',
    motionPatternsUri,
    { description: 'Animation strategy reference with code examples for each pattern' },
    async () => ({ contents: [{ uri: motionPatternsUri, text: getMotionPatternsContent(), mimeType: 'text/markdown' }] })
  )

  // --- Tools (4) ---

  server.tool(
    'deck_scaffold',
    'Create a complete Vite + React + TypeScript deck project at a given path. ' +
    'Writes all source files, config, and agent context files. ' +
    'AGENT.md is always written; also writes CLAUDE.md (claude-code), .codex/README.md (codex), .cursorrules (cursor).',
    scaffoldSchema.shape,
    async (input) => {
      const result = await runScaffold(scaffoldSchema.parse(input))
      return { content: [{ type: 'text', text: result }] }
    }
  )

  server.tool(
    'deck_generate_asset_docs',
    'Given interview answers from all 5 blocks, generates four asset elicitation documents: ' +
    'COMPONENTS-NEEDED, LOGOS-NEEDED, IMAGE-PROMPTS, and CONTENT-LAYER. ' +
    'Returns formatted text — paste into project files or use directly.',
    generateAssetDocsSchema.shape,
    async (input) => {
      const result = await runGenerateAssetDocs(generateAssetDocsSchema.parse(input))
      return { content: [{ type: 'text', text: result }] }
    }
  )

  server.tool(
    'deck_quality_check',
    'Read an existing deck project and validate against the full quality checklist. ' +
    'Returns pass/fail/skip per item with specific fixes for failures.',
    qualityCheckSchema.shape,
    async (input) => {
      const result = await runQualityCheck(qualityCheckSchema.parse(input))
      return { content: [{ type: 'text', text: result }] }
    }
  )

  server.tool(
    'deck_get_kickoff_prompt',
    'Return the correct session-start prompt for a given mode × agent combination. ' +
    'Modes: full (new deck), content_only (update copy), visual_only (redesign). ' +
    'Agent param returns correct syntax and file references for the target agent.',
    kickoffPromptSchema.shape,
    async (input) => {
      const result = await runKickoffPrompt(kickoffPromptSchema.parse(input))
      return { content: [{ type: 'text', text: result }] }
    }
  )

  // --- Prompts (1) ---

  server.prompt(
    'deck_interview',
    'The full 5-block deck builder interview protocol. ' +
    'Run this before writing any code. Mode: full | content_only | visual_only.',
    interviewSchema.shape,
    async (input) => {
      const text = getInterviewPrompt(interviewSchema.parse(input))
      return {
        messages: [{ role: 'user', content: { type: 'text', text } }],
      }
    }
  )

  const transport = new StdioServerTransport()
  await server.connect(transport)
}
