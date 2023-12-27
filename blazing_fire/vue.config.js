// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })


const isProduction = process.env.NODE_ENV === 'production'
const  Version = new Date().getTime();



module.exports = {
    outputDir:"dist",
    productionSourceMap: !isProduction,
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    devServer: {
        overlay: {
            warnings: false,
            errors: false
        },
        lintOnSave: false
    },
    devServer : {
        proxy : {
            '/api' : {
                // target : 'http://10.20.40.80:9015',
                target : 'http://10.20.40.128:5001/api',
                // target : 'http://192.20.11.183:5001',
                    changeOrigin : true,
                    pathRewrite: {
                    '^/api': ''
                }
            },
        }
    },
    // chainWebpack: config => {
    //     config
    //       .plugin('html')
    //       .tap(args => {
    //         args[0].title= '卓易官网-耀火计划'
    //         return args
    //       })
    // },
    // configureWebpack: config => {
    //     config.performance={
    //         hints:"warning",
    //         maxAssetSize:600000
    //     }
      

    //     // 开启分离js
    //     config.optimization = {
    //         runtimeChunk: 'single',
    //         splitChunks: {
    //             chunks: 'all',
    //             maxInitialRequests: Infinity,
    //             minSize: 20000,
    //             cacheGroups: {
    //                 vendor: {
    //                     test: /[\\/]node_modules[\\/]/,
    //                     name( module ) {
    //                         const packageName = module.context.match( /[\\/]node_modules[\\/](.*?)([\\/]|$)/ )[ 1 ]
    //                         return `npm.${ packageName.replace( '@', '' ) }`
    //                     },
    //                 },
    //             },
    //         },
    //         minimize:true,
    //         runtimeChunk:{
    //             name: (entrypoint) => `runtime~${entrypoint.name}`,
    //         },
    //     }
    //     config.externals=[ {
    //             './cptable': 'var cptable'
    //     }]

    // }
}
