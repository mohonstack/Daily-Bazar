<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Daily Bazar (বাজার দর / BazarDor)

Daily market price tracker for Bangladesh. Next.js 16 App Router + better-auth + MongoDB.
All user-facing copy is **Bengali**; numbers are formatted with `Intl.NumberFormat('bn-bd')`.

> `README.md` is untouched create-next-app boilerplate. The real project description is in `redme.md`.

## Commands

| Task | Command |
|---|---|
| Dev server (Turbopack) | `npm run dev` — port 3000, falls back to 3001 if 3000 is taken |
| Production build | `npm run build` (also runs `tsc`) |
| Serve build | `npm run start` |
| Lint | `npm run lint` — plain ESLint CLI; `next lint` was removed in Next 16 |
| Typecheck | `npx tsc --noEmit` — **no `typecheck` script exists** |

- There is **no test suite, no CI workflow, no Prettier, no husky**. Don't invent commands for them.
- `npm run lint` currently exits 0 with 6 pre-existing `no-unused-vars` warnings (`category/[slug]/page.tsx`, `sign-in/page.tsx`). Don't treat those as regressions; new errors do matter.
- On this Windows box PowerShell's execution policy was blocking `npm.ps1`; it is now set to `RemoteSigned` (`CurrentUser` scope). If `npm` ever fails with "running scripts is disabled on this system" again, either re-run `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned -Force` or use `npm.cmd` / `npx.cmd`.

## Where things live

- `src/app/**` — App Router pages. `src/component/**` — shared components. `src/lib/**` — auth + data. `src/type.ts` — API types. `src/proxy.ts` — route guard.
- **Product data is not in the database.** All prices come from the external API `https://api.api-store.workers.dev` via `fetchBazardorData<T>()` in `src/lib/bazardor-api.ts`. MongoDB is used *only* by better-auth.
  - Endpoints in use: `/api/bazardor/products`, `/api/bazardor/products?category={slug}`, `/api/bazardor/products/{id}`, `/api/bazardor/categories`, `/api/bazardor/categories/{slug}`.
  - The upstream API is untyped; `Icategories` / `IcategoryProducts` in `src/type.ts` are hand-maintained casts. Update them when the payload changes.
- **Auth**: server instance `src/lib/auth.ts` (betterAuth + `mongodbAdapter`, db `bazar-dor-project`), client `src/lib/auth-client.ts` (exports `signIn`, `signUp`, `signOut`, `useSession`, `updateUser`), handler `src/app/api/auth/[...all]/route.ts`.

## Next 16 rules this repo depends on

- `cacheComponents: true` (PPR) is on. The repo pattern: an async `*Content` server component calls `await connection()` and the page wraps it in `<Suspense>`. **Uncached data outside `<Suspense>` fails the build.** The only cached fetch helper is `fetchBazardorData` (`"use cache"` + `cacheLife("minutes")`).
- Request APIs are async-only: `await params`, `await headers()`, `await cookies()`. `params` in page/layout/route props is a Promise.
- `middleware.ts` is now `src/proxy.ts`; the export must be named `proxy`, and the Node runtime is the only option (`runtime` config throws).
- `next build` no longer lints, and `next build`/`next dev` use separate output dirs (`.next` vs `.next/dev`).
- Typed route helpers (`PageProps<"/route">`, `LayoutProps<"/">`) come from `npx next typegen`; `src/app/layout.tsx` already uses `LayoutProps<"/">`.

## Auth guard

`src/proxy.ts` redirects unauthenticated users to `/sign-in` for matcher `["/productDetails/:path", "/profile"]`.
`:path` matches **one** path segment only. When adding a protected route, add it to that matcher — the proxy is the only enforcement, there is no per-page check.

## Environment

`.env` is gitignored but must exist locally. Required keys: `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `MONGODB_CLIENT_URL`, `GOOGLE_SIGNIN_CLIENT_ID`, `GOOGLE_SIGNIN_CLIENT_SECRET`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`.
OAuth providers need callbacks registered at `/api/auth/callback/google` and `/api/auth/callback/github`.

## Conventions

- Tailwind v4, CSS-first — there is no `tailwind.config.js`. `src/app/globals.css` holds `@import "tailwindcss"`, `@plugin "daisyui"`, `@import "@heroui/styles"`. Both daisyUI and HeroUI v3 are in use (e.g. `btn`/`select` classes on HeroUI components); removing either one breaks styling.
- HeroUI v3 API (`@heroui/react`) differs from v2 — there is no `HeroUIProvider` in the root layout.
- Green-based palette (`bg-green-600`, `#008a45`) is the brand color.
- `next/image` is used for local assets in `src/assets`; `images.remotePatterns` allows any https host.
- Font: `Noto_Serif_Bengali` from `next/font/google` in the root layout.
