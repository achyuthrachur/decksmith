---
name: deployment
description: Vercel deployment, GitHub Actions CI/CD pipeline setup, environment
             variable management, and project initialization. Load when deploying,
             setting up a new repo, configuring CI/CD, or managing secrets.
version: "1.0"
owner: AI Innovation Team
---

# Deployment

---

## NEW PROJECT INITIALIZATION

```bash
# 1. Create Next.js project
npx create-next-app@latest [name] --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd [name]

# 2. Core dependencies
npx shadcn@latest init
npm install motion
npm install -D husky lint-staged prettier prettier-plugin-tailwindcss

# 3. Pre-commit hooks
npx husky init
echo "npx lint-staged" > .husky/pre-commit

# 4. Push to GitHub
git add . && git commit -m "feat: initial project setup"
gh repo create achyuthrachur/[name] --public --source=. --remote=origin --push

# 5. Link to Vercel
vercel link
vercel env pull .env.local

# 6. Set CI/CD secrets
gh secret set VERCEL_TOKEN
gh secret set VERCEL_ORG_ID      # from .vercel/project.json
gh secret set VERCEL_PROJECT_ID  # from .vercel/project.json

# 7. Copy CLAUDE.md and .claude/ to project root
```

---

## VERCEL COMMANDS

```bash
vercel              # deploy to preview
vercel --prod       # deploy to production
vercel env pull     # sync env vars locally
vercel logs         # view deployment logs
```

---

## GITHUB ACTIONS — CI PIPELINE

Save as `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  pull_request:
    branches: [main]

jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm run test
      - run: npm run build
```

---

## GITHUB ACTIONS — AUTO DEPLOY

Save as `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

---

## REQUIRED GITHUB SECRETS

| Secret | Where to find it |
|--------|-----------------|
| `VERCEL_TOKEN` | vercel.com → Account Settings → Tokens |
| `VERCEL_ORG_ID` | `.vercel/project.json` after `vercel link` |
| `VERCEL_PROJECT_ID` | `.vercel/project.json` after `vercel link` |

---

## ENVIRONMENT VARIABLES

- Never commit `.env` or `.env.local`
- Use `vercel env pull .env.local` to sync secrets locally
- Add production secrets via `vercel env add` or the Vercel dashboard
- Prefix all client-side vars with `NEXT_PUBLIC_`
