module.exports = {
    publicPath: './',
    outputDir: 'docs/',
    configureWebpack: {
      devServer: {
        watchOptions: {
          poll: true
        }
      }
    }
}
