<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Daily Bazar (বাজার দর / BazarDor)

Daily market price tracker for Bangladesh. Next.js 16.4 App Router (Turbopack) + better-auth + MongoDB.
All user-facing copy is **Bengali**; numbers are formatted with `Intl.NumberFormat('bn-bd')`.

`README.md` is untouched create-next-app boilerplate. The real project description is `redme.md`.

## Commands

| Task | Command |
|---|---|
| Dev server (Turbopack) | `npm run dev` — port 3000 by default (`-p` to change) |
| Production build | `npm run build` — Turbopack build, also type-checks (unless `typescript.ignoreBuildErrors`) |
| Serve build | `npm run start` |
| Lint | `npm run lint` — plain ESLint CLI; `next lint` was removed in Next 16 |
| Typecheck only | `npx tsc --noEmit` — **no `typecheck` script exists** |
| Route typegen | `npx next typegen` — regenerates `PageProps<>` / `LayoutProps<>` |

- **No test suite, no CI workflow, no Prettier, no husky.** Don't invent commands for them.
- `npm run lint` exits **0** with 6 pre-existing `@typescript-eslint/no-unused-vars` warnings (1 in `category/[slug]/page.tsx`, 5 in `sign-in/page.tsx`). Don't treat those as regressions; new errors do matter.
- PowerShell: use `npm.cmd` / `npx.cmd` (the `npm.ps1` shim is blocked by the execution policy). `npm.cmd` also writes `npm notice` to **stderr**, which PowerShell surfaces as a `NativeCommandError` — it is not a failure. Redirect with `*> $null` when you only need the exit code.
- `next dev` picks the next free port if 3000 is taken (e.g. 3002), and **refuses to start a second dev server for the same project** — it prints the existing server's URL/PID and exits. Check `.next/dev/lock` (or the message) before starting one; don't kill an existing session.
- `npm run build` does **not** require MongoDB credentials or a `.env` file (see Environment). It fails only on real code errors.

## Architecture

**Product data is not in the database.** All prices come from the external API `https://api.api-store.workers.dev` via `fetchBazardorData<T>()` in `src/lib/bazardor-api.ts`. MongoDB is used *only* by better-auth.

- Endpoints in use: `/api/bazardor/products`, `/api/bazardor/products?category={slug}`, `/api/bazardor/products/{id}`, `/api/bazardor/categories`, `/api/bazardor/categories/{slug}`.
- The upstream API is untyped; `Icategories` / `IcategoryProducts` in `src/type.ts` are hand-maintained casts — update them when the payload changes. Verified shapes: product `id` is a **number**, category `id` is a **string** slug, and `image` / `icon` are **emoji strings** (render as text, never via `next/image`).

Routes:

| Route | File | Notes |
|---|---|---|
| `/` | `src/app/page.tsx` | server component, Suspense-wrapped |
| `/category/[slug]` | `src/app/category/[slug]/page.tsx` | `slug` is the category slug (`mach`, `dal`, `sobji`, …) |
| `/productDetails/[id]` | `src/app/productDetails/[id]/page.tsx` | `id` is the numeric product id |
| `/profile` | `src/app/profile/page.tsx` | client component, protected |
| `/sign-in`, `/sign-up` | `src/app/sign-in/page.tsx`, `src/app/sign-up/page.tsx` | client components |

- There is **no** `not-found.tsx`, `loading.tsx`, or `error.tsx`. `redme.md` advertises custom 404 pages and loading skeletons, but the app actually uses inline Suspense fallbacks (an empty `min-h-96` `div` with `aria-hidden="true"`). Don't go looking for those files.
- `src/app/layout.tsx` still carries the create-next-app `metadata` (`title: "Create Next App"`) — fix it if you touch metadata.
- `src/app/api/auth/[...all]/route.ts` is the only API route; everything else is pages.

### Server → client data flow

`src/lib/bazardor-api.ts` is server-only (`"use cache"` + `next/cache`). Fetch in a **server** component and pass the result down as props.

- `src/component/Navbar.tsx` is `"use client"`, but the layout's `NavbarData()` server component fetches categories + all products and passes them in as props.
- `src/component/SortingDropdown.tsx` is `"use client"` and receives the whole `IcategoryProducts[]` array as a prop (it sorts client-side, so the full list is serialized into the RSC payload).
- `src/component/Category-Product.tsx` has no `"use client"` but is imported from both server and client components, so it ends up in the client bundle.

