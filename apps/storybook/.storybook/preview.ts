import type { Preview } from "@storybook/nextjs-vite"
import { withThemeByClassName } from "@storybook/addon-themes"

// Same stylesheet consumers import, then Storybook-only utilities for layout.
import "labdsnov/styles.css"
import "./preview.css"

const preview: Preview = {
  parameters: {
    layout: "centered",
    controls: { expanded: true, sort: "requiredFirst" },
  },
  decorators: [
    // Toggles the `.dark` class on <html>, like next-themes does in the app.
    withThemeByClassName({
      themes: { light: "", dark: "dark" },
      defaultTheme: "light",
    }),
  ],
}

export default preview
