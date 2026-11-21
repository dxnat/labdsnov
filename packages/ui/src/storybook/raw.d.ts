/** Vite `?raw` imports: the file's text as a string (used by stories for usage docs). */
declare module "*.md?raw" {
  const content: string
  export default content
}

/** `theme.css?raw`: the token file's text, parsed by the Foundations swatches. */
declare module "*.css?raw" {
  const content: string
  export default content
}
