// 处理工具js
var utils = require('./utils')
// 使用webpack
var webpack = require('webpack')
// 使用config
var config = require('../config')
// 配置合并插件
var merge = require('webpack-merge')

// 使用基本设置
var baseWebpackConfig = require('./webpack.base.conf')

// 使用html-webpack-plugin插件，可以自动生成html。并注入到.html文件中
var HtmlWebpackPlugin = require('html-webpack-plugin')

// 
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks

// 将hot-reload 相对路径添加到webpack-base-conf的对应的entry前
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

// 合并开发配置和基础配置
module.exports = merge(baseWebpackConfig, {
  module: {
    // 使用styleLoaders
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    // definePlugin 接收字符串插入到代码当中

    new webpack.DefinePlugin({

      // 替换‘process.env‘
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    // hotmodule 插件在页面进行变更的时候只会重绘对应的页面模块，不会重绘整个html文件
    new webpack.HotModuleReplacementPlugin(),
    
    // 页面中报错不会阻塞，在编译后报错
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
})
