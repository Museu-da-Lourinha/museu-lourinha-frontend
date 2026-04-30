# Museu da Lourinha - Frontend

Museum website built with Next.js, React, and Strapi CMS.

## Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS 4
- **i18n**: next-intl (locales: `pt` default, `en`)
- **Data**: GraphQL via graphql-request, Strapi CMS backend
- **Package manager**: npm

## Project Structure

```
src/
  app/[locale]/        # Locale-scoped pages (App Router)
  components/          # React components
  i18n/                # next-intl config (routing, navigation, request)
  lib/                 # Utilities (Strapi GraphQL client)
messages/              # Translation JSON files (en.json, pt.json)
```

## Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run lint     # ESLint
```

## Path Alias

`@/*` maps to `./src/*`

## Conventions

- Use `"use client"` directive only when components need browser APIs or React hooks
- Translations go in `messages/{locale}.json`; access via `useTranslations()` from next-intl
- GraphQL queries to Strapi use the client in `src/lib/strapi.ts`
- Shared Strapi types live in `src/types/strapi.ts`
- Fonts: Dosis (`--font-dosis`) for headings, Barlow (`--font-barlow`) for body
- All URLs are locale-prefixed (`/pt/...`, `/en/...`)
- Environment variable: `NEXT_PUBLIC_STRAPI_URL` (default: `http://localhost:1337`)

## Pull Requests

PRs must follow this format:

**Title:** `[TICKET-123] Short description of what was done`

**Body:**
```
## Description
What was done in this PR.

## Motivation
Why this change was needed -- the problem it solves or the goal it achieves.

## Files Changed
- `path/to/file.tsx` -- what changed and why
- `path/to/other.ts` -- what changed and why

## Test Plan
- [ ] How to verify this works
```

Always include the ticket number in the title. The description explains **what**, the motivation explains **why**, and the file list gives reviewers a guided tour of the changes.

## Documentation

The project manual at `docs/claude-code-guide.md` is written for high school interns. It is automatically updated before every PR via a hook. You can also trigger it manually with `@docs`. When documenting, write in Portuguese, explain technical terms simply, and always explain **why** a decision was made, not just what was done.
