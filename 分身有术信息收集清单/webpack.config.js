const path = require("path")
const {
  resolve
} = require("path")
const htmlwebpackplugin = require("html-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); 
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); 
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const webpack = require("webpack")

module.exports = {
  entry: {
    "index": resolve(__dirname, `index.js`),
  },
  output: {
    filename: "js/[name][hash].bundle.js",
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    assetModuleFilename: 'src/images/[hash][ext][query]'
  },
  module: {
    rules: [{
        test: /\.css$/i,
        use: [{
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 2
            }
          },
          {
            loader: "postcss-loader"
          }
        ],
      },
      {
        test: /\.scss$/,
        use: [{
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 2
            }
          },
          {
            loader: "postcss-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ],
  },
  plugins: [
    new htmlwebpackplugin({
      template: resolve(__dirname, "./index.html"),
      chunks: ["index", ],
      filename: 'index.html',
      inject: true,
    }),
    // new htmlwebpackplugin({
    //   template: resolve(__dirname, "./aa.html"),
    //   chunks: ["rule", ],
    //   filename: 'rule.html',
    //   inject: true,
    // }),
    // new CopyPlugin({
    //   patterns: [{
    //       from: resolve(__dirname, "./src/images", ),
    //       to: "./src/images"
    //     },
    //   ],
    // }),
    new webpack.ProvidePlugin({
      jQuery: "jquery",
      $: "jquery"
    })

  ],
  devServer: {
    port: 3001,
    compress: true,
    host: "0.0.0.0",
    proxy: {
      '/v1': {
        target: 'http://10.20.40.244:39094/v1',
        changeOrigin: true,
        pathRewrite: {
          '^/v1': ''
        }
      },
    },
  },
  optimization: {
    minimizer: [
      `...`,
      new CssMinimizerPlugin(),
      // new UglifyJSPlugin({
      //   uglifyOptions: {
      //     warnings: false,
      //     parse: {},
      //     compress: {},
      //     mangle: true, // 注意 `mangle.properties` 的默认值是 `false`。
      //     output: null,
      //     toplevel: false,
      //     nameCache: null,
      //     ie8: false,
      //     keep_fnames: false,
      //   },
      // })
    ],
    splitChunks: {
      cacheGroups: {
        //打包公共模块
        commons: {
          chunks: 'initial', 
          minChunks: 2, 
          minSize: 0, 
          name: 'commons' 
        }
      },
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 20000,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${ packageName.replace( '@', '' ) }`
          },
        },
      },
    }
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js' //内部为正则表达式  vue结尾的
    }
  }

}