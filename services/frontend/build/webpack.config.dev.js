const MiniCssExtractPlugin = require('mini-css-extract-plugin')

/**
 * @type {import('webpack-cli').WebpackConfiguration}
 */
module.exports = {
  mode: 'development',
  devtool: 'source-map',
  watch: true,
  stats: 'minimal',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: '[id].[contenthash:8].css'
    })
  ]
}
