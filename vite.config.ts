import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteMockServe } from 'vite-plugin-mock';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteMockServe({
      mockPath: 'src/mock',
      enable: process.env.NODE_ENV === 'development', 
      logger: true,         
      watchFiles: true,   
    })
  ],
  resolve: {
    alias: {
      '@': '/src',        
    }
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/mock')
      }
    }
  }
});


