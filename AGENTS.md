# AGENTS.md

This file provides guidance to AI coding agents (Claude Code, Codex, etc.) working in this repository.

## Project

A pnpm monorepo for **`labdsnov`**, a public npm design system based on [shadcn/ui](https://ui.shadcn.com) (React 19 + TypeScript, Tailwind CSS v4). Its components come from the DSADV member-portal app (`~/Desktop/dsadv`, a Next.js 16 app for a Thai-language superannuation portal). The app keeps its own copies, so the two codebases are separate.

- `packages/ui`: the library (Alert, Badge, Button, Card, Checkbox, Dialog, DropdownMenu, Field, FundCard, Input, Label, Popover, Progress, RadioGroup, Select, Separator, Skeleton, Switch, Table, Tabs, Textarea, Toaster, Tooltip). Most are ported from shadcn's `base-luma` style (the app's `components.json` style); FundCard is the app's own.
- `apps/storybook`: Storybook 10 config only (private, not published). It renders the `*.stories.tsx` files that sit next to each component in `packages/ui`. Every component has stories; add one for each new component.
- Publishing is planned for a later milestone (Week 4). Don't `npm publish`/`pnpm publish`, and set `license`/access before doing so.

## Component usage docs (read first)

Every component has a usage doc beside it: `packages/ui/src/components/<Name>/<Name>.md`, for every component listed above. They're written in Thai for designers and AI agents building UI.

- **Before using or changing a component, read its `<Name>.md`.** It says when to use it, when not to and what to use instead, which props, variants and sizes exist, the content rules (labels, button order, Thai copy) and which tokens it uses. Follow it when you build UI with the library, e.g. in stories or in the DSADV app.
- Items marked `TODO` are open design decisions. Don't fill them in by guessing: ask, or leave the TODO in place.
- **Keep the doc in sync.** When you add, rename or remove a prop, variant, size or token use, or change behaviour, update the matching `<Name>.md` in the same change.
- **Storybook shows them.** Each story file imports its doc (`import guidelines from "./<Name>.md?raw"`) and passes it through `usageDoc()` (`src/storybook/usageDoc.ts`, which drops the `# Title` line and unlinks relative `.md` links) into `parameters.docs.description.component`, so the doc appears at the top of the component's Docs page. `src/storybook/` is Storybook-only and excluded from `tsconfig.build.json`.
- **New components need one.** Follow the existing docs' sections: Purpose (one line), Import and usage (the shared one-time app setup plus an import and a minimal snippet), When to use, When not to use, Props and variants (only ones that exist), Tokens used, and one example taken from the stories. Leave out implementation details (exports, data attributes, CSS utilities), and mark anything unsure as `TODO`.

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
- **One folder per component:** `<Name>.tsx` + `<Name>.module.css` + `index.ts` + `<Name>.stories.tsx` + `<Name>.md` (usage doc in Thai, see "Component usage docs"). Story files are excluded from `tsconfig.build.json`, and the Vite build only follows imports from `index.ts`, so they never reach `dist`. Storybook is a devDependency of `packages/ui` because stories import `storybook/test`.
- **`<Name>.tsx` has no Tailwind class strings.** It maps semantic props to module classes through a typed lookup (`const variantClass = { default: styles.variantDefault, … } as const`; the `XVariant` type is `keyof typeof variantClass`). It merges the caller's `className` last with `cn(styles.root, variantClass[variant], className)`, using the `cn` package (shadcn's clsx + tailwind-merge replacement), and sets `data-slot`/`data-variant`/`data-size`. To add a look, add a prop and a module class; there is no `cva`.
- **`<Name>.module.css`** starts with `@reference "../../styles/reference.css";` and `@layer theme, base, components, utilities;`. All rules go in `@layer components { … }` using `@apply`, so a consumer's Tailwind utilities passed via `className` always win.
  - Don't `@apply` `dark:`, `group-*:` or `peer-*:` in modules, because CSS Modules would rename `.dark`/`.group`/`.peer`. Write `:global(.dark) .x { @apply … }` instead.
  - When porting a shadcn component that styles children through `group/…` (e.g. `group-data-vertical/tabs:`), use the child's own data attributes instead (Base UI puts `data-orientation`, `data-active`, `data-disabled` on each part, so `data-vertical:` works on the element itself), or a descendant rule between module classes for a parent's variant (`.listLine .trigger { @apply … }`). See `Tabs.module.css`.
  - When the parent is another component (e.g. Field styling a Checkbox inside it), match it through its `data-slot` attribute, which CSS Modules don't rename: `:where([data-slot="field"][data-disabled="true"]) .label`. See `Field.module.css`.
  - Keep state rules (focus, invalid, disabled) after variant rules.
- **Shipped UI copy is Thai** (e.g. the Dialog close label "ปิด"). FundCard formats AUD and dates with `Intl` in the `th-TH` locale.
- **Public API = `src/index.ts`.** Renaming or removing an export, prop or variant is a breaking change.
- **`"use client"`** goes on any component that calls hooks or React context (Badge, Dialog, Field, Label, Toaster). Base UI primitives already carry their own directive. Wrappers that only render Base UI parts (e.g. Button, Select, Tabs) don't need it.

## Styles and tokens

