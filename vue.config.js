module.exports = {
  devServer: {
    port: 8086
  },
  configureWebpack: {
    resolve: {
      alias: {
        'components': '@/components',
        'content': 'components/content',
        'common': 'components/common',
        'assets': '@/assets',
        'network': '@/network',
        'views': '@/views',
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData:
          '@import "@/assets/scss/_var.scss";@import "@/assets/scss/_mixin.scss";'
      },


    }
  }
}
