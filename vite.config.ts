import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    // Proxy uniquement en développement
    ...(mode === 'development' ? {
      proxy: {
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
        },
      },
    } : {}),
  },
  preview: {
    // Configuration pour Railway production
    host: '0.0.0.0',
    port: Number(process.env.PORT) || 4173,
    // ✅ Autoriser l'accès depuis l'URL Railway
    allowedHosts: [
      'mdmcreporting-production.up.railway.app',
      'localhost',
      '127.0.0.1',
      '0.0.0.0'
    ],
  },
}));
