var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production'

// 是否在production环境下开启cssSourceMap
module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction
  })
}
