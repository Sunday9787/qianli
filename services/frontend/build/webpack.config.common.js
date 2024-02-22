const path = require('path')
const webpack = require('webpack')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const projectRoot = path.resolve(process.cwd(), '..', '..')

/**
 * @type {import('webpack-cli').WebpackConfiguration}
 */
module.exports = {
  resolve: {
    alias: {
      frontend: path.resolve('./src')
    }
  },
  entry: {
    index: ['./src/js/index.ts', './src/style/index.styl'],
    layout: ['./src/js/layout.ts', './src/style/layout.styl'],
    common: ['./src/js/common.ts', './src/style/common.styl'],
    product: ['./src/js/product.ts', './src/style/product.styl'],
    product_detail: ['./src/js/product_detail.ts', './src/style/product_detail.styl'],
    about: ['./src/js/about.ts', './src/style/about.styl'],
    contact: ['./src/js/contact.ts', './src/style/contact.styl'],
    news: ['./src/js/news.ts', './src/style/news.styl'],
    post: ['./src/js/post.ts', './src/style/post.styl'],
    base: './src/style/base.css'
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
      { test: /\.(png|jpe?g|gif|svg)(\?.*)?$/i, type: 'asset/resource' },
      {
        test: /\.styl$/i,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { url: false } },
          'postcss-loader',
          'stylus-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: '版权所有，翻版必究qianli',
      entryOnly: true
    }),
    new WebpackManifestPlugin({
      filter(file) {
        return !/\.(map|png|jpeg|jpg|mp4)$/.test(file.path)
      },
      fileName: path.join(projectRoot, 'services/backend/manifest.json')
    }),
    new CopyPlugin({
      patterns: [
        { from: './src/upload', to: 'upload' },
        { from: './src/lib', to: 'lib' },
        { from: './src/image', to: 'image' }
      ]
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
