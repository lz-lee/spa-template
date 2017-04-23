// 检查node 和 npm 版本
require('./check-versions')()

process.env.NODE_ENV = 'production'

// loading 插件
var ora = require('ora')

// 删除文件插件
var rm = require('rimraf')

var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')

// 使用ora打印 loading log
var spinner = ora('building for production...')

// 开始loading动画
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err

    //  开始编译
  webpack(webpackConfig, function (err, stats) {

    // 编译成功的回调
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
