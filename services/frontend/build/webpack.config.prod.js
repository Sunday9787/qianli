const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

/** @type {import('webpack-cli').WebpackConfiguration} */
module.exports = {
  mode: 'production',
  devtool: false,
  watch: false,
  stats: 'detailed',
  output: {
    filename: 'js/[name].[contenthash:8].min.js',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].min.css',
      chunkFilename: '[id].[contenthash:8].min.css'
    }),
    new TerserPlugin({
      parallel: true,
      extractComments: false
    }),
    new CleanWebpackPlugin()
  ]
}
