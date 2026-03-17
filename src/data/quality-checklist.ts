// Quality checklist — Phase 4 from DECK-SKILL.md

export type ChecklistItem = {
  id: string
  category: 'brand' | 'content' | 'technical' | 'performance'
  description: string
}

export const qualityChecklist: ChecklistItem[] = [
  // Brand & Design
  { id: 'brand-font',          category: 'brand',       description: 'All text uses font-display or font-body — no system font fallbacks visible' },
  { id: 'brand-colors',        category: 'brand',       description: 'Crowe color tokens used — no hardcoded hex values outside tailwind.config.ts' },
  { id: 'brand-theme',         category: 'brand',       description: 'Dark/light theme toggle works; all elements switch cleanly' },
  { id: 'brand-logo',          category: 'brand',       description: 'Logo appears correctly on both themes (white on dark, color on light)' },
  { id: 'brand-padding',       category: 'brand',       description: 'Slide padding consistent: px-16 py-12 on standard slides' },
  { id: 'brand-chrome',        category: 'brand',       description: 'Progress bar and slide counter visible on all slides' },
  { id: 'brand-viewport',      category: 'brand',       description: 'No slide exceeds the viewport — no scrollbars' },

  // Content & Data
  { id: 'content-no-hardcode', category: 'content',     description: 'No content strings hardcoded in JSX — all from src/data/slides.ts' },
  { id: 'content-sources',     category: 'content',     description: 'All stats include sources' },
  { id: 'content-no-lorem',    category: 'content',     description: 'No lorem ipsum or "TBD" in the delivered deck' },
  { id: 'content-cta',         category: 'content',     description: 'Call to action slide has a clear, specific ask' },

  // Technical
  { id: 'tech-build',          category: 'technical',   description: 'vite build exits 0, zero errors' },
  { id: 'tech-singlefile',     category: 'technical',   description: 'Output is a single HTML file, all assets inlined' },
  { id: 'tech-keyboard',       category: 'technical',   description: 'Keyboard navigation works: ← → arrows, f fullscreen, t theme' },
  { id: 'tech-no-errors',      category: 'technical',   description: 'No console errors on load in Chrome' },
  { id: 'tech-email',          category: 'technical',   description: 'Opens correctly when sent as email attachment (no server needed)' },
  { id: 'tech-pdf',            category: 'technical',   description: 'PDF export captures all slides without animation artifacts' },

  // Performance
  { id: 'perf-filesize',       category: 'performance', description: 'File size < 50MB (audit for uncompressed images if over)' },
  { id: 'perf-first-slide',    category: 'performance', description: 'First slide renders immediately' },
  { id: 'perf-transitions',    category: 'performance', description: 'Slide transitions < 400ms' },

  // Interactive & Visualization (v20 patterns)
  { id: 'viz-chart-height',    category: 'technical',   description: 'Every Chart.js canvas is inside a position:relative height-constrained div; options include maintainAspectRatio:false' },
  { id: 'viz-chart-data',      category: 'content',     description: 'Charts show only metrics explicitly specified in interview — no baseline/comparison bars added without instruction' },
  { id: 'viz-chart-guard',     category: 'technical',   description: 'Chart initialization is guarded against re-render (ctx._ci flag or useRef check)' },
  { id: 'viz-chart-delay',     category: 'technical',   description: 'Charts inside animated panels delay render until panel animation completes (≥ animation duration ms)' },
  { id: 'int-card-style',      category: 'brand',       description: 'All cards in the same list/grid have identical default border and background — no single card visually differentiated by default' },
  { id: 'int-shimmer-hover',   category: 'brand',       description: 'Shimmer / border-beam / glow effects are hover-only (opacity:0 default, opacity:1 on :hover) — never always-on on any individual card' },
  { id: 'int-active-style',    category: 'brand',       description: 'Only the ACTIVE/SELECTED card gets an accent-colored border; all others revert to default immediately' },
  { id: 'int-spec-match',      category: 'content',     description: 'Every interactive slide behavior matches the behavioral spec written during interview (trigger, layout change, content, dismiss)' },
]
