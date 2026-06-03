@AGENTS.md

## Project
Ticket bounty, an app to create tickets — Next.js 16 App Router, TypeScript, Tailwind CSS.

## Commands
- Dev: npm run dev
- Build: npm run build
- Type check: npx tsc --noEmit
- Lint fix: npm eslint --fix

## Structure
src/app/              # Pages and layouts (App Router)
src/components/ui/    # Shared UI components (shadcn)

## Conventions
- Server Components by default; add "use client" only for useState/useEffect/browser APIs

## Gotchas
- Always await params in page components (Next.js 16 requirement)