import tailwindcss from "@tailwindcss/vite"
import { defineConfig, type Plugin } from "vite"

import pkg from "./package.json" with { type: "json" }

// Rollup drops module-level directives. Re-add "use client" to each output
// file whose source starts with it, so the components stay RSC-safe in Next.js.
function preserveUseClient(): Plugin {
  const clientModules = new Set<string>()
  return {
    name: "preserve-use-client",
    transform(code, id) {
      if (/^\s*["']use client["']/.test(code)) clientModules.add(id)
    },
    renderChunk(code, chunk) {
      if (chunk.facadeModuleId && clientModules.has(chunk.facadeModuleId)) {
        return { code: `"use client";\n${code}`, map: null }
      }
    },
  }
}

const external = [
  ...Object.keys(pkg.dependencies),
  ...Object.keys(pkg.peerDependencies),
]

export default defineConfig({
  plugins: [tailwindcss(), preserveUseClient()],
  esbuild: { jsx: "automatic" },
  css: {
    modules: { generateScopedName: "dsadv_[local]_[hash:base64:5]" },
  },
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      cssFileName: "styles",
    },
    cssCodeSplit: false,
    rollupOptions: {
      external: (id) =>
        external.some((dep) => id === dep || id.startsWith(`${dep}/`)) ||
        id.startsWith("react/"),
      output: {
        preserveModules: true,
        preserveModulesRoot: "src",
        entryFileNames: "[name].js",
      },
      onwarn(warning, warn) {
        if (warning.code === "MODULE_LEVEL_DIRECTIVE") return
        warn(warning)
      },
    },
  },
})
