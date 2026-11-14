# labdsnov

The DSADV design system: Thai-first shadcn/ui components built on [Base UI](https://base-ui.com) and styled with Tailwind CSS v4 CSS modules. It's the library version of the components in the DSADV member-portal app.

Components: `Badge`, `Button` (+ `buttonVariants`), `Dialog` (+ parts), `FundCard`, `Input`, `Label`.

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

- Design tokens: colour and radius variables on `:root` and `.dark`.
- Tailwind's theme variables and preflight, so components look the same with or without Tailwind in your app.
- `@layer base` defaults: border/outline colours, `body` background and text, `font-sans` on `html`, `font-heading` on `h1`–`h6`.
- The compiled component styles.

It ships no Tailwind utility classes. Component rules sit in the `components` cascade layer, so a utility you pass through `className` from your own Tailwind build always wins.

### App responsibilities

- **Heading font:** set `--font-heading` on `<html>`, e.g. IBM Plex Sans Thai via `next/font` with `variable: "--font-heading"`. Body text uses a system font stack.
- **Dark mode:** add the `dark` class to an ancestor (e.g. `next-themes` with `attribute="class"`).

## Development

```bash
pnpm --filter labdsnov build     # vite build (JS + dist/styles.css) then tsc (.d.ts)
pnpm --filter labdsnov typecheck
pnpm --filter labdsnov pack:dry  # list what would be published
```

Each component lives in `src/components/<Name>/` as `<Name>.tsx` + `<Name>.module.css` + `index.ts`. CSS modules `@reference "../../styles/reference.css"` to use `@apply`. Tokens live in `src/styles/theme.css` and must stay in sync with the app's `src/app/globals.css`. Public exports are listed in `src/index.ts`.
