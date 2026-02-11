import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    proxy: {
      // Add this when you have a backend server
      // '/api': {
      //   target: 'http://localhost:3000',
      //   changeOrigin: true,
      // },
    },
  },
});
