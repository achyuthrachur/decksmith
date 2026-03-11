---
name: animation-components
description: Animated UI component installation and usage. Load when building
             animated heroes, scroll reveals, tilt cards, text effects, spotlight
             cards, count-up stats, or any visual effect from 21st.dev or React Bits.
             Also covers Anime.js v4 API (v4 is a complete rewrite from v3),
             motion/react v12 for React Bits, and the AnimationShell pattern
             for Next.js Server Components.
version: "1.0"
owner: AI Innovation Team
---

# Animation & Components

---

## HOW TO INSTALL COMPONENTS

### From 21st.dev
Every component on 21st.dev has a copy-ready shadcn install command.
Pattern: `npx shadcn@latest add "https://21st.dev/r/[author]/[component]"`

Browse at https://21st.dev — find what you want, click the CLI install button.
Always use the CLI command, not manual copy-paste — it handles all dependencies.

```bash
# Example — animated hero text from 21st.dev
npx shadcn@latest add "https://21st.dev/r/aceternity/hero-text"

# Example — tilt card
npx shadcn@latest add "https://21st.dev/r/shadcn/tilt-card"
```

### From React Bits
Pattern: `npx shadcn@latest add @react-bits/[ComponentName]-TS-TW`

Always use the **TS-TW** variant (TypeScript + Tailwind) for this stack.

```bash
# Text animations
npx shadcn@latest add @react-bits/BlurText-TS-TW
npx shadcn@latest add @react-bits/SplitText-TS-TW
npx shadcn@latest add @react-bits/GradientText-TS-TW
npx shadcn@latest add @react-bits/CountUp-TS-TW
npx shadcn@latest add @react-bits/CircularText-TS-TW

# Cards and containers
npx shadcn@latest add @react-bits/TiltedCard-TS-TW
npx shadcn@latest add @react-bits/SpotlightCard-TS-TW
npx shadcn@latest add @react-bits/AnimatedList-TS-TW

# Backgrounds
npx shadcn@latest add @react-bits/Aurora-TS-TW
npx shadcn@latest add @react-bits/Particles-TS-TW

# Cursors and interactions
npx shadcn@latest add @react-bits/Magnet-TS-TW
```

After install, components live in `src/components/ui/` — they are yours to modify.

---

## REACT BITS — USAGE PATTERNS

### BlurText (hero headline word-by-word reveal)
```tsx
import BlurText from '@/components/ui/BlurText';

<BlurText
  text="Test your OFAC screening before your client does."
  delay={150}
  animateBy="words"
  direction="top"
  className="text-5xl font-bold text-white"
/>
```

### TiltedCard (3D mouse-tracking tilt)
**IMPORTANT**: Stock TiltedCard is image-only (uses `<figure>` + `<motion.img>`).
For a children-based wrapper, extract the `useMotionValue`/`useSpring` pattern:
```tsx
import { useMotionValue, useSpring, motion } from 'motion/react';

// Use motion/react (v12), NOT framer-motion
```

### SpotlightCard (spotlight follows cursor)
```tsx
import SpotlightCard from '@/components/ui/SpotlightCard';

<SpotlightCard
  className="bg-[#011E41] border border-white/10 rounded-xl p-6"
  spotlightColor="rgba(245, 168, 0, 0.15)"  // Crowe amber spotlight
>
  {children}
</SpotlightCard>
```

### CountUp (animated number counter)
```tsx
import CountUp from '@/components/ui/CountUp';

<CountUp
  from={0}
  to={285}
  duration={2}
  className="text-4xl font-bold text-amber-400"
/>
```

### Aurora (animated gradient background)
```tsx
import Aurora from '@/components/ui/Aurora';

// For Crowe projects — use indigo/amber tones
<Aurora
  colorStops={["#011E41", "#002E62", "#F5A800"]}
  blend={0.4}
  amplitude={0.8}
  speed={0.4}
/>
```

---

## MOTION/REACT V12 — KEY FACTS

React Bits components use **`motion/react`** (v12), NOT `framer-motion`.
These are different packages. Import from the correct one:

```tsx
// ✅ CORRECT for React Bits components
import { motion, AnimatePresence, useMotionValue, useSpring } from 'motion/react';

// ❌ WRONG — framer-motion is the old package name
import { motion } from 'framer-motion';
```

Check package.json — if both are listed, React Bits components need `motion/react`.

### Common patterns:
```tsx
// Fade + slide entrance
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
>

// Staggered list
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

// Exit animations (wrap parent in AnimatePresence)
<AnimatePresence mode="popLayout">
  {items.map(item => <motion.div key={item.id} exit={{ opacity: 0, x: -20 }} />)}
</AnimatePresence>
```

---

## ANIME.JS V4 — COMPLETE API REFERENCE

**V4 is a complete rewrite from v3. If you see v3 code, migrate it.**

### V3 → V4 Migration
| V3 (WRONG) | V4 (CORRECT) |
|-----------|-------------|
| `anime({})` | `animate()` |
| `translateX: 100` | `x: 100` |
| `easeOutExpo` | `outExpo` or `out(4)` |
| `anime.timeline()` | `createTimeline()` |
| `anime.stagger()` | `stagger()` from utils |
| `anime.set()` | `utils.set()` |

