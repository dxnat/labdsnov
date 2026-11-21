# labdsnov

The DSADV design system: Thai-first shadcn/ui components built on [Base UI](https://base-ui.com) and styled with Tailwind CSS v4 CSS modules. It's the library version of the components in the DSADV member-portal app.

46 components, from `Accordion` to `Tooltip`. Every one has a Thai usage doc beside it (`src/components/<Name>/<Name>.md`): when to use it, when not to, props, variants and tokens.

## Docs

In [`docs/`](./docs) (Thai), also shown in Storybook under Guides and Foundations:

- [Getting started](./docs/GettingStarted.md): app setup, dark mode, customizing
- [Colors](./docs/Colors.md) and [Component tokens](./docs/ComponentTokens.md): every token, light and dark
- [Typography](./docs/Typography.md), [Radius](./docs/Radius.md)
- [Accessibility](./docs/Accessibility.md): the WCAG 2.2 AA bar and every checked contrast pair
- [Contributing](./docs/Contributing.md): adding a component or token

## Usage

Peer dependencies: `react` 19, `react-dom` 19 and `next` 16 (`FundCard` uses `next/image`).

Import the stylesheet once, in the root layout:

```tsx
// app/layout.tsx
import "labdsnov/styles.css"
```

```tsx
import { Button } from "labdsnov"

<Button fullWidth type="submit">เข้าสู่ระบบ</Button>
```

### What `styles.css` contains

- Design tokens: semantic colour and radius variables on `:root` and `.dark`, plus component tokens (`--button-primary-bg`, `--field-border`, …) that point at them. All colour pairs pass WCAG 2.2 AA in both modes.
- Tailwind's theme variables and preflight, so components look the same with or without Tailwind in your app.
- `@layer base` defaults: border/outline colours, `body` background and text, `font-sans` on `html`, `font-heading` on `h1`–`h6`.
- The compiled component styles.

It ships no Tailwind utility classes. Component rules sit in the `components` cascade layer, so a utility you pass through `className` from your own Tailwind build always wins.

### App responsibilities

- **Heading font:** set `--font-heading` on `<html>`, e.g. IBM Plex Sans Thai via `next/font` with `variable: "--font-heading"`. Body text uses a system font stack.
- **Dark mode:** add the `dark` class to an ancestor (e.g. `next-themes` with `attribute="class"`).
- **Toasts and tooltips:** mount `<Toaster />` and `<TooltipProvider>` once near the root if you use them.

## Development

```bash
pnpm --filter labdsnov build     # vite build (JS + dist/styles.css) then tsc (.d.ts)
pnpm --filter labdsnov typecheck
pnpm --filter labdsnov pack:dry  # list what would be published
pnpm --filter labdsnov tokens:check  # WCAG AA contrast of every token pair
pnpm --filter labdsnov tokens:docs   # regenerate the token tables in docs/
```

Each component lives in `src/components/<Name>/` as `<Name>.tsx` + `<Name>.module.css` + `index.ts` + `<Name>.stories.tsx` + `<Name>.md`. CSS modules `@reference "../../styles/reference.css"` to use `@apply`, and take colours from component tokens. Tokens live in `src/styles/theme.css`. Public exports are listed in `src/index.ts`. See [Contributing](./docs/Contributing.md).
