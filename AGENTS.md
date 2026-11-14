# AGENTS.md

This file provides guidance to AI coding agents (Claude Code, Codex, etc.) working in this repository.

## Project

A pnpm monorepo for **`labdsnov`**, a public npm design system based on [shadcn/ui](https://ui.shadcn.com) (React 19 + TypeScript, Tailwind CSS v4). Its components come from the DSADV member-portal app (`~/Desktop/dsadv`, a Next.js 16 app for a Thai-language superannuation portal). The app keeps its own copies, so the two codebases are separate.

- `packages/ui`: the library (Badge, Button, Dialog, FundCard, Input, Label).
- `apps/storybook`: Storybook 10 for checking component props and states (private, not published). Only Button has stories so far; add the other components one at a time.
- Publishing is planned for a later milestone (Week 4). Don't `npm publish`/`pnpm publish`, and set `license`/access before doing so.

## Commands

```bash
pnpm install
pnpm build                          # every package (packages/ui: vite build, then tsc for .d.ts)
pnpm typecheck
pnpm lint                           # eslint (typescript-eslint + react-hooks) over the repo
pnpm format                         # prettier with prettier-plugin-tailwindcss
pnpm pack:dry                       # what labdsnov would publish
pnpm --filter labdsnov build        # one package
pnpm storybook                      # http://localhost:6006
pnpm build-storybook                # static build to apps/storybook/storybook-static
```

There's no unit-test runner. Verify changes with typecheck, lint, build, by inspecting `packages/ui/dist/` (see "Checking a build"), and in Storybook: story `play` functions are interaction checks, shown as pass/fail in the Interactions panel.

## Component conventions (`packages/ui/src/components/<Name>/`)

- **Base UI, not Radix.** Components wrap `@base-ui/react`. To render a custom element as a trigger/close, use the `render` prop (`<DialogTrigger render={<Button />}>`), not `asChild`. Icons are Hugeicons (`@hugeicons/react` + `@hugeicons/core-free-icons`), not lucide.
- **One folder per component:** `<Name>.tsx` + `<Name>.module.css` + `index.ts` (optional `<Name>.md` docs, in Thai).
- **`<Name>.tsx` has no Tailwind class strings.** It maps semantic props to module classes through a typed lookup (`const variantClass = { default: styles.variantDefault, … } as const`; the `XVariant` type is `keyof typeof variantClass`). It merges the caller's `className` last with `cn(styles.root, variantClass[variant], className)`, using the `cn` package (shadcn's clsx + tailwind-merge replacement), and sets `data-slot`/`data-variant`/`data-size`. To add a look, add a prop and a module class; there is no `cva`.
- **`<Name>.module.css`** starts with `@reference "../../styles/reference.css";` and `@layer theme, base, components, utilities;`. All rules go in `@layer components { … }` using `@apply`, so a consumer's Tailwind utilities passed via `className` always win.
  - Don't `@apply` `dark:`, `group-*:` or `peer-*:` in modules, because CSS Modules would rename `.dark`/`.group`/`.peer`. Write `:global(.dark) .x { @apply … }` instead.
  - Keep state rules (focus, invalid, disabled) after variant rules.
- **Shipped UI copy is Thai** (e.g. the Dialog close label "ปิด"). FundCard formats AUD and dates with `Intl` in the `th-TH` locale.
- **Public API = `src/index.ts`.** Renaming or removing an export, prop or variant is a breaking change.
- **`"use client"`** goes on any component that calls hooks or React context (Badge, Dialog, Label). Base UI primitives already carry their own directive.

## Styles and tokens

- `src/styles/theme.css` holds the tokens: `:root`/`.dark` colour and radius variables, `@theme inline` mapping, the `dark` custom variant, and the `tw-animate-css` + `shadcn/tailwind.css` imports. It's copied from the app's `src/app/globals.css`, so keep the values in sync with it. Tailwind v4 has no `tailwind.config`.
- `src/styles/reference.css` is used only at build time (`tailwindcss` + `theme.css`) so modules can `@apply`. It emits nothing.
- `src/styles/index.css` is the shipped stylesheet entry. It contains static Tailwind theme variables, preflight, the tokens and the `@layer base` defaults, but **no utilities** (`source(none)`). Vite appends the compiled modules and writes `dist/styles.css`, exported as `labdsnov/styles.css`.
- Consumers must set `--font-heading` (the app uses IBM Plex Sans Thai via `next/font`) and use the `.dark` class for dark mode.

## Build (`packages/ui/vite.config.ts`)

- Vite library mode with `@tailwindcss/vite`: tsup/esbuild can't run Tailwind `@apply` inside CSS modules.
- ESM only, with `preserveModules`, so there's one output file per source file. Module classes are scoped as `dsadv_[local]_[hash]`.
- Rollup strips module-level directives. The local `preserveUseClient` plugin re-adds `"use client"` to outputs whose source starts with it.
- Everything in `dependencies`/`peerDependencies` is external: `react`, `react-dom` and `next` are peers (`next` because FundCard uses `next/image`). Types come from `tsc -p tsconfig.build.json`.

## Storybook (`apps/storybook`)

- **Framework:** `@storybook/nextjs-vite`, so `next/image` in FundCard works. The `styled-jsx` "Failed to resolve dependency" warning at startup is harmless.
- **Loads the library from source, not `dist`.** `.storybook/main.ts` aliases `labdsnov` → `packages/ui/src/index.ts` and `labdsnov/styles.css` → `src/styles/index.css`, and adds `@tailwindcss/vite`, so component edits hot-reload without `pnpm build`. `tsconfig.json` `paths` mirrors the alias for typechecking.
- **`.storybook/preview.ts`:**
  - imports `labdsnov/styles.css` exactly as a consumer would, then `preview.css`
  - `preview.css` adds Tailwind utilities for the tokens, generated only from files in `apps/storybook`, for story layout and `className`-override stories; it also sets `--font-heading` (IBM Plex Sans Thai, loaded in `preview-head.html`)
  - the `@storybook/addon-themes` toolbar toggles `.dark` on `<html>`; a story can force it with `globals: { theme: "dark" }`
- **Stories live in `apps/storybook/src/<Name>.stories.tsx`**, not in `packages/ui`, so they never ship. They import from `"labdsnov"` (the public API only). Follow `Button.stories.tsx`:
  - `tags: ["autodocs"]`, with `fn()` for event props
  - select controls built from `Object.keys({...} satisfies Record<XVariant, true>)`, so typecheck fails when a variant or size changes
  - one story per state (disabled, `aria-invalid`, `aria-expanded`, keyboard focus, dark), each with a `play` assertion where one makes sense
  - Thai copy, and an `aria-label` on icon-only buttons
- Hover and `:active` styles can't be forced in a story; check them by hand.

## Checking a build

- `grep -l '^"use client"' dist/components/*/*.js` should list exactly Badge, Dialog and Label.
- `dist/styles.css` should keep the layer order `properties < theme < base < components < utilities` and contain no plain utility classes (e.g. no `.flex{`).
- The Vite warning "Error when using sourcemap for reporting an error" on the `"use client"` files is expected.
