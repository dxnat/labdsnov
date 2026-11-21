# AGENTS.md

This file provides guidance to AI coding agents (Claude Code, Codex, etc.) working in this repository.

## Project

A pnpm monorepo for **`labdsnov`**, a public npm design system based on [shadcn/ui](https://ui.shadcn.com) (React 19 + TypeScript, Tailwind CSS v4). Its components come from the DSADV member-portal app (`~/Desktop/dsadv`, a Next.js 16 app for a Thai-language superannuation portal). The app keeps its own copies, so the two codebases are separate.

- `packages/ui`: the library (Accordion, Alert, AlertDialog, Avatar, Badge, Breadcrumb, Button, ButtonGroup, Calendar, Card, Chart, Checkbox, Collapsible, Combobox, DatePicker, Dialog, Drawer, DropdownMenu, Empty, Field, FundCard, HoverCard, Input, InputGroup, InputOTP, Kbd, Label, NavigationMenu, Pagination, Popover, Progress, RadioGroup, ScrollArea, Select, Separator, Skeleton, Slider, Spinner, Switch, Table, Tabs, Textarea, Toaster, Toggle, ToggleGroup, Tooltip). Most are ported from shadcn's `base-luma` style (the app's `components.json` style); FundCard is the app's own, and DatePicker composes Popover + Calendar + Button (shadcn only has a recipe for it).
- `apps/storybook`: Storybook 10 config only (private, not published). It renders the `*.stories.tsx` files that sit next to each component in `packages/ui`. Every component has stories; add one for each new component.
- Publishing is planned for a later milestone (Week 4). Don't `npm publish`/`pnpm publish`, and set `license`/access before doing so.

## Guides and Foundations docs (read first)

`packages/ui/docs/` holds the docs that aren't about one component, in Thai, shown in Storybook under **Guides** and **Foundations** (each `X.md` has an `X.mdx` wrapper):

- `GettingStarted.md`: app setup (styles, `--font-heading`, dark mode, `Toaster` / `TooltipProvider`, customizing, Tailwind in the app)
- `Contributing.md`: how to add a component or token, styling rules, doc sections, stories, checks before a PR
- `Colors.md`, `ComponentTokens.md`: every token with light and dark values. `Typography.md`, `Radius.md`
- `Accessibility.md`: the WCAG AA bar, focus and invalid states, and every checked contrast pair with its ratio

The tables between `<!-- generated:NAME -->` markers are written by `pnpm tokens:docs` (`packages/ui/scripts/tokens.mjs`) from `theme.css`. Don't edit them by hand. The script also holds the Thai description of every token and the list of contrast pairs. `pnpm tokens:docs` fails if a token has no description.

## Component usage docs (read first)

Every component has a usage doc beside it: `packages/ui/src/components/<Name>/<Name>.md`, for every component listed above. They're written in Thai for designers and AI agents building UI.

- **Before using or changing a component, read its `<Name>.md`.** It says when to use it, when not to and what to use instead, which props, variants and sizes exist, the content rules (labels, button order, Thai copy) and which tokens it uses. Follow it when you build UI with the library, e.g. in stories or in the DSADV app.
- Items marked `TODO` are open design decisions. Don't fill them in by guessing: ask, or leave the TODO in place.
- **Keep the doc in sync.** When you add, rename or remove a prop, variant, size or token use, or change behaviour, update the matching `<Name>.md` in the same change.
- **Storybook shows them.** Each story file imports its doc (`import guidelines from "./<Name>.md?raw"`) and passes it through `usageDoc()` (`src/storybook/usageDoc.ts`, which drops the `# Title` line and unlinks relative `.md` links) into `parameters.docs.description.component`, so the doc appears at the top of the component's Docs page. `src/storybook/` is Storybook-only and excluded from `tsconfig.build.json`.
- **New components need one.** Follow the existing docs' sections: Purpose (one line), Import and usage (the shared one-time app setup plus an import and a minimal snippet), When to use, When not to use, Props and variants (only ones that exist), Tokens used (a "Component tokens" table for the component's own tokens, then a "Semantic tokens" table with light and dark values from `theme.css`), and one example taken from the stories. Leave out implementation details (exports, data attributes, CSS utilities), and mark anything unsure as `TODO`.

## Commands