## Next 16 rules this repo depends on

`next.config.ts`: `cacheComponents: true`, `partialPrefetching: true`, `reactCompiler: true`, `images.remotePatterns` allows any https host.

- **PPR / cache components.** The repo pattern: an async `*Content` server component calls `await connection()` and the page wraps it in `<Suspense>`. Uncached data outside `<Suspense>` fails the build with a "blocking prerender" error offering three fixes: wrap in `<Suspense>`, cache with `"use cache"` (not possible for `connection()`), or `export const instant = false` to allow a blocking route.
- The only cached fetch helper is `fetchBazardorData` (`"use cache"` + `cacheLife("minutes")`). Cached for minutes, so upstream API changes take a few minutes to show up.
- React Compiler is on — don't hand-write `useMemo` / `useCallback` for performance.
- Request APIs are async-only: `await params`, `await headers()`, `await cookies()`. `params` in page/layout/route props is a Promise.
- `middleware.ts` is now `src/proxy.ts`; the export must be named `proxy`, and the Node runtime is the only option (a `runtime` config throws).
- `next build` no longer lints, and `next build` / `next dev` use separate output dirs (`.next` vs `.next/dev`), so they can run concurrently.
- Typed route helpers (`PageProps<"/route">`, `LayoutProps<"/">`) come from `npx next typegen`; `src/app/layout.tsx` already uses `LayoutProps<"/">`.
- `next dev` forwards browser console errors to the terminal and writes its PID/port to `.next/dev/lock`.

## Auth

- Server: `src/lib/auth.ts` (betterAuth + `mongodbAdapter`, db `bazar-dor-project`). Client: `src/lib/auth-client.ts` (exports `signIn`, `signUp`, `signOut`, `useSession`, `updateUser`). Handler: `src/app/api/auth/[...all]/route.ts`.
- `src/proxy.ts` is the **only** route guard — it redirects unauthenticated users to `/sign-in` for matcher `["/productDetails/:path", "/profile"]`. `:path` matches **one** path segment only. When adding a protected route, add it to that matcher; there is no per-page check.

## Environment

`.env` is gitignored; `.env.example` is committed and lists every required key. Copy it to `.env` and fill it in:

`BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `MONGODB_CLIENT_URL`, `GOOGLE_SIGNIN_CLIENT_ID`, `GOOGLE_SIGNIN_CLIENT_SECRET`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`.

OAuth providers need callbacks registered at `/api/auth/callback/google` and `/api/auth/callback/github`.

**The build does not need `.env`** — `src/lib/auth.ts` creates the `MongoClient` lazily (behind a `Proxy`), so nothing touches MongoDB at import time. A missing `MONGODB_CLIENT_URL` only fails at **request** time, with the message "MONGODB_CLIENT_URL is not set…". `next build` prints a non-fatal better-auth warning about the missing secret/base URL and still succeeds, so don't mistake those warnings for build failures.

Note `.gitignore` uses `.env*`, which also matched `.env.example` — the `!.env.example` negation is required or the template can't be committed.

## Conventions

- UI copy is Bengali; numbers use `Intl.NumberFormat('bn-bd')` (a few files use `toLocaleString('bn-BD')` — prefer `Intl.NumberFormat`).
- Tailwind v4, CSS-first — there is no `tailwind.config.js`. `src/app/globals.css` holds `@import "tailwindcss"`, `@plugin "daisyui"`, `@import "@heroui/styles"`. CSS is loaded by the Turbopack rule in `next.config.ts` (`*.css` → `@tailwindcss/turbopack`), not by PostCSS.
- Both daisyUI and HeroUI v3 are in use — the `btn` / `select` classes on HeroUI components come from daisyUI; removing either one breaks styling.
- HeroUI v3 API (`@heroui/react`) differs from v2 — there is no `HeroUIProvider` in the root layout.
- Green-based palette (`bg-green-600` / `bg-green-700`, `#008a45`) is the brand color.
- Font: `Noto_Serif_Bengali` from `next/font/google` in the root layout.
- Local images via `next/image` from `src/assets`.
