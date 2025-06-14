import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/AdAgency/", // Match your GitHub repo name EXACTLY
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
