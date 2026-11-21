/*
 * Storybook-only colour swatches for the Foundations pages. Parses theme.css
 * itself, so each row shows the light and dark value side by side whatever
 * mode the Storybook toolbar is in, and can't drift from the real tokens.
 */
import theme from "../styles/theme.css?raw"

type Vars = Record<string, string>

function parse(): {
  light: Vars
  dark: Vars
  groups: { name: string; tokens: string[] }[]
} {
  const css = theme
  const light: Vars = {},
    darkOnly: Vars = {},
    comp: Vars = {},
    compDark: Vars = {}
  const groups: { name: string; tokens: string[] }[] = []
  for (const [, rawSel, body] of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const sel = rawSel
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .split(";")
      .pop()!
      .split(",")
      .map((s) => s.trim())
      .join(",")
    if (sel !== ":root" && sel !== ".dark" && sel !== ":root,.dark") continue
    for (const line of body.split("\n")) {
      const c = line.match(/^\s*\/\*\s*(.+?)\s*\*\/\s*$/)
      if (c && sel === ":root,.dark") {
        groups.push({ name: c[1], tokens: [] })
        continue
      }
      const m = line.match(/^\s*--([\w-]+):\s*([^;]+);/)
      if (!m) continue
      const v = m[2].trim().replace(/\s+/g, " ")
      if (sel === ":root,.dark") {
        comp[m[1]] = v
        groups.at(-1)?.tokens.push(m[1])
      } else if (sel === ":root") light[m[1]] = v
      else if (m[1] in comp) compDark[m[1]] = v
      else darkOnly[m[1]] = v
    }
  }
  return {
    light: { ...light, ...comp },
    dark: { ...light, ...darkOnly, ...comp, ...compDark },
    groups,
  }
}

const { light, dark, groups } = parse()

// Inline every var() so the value paints the same anywhere on the page.
function resolve(vars: Vars, value: string, depth = 0): string {
  if (depth > 20) return value
  return value.replace(/var\(--([\w-]+)\)/g, (_, name: string) =>
    name in vars ? resolve(vars, vars[name], depth + 1) : `var(--${name})`
  )
}

const checker =
  "repeating-conic-gradient(oklch(0.9 0 0) 0% 25%, oklch(1 0 0) 0% 50%) 0 0 / 12px 12px"

function Swatch({
  vars,
  token,
  page,
}: {
  vars: Vars
  token: string
  page: string
}) {
  const value = resolve(vars, `var(--${token})`)
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: 8,
        borderRadius: 12,
        background: resolve(vars, page),
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          background: checker,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 10,
            background: value,
            boxShadow: "inset 0 0 0 1px oklch(0.5 0 0 / 20%)",
          }}
        />
      </div>
      <code
        style={{
          fontSize: 11,
          color: resolve(vars, "var(--muted-foreground)"),
          wordBreak: "break-all",
        }}
      >
        {vars[token]}
      </code>
    </div>
  )
}

/** One row per token: name, light swatch, dark swatch. */
export function TokenSwatches({
  tokens,
  group,
}: {
  tokens?: string[]
  group?: string
}) {
  const list = tokens ?? groups.find((g) => g.name === group)?.tokens ?? []
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(160px, 1fr) 1fr 1fr",
        gap: 8,
        alignItems: "center",
        margin: "16px 0",
      }}
    >
      <strong>Token</strong>
      <strong>โหมดสว่าง</strong>
      <strong>โหมดมืด</strong>
      {list.map((t) => (
        <div key={t} style={{ display: "contents" }}>
          <code>--{t}</code>
          <Swatch vars={light} token={t} page="var(--background)" />
          <Swatch vars={dark} token={t} page="var(--background)" />
        </div>
      ))}
    </div>
  )
}

/** Swatches for every component-token group, in theme.css order. */
export function ComponentTokenSwatches() {
  return (
    <>
      {groups.map((g) => (
        <section key={g.name}>
          <h3>{g.name}</h3>
          <TokenSwatches group={g.name} />
        </section>
      ))}
    </>
  )
}

export const semanticTokens = Object.keys(light).filter(
  (k) =>
    !groups.some((g) => g.tokens.includes(k)) &&
    k !== "radius" &&
    !k.startsWith("sidebar") &&
    !k.startsWith("chart")
)
export const chartTokens = [1, 2, 3, 4, 5].map((i) => `chart-${i}`)
