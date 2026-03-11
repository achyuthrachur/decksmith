---
name: tech-stack
description: Default stack choices, dependencies, tooling config, and code style
             standards. Load when starting a new project, adding dependencies,
             configuring TypeScript/ESLint/Prettier, or making stack decisions.
version: "1.0"
owner: AI Innovation Team
---

# Tech Stack

---

## DEFAULT STACK

| Layer | Choice |
|-------|--------|
| Framework | Next.js 14+ (App Router, TypeScript) |
| Styling | Tailwind CSS + CSS Variables |
| Components | shadcn/ui |
| Animation | Motion (framer-motion) |
| State | React Context · Zustand (if needed) |
| Database | Prisma + PostgreSQL (Vercel Postgres or Supabase) |
| Auth | NextAuth.js or Clerk |
| Testing | Vitest + React Testing Library |
| Deployment | Vercel |
| Icons | Lucide React |

---

## TYPESCRIPT RULES

- Use `interface` for object shapes, `type` for unions/intersections
- Always type function parameters and return values explicitly
- Never use `any` — avoid type assertions unless absolutely necessary
- Use `unknown` over `any` when type is genuinely unknown

---

## REACT RULES

- Functional components with TypeScript props interfaces only
- Named exports (not default exports)
- Colocate styles, tests, and components in the same folder
- File naming: `PascalCase` for components (`Button/Button.tsx`), `kebab-case` for routes (`app/dashboard/page.tsx`)

---

## PRETTIER CONFIG

```json
{
  "tabWidth": 2,
  "singleQuote": true,
  "semi": true,
  "trailingComma": "es5",
  "printWidth": 100,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

---

## ESLINT CONFIG

Extend: `next/core-web-vitals` + `next/typescript`

Rules:
- No unused vars (ignore `_` prefix)
- No explicit `any`
- Prefer `const`

---

## TSCONFIG

Use default from `create-next-app` with `@/*` path alias mapped to `./src/*`.

---

## GIT WORKFLOW

**Branch naming:**
- `feature/[ticket]-description`
- `bugfix/[ticket]-description`
- `hotfix/description`
- `refactor/description`

**Commit format (Conventional Commits):**
- `feat:` new feature
- `fix:` bug fix
- `docs:` documentation only
- `style:` formatting, no logic change
- `refactor:` code restructure, no behavior change
- `test:` adding or updating tests
- `chore:` build process, dependencies

**Before every commit:** `npm run lint && npm run typecheck && npm run test`

**Pre-commit hooks:** Husky + lint-staged to auto-run ESLint and Prettier on staged files.