```bash
pnpm install
pnpm build                          # every package (packages/ui: vite build, then tsc for .d.ts)
pnpm typecheck
pnpm lint                           # eslint (typescript-eslint + react-hooks) over the repo
pnpm format                         # prettier with prettier-plugin-tailwindcss
pnpm pack:dry                       # what labdsnov would publish
pnpm tokens:check                   # WCAG AA contrast of every token pair, light and dark (exit 1 on failure)
pnpm tokens:docs                    # regenerate the token and contrast tables in packages/ui/docs
pnpm --filter labdsnov build        # one package
pnpm storybook                      # http://localhost:6006
pnpm build-storybook                # static build to apps/storybook/storybook-static
```

There's no unit-test runner. Verify changes with typecheck, lint, build, `pnpm tokens:check`, by inspecting `packages/ui/dist/` (see "Checking a build"), and in Storybook: story `play` functions are interaction checks, shown as pass/fail in the Interactions panel.

## Component conventions (`packages/ui/src/components/<Name>/`)

- **Base UI, not Radix.** Components wrap `@base-ui/react`. To render a custom element as a trigger/close, use the `render` prop (`<DialogTrigger render={<Button />}>`), not `asChild`. Icons are Hugeicons (`@hugeicons/react` + `@hugeicons/core-free-icons`), not lucide.
- **One folder per component:** `<Name>.tsx` + `<Name>.module.css` + `index.ts` + `<Name>.stories.tsx` + `<Name>.md` (usage doc in Thai, see "Component usage docs"). Story files are excluded from `tsconfig.build.json`, and the Vite build only follows imports from `index.ts`, so they never reach `dist`. Storybook is a devDependency of `packages/ui` because stories import `storybook/test`.
- **`<Name>.tsx` has no Tailwind class strings.** It maps semantic props to module classes through a typed lookup (`const variantClass = { default: styles.variantDefault, … } as const`; the `XVariant` type is `keyof typeof variantClass`). It merges the caller's `className` last with `cn(styles.root, variantClass[variant], className)`, using the `cn` package (shadcn's clsx + tailwind-merge replacement), and sets `data-slot`/`data-variant`/`data-size`. To add a look, add a prop and a module class; there is no `cva`.
- **Colours in a module come from component tokens**, written as arbitrary-property utilities: `@apply bg-(--button-primary-bg) text-(--button-primary-fg);`. Don't use semantic colour utilities (`bg-primary`, `text-destructive/90`) for anything a designer would want to change per component. Add a token in `theme.css` instead, and list it in the doc's "Component tokens" table. Layout-only rules can still use semantic utilities (e.g. `bg-border` for a separator).
- **Focus and invalid states are shared**: `focus-visible:border-(--focus-ring) focus-visible:ring-2 focus-visible:ring-(--focus-ring)` (solid, not a faint halo), and `aria-invalid:border-(--invalid-border) aria-invalid:ring-3 aria-invalid:ring-(--invalid-ring) aria-invalid:focus-visible:ring-2 aria-invalid:focus-visible:ring-(--invalid-border)`, so an invalid field still shows focus. Destructive variants use the same focus ring.
- **`<Name>.module.css`** starts with `@reference "../../styles/reference.css";` and `@layer theme, base, components, utilities;`. All rules go in `@layer components { … }` using `@apply`, so a consumer's Tailwind utilities passed via `className` always win.
  - Don't `@apply` `dark:`, `group-*:` or `peer-*:` in modules, because CSS Modules would rename `.dark`/`.group`/`.peer`. Write `:global(.dark) .x { @apply … }` instead, and only for non-colour differences. A colour that differs by mode belongs in the component token's `.dark` value in `theme.css` (the `:global(.dark)` rules left in modules only tweak decorative popup outlines and sizes).
  - When porting a shadcn component that styles children through `group/…` (e.g. `group-data-vertical/tabs:`), use the child's own data attributes instead (Base UI puts `data-orientation`, `data-active`, `data-disabled` on each part, so `data-vertical:` works on the element itself), or a descendant rule between module classes for a parent's variant (`.listLine .trigger { @apply … }`). See `Tabs.module.css`.
  - When the parent is another component (e.g. Field styling a Checkbox inside it), match it through its `data-slot` attribute, which CSS Modules don't rename: `:where([data-slot="field"][data-disabled="true"]) .label`. See `Field.module.css`.
  - Keep state rules (focus, invalid, disabled) after variant rules.
