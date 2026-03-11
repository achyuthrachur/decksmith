// Crowe design tokens — empower-deck v3.3
// These values must match exactly. Do not change without updating the reference deck.

export const croweColors = {
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
} as const

export const croweFontFamilies = {
  display: ['Helvetica Now Display', 'Plus Jakarta Sans', 'Arial', 'system-ui', 'sans-serif'],
  body:    ['Helvetica Now Text',    'Plus Jakarta Sans', 'Arial', 'system-ui', 'sans-serif'],
  mono:    ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
} as const

export const cssVariablesDark = `
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
`.trim()

export const cssVariablesLight = `
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
`.trim()

export const tailwindColorsBlock = `colors: {
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
},`
