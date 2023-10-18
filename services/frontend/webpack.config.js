const path = require('path')
const webpack = require('webpack')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const projectRoot = path.resolve(process.cwd(), '..', '..')

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  mode: 'production',
  devtool: 'source-map',
  watch: true,
  resolve: {
    alias: {
      frontend: path.resolve('./src')
    }
  },
  entry: {
    index: [path.resolve('./src/js/index.ts'), path.resolve('./src/style/index.styl')],
    layout: [path.resolve('./src/js/layout.ts'), path.resolve('./src/style/layout.styl')],
    common: [path.resolve('./src/js/common.ts'), path.resolve('./src/style/common.styl')],
    base: path.resolve('./src/style/base.css')
  },
  output: {
    publicPath: '/',
    path: path.join(projectRoot, './public'),
    filename: 'js/[name].[contenthash:8].js',
    libraryTarget: 'amd',
    chunkFilename: 'js/[name].[contenthash].js'
  },
  externals: {
    jquery: 'jQuery'
    // swiper: 'Swiper',
    // '@sunday9787/log': '@sunday9787/log'
  },
  module: {
    rules: [
      { test: /\.[tj]s$/i, use: ['babel-loader'], exclude: '/node_modules/' },
      { test: /\.css$/i, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'] },
      { test: /\.(js|png|mp4|css|map)$/i, use: ['cache-loader'] },
      {
        test: /\.styl$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: path.join(projectRoot, './public/css')
            }
          },
          { loader: 'css-loader', options: { url: false } },
          'postcss-loader',
          'stylus-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: '[id].[contenthash:8].css'
    }),
    new webpack.BannerPlugin({
      banner: '版权所有，翻版必究qianli',
      entryOnly: true
    }),
    new WebpackManifestPlugin({
      filter(file) {
        return !/\.(map|png|mp4)$/.test(file.path)
      },
      fileName: path.join(projectRoot, 'packages/backend/js-manifest.json')
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: './src/upload', to: 'upload' },
        { from: './src/lib', to: 'lib' },
        { from: './src/image', to: 'image' }
      ]
    }),
    new TerserPlugin({
      parallel: true,
      extractComments: false
    })
  ],
  stats: 'minimal',
  optimization: {
    splitChunks: {
      cacheGroups: {
        log: {
          priority: 0,
          chunks: 'all',
          name: 'log',
          minSize: 0,
          test: /@sunday9787[\\/]log/
        },
        helper: {
          priority: 0,
          chunks: 'all',
          name: 'helper',
          minSize: 0,
          test: /@babel/
        },
        swiper: {
          priority: -10,
          minChunks: 1,
          chunks: 'all',
          name: 'swiper',
          minSize: 0,
          test: /[\\/]node_modules[\\/](swiper|dom7|ssr-window)[\\/]/
        }
      }
    }
  }
}
