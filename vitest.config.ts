import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
/// <reference types="vitest" />

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  define: {
    'process.env': process.env,
  },
  root: './',
  test: {
    setupFiles: './setup-tests.ts',
    include: ['src/**/*.test.tsx', 'src/**/*.test.ts'],
    css: true,
    pool: 'vmThreads',
    poolOptions: {
      useAtomics: true,
    },
    testTimeout: 3000,
    browser: {
      enabled: true,
      name: 'chromium',
      headless: true,
      provider: 'playwright',
    },
  },
})
