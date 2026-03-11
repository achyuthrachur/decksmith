---
name: qa
description: Quality gates, testing strategy, linting, type checking, accessibility,
             and performance standards. Load before merging any PR, when writing
             tests, or when setting up quality tooling on a new project.
version: "1.0"
owner: AI Innovation Team
---

# QA & Quality Gates

---

## BEFORE MERGING ANY PR — FULL CHECKLIST

### Code Quality
- [ ] `npm run lint` — zero ESLint errors
- [ ] `npm run typecheck` — zero TypeScript errors
- [ ] `npm run test` — all tests pass
- [ ] `npm run build` — builds without errors

### Visual & UX
- [ ] Preview deployment works end-to-end
- [ ] Responsive design verified: mobile (375px) · tablet (768px) · desktop (1280px+)
- [ ] Both light and dark themes verified
- [ ] No console errors or warnings in browser

### Performance
- [ ] Lighthouse score > 90 on Performance, Accessibility, Best Practices
- [ ] No layout shift (CLS) on page load
- [ ] Images are optimized (use `next/image`)
- [ ] No unnecessary re-renders (check with React DevTools)

### Accessibility
- [ ] All images have `alt` text
- [ ] Interactive elements are keyboard-navigable
- [ ] Color contrast meets WCAG AA minimum
- [ ] Focus states are visible

---

## TESTING STRATEGY

### Unit Tests (Vitest)
- Test pure functions and utilities in `lib/`
- Test custom hooks in isolation
- Aim for coverage on business logic, not implementation details

```typescript
// Example
import { describe, it, expect } from 'vitest'
import { formatCurrency } from '@/lib/utils'

describe('formatCurrency', () => {
  it('formats a number as USD', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56')
  })
})
```

### Component Tests (React Testing Library)
- Test behavior, not implementation
- Query by role, label, or text — never by class or id
- Test what a user would actually do (click, type, submit)

```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

it('submits the form with correct data', async () => {
  render(<MyForm />)
  await userEvent.type(screen.getByLabelText('Email'), 'test@example.com')
  await userEvent.click(screen.getByRole('button', { name: /submit/i }))
  expect(screen.getByText('Success')).toBeInTheDocument()
})
```

### What NOT to Test
- ❌ Implementation details (internal state, private methods)
- ❌ Third-party library behavior
- ❌ Styles and CSS class names
- ❌ Snapshot tests (brittle, low signal)

---

## LINT-STAGED CONFIG

Add to `package.json`:

```json
"lint-staged": {
  "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{json,md,css}": ["prettier --write"]
}
```

---

## PACKAGE.JSON SCRIPTS

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "typecheck": "tsc --noEmit",
  "test": "vitest run",
  "test:watch": "vitest",
  "test:coverage": "vitest run --coverage"
}
```

---

## PERFORMANCE RULES

- Always use `next/image` for images — never raw `<img>` tags
- Always use `next/font` for fonts — never `<link>` tags in `<head>`
- Lazy load heavy components with `dynamic(() => import(...), { ssr: false })`
- Memoize expensive calculations with `useMemo`
- Memoize stable callbacks with `useCallback`
- Avoid putting large data sets in React state — use server components or SWR

---

## COMMON ISSUES TO CATCH IN REVIEW

- `useEffect` with missing dependencies
- Unhandled promise rejections
- Missing `key` props in lists
- Direct DOM manipulation instead of React state
- `console.log` left in production code
- Hardcoded secrets or API keys in source
- `any` type used as a shortcut
