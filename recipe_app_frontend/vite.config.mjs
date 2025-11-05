import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// PUBLIC_INTERFACE
export default defineConfig({
  /** Vite configuration for the recipe app frontend */
  plugins: [react()],
  server: {
    port: Number(process.env.REACT_APP_PORT) || 3000,
    host: true
  },
  preview: {
    port: Number(process.env.REACT_APP_PORT) || 3000,
    host: true
  },
  build: {
    outDir: 'build'
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js'
  }
});
