import * as fs from 'fs'
import * as path from 'path'
import { z } from 'zod'
import { getAgentMdContent } from '../resources/templates/agent-md.js'

export const scaffoldSchema = z.object({
  projectPath: z.string().describe('Absolute path where the deck project should be created'),
  deckTitle:   z.string().describe('Human-readable deck title (e.g. "Empower CU — Compliance AI Pitch")'),
  client:      z.string().optional().describe('Client or audience name'),
  theme:       z.enum(['dark', 'light']).default('dark').describe('Default color theme'),
  agent:       z.enum(['claude-code', 'codex', 'cursor', 'generic']).default('generic')
                .describe('Target agent — controls which context files are written alongside AGENT.md'),
})

export type ScaffoldInput = z.infer<typeof scaffoldSchema>

function write(filePath: string, content: string) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, content, 'utf8')
}

export async function runScaffold(input: ScaffoldInput): Promise<string> {
  const { projectPath, deckTitle, client, theme, agent } = input
  const p = (rel: string) => path.join(projectPath, rel)

  // package.json
  write(p('package.json'), JSON.stringify({
    name: path.basename(projectPath).toLowerCase().replace(/\s+/g, '-'),
    version: '0.1.0',
    private: true,
    type: 'module',
    scripts: {
      dev:   'vite',
      build: 'tsc && vite build',
      preview: 'vite preview',
    },
    dependencies: {
      react: '^18.3.0',
      'react-dom': '^18.3.0',
      'framer-motion': '^11.0.0',
    },
    devDependencies: {
      '@types/react': '^18.3.0',
      '@types/react-dom': '^18.3.0',
      '@vitejs/plugin-react': '^4.3.0',
      'autoprefixer': '^10.4.0',
      'postcss': '^8.4.0',
      'tailwindcss': '^3.4.0',
      'typescript': '^5.4.0',
      'vite': '^5.4.0',
      'vite-plugin-singlefile': '^2.0.0',
    },
  }, null, 2))

  // tsconfig.json
  write(p('tsconfig.json'), JSON.stringify({
    compilerOptions: {
      target: 'ES2020',
      lib: ['ES2020', 'DOM', 'DOM.Iterable'],
      module: 'ESNext',
      moduleResolution: 'bundler',
      jsx: 'react-jsx',
      strict: true,
      noUnusedLocals: true,
      noUnusedParameters: true,
      noFallthroughCasesInSwitch: true,
      resolveJsonModule: true,
      isolatedModules: true,
    },
    include: ['src'],
  }, null, 2))

  // vite.config.ts
  write(p('vite.config.ts'),
`import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 100_000_000,
    cssCodeSplit: false,
  },
})
`)

  // tailwind.config.ts
  write(p('tailwind.config.ts'),
`import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'crowe-blue':          '#0075C9',
        'crowe-blue-dark':     '#0050AD',
        'crowe-blue-light':    '#32A8FD',
        'crowe-coral':         '#E5376B',
        'crowe-coral-dark':    '#992A5C',
        'crowe-amber':         '#F5A800',
        'crowe-amber-dark':    '#D7761D',
        'crowe-indigo':        '#002E62',
        'crowe-indigo-bright': '#003F9F',
        'crowe-indigo-dark':   '#011E41',
        tint: {
          50:  '#F6F7FA',
          300: '#C8CBD6',
          500: '#8B90A0',
          700: '#545968',
          900: '#2D3142',
          950: '#1A1D2B',
        },
      },
      fontFamily: {
        display: ['Helvetica Now Display', 'Plus Jakarta Sans', 'Arial', 'system-ui', 'sans-serif'],
        body:    ['Helvetica Now Text',    'Plus Jakarta Sans', 'Arial', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
`)

  // postcss.config.js
  write(p('postcss.config.js'),
`export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`)

  // index.html
  write(p('index.html'),
`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${deckTitle}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`)

  // src/main.tsx
  write(p('src/main.tsx'),
`import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
`)

  // src/index.css
  write(p('src/index.css'),
`@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --slide-bg:                  #011E41;
  --slide-text:                #F6F7FA;
  --slide-text-secondary:      #C8CBD6;
  --slide-text-muted:          #8B90A0;
  --slide-surface-card:        rgba(255,255,255,.04);
  --slide-surface-card-hover:  rgba(255,255,255,.08);
  --slide-border:              rgba(255,255,255,.08);
  --slide-border-strong:       rgba(255,255,255,.16);
  --slide-badge-outline-border:rgba(255,255,255,.5);
  --slide-badge-bg:            rgba(255,255,255,.12);
  --slide-icon-muted:          rgba(246,247,250,.4);
  --slide-chrome-muted:        rgba(246,247,250,.45);
  --slide-chrome-disabled:     rgba(246,247,250,.15);
  --slide-progress-track:      rgba(255,255,255,.08);
}

[data-theme="light"] {
  --slide-bg:                  #F8F9FC;
  --slide-text:                #011E41;
  --slide-text-secondary:      #545968;
  --slide-text-muted:          #6B7280;
  --slide-surface-card:        rgba(1,30,65,.04);
  --slide-surface-card-hover:  rgba(1,30,65,.07);
  --slide-border:              rgba(1,30,65,.1);
  --slide-border-strong:       rgba(1,30,65,.18);
  --slide-badge-outline-border:rgba(1,30,65,.45);
  --slide-badge-bg:            rgba(1,30,65,.08);
  --slide-icon-muted:          rgba(1,30,65,.4);
  --slide-chrome-muted:        rgba(1,30,65,.45);
  --slide-chrome-disabled:     rgba(1,30,65,.15);
  --slide-progress-track:      rgba(1,30,65,.1);
}

html, body, #root {
  height: 100%;
  margin: 0;
  background-color: var(--slide-bg);
  color: var(--slide-text);
}
`)

  // src/data/types.ts
  write(p('src/data/types.ts'),
`export type SlideType =
  | 'hero'
  | 'section-divider'
  | 'stat-grid'
  | 'two-column'
  | 'cta'

export interface BaseSlide { id: string; type: SlideType }

export interface HeroSlide extends BaseSlide {
  type: 'hero'
  headline: string
  subheadline?: string
  eyebrow?: string
  background?: string
}

export interface SectionDividerSlide extends BaseSlide {
  type: 'section-divider'
  sectionNumber?: string
  label: string
  tagline?: string
}

export interface StatItem { value: string; label: string; source?: string }
export interface StatGridSlide extends BaseSlide {
  type: 'stat-grid'
  headline?: string
  stats: StatItem[]
  columns?: 2 | 3 | 4
}

export interface TwoColumnSlide extends BaseSlide {
  type: 'two-column'
  headline: string
  leftContent: string[]
  rightContent: string[]
  eyebrow?: string
}

export interface CtaSlide extends BaseSlide {
  type: 'cta'
  headline: string
  subheadline?: string
  ctaText?: string
  contacts?: Array<{ name: string; email: string; role?: string }>
}

export type Slide = HeroSlide | SectionDividerSlide | StatGridSlide | TwoColumnSlide | CtaSlide

export interface DeckConfig {
  title: string
  client?: string
  theme: 'dark' | 'light'
  accentColor: 'crowe-blue' | 'crowe-coral' | 'crowe-amber'
  slideCount: number
}
`)

  // src/data/config.ts
  write(p('src/data/config.ts'),
`import type { DeckConfig } from './types.ts'

export const config: DeckConfig = {
  title:       '${deckTitle}',
  client:      '${client ?? ''}',
  theme:       '${theme}',
  accentColor: 'crowe-blue',
  slideCount:  3,
}
`)

  // src/data/slides.ts
  write(p('src/data/slides.ts'),
`import type { Slide } from './types.ts'

export const slides: Slide[] = [
  {
    id:          'hero',
    type:        'hero',
    headline:    '${deckTitle}',
    subheadline: '${client ? `Prepared for ${client}` : 'Crowe LLP'}',
    eyebrow:     'CONFIDENTIAL · ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }).toUpperCase()}',
  },
  {
    id:          'overview',
    type:        'section-divider',
    sectionNumber: '01',
    label:       'Overview',
    tagline:     'Setting the stage',
  },
  {
    id:          'close',
    type:        'cta',
    headline:    'Next Steps',
    subheadline: 'Let\\'s connect.',
    ctaText:     'Schedule a conversation',
    contacts: [
      { name: 'Achyuth Rachur', email: 'achyuth.rachur@crowe.com', role: 'AI Innovation' },
    ],
  },
]
`)

  // src/lib/utils.ts
  write(p('src/lib/utils.ts'),
`import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`)

  // src/hooks/useKeyboardNav.ts
  write(p('src/hooks/useKeyboardNav.ts'),
`import { useState, useEffect } from 'react'

export function useKeyboardNav(total: number) {
  const [current, setCurrent] = useState(0)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown')
        setCurrent(c => Math.min(c + 1, total - 1))
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp')
        setCurrent(c => Math.max(c - 1, 0))
      if (e.key === 'f')
        document.fullscreenElement
          ? document.exitFullscreen()
          : document.documentElement.requestFullscreen()
      if (e.key === 't')
        document.documentElement.dataset['theme'] =
          document.documentElement.dataset['theme'] === 'light' ? '' : 'light'
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [total])
  return { current, setCurrent, total }
}
`)

  // src/components/slides/HeroSlide.tsx
  write(p('src/components/slides/HeroSlide.tsx'),
`import { motion } from 'framer-motion'
import type { HeroSlide as HeroSlideData } from '../../data/types.ts'

export function HeroSlide({ slide }: { slide: HeroSlideData }) {
  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center px-16"
      style={slide.background ? { backgroundImage: \`url(\${slide.background})\`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
    >
      {slide.background && (
        <div className="absolute inset-0 bg-[rgba(1,30,65,0.7)]" />
      )}
      <div className="relative z-10 text-center max-w-4xl">
        {slide.eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="font-body text-xs tracking-widest uppercase text-tint-300 mb-6"
          >
            {slide.eyebrow}
          </motion.p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display text-7xl font-bold leading-tight mb-6"
        >
          {slide.headline}
        </motion.h1>
        {slide.subheadline && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="font-body text-xl text-tint-300"
          >
            {slide.subheadline}
          </motion.p>
        )}
      </div>
    </div>
  )
}
`)

  // src/components/slides/SectionDividerSlide.tsx
  write(p('src/components/slides/SectionDividerSlide.tsx'),
`import { motion } from 'framer-motion'
import type { SectionDividerSlide as SectionDividerData } from '../../data/types.ts'

export function SectionDividerSlide({ slide }: { slide: SectionDividerData }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-16 py-16">
      <div className="relative text-center">
        {slide.sectionNumber && (
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 font-display text-9xl font-bold text-crowe-blue opacity-10 select-none">
            {slide.sectionNumber}
          </span>
        )}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-crowe-blue h-0.5 w-24 mb-8 mx-auto"
        />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="font-display text-6xl font-bold"
        >
          {slide.label}
        </motion.h2>
        {slide.tagline && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="font-body text-xl text-tint-300 mt-4"
          >
            {slide.tagline}
          </motion.p>
        )}
      </div>
    </div>
  )
}
`)

  // src/components/slides/StatGridSlide.tsx
  write(p('src/components/slides/StatGridSlide.tsx'),
`import { motion } from 'framer-motion'
import type { StatGridSlide as StatGridData } from '../../data/types.ts'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
}

export function StatGridSlide({ slide }: { slide: StatGridData }) {
  const cols = slide.columns ?? 3
  const colClass = cols === 2 ? 'grid-cols-2' : cols === 4 ? 'grid-cols-4' : 'grid-cols-3'
  return (
    <div className="w-full h-full flex flex-col justify-center px-16 py-12">
      {slide.headline && (
        <h2 className="font-display text-5xl font-bold mb-10">{slide.headline}</h2>
      )}
      <motion.div
        variants={container} initial="hidden" animate="show"
        className={\`grid \${colClass} gap-6\`}
      >
        {slide.stats.map(s => (
          <motion.div key={s.label} variants={item}
            className="border border-[var(--slide-border)] rounded-xl p-7"
            style={{ borderTop: '2px solid #0075C9' }}
          >
            <div className="font-display text-6xl font-bold text-crowe-blue mb-2">{s.value}</div>
            <div className="font-body text-sm text-[var(--slide-text-secondary)]">{s.label}</div>
            {s.source && (
              <div className="font-body text-xs text-tint-500 mt-2">{s.source}</div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
`)

  // src/components/slides/CtaSlide.tsx
  write(p('src/components/slides/CtaSlide.tsx'),
`import { motion } from 'framer-motion'
import type { CtaSlide as CtaData } from '../../data/types.ts'

export function CtaSlide({ slide }: { slide: CtaData }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-16 py-12 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="font-display text-6xl font-bold mb-4"
      >
        {slide.headline}
      </motion.h2>
      {slide.subheadline && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="font-body text-xl text-tint-300 mb-10"
        >
          {slide.subheadline}
        </motion.p>
      )}
      {slide.contacts && slide.contacts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="flex gap-8 justify-center"
        >
          {slide.contacts.map(c => (
            <div key={c.email} className="text-center">
              <div className="font-display font-bold text-lg">{c.name}</div>
              {c.role && <div className="font-body text-sm text-tint-300">{c.role}</div>}
              <a href={\`mailto:\${c.email}\`}
                className="font-body text-sm text-crowe-blue hover:text-crowe-blue-light transition-colors">
                {c.email}
              </a>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
`)

  // src/components/chrome/SlideNav.tsx
  write(p('src/components/chrome/SlideNav.tsx'),
`interface SlideNavProps {
  current: number
  total: number
  onPrev: () => void
  onNext: () => void
}

export function SlideNav({ current, total, onPrev, onNext }: SlideNavProps) {
  return (
    <div className="fixed bottom-6 right-8 flex items-center gap-4 z-50"
      data-slide-nav="true">
      <button
        onClick={onPrev}
        disabled={current === 0}
        className="font-body text-xs text-[var(--slide-chrome-muted)] disabled:text-[var(--slide-chrome-disabled)] hover:text-[var(--slide-text)] transition-colors"
      >
        ←
      </button>
      <span
        className="font-body text-xs text-[var(--slide-chrome-muted)]"
        data-slide-count={String(total)}
      >
        {current + 1} / {total}
      </span>
      <button
        onClick={onNext}
        disabled={current === total - 1}
        className="font-body text-xs text-[var(--slide-chrome-muted)] disabled:text-[var(--slide-chrome-disabled)] hover:text-[var(--slide-text)] transition-colors"
      >
        →
      </button>
    </div>
  )
}
`)

  // src/components/chrome/ProgressBar.tsx
  write(p('src/components/chrome/ProgressBar.tsx'),
`interface ProgressBarProps { current: number; total: number }

export function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = ((current + 1) / total) * 100
  return (
    <div className="fixed top-0 left-0 right-0 h-0.5 bg-[var(--slide-progress-track)] z-50">
      <div
        className="h-full bg-crowe-blue transition-all duration-300"
        style={{ width: \`\${pct}%\` }}
      />
    </div>
  )
}
`)

  // src/App.tsx
  write(p('src/App.tsx'),
`import { AnimatePresence, motion } from 'framer-motion'
import { slides } from './data/slides.ts'
import { useKeyboardNav } from './hooks/useKeyboardNav.ts'
import { SlideNav } from './components/chrome/SlideNav.tsx'
import { ProgressBar } from './components/chrome/ProgressBar.tsx'
import { HeroSlide } from './components/slides/HeroSlide.tsx'
import { SectionDividerSlide } from './components/slides/SectionDividerSlide.tsx'
import { StatGridSlide } from './components/slides/StatGridSlide.tsx'
import { CtaSlide } from './components/slides/CtaSlide.tsx'
import type { Slide } from './data/types.ts'

function renderSlide(slide: Slide) {
  switch (slide.type) {
    case 'hero':            return <HeroSlide slide={slide} />
    case 'section-divider': return <SectionDividerSlide slide={slide} />
    case 'stat-grid':       return <StatGridSlide slide={slide} />
    case 'cta':             return <CtaSlide slide={slide} />
    default:                return <div className="p-16 font-body">Slide type not implemented</div>
  }
}

export default function App() {
  const { current, setCurrent, total } = useKeyboardNav(slides.length)

  return (
    <div className="w-screen h-screen overflow-hidden" style={{ background: 'var(--slide-bg)', color: 'var(--slide-text)' }}>
      <ProgressBar current={current} total={total} />
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          data-slide={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full"
        >
          {renderSlide(slides[current])}
        </motion.div>
      </AnimatePresence>
      <SlideNav
        current={current}
        total={total}
        onPrev={() => setCurrent(c => Math.max(c - 1, 0))}
        onNext={() => setCurrent(c => Math.min(c + 1, total - 1))}
      />
    </div>
  )
}
`)

  // AGENT.md — always written
  write(p('AGENT.md'), getAgentMdContent()
    .replace('[DECK NAME]', deckTitle)
    .replace('[e.g., "Empower CU — Compliance AI Pitch"]', deckTitle)
    .replace('[e.g., "Empower Credit Union — CFO and Compliance team"]', client ?? 'TBD')
  )

  const writtenFiles: string[] = ['AGENT.md']

  // Agent-specific context files
  if (agent === 'claude-code') {
    write(p('CLAUDE.md'), getAgentMdContent()
      .replace('[DECK NAME]', deckTitle)
      .replace('[e.g., "Empower CU — Compliance AI Pitch"]', deckTitle)
      .replace('[e.g., "Empower Credit Union — CFO and Compliance team"]', client ?? 'TBD')
    )
    writtenFiles.push('CLAUDE.md')
  }

  if (agent === 'codex') {
    write(p('.codex/README.md'), getAgentMdContent()
      .replace('[DECK NAME]', deckTitle)
    )
    writtenFiles.push('.codex/README.md')
  }

  if (agent === 'cursor') {
    write(p('.cursorrules'), getAgentMdContent()
      .replace('[DECK NAME]', deckTitle)
    )
    writtenFiles.push('.cursorrules')
  }

  // public dirs
  fs.mkdirSync(p('public/images'), { recursive: true })
  fs.mkdirSync(p('public/logos'),  { recursive: true })
  fs.mkdirSync(p('public/fonts'),  { recursive: true })

  // scripts dir
  fs.mkdirSync(p('scripts'), { recursive: true })

  const fileList = [
    'package.json', 'tsconfig.json', 'vite.config.ts', 'tailwind.config.ts',
    'postcss.config.js', 'index.html',
    'src/main.tsx', 'src/index.css', 'src/App.tsx',
    'src/data/types.ts', 'src/data/config.ts', 'src/data/slides.ts',
    'src/lib/utils.ts',
    'src/hooks/useKeyboardNav.ts',
    'src/components/slides/HeroSlide.tsx',
    'src/components/slides/SectionDividerSlide.tsx',
    'src/components/slides/StatGridSlide.tsx',
    'src/components/slides/CtaSlide.tsx',
    'src/components/chrome/SlideNav.tsx',
    'src/components/chrome/ProgressBar.tsx',
    ...writtenFiles,
  ]

  return `Deck project scaffolded at: ${projectPath}

Files created:
${fileList.map(f => `  ${f}`).join('\n')}

Directories created:
  public/images/   ← drop generated images here
  public/logos/    ← drop downloaded logos here
  public/fonts/    ← Helvetica Now woff2 files if licensed
  scripts/         ← export-pdf.ts goes here

Next steps:
1. cd "${projectPath}"
2. npm install
3. Edit src/data/slides.ts with your content
4. npm run dev
5. npm run build → dist/index.html (single portable file)

Note: Install clsx and tailwind-merge before running:
  npm install clsx tailwind-merge
`
}