### Install
```bash
npm install animejs  # v4 — NOT animejs@3
```

### Import (named imports only — no default import)
```ts
import {
  animate,
  createTimeline,
  createScope,
  stagger,
  onScroll,
  utils
} from 'animejs';
```

### AnimationShell Pattern for Next.js (REQUIRED)
Next.js Server Components cannot use `useEffect`. Wrap animations in a thin
`'use client'` shell that scopes and cleans up correctly:

```tsx
// src/components/AnimationShell.tsx
'use client';
import { useEffect, useRef } from 'react';
import { createScope, animate, onScroll, stagger } from 'animejs';

interface AnimationShellProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimationShell({ children, className }: AnimationShellProps) {
  const root = useRef<HTMLDivElement>(null);
  const scope = useRef<ReturnType<typeof createScope> | null>(null);

  useEffect(() => {
    scope.current = createScope({ root: root as any }).add(() => {
      // Staggered entrance for direct children
      animate('.animate-in', {
        opacity: [0, 1],
        y: [30, 0],
        duration: 600,
        delay: stagger(80),
        ease: 'outQuint',
      });

      // Scroll-triggered reveals
      animate('.scroll-reveal', {
        opacity: [0, 1],
        y: [40, 0],
        duration: 700,
        ease: 'outQuint',
        autoplay: onScroll({
          enter: 'bottom 85%',
          onEnterForward: () => {},  // fires only on downward scroll
        }),
      });
    });

    // CRITICAL: always revert to prevent memory leaks
    return () => scope.current?.revert();
  }, []);

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
```

**Usage**: Wrap any Server Component section that needs animation:
```tsx
// In a Server Component (page.tsx)
import { AnimationShell } from '@/components/AnimationShell';

<AnimationShell>
  <div className="animate-in">This fades in on load</div>
  <div className="scroll-reveal">This reveals on scroll</div>
</AnimationShell>
```

### Common Patterns

**Count-up on scroll enter:**
```ts
animate('.stat-number', {
  innerHTML: [0, 285],
  round: 1,
  duration: 2000,
  ease: 'outExpo',
  autoplay: onScroll({ enter: 'bottom 80%', onEnterForward: () => {} }),
});
```

**Staggered form entrance:**
```ts
animate('.form-item', {
  opacity: [0, 1],
  y: [16, 0],
  duration: 400,
  delay: stagger(60),
  ease: 'outQuad',
});
```

**Amber CTA pulse (use sparingly — one element max):**
```ts
animate('.cta-button', {
  boxShadow: [
    '0 0 0 0 rgba(245, 168, 0, 0)',
    '0 0 0 12px rgba(245, 168, 0, 0.3)',
    '0 0 0 0 rgba(245, 168, 0, 0)',
  ],
  duration: 2000,
  loop: true,
  ease: 'outQuad',
});
```

**CRITICAL RULES:**
- Use `onEnterForward` (NOT `onEnter`) for play-once scroll reveals
- Always call `scope.revert()` in cleanup to prevent memory leaks
- Always use `createScope({ root: ref })` in React — never raw selectors without scope
- Tailwind v4: color tokens must be in `@theme` inline block, not just `:root`

---

## SKILL MENU — WHEN TO USE WHAT

| Effect needed | Tool |
|--------------|------|
| Word-by-word hero text reveal | React Bits `BlurText` |
| Stat cards with 3D tilt | React Bits `TiltedCard` (custom StatTiltCard) |
| Form cards with spotlight | React Bits `SpotlightCard` |
| Animated gradient background | React Bits `Aurora` |
| Number count-up on scroll | React Bits `CountUp` OR Anime.js `innerHTML` |
| Scroll-triggered fade-in | Anime.js v4 `onScroll` + `onEnterForward` |
| Staggered entrance (list/grid) | Anime.js v4 `stagger()` |
| CTA glow pulse | Anime.js v4 `boxShadow` loop |
| Exit / unmount animation | `motion/react` `AnimatePresence` |
| Layout shift animation | `motion/react` `layout` prop |
| Hover lift on card | CSS `transition` + `hover:translate-y-[-2px]` |
| Simple state transition | CSS `transition` (no library needed) |

---

## CROWE COLOR ADAPTATION FOR COMPONENTS

After installing any React Bits or 21st.dev component, replace their default
accent colors with Crowe tokens before wiring into the UI:

```tsx
// Aurora — replace generic colors
colorStops={["#011E41", "#002E62", "#F5A800"]}  // Crowe Indigo + Amber

// SpotlightCard — amber spotlight
spotlightColor="rgba(245, 168, 0, 0.15)"

// BlurText — ensure text inherits Crowe color
className="text-white"  // or text-[#011E41] on light backgrounds

// CountUp — amber number
className="text-[#F5A800] font-bold"
```

Never leave default purple/blue/green accent colors from component libraries
in Crowe-branded work.
