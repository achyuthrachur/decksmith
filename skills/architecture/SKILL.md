---
name: architecture
description: Folder structure, routing patterns, state management, database setup,
             and API design. Load when scaffolding a new project, planning features,
             or making structural decisions about how the codebase is organized.
version: "1.0"
owner: AI Innovation Team
---

# Architecture

---

## DEFAULT FOLDER STRUCTURE

```
src/
  app/
    (routes)/           # Route groups (no URL segment)
    api/                # API routes
    layout.tsx          # Root layout
    page.tsx            # Root page
  components/
    ui/                 # Reusable UI primitives (shadcn + custom)
    features/           # Feature-specific components (colocated with logic)
  lib/
    utils.ts            # Shared utility functions
    db.ts               # Prisma client singleton
    auth.ts             # Auth config
  hooks/                # Custom React hooks
  types/                # Shared TypeScript types/interfaces
  styles/
    globals.css         # Global styles and CSS variables
```

---

## ROUTING PATTERNS

- Use **route groups** `(group)` to organize routes without affecting URL structure
- Use **parallel routes** `@slot` for complex dashboard layouts
- Use **intercepting routes** for modals that should have their own URL
- API routes live in `app/api/[route]/route.ts`
- Always use the App Router — never mix with Pages Router

---

## STATE MANAGEMENT

- **Local state**: `useState` / `useReducer` for component-level state
- **Shared state**: React Context for simple cross-component state
- **Complex/global state**: Zustand (add only when Context becomes unwieldy)
- **Server state**: React Query / SWR for data fetching and caching
- **Form state**: `react-hook-form` — never manage form state manually

---

## DATABASE PATTERNS (PRISMA)

```typescript
// lib/db.ts — always use singleton pattern
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

- Always use transactions for multi-step writes
- Never expose raw Prisma client to the client side
- Keep schema migrations in version control

---

## API DESIGN

- Use Next.js Route Handlers (`app/api/`)
- Validate all inputs with `zod` before processing
- Return consistent response shapes:
```typescript
// Success
{ data: T, error: null }

// Error
{ data: null, error: { message: string, code: string } }
```
- Use HTTP status codes correctly (200, 201, 400, 401, 403, 404, 500)
- Never expose stack traces or internal errors to the client

---

## ENVIRONMENT VARIABLES

```env
# Database
DATABASE_URL=

# Auth
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# Public (accessible client-side)
NEXT_PUBLIC_APP_URL=
```

- Prefix client-side vars with `NEXT_PUBLIC_`
- Store secrets in `.env.local` (never commit)
- Use `vercel env pull .env.local` to sync from Vercel
