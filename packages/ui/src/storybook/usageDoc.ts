/**
 * Turns a component's usage doc (`<Name>.md`) into its Storybook Docs page
 * description. Storybook-only: excluded from the build.
 *
 * - Drops the `# Title` line, since the Docs page already shows the title.
 * - Unlinks relative `.md` links (e.g. `../Label/Label.md`), which don't
 *   resolve inside Storybook; the link text stays.
 */
export function usageDoc(markdown: string) {
  return markdown
    .replace(/^# .+\n+/, "")
    .replace(/\[([^\]]+)\]\((?!https?:)[^)]*\.md(?:#[^)]*)?\)/g, "$1")
}