- **Shipped UI copy is Thai** (e.g. the Dialog close label "ปิด"). FundCard formats AUD and dates with `Intl` in the `th-TH` locale.
- **Dates are Thai with the Buddhist year** (`th-TH`, e.g. "13 พ.ย. 2569"): FundCard, DatePicker and Calendar. Calendar takes month and weekday names from `react-day-picker/locale` `th` and formats captions, the year dropdown and day labels with `Intl`, because `date-fns` `th` uses the Gregorian year.
- **Links that look like buttons are `<a>` with `buttonVariants()`**, not `Button` with `render={<a />}`: Base UI's Button gives non-`<button>` elements `role="button"`, so screen readers stop calling them links (see Pagination).
- **Public API = `src/index.ts`.** Renaming or removing an export, prop or variant is a breaking change.
- **`"use client"`** goes on any component that calls hooks or React context (Badge, Breadcrumb, ButtonGroup, Calendar, Chart, Combobox, DatePicker, Dialog, Drawer, Field, InputOTP, Label, Toaster, ToggleGroup). Base UI primitives already carry their own directive. Wrappers that only render Base UI parts (e.g. Button, Select, Tabs, Toggle, Slider) don't need it. ButtonGroup needs it for `useRender`, ToggleGroup for its context.

## Styles and tokens

- `src/styles/theme.css` holds the tokens, the `dark` custom variant and the `tw-animate-css` + `shadcn/tailwind.css` imports. Tailwind v4 has no `tailwind.config`. Tokens come in two layers:
  - **Semantic tokens** (`:root` / `.dark`): `--background`, `--primary`, `--muted-foreground`, `--destructive`, `--chart-1`…, mapped to Tailwind colours in `@theme inline`. `--border` is for decorative edges (cards, separators, tables). `--control-border` is for edges that show something is a field or control. `--ring` is the focus colour.
  - **Component tokens** (`:root, .dark`, with a `.dark` block for mode-specific values): `--button-primary-bg`, `--badge-success-fg`, `--field-border`, `--control-checked-bg`, `--switch-track`, `--tabs-indicator`, `--menu-item-highlight-bg`, `--tooltip-bg`, `--calendar-day-selected-bg` and so on, plus the shared states `--focus-ring`, `--invalid-border` and `--invalid-ring`. They point at semantic tokens. Mode differences (e.g. 10% vs 20% tints) live here, not in `:global(.dark)` rules.
- **Colours must pass WCAG 2.2 AA in both modes**: text ≥ 4.5:1 against its background (including tinted backgrounds and hover states); field and control edges, focus rings, checked states and chart series ≥ 3:1. Run `pnpm tokens:check` after any change to `theme.css`. When a new token puts text or an edge on a new background, add that pair to `CONTRAST_PAIRS` in `scripts/tokens.mjs`, then run `pnpm tokens:docs`.
- The colour values have been changed from the app's `src/app/globals.css` to meet that bar (muted text, destructive/success/warning, focus ring, dark-mode primary, chart colours, the new `--control-border`). TODO: copy them back to the app, or decide which one is the source of truth.
- `src/styles/reference.css` is used only at build time (`tailwindcss` + `theme.css`) so modules can `@apply`. It emits nothing.
- `src/styles/index.css` is the shipped stylesheet entry. It contains static Tailwind theme variables, preflight, the tokens and the `@layer base` defaults, but **no utilities** (`source(none)`). Vite appends the compiled modules and writes `dist/styles.css`, exported as `labdsnov/styles.css`.
- Consumers must set `--font-heading` (the app uses IBM Plex Sans Thai via `next/font`) and use the `.dark` class for dark mode. Apps that use toasts or tooltips mount `<Toaster />` and `<TooltipProvider>` once near the root.

## Build (`packages/ui/vite.config.ts`)

- Vite library mode with `@tailwindcss/vite`: tsup/esbuild can't run Tailwind `@apply` inside CSS modules.
- ESM only, with `preserveModules`, so there's one output file per source file. Module classes are scoped as `dsadv_[local]_[hash]`.
- Rollup strips module-level directives. The local `preserveUseClient` plugin re-adds `"use client"` to outputs whose source starts with it.
- Everything in `dependencies`/`peerDependencies` is external: `react`, `react-dom` and `next` are peers (`next` because FundCard uses `next/image`). `sonner` (a dependency) powers Toaster; unlike shadcn's version it doesn't use `next-themes`, it follows the `.dark` class on `<html>`. Calendar uses `react-day-picker` + `date-fns`, InputOTP uses `input-otp`, Chart uses `recharts`. Types come from `tsc -p tsconfig.build.json`.

## Storybook (`apps/storybook`)

