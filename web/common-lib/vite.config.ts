import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import path from 'path';
import libCss from 'vite-plugin-libcss';
import axios from 'axios';

export default defineConfig({
  plugins: [react(), dts({
    insertTypesEntry: true
  }), libCss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'CommonLib',
      fileName: 'CommonLib',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react-router-dom', 'axios'],
      output: {
        globals: {
          axios: 'axios',
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },

  },
  css: {
    preprocessorOptions: {
      scss: {
      }
    }
  }
})
