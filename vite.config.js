import { defineConfig } from "vite";
import { svgBuilder } from "vite-svg-icon";
import svgLoader from 'vite-svg-loader';
import compressPlugin from "vite-plugin-compression";
import vue from "@vitejs/plugin-vue";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    svgBuilder("./src/assets/icons/"),
    // svgLoader(),
    // compressPlugin({
    //   ext: ".gz",
    //   deleteOriginFile: true,
    // }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        math: "always",
      },
    },
  },
});
