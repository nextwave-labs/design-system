/// <reference types="vitest/config" />
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
import path from 'node:path'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
const dirname = import.meta.dirname

/**
 * Wraps the extracted library CSS in a cascade layer. Unlayered consumer CSS
 * then overrides Flowi without specificity fights, and consumers can order
 * the layer against their own (for example below Tailwind's utilities).
 */
function cssLayer(name: string, fileName: string): Plugin {
  return {
    name: 'flowi-css-layer',
    apply: 'build',
    enforce: 'post',
    generateBundle(_, bundle) {
      for (const file of Object.values(bundle)) {
        if (file.type === 'asset' && file.fileName === fileName) {
          file.source = `@layer ${name} {\n${String(file.source)}\n}\n`
        }
      }
    },
  }
}

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react(), cssLayer('flowi', 'styles/flowi.css')],
  build: {
    lib: {
      entry: path.resolve(dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`,
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        /^tailwind-variants(\/.*)?$/,
      ],
      output: {
        // Bundling drops the per-module 'use client' directives. Every
        // component is interactive, so mark the whole entry as a client
        // module for React Server Components frameworks (Next.js App Router).
        banner: "'use client';",
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'styles/flowi.css'
          }
          return 'styles/[name][extname]'
        },
      },
    },
    cssCodeSplit: false,
    sourcemap: true,
    emptyOutDir: false,
    copyPublicDir: false,
  },
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: 'playwright',
            instances: [
              {
                browser: 'chromium',
              },
            ],
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
})