- `src/styles/theme.css` holds the tokens: `:root`/`.dark` colour and radius variables, `@theme inline` mapping, the `dark` custom variant, and the `tw-animate-css` + `shadcn/tailwind.css` imports. It's copied from the app's `src/app/globals.css`, so keep the values in sync with it. Tailwind v4 has no `tailwind.config`.
- `src/styles/reference.css` is used only at build time (`tailwindcss` + `theme.css`) so modules can `@apply`. It emits nothing.
- `src/styles/index.css` is the shipped stylesheet entry. It contains static Tailwind theme variables, preflight, the tokens and the `@layer base` defaults, but **no utilities** (`source(none)`). Vite appends the compiled modules and writes `dist/styles.css`, exported as `labdsnov/styles.css`.
- Consumers must set `--font-heading` (the app uses IBM Plex Sans Thai via `next/font`) and use the `.dark` class for dark mode. Apps that use toasts or tooltips mount `<Toaster />` and `<TooltipProvider>` once near the root.

## Build (`packages/ui/vite.config.ts`)

- Vite library mode with `@tailwindcss/vite`: tsup/esbuild can't run Tailwind `@apply` inside CSS modules.
- ESM only, with `preserveModules`, so there's one output file per source file. Module classes are scoped as `dsadv_[local]_[hash]`.
- Rollup strips module-level directives. The local `preserveUseClient` plugin re-adds `"use client"` to outputs whose source starts with it.
- Everything in `dependencies`/`peerDependencies` is external: `react`, `react-dom` and `next` are peers (`next` because FundCard uses `next/image`). `sonner` (a dependency) powers Toaster; unlike shadcn's version it doesn't use `next-themes`, it follows the `.dark` class on `<html>`. Types come from `tsc -p tsconfig.build.json`.

## Storybook (`apps/storybook`)

- **Framework:** `@storybook/nextjs-vite`, so `next/image` in FundCard works. The `styled-jsx` "Failed to resolve dependency" warning at startup is harmless.
- **Loads the library from source, not `dist`.** `.storybook/main.ts` aliases `labdsnov` → `packages/ui/src/index.ts` and `labdsnov/styles.css` → `src/styles/index.css`, and adds `@tailwindcss/vite`, so component edits hot-reload without `pnpm build`. `tsconfig.json` `paths` mirrors the alias for typechecking.
- **`.storybook/preview.ts`:**
  - imports `labdsnov/styles.css` exactly as a consumer would, then `preview.css`
  - `preview.css` adds Tailwind utilities for the tokens, for story layout and `className`-override stories. They're generated from `apps/storybook` plus an explicit `@source` for `packages/ui/src/**/*.stories.tsx`. It also sets `--font-heading` (IBM Plex Sans Thai, loaded in `preview-head.html`)
  - the `@storybook/addon-themes` toolbar toggles `.dark` on `<html>`; a story can force it with `globals: { theme: "dark" }`
- **Stories live next to the component** (`packages/ui/src/components/<Name>/<Name>.stories.tsx`) and import it relatively (`./Button`). Use only what the component's `index.ts` exports. `.storybook/main.ts` globs `packages/ui/src/**/*.stories.@(ts|tsx)`; restart Storybook after changing that glob. Follow `Button.stories.tsx`:
  - `tags: ["autodocs"]`, with `fn()` for event props
  - select controls built from `Object.keys({...} satisfies Record<XVariant, true>)`, so typecheck fails when a variant or size changes
  - one story per state (disabled, `aria-invalid`, `aria-expanded`, keyboard focus, dark), each with a `play` assertion where one makes sense
  - Thai copy, and an `aria-label` on icon-only buttons
- Hover and `:active` styles can't be forced in a story; check them by hand.
- **Play-function pitfalls** (each one caused a false failure):
  - **Typing:** `userEvent.type` changes an Input's value but never fires React's `onChange` on Base UI's `Input`. Use `fireEvent.change(input, { target: { value } })` to check `onChange`. Focus, tab and click via `userEvent` are fine.
  - **Dialog:** the popup is portalled to `document.body`, so query it with `screen`, not `canvas`. Assert closing by state (trigger `aria-expanded="false"`, popup `data-closed`), not by the popup leaving the DOM. Base UI unmounts only after the exit animation, and animations pause when the page is hidden, e.g. a background tab or Claude's browser pane while the app is unfocused.
  - **Modal stories:** stories rendered with `defaultOpen` need `tags: ["!autodocs"]`, or the modal covers the Docs page.
  - **Animated popups (Tooltip, Toaster, Popover, Select, DropdownMenu):** assert open/closed by state (`data-open` / `data-closed`, `aria-expanded`) or presence, never `toBeVisible()`: they fade in, and animations pause in a hidden page. A tooltip opened by keyboard focus also needs the page itself to have focus.
  - **Disabled controls:** disabled styles set `pointer-events: none`, so `userEvent.click` on them throws instead of doing nothing. Check by keyboard or by `aria-disabled` / computed style (see the Tabs `DisabledTab` story).
- **Static files:** `.storybook/main.ts` `staticDirs: ["../public"]` serves `apps/storybook/public`. The FundCard stories use `/funds/*.svg`, copied from the app's `public/funds`.
- **Storybook `date` controls yield a timestamp:** convert to `Date` in the story's `render` (see `FundCard.stories.tsx`).

## Checking a build

- `grep -l '^"use client"' dist/components/*/*.js` should list exactly Badge, Dialog, Field, Label and Toaster.
- `dist/styles.css` should keep the layer order `properties < theme < base < components < utilities` and contain no plain utility classes (e.g. no `.flex{`).
- The Vite warning "Error when using sourcemap for reporting an error" on the `"use client"` files is expected.
