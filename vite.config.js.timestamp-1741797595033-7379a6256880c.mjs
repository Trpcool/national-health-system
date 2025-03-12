// vite.config.js
import { defineConfig } from "file:///D:/A_%E5%A4%A7%E5%89%8D%E7%AB%AF/AAA_%E5%9B%BD%E6%B0%91%E5%81%A5%E5%BA%B7%E7%AE%A1%E7%90%86%E5%B9%B3%E5%8F%B0/national-health-system/node_modules/vite/dist/node/index.js";
import { svgBuilder } from "file:///D:/A_%E5%A4%A7%E5%89%8D%E7%AB%AF/AAA_%E5%9B%BD%E6%B0%91%E5%81%A5%E5%BA%B7%E7%AE%A1%E7%90%86%E5%B9%B3%E5%8F%B0/national-health-system/node_modules/vite-svg-icon/index.js";
import compressPlugin from "file:///D:/A_%E5%A4%A7%E5%89%8D%E7%AB%AF/AAA_%E5%9B%BD%E6%B0%91%E5%81%A5%E5%BA%B7%E7%AE%A1%E7%90%86%E5%B9%B3%E5%8F%B0/national-health-system/node_modules/vite-plugin-compression/dist/index.mjs";
import vue from "file:///D:/A_%E5%A4%A7%E5%89%8D%E7%AB%AF/AAA_%E5%9B%BD%E6%B0%91%E5%81%A5%E5%BA%B7%E7%AE%A1%E7%90%86%E5%B9%B3%E5%8F%B0/national-health-system/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "D:\\A_\u5927\u524D\u7AEF\\AAA_\u56FD\u6C11\u5065\u5EB7\u7BA1\u7406\u5E73\u53F0\\national-health-system";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    svgBuilder("./src/assets/icons/")
    // compressPlugin({
    //   ext: ".gz",
    //   deleteOriginFile: true,
    // }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "src")
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        math: "always"
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxBX1x1NTkyN1x1NTI0RFx1N0FFRlxcXFxBQUFfXHU1NkZEXHU2QzExXHU1MDY1XHU1RUI3XHU3QkExXHU3NDA2XHU1RTczXHU1M0YwXFxcXG5hdGlvbmFsLWhlYWx0aC1zeXN0ZW1cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXEFfXHU1OTI3XHU1MjREXHU3QUVGXFxcXEFBQV9cdTU2RkRcdTZDMTFcdTUwNjVcdTVFQjdcdTdCQTFcdTc0MDZcdTVFNzNcdTUzRjBcXFxcbmF0aW9uYWwtaGVhbHRoLXN5c3RlbVxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovQV8lRTUlQTQlQTclRTUlODklOEQlRTclQUIlQUYvQUFBXyVFNSU5QiVCRCVFNiVCMCU5MSVFNSU4MSVBNSVFNSVCQSVCNyVFNyVBRSVBMSVFNyU5MCU4NiVFNSVCOSVCMyVFNSU4RiVCMC9uYXRpb25hbC1oZWFsdGgtc3lzdGVtL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHsgc3ZnQnVpbGRlciB9IGZyb20gXCJ2aXRlLXN2Zy1pY29uXCI7XHJcbmltcG9ydCBjb21wcmVzc1BsdWdpbiBmcm9tIFwidml0ZS1wbHVnaW4tY29tcHJlc3Npb25cIjtcclxuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XHJcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW1xyXG4gICAgdnVlKCksXHJcbiAgICBzdmdCdWlsZGVyKFwiLi9zcmMvYXNzZXRzL2ljb25zL1wiKSxcclxuICAgIC8vIGNvbXByZXNzUGx1Z2luKHtcclxuICAgIC8vICAgZXh0OiBcIi5nelwiLFxyXG4gICAgLy8gICBkZWxldGVPcmlnaW5GaWxlOiB0cnVlLFxyXG4gICAgLy8gfSksXHJcbiAgXSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJzcmNcIiksXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3NzOiB7XHJcbiAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XHJcbiAgICAgIGxlc3M6IHtcclxuICAgICAgICBtYXRoOiBcImFsd2F5c1wiLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9LFxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFzWixTQUFTLG9CQUFvQjtBQUNuYixTQUFTLGtCQUFrQjtBQUMzQixPQUFPLG9CQUFvQjtBQUMzQixPQUFPLFNBQVM7QUFDaEIsT0FBTyxVQUFVO0FBSmpCLElBQU0sbUNBQW1DO0FBTXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxJQUNKLFdBQVcscUJBQXFCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQUtsQztBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsS0FBSztBQUFBLElBQ3BDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0gscUJBQXFCO0FBQUEsTUFDbkIsTUFBTTtBQUFBLFFBQ0osTUFBTTtBQUFBLE1BQ1I7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
