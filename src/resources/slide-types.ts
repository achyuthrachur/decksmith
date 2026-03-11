export const slideTypesUri = 'crowe://slide-types'

export function getSlideTypesContent(): string {
  return `// TypeScript type definitions for all Crowe deck slide data shapes
// Place this file at: src/data/types.ts

export type SlideType =
  | 'hero'
  | 'section-divider'
  | 'two-column'
  | 'stat-grid'
  | 'full-bleed'
  | 'timeline'
  | 'comparison'
  | 'quote'
  | 'team'
  | 'logo-showcase'
  | 'tabs'
  | 'step-sequence'
  | 'cta'

export interface BaseSlide {
  id: string
  type: SlideType
}

export interface HeroSlide extends BaseSlide {
  type: 'hero'
  headline: string
  subheadline?: string
  eyebrow?: string
  background?: string
  overlayOpacity?: number
}

export interface SectionDividerSlide extends BaseSlide {
  type: 'section-divider'
  sectionNumber?: string
  label: string
  tagline?: string
}

export interface TwoColumnSlide extends BaseSlide {
  type: 'two-column'
  headline: string
  leftContent: string | string[]
  rightContent: string | string[]
  eyebrow?: string
}

export interface StatItem {
  value: string
  label: string
  source?: string
}

export interface StatGridSlide extends BaseSlide {
  type: 'stat-grid'
  headline?: string
  stats: StatItem[]
  columns?: 2 | 3 | 4
}

export interface FullBleedSlide extends BaseSlide {
  type: 'full-bleed'
  headline: string
  subheadline?: string
  background: string
  overlayOpacity?: number
  position?: 'center' | 'bottom-left' | 'bottom-right'
}

export interface TimelineItem {
  date?: string
  label: string
  description?: string
}

export interface TimelineSlide extends BaseSlide {
  type: 'timeline'
  headline: string
  items: TimelineItem[]
}

export interface ComparisonRow {
  label: string
  before?: string
  after?: string
}

export interface ComparisonSlide extends BaseSlide {
  type: 'comparison'
  headline: string
  beforeLabel?: string
  afterLabel?: string
  rows: ComparisonRow[]
}

export interface QuoteSlide extends BaseSlide {
  type: 'quote'
  quote: string
  attribution?: string
  role?: string
}

export interface TeamMember {
  name: string
  role: string
  photo?: string
}

export interface TeamSlide extends BaseSlide {
  type: 'team'
  headline: string
  members: TeamMember[]
}

export interface LogoShowcaseSlide extends BaseSlide {
  type: 'logo-showcase'
  headline?: string
  logos: Array<{ src: string; alt: string }>
}

export interface TabItem {
  label: string
  headline?: string
  body: string | string[]
}

export interface TabsSlide extends BaseSlide {
  type: 'tabs'
  headline: string
  tabs: TabItem[]
}

export interface StepItem {
  number?: string
  headline: string
  description?: string
}

export interface StepSequenceSlide extends BaseSlide {
  type: 'step-sequence'
  headline: string
  steps: StepItem[]
}

export interface CtaSlide extends BaseSlide {
  type: 'cta'
  headline: string
  subheadline?: string
  ctaText?: string
  ctaUrl?: string
  contacts?: Array<{ name: string; email: string; role?: string }>
}

export type Slide =
  | HeroSlide
  | SectionDividerSlide
  | TwoColumnSlide
  | StatGridSlide
  | FullBleedSlide
  | TimelineSlide
  | ComparisonSlide
  | QuoteSlide
  | TeamSlide
  | LogoShowcaseSlide
  | TabsSlide
  | StepSequenceSlide
  | CtaSlide

export interface DeckConfig {
  title: string
  client?: string
  theme: 'dark' | 'light'
  accentColor: 'crowe-blue' | 'crowe-coral' | 'crowe-amber'
  slideCount: number
}
`
}
