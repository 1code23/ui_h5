import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import legacy from "@vitejs/plugin-legacy";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";
import pxtovw from "postcss-px-to-viewport";

// import path from "path";
// console.log(path, path.dirname(__dirname), __dirname, __dirname.includes(path.join('node_modules', 'vant'), path.join("node_modules", "vant")));
// const designWidth = file.dirname.includes(path.join('node_modules', 'vant')) ? 375 : 720;

const loder_pxtovw = pxtovw({
  viewportWidth: 720,
  viewportUnit: "vw",
  exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
});

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    vue(),
    legacy({
      targets: ["Chrome 64"],
      modernPolyfills: true,
    }),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  css: {
    postcss: {
      plugins: [loder_pxtovw]
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "/api": {
        // target: "http://10.20.40.244:39096/v1",
        target: "https://search.yy845.com:8890/v1",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
