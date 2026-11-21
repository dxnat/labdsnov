/// <reference types="vite/client" />
/*
 * Storybook-only: counts and lists the components for the Overview page.
 * Reads every component's usage doc at build time, so the number and list
 * update by themselves when a component folder is added or removed.
 */

const docs = import.meta.glob<string>("../components/*/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
})

const components = Object.entries(docs)
  .map(([path, markdown]) => {
    const name = path.split("/").at(-2)!
    const purpose = markdown.match(/## Purpose\s+([^\n]+)/)?.[1] ?? ""
    return { name, purpose: purpose.replace(/`/g, "") }
  })
  .sort((a, b) => a.name.localeCompare(b.name))

export const componentCount = components.length

/** The big number at the top of the Overview page. */
export function ComponentCount() {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "baseline",
        gap: 12,
        padding: "16px 24px",
        margin: "8px 0 16px",
        borderRadius: 26,
        background: "var(--muted)",
        color: "var(--foreground)",
      }}
    >
      <span style={{ fontSize: 48, fontWeight: 600, lineHeight: 1 }}>
        {componentCount}
      </span>
      <span style={{ fontSize: 16, color: "var(--muted-foreground)" }}>
        คอมโพเนนต์
      </span>
    </div>
  )
}

/** Every component: link to its Docs page and the Purpose line from its usage doc. */
export function ComponentList() {
  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>คอมโพเนนต์</th>
          <th>ใช้ทำอะไร</th>
        </tr>
      </thead>
      <tbody>
        {components.map(({ name, purpose }, i) => (
          <tr key={name}>
            <td>{i + 1}</td>
            <td>
              <a
                href={`./?path=/docs/components-${name.toLowerCase()}--docs`}
                target="_top"
              >
                {name}
              </a>
            </td>
            <td>{purpose}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
