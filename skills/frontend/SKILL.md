---
name: frontend
description: UI design and component development standards. Load when building
             any React component, page, layout, or visual element. Covers aesthetic
             direction, theming, layout composition, and component rules.
             For animation and 21st.dev/React Bits components, also load
             animation-components/SKILL.md.
             Always pair with branding/SKILL.md for Crowe projects.
version: "2.0"
owner: AI Innovation Team
---

# Frontend Design

---

## BEFORE WRITING ANY CODE — MAKE THESE THREE DECISIONS

### 1. Aesthetic Direction
Pick one and name it in a comment at the top of the component:
- Brutalist / raw
- Editorial / magazine
- Luxury / refined
- Retro-futuristic / synthwave
- Organic / natural
- Neo-brutalism (chunky borders, bold colors, visible shadows)
- Swiss / typographic
- Glassmorphism / layered depth
- Scandinavian / airy
- Playful / geometric

### 2. Color Strategy
- **Crowe projects** → load `branding/SKILL.md`, map palette to CSS variables
- **Non-Crowe projects** → pick one dominant + one sharp accent. Never distribute evenly.
- Always define: `--background` `--foreground` `--accent` `--muted` `--border` `--destructive`

### 3. Typography Pairing (two fonts, commit to them)
- **Display**: Clash Display · Cabinet Grotesk · Satoshi · Syne · Bricolage Grotesque · Playfair Display · Fraunces · DM Serif Display · Archivo Black · Unbounded
- **Body**: Outfit · Plus Jakarta Sans · Geist Sans · Source Sans 3 · Libre Franklin · Work Sans · IBM Plex Sans
- **Mono**: JetBrains Mono · Geist Mono · IBM Plex Mono
- Weight contrast: 200 vs 800 (never 400 vs 600)
- Size jumps: 3x+ between body and headings

---

## THEMING

Always implement both light AND dark themes:
- Use CSS variables scoped to `[data-theme="light"]` and `[data-theme="dark"]`
- Dark mode ≠ inverted colors — design it intentionally
  - No pure `#fff` on pure `#000`
  - Shadows become glows or subtle light borders
  - Accent colors may need legibility adjustments on dark backgrounds
- Include a theme toggle in all layout components
- Both themes must feel equally polished — dark is not an afterthought

---

## ANIMATION

Load `.claude/skills/animation-components/SKILL.md` for:
- Specific component install commands from 21st.dev and React Bits
- Anime.js v4 API patterns (v4 is a complete rewrite — NOT the same as v3)
- motion/react (v12) usage for React Bits components
- AnimationShell pattern for Next.js Server Components

Quick reference:
- **Simple hover/focus** → CSS transitions only
- **Staggered entrance / scroll reveal / count-up** → Anime.js v4
- **React layout animations, exit animations** → motion/react (v12)
- **Word-by-word text reveal, tilt cards, spotlight** → React Bits via shadcn CLI
- **Performance rule**: Only animate `transform` and `opacity`. Never `width`, `height`, `top`, `left`, or `margin`.
- **Restraint**: 3–5 high-impact animation moments per page max

---

## LAYOUT & COMPOSITION

- Break the grid intentionally — overlapping elements, asymmetric layouts, generous negative space
- Let hero sections and decorative elements break out of `max-w-` containers
- Vertical rhythm: `py-20+` for major sections (not `py-8`)
- Cards: `p-6` minimum, `p-8–12` for featured elements
- Treat the scroll experience as a narrative — each section is a new beat

---

## BACKGROUNDS & DEPTH

Never use flat solid backgrounds. Layer in:
- Gradient meshes
- Noise/grain textures via SVG filter or CSS
- Dot grids or line patterns at low opacity
- Radial gradients following the content focus

Use `backdrop-blur` and layered transparency for glassmorphism effects.
Shadows: large, soft, tinted — never generic gray `shadow-lg`.

---

## COMPONENT RULES

- **shadcn/ui** as base — always restyle aggressively. Never ship default shadcn.
- **Icons**: Lucide React only (unless project uses iconsax-reactjs — check package.json)
- **Fonts**: Load via `next/font/google` or `next/font/local`. Never use Inter, Roboto, Open Sans, Arial, or system-ui as primary fonts.
- **21st.dev / React Bits**: Install via `npx shadcn@latest add [url]` — see animation-components/SKILL.md

---

## CORE LIBRARY REFERENCE

| Need | Library | Install |
|------|---------|---------|
| Forms + validation | `react-hook-form` + `zod` | `npm install react-hook-form zod` |
| Charts / dashboards | `recharts` | `npm install recharts` |
| Tables | `@tanstack/react-table` | `npm install @tanstack/react-table` |
| Date handling | `date-fns` | `npm install date-fns` |
| Toasts | `sonner` | `npm install sonner` |
| Drag and drop | `@dnd-kit/core` | `npm install @dnd-kit/core` |
| Command palette | `cmdk` | via `npx shadcn@latest add command` |

---

## WHAT NOT TO DO

- ❌ No random color palette on Crowe projects — always load branding/SKILL.md first
- ❌ No purple-gradient-on-white hero sections
- ❌ No centered heading + subtitle + CTA button stack (most generic layout possible)
- ❌ No generic rounded card grids that look like every other AI-generated UI
- ❌ No unDraw or placeholder illustrations — use CSS/SVG art or real imagery
- ❌ No `text-gray-500` as muted text — use actual palette tones
- ❌ No default shadcn styling left untouched
- ❌ No motion without a reason — every animation earns its place
- ❌ Never use v3 Anime.js API (anime(), translateX, easeOutExpo) — see animation-components/SKILL.md
