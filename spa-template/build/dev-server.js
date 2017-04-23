// 检查Node 和 npm 版本
require('./check-versions')()

// 获取 config／index.js的默认配置
var config = require('../config')

// 如果Node的环境无法判断当前是 dev/product环境，使用config.dev.env.NODE_ENV作为当前的环境
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

// 一个可以强制打开浏览器并跳转到指定url的插件
var opn = require('opn')

// 使用Node自带的文件路径插件
var path = require('path')

// 使用express
var express = require('express')

// 使用webpack
var webpack = require('webpack')

// 使用proxyTable，http代理中间件
var proxyMiddleware = require('http-proxy-middleware')

// 开发或者生产环境的webpack配置
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic

// 如果没有指定运行端口，则运行端口为dev的端口
var port = process.env.PORT || config.dev.port

// automatically open browser, if not set will be false

// 自动打开浏览器
var autoOpenBrowser = !!config.dev.autoOpenBrowser


// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
// 使用的代理
var proxyTable = config.dev.proxyTable

// 使用express 启动一个服务
var app = express()

// 启动webpack进行编译
var compiler = webpack(webpackConfig)

// 启动webpack-dev-middleware中间件，将编译好的文件暂存到内存中
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

// 启动热加载
var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
// 将proxyTable中的请求配置挂载到启动的express服务上
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output

// 将暂存到内存中的webpack编译后的文件挂载到express服务上
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display

// 将Hot-reload 挂载到express服务上
app.use(hotMiddleware)

// serve pure static assets

// 拼接static文件夹的静态资源路径
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)

// 为静态资源提供响应服务
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

// express服务监听port的请求
var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
