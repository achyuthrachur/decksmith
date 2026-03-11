export const tailwindConfigUri = 'crowe://templates/tailwind-config';
export function getTailwindConfigContent() {
    return `import type { Config } from 'tailwindcss'

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
`;
}
//# sourceMappingURL=tailwind-config.js.map