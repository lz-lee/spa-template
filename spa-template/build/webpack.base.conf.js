// 使用Nodejs自带的文件路径插件
var path = require('path')

// 引入工具js
var utils = require('./utils')

// 引入config／index.js
var config = require('../config')

// 引入vueloader配置
var vueLoaderConfig = require('./vue-loader.conf')

// 拼接工作区路径为一个绝对路径
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  // 编译文件入口
  entry: {
    app: './src/main.js'
  },
  // 输出
  output: {

    // config - build 的assetsRoot。（创建dist目录）
    path: config.build.assetsRoot,

    // 编译输出的文件名即entry 的key值 app
    filename: '[name].js',

    // 正式发布环境下编译输出的发布路径
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    // 自动补全文件后缀
    extensions: ['.js', '.vue', '.json'],

    // 别名
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        
        // preloader  在loader之前处理js vue 文件
        enforce: 'pre',
        // 表示只检查这路径下的文件
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          // 文件小于10k则会压缩成base64格式打包到js文件中，否则会单独生成一个文件
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
