const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  context: __dirname + '/src',
  devtool: 'cheap-module-source-map', // 为了可以在控制台跟踪到自己的代码位置，精确到行
  entry: {
    main: './index',
    vendor: ['react', 'react-dom', 'react-router-dom', 'redux', 'react-redux', 'antd'] //分离react
  }, //入口文件
  resolve: {
    extensions: ['.js', '.jsx'] //解决webpack无法识别jsx
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/, //正则匹配js,然后解析
        exclude: /(node_modules)/, //跳过
        loader: 'babel-loader?cacheDirectory=true'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'] //引入css模块
      },
      {
        test: /\.svg/,
        loader: 'svg-url-loader?limit=10000' //svg图片
      },
      {
        test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
        exclude: /^node_modules$/,
        use: [
          {
            loader: 'file-loader?limit=20480&name=image/[hash:8].[name].[ext]'
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor', // 指定一个希望作为公共包的入口
      filename: 'vendor.js'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new CleanWebpackPlugin(['dist'])
    /*new webpack.optimize.UglifyJsPlugin()*/
  ],
  output: {
    path: __dirname + '/dist', //输出文件
    filename: '[name].[hash].js',
    publicPath: '/',
    chunkFilename: '[name].[chunkhash].chunk.js'
  }
}
