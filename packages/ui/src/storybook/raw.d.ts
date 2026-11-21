/** Vite `?raw` imports: the file's text as a string (used by stories for usage docs). */
declare module "*.md?raw" {
  const content: string
  export default content
}
