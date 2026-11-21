import { fileURLToPath } from "node:url"

import type { StorybookConfig } from "@storybook/nextjs-vite"
import tailwindcss from "@tailwindcss/vite"

const uiSrc = fileURLToPath(new URL("../../../packages/ui/src/", import.meta.url))

const config: StorybookConfig = {
  framework: "@storybook/nextjs-vite",
  // Guides and Foundations pages first, then the stories next to each component.
  stories: ["../../../packages/ui/docs/*.mdx", "../../../packages/ui/src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs", "@storybook/addon-themes"],
  // Fund images for FundCard stories (copied from the app's public/funds).
  staticDirs: ["../public"],
  async viteFinal(config) {
    config.plugins = [...(config.plugins ?? []), tailwindcss()]
    // Load the library from source (not dist) so edits hot-reload without a build.
    config.resolve ??= {}
    config.resolve.alias = [
      { find: /^labdsnov\/styles\.css$/, replacement: `${uiSrc}styles/index.css` },
      { find: /^labdsnov$/, replacement: `${uiSrc}index.ts` },
      ...(Array.isArray(config.resolve.alias) ? config.resolve.alias : []),
    ]
    return config
  },
}

export default config
