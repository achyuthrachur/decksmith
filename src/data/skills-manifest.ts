// Skills manifest — drives skills sync and decksmith skills list command.
// Add new skills here when they're added to the skills/ directory.

export type SkillEntry = {
  name:         string    // folder name in skills/ (canonical, used for both agents)
  claudeAlias?: string    // old folder name in .claude/skills/ if it differs (for rename handling)
  displayName:  string    // human-readable (used in list output)
  description:  string    // one-liner
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
    claudeAlias: 'branding',
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
