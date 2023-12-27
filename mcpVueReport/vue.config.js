const { defineConfig } = require("@vue/cli-service");
const Timestamp = new Date().getTime()
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api": {
        target: "http://192.168.48.151:8093",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
  configureWebpack: {
    resolve: {
      fallback: {
        fs: false,
      },
    },
    externals: {
      "./cptable": "var cptable",
    },
    output: {//处理部署后浏览器缓存的问题
      filename: `js/[name].${Timestamp}.js`, 
      chunkFilename: `js/[name].${Timestamp}.js`
    }
  },
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "运营日报";
      return args;
    });
    return config;
  },
  css: {//处理部署后浏览器缓存的问题
    extract: {
        filename: `css/[name].${Timestamp}.css`,
        chunkFilename: `css/[name].${Timestamp}.css`
    }
  }
});
