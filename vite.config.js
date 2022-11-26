import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src/'),
      '@components': resolve(__dirname, './src/components'),
      '@pages': resolve(__dirname, './src/pages'),
      '@services': resolve(__dirname, './src/services'),
      '@stores': resolve(__dirname, './src/services/stores'),
    },
  },
  publicDir: 'public',
  server: {
    port: 3003,
  },
  preview: {
    port: 3003,
  },
  build: {
    outDir: 'build',
  },
});
