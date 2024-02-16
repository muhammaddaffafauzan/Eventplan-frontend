import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  devServer: {
    proxy: 'http://localhost:5000'
  }
});