import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// PUBLIC_INTERFACE
export default defineConfig({
  /** Vite configuration for the recipe app frontend */
  plugins: [react()],
  server: {
    port: Number(process.env.REACT_APP_PORT) || 3000,
    host: true,
    // Allow the Kavia preview host
    allowedHosts: ['vscode-internal-33035-beta.beta01.cloud.kavia.ai'],
  },
  preview: {
    port: Number(process.env.REACT_APP_PORT) || 3000,
    host: true,
    // Ensure preview also allows the host if Vite respects server.allowedHosts primarily
    allowedHosts: ['vscode-internal-33035-beta.beta01.cloud.kavia.ai'],
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
