// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        'index': 'index.html',
        'animate-2': 'animate-2.html',
        // Add more entries as needed
      }
    }
  },
  publicDir: 'assets' // This tells Vite to serve assets from the 'assets' directory
});

