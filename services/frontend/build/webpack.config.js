const { merge } = require('webpack-merge')
const webpack = require('webpack')
const dayjs = require('dayjs')
const commonConfig = require('./webpack.config.common')
const prodConfig = require('./webpack.config.prod')
const devConfig = require('./webpack.config.dev')
const package = require('../package.json')
const { APP_ENV_MAP } = require('./env')

/** @type {import('webpack-cli').CallableOption} */
module.exports = function (env) {
  commonConfig.devtool = env.APP_ENV === APP_ENV_MAP.DEV ? 'source-map' : false
  commonConfig.plugins.push(
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({
        ENV: APP_ENV_MAP[env.APP_ENV],
        VERSION: package.version,
        BUILD: dayjs().format('YYYY-MM-DD HH:mm:ss Z[Z]'),
        PLATFORM: require('os').platform()
      })
    })
  )

  switch (env.NODE_ENV) {
    case 'PRO':
      return merge(prodConfig, commonConfig)
    default:
      return merge(devConfig, commonConfig)
  }
}
