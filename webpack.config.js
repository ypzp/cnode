const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  context: __dirname + '/src',
  devtool: 'inline-eval-source-map',
  entry: {
    main: './index',
    vendor: ['react', 'react-dom', 'react-router-dom', 'redux', 'react-redux', 'antd']
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader?cacheDirectory=true'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
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
    path: __dirname + '/dist',
    filename: '[name].[hash].js',
    publicPath: '/',
    chunkFilename: '[name].[chunkhash].chunk.js'
  }
}
