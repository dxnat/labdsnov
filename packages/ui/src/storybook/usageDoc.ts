/**
 * Turns a Markdown doc into Storybook Docs content: a component's usage doc
 * (`<Name>.md`) or a guide in `docs/`. Storybook-only: excluded from the build.
 *
 * - Drops the `# Title` line, since a component's Docs page already shows
 *   the title. Pass `keepTitle` for standalone pages, which have none.
 * - Unlinks relative `.md` links (e.g. `../Label/Label.md`), which don't
 *   resolve inside Storybook; the link text stays.
 * - Drops the `<!-- generated:… -->` markers around generated tables.
 */
export function usageDoc(
  markdown: string,
  { keepTitle = false }: { keepTitle?: boolean } = {}
) {
  return (keepTitle ? markdown : markdown.replace(/^# .+\n+/, ""))
    .replace(/\[([^\]]+)\]\((?!https?:)[^)]*\.md(?:#[^)]*)?\)/g, "$1")
    .replace(/^<!-- \/?generated:[\w-]+ -->\n/gm, "")
}
