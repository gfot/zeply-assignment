/// <reference types="vitest" />
/// <reference types="vite/client" />

import { resolve as pathResolve } from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

const resolve = (path: string) => pathResolve(__dirname, path)

export default defineConfig({
  server: {
    port: 8080,
  },
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '~': resolve('frontend'),
    },
  },
  test: {
    globals: true,
    watch: false,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    resolveSnapshotPath: (testPath: any, snapExtension: any) =>
      testPath + snapExtension,
  },
})
