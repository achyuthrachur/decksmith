export const motionPatternsUri = 'crowe://motion-patterns'

export function getMotionPatternsContent(): string {
  return `# Motion Patterns — Crowe Deck Builder

## Core Principle

Pick ONE dominant animation strategy per deck. Execute it consistently.
Never use all patterns in one deck — visual coherence > visual variety.

---

## Pattern 1: Staggered Card Reveal (bottom-up fade)

**Best for:** Data-heavy, analytical decks
**Library:** Framer Motion

\`\`\`tsx
import { motion } from 'framer-motion'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
}

function StatGrid({ stats }: { stats: StatItem[] }) {
  return (
    <motion.div variants={container} initial="hidden" animate="show"
      className="grid grid-cols-3 gap-6">
      {stats.map(s => (
        <motion.div key={s.label} variants={item} className="...">
          {/* stat card content */}
        </motion.div>
      ))}
    </motion.div>
  )
}
\`\`\`

---

## Pattern 2: Word-by-Word Text Split

**Best for:** Story-driven, editorial decks
**Library:** ReactBits SplitText

\`\`\`tsx
// Install: npx jsrepo add github/DavidHDev/react-bits SplitText
import SplitText from '@/components/reactbits/SplitText'

<SplitText
  text="Compliance AI for the Modern Credit Union"
  className="font-display text-7xl font-bold"
  delay={40}
  animationFrom={{ opacity: 0, transform: 'translate3d(0,40px,0)' }}
  animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
  threshold={0.2}
  rootMargin="-20px"
/>
\`\`\`

---

## Pattern 3: Kinetic Number CountUp

**Best for:** Stats-heavy decks
**Library:** ReactBits CountUp

\`\`\`tsx
// Install: npx jsrepo add github/DavidHDev/react-bits CountUp
import CountUp from '@/components/reactbits/CountUp'

<CountUp
  from={0}
  to={83}
  separator=","
  direction="up"
  duration={1.2}
  className="font-display text-6xl font-bold text-crowe-blue"
/>
\`\`\`

---

## Pattern 4: Slide Wipe (Horizontal Clip)

**Best for:** Product walkthroughs, step sequences
**Library:** Framer Motion

\`\`\`tsx
import { AnimatePresence, motion } from 'framer-motion'

<AnimatePresence mode="wait">
  <motion.div
    key={currentSlide}
    initial={{ clipPath: 'inset(0 100% 0 0)' }}
    animate={{ clipPath: 'inset(0 0% 0 0)' }}
    exit={{ clipPath: 'inset(0 0 0 100%)' }}
    transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
  >
    {/* slide content */}
  </motion.div>
</AnimatePresence>
\`\`\`

---

## Pattern 5: Scale + Blur Entrance

**Best for:** Luxury / executive decks
**Library:** Framer Motion

\`\`\`tsx
<motion.div
  initial={{ opacity: 0, scale: 0.94, filter: 'blur(12px)' }}
  animate={{ opacity: 1, scale: 1,    filter: 'blur(0px)' }}
  transition={{ duration: 0.6, ease: 'easeOut' }}
>
  {/* content */}
</motion.div>
\`\`\`

---

## Pattern 6: Particle / Aurora Ambient

**Best for:** Hero backgrounds
**Library:** ReactBits Aurora / Particles

\`\`\`tsx
// Install: npx jsrepo add github/DavidHDev/react-bits Aurora
import Aurora from '@/components/reactbits/Aurora'

<div className="relative w-full h-full">
  <Aurora
    colorStops={['#0075C9', '#002E62', '#011E41']}
    speed={0.8}
    amplitude={0.6}
    className="absolute inset-0 opacity-55"
  />
  <div className="relative z-10">
    {/* hero content */}
  </div>
</div>
\`\`\`

---

## Reduced Motion

Always respect \`prefers-reduced-motion\`:

\`\`\`tsx
import { useReducedMotion } from 'framer-motion'

function SlideTransition({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      initial={reduced ? {} : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reduced ? { duration: 0 } : { duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}
\`\`\`
`
}