- **Framework:** `@storybook/nextjs-vite`, so `next/image` in FundCard works. The `styled-jsx` "Failed to resolve dependency" warning at startup is harmless.
- **Loads the library from source, not `dist`.** `.storybook/main.ts` aliases `labdsnov` → `packages/ui/src/index.ts` and `labdsnov/styles.css` → `src/styles/index.css`, and adds `@tailwindcss/vite`, so component edits hot-reload without `pnpm build`. `tsconfig.json` `paths` mirrors the alias for typechecking.
- **`.storybook/preview.ts`:**
  - imports `labdsnov/styles.css` exactly as a consumer would, then `preview.css`
  - `preview.css` adds Tailwind utilities for the tokens, for story layout and `className`-override stories. They're generated from `apps/storybook` plus an explicit `@source` for `packages/ui/src/**/*.stories.tsx`. It also sets `--font-heading` (IBM Plex Sans Thai, loaded in `preview-head.html`)
  - the `@storybook/addon-themes` toolbar toggles `.dark` on `<html>`; a story can force it with `globals: { theme: "dark" }`
- **Docs pages**: `.storybook/main.ts` also loads `packages/ui/docs/*.mdx`; `preview.ts` `storySort` puts Overview, Guides, Foundations, then Components. `docs/Overview.mdx` shows the component count and list from `src/storybook/ComponentIndex.tsx`, which globs every `components/*/<Name>.md` (count, name, Purpose line), so it updates itself when a component is added. MDX pages render their `.md` with `<Markdown>{usageDoc(doc, { keepTitle: true })}</Markdown>`. The colour pages add `TokenSwatches` (`src/storybook/TokenSwatches.tsx`), which parses `theme.css?raw` and shows light and dark values side by side.
- **Stories live next to the component** (`packages/ui/src/components/<Name>/<Name>.stories.tsx`) and import it relatively (`./Button`). Use only what the component's `index.ts` exports. `.storybook/main.ts` globs `packages/ui/src/**/*.stories.@(ts|tsx)`; restart Storybook after changing that glob. Follow `Button.stories.tsx`:
  - `tags: ["autodocs"]`, with `fn()` for event props
  - select controls built from `Object.keys({...} satisfies Record<XVariant, true>)`, so typecheck fails when a variant or size changes
  - one story per state (disabled, `aria-invalid`, `aria-expanded`, keyboard focus, dark), each with a `play` assertion where one makes sense
  - Thai copy, and an `aria-label` on icon-only buttons
- Hover and `:active` styles can't be forced in a story; check them by hand.
- **Play-function pitfalls** (each one caused a false failure):
  - **Typing:** `userEvent.type` changes an Input's value but never fires React's `onChange` on Base UI's `Input`. The same goes for Textarea, InputGroup, Combobox (filtering) and InputOTP (`input-otp`). Use `fireEvent.change(input, { target: { value } })` to check `onChange`. Focus, tab and click via `userEvent` are fine.
  - **Dialog:** the popup is portalled to `document.body`, so query it with `screen`, not `canvas`. Assert closing by state (trigger `aria-expanded="false"`, popup `data-closed`), not by the popup leaving the DOM. Base UI unmounts only after the exit animation, and animations pause when the page is hidden, e.g. a background tab or Claude's browser pane while the app is unfocused.
  - **Modal stories:** stories rendered with `defaultOpen` need `tags: ["!autodocs"]`, or the modal covers the Docs page.
  - **Animated popups (Tooltip, Toaster, Popover, Select, DropdownMenu):** assert open/closed by state (`data-open` / `data-closed`, `aria-expanded`) or presence, never `toBeVisible()`: they fade in, and animations pause in a hidden page. A tooltip opened by keyboard focus also needs the page itself to have focus.
  - **Disabled controls:** disabled styles set `pointer-events: none`, so `userEvent.click` on them throws instead of doing nothing. Check by keyboard or by `aria-disabled` / computed style (see the Tabs `DisabledTab` story).
- **Static files:** `.storybook/main.ts` `staticDirs: ["../public"]` serves `apps/storybook/public`. The FundCard stories use `/funds/*.svg`, copied from the app's `public/funds`.
- **Storybook `date` controls yield a timestamp:** convert to `Date` in the story's `render` (see `FundCard.stories.tsx`).

## Checking a build

- `grep -l '^"use client"' dist/components/*/*.js` should list exactly Badge, Breadcrumb, ButtonGroup, Calendar, Chart, Combobox, DatePicker, Dialog, Drawer, Field, InputOTP, Label, Toaster, ToggleGroup.
- `dist/styles.css` should keep the layer order `properties < theme < base < components < utilities` and contain no plain utility classes (e.g. no `.flex{`).
- The Vite warning "Error when using sourcemap for reporting an error" on the `"use client"` files is expected.
