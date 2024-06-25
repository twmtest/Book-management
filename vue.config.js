const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  },
  devServer: {
    open: true,
    proxy: {
        '/api': {
            target: 'https://7888k0724y.zicp.fun',//要代理的本地api地址，也可以换成线上测试地址
            secure:false,
            changeOrigin: true,//允许跨域
            pathRewrite: {
              '^/api': ''  // 路径重写
            }
        }
    }
}

  
})
