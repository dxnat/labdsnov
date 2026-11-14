import { fileURLToPath } from "node:url"

import type { StorybookConfig } from "@storybook/nextjs-vite"
import tailwindcss from "@tailwindcss/vite"

const uiSrc = fileURLToPath(new URL("../../../packages/ui/src/", import.meta.url))

const config: StorybookConfig = {
  framework: "@storybook/nextjs-vite",
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs", "@storybook/addon-themes"],
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
