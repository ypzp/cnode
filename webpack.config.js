var webpack = require('webpack')
var path = require('path')

module.exports = {
  context: __dirname + '/src',
  devtool: 'cheap-module-source-map', // 为了可以在控制台跟踪到自己的代码位置，精确到行
  entry: {
    main: './index',
    vendor: ['react', 'react-dom', 'react-router-dom', 'redux', 'react-redux'] //分离react
  }, //入口文件
  resolve: {
    extensions: ['.js', '.jsx'] //解决webpack无法识别jsx
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/, //正则匹配js,然后解析
        exclude: /(node_modules)/, //跳过
        loader: 'babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-1',
        query: {
          presets: ['react', 'es2015', 'stage-1', 'es2017'],
          plugins: [
            'react-html-attrs',
            'transform-class-properties',
            [
              'transform-runtime',
              [
                'import',
                {
                  libraryName: 'antd',
                  style: true
                }
              ]
            ]
          ]
        }
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
        test: /\.(png)|(jpg)|(gif)$/,
        loader: 'url-loader?limit=10000&name=build/[name].[ext]'
      },
      {
        test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
        exclude: /^node_modules$/,
        use: [
          {
            loader: 'file-loader?limit=8192&name=image/[hash:8].[name].[ext]'
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor', // 指定一个希望作为公共包的入口
      filename: 'vendor.js'
    }),
    new webpack.optimize.ModuleConcatenationPlugin()
    /* new webpack
      .optimize
      .UglifyJsPlugin()*/
  ],
  output: {
    path: __dirname + '/dist', //输出文件
    filename: 'app.js',
    publicPath: '/dist',
    chunkFilename: 'dist/[name].chunk.js'
  }
}
