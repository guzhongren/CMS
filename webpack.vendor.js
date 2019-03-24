const isProduction = process.env.NODE_ENV === 'production'
const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const targetContent = isProduction ? 'build' : 'public'

module.exports = {
  mode: 'production',
  entry: {
    vendor: [
      'antd',
      'antd/dist/antd.css',
      'echarts',
      'maptalks',
      'axios',
    ]
  },
  output: {
    path: path.join(__dirname, targetContent, 'dist', 'js'),
    filename: '[name].js',
    library: '[name]_[hash]'
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg|ttf|eot|ico|cur|woff(2)?)(\?[=a-z0-9]+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1 * 1024,
            name: 'images/[hash:6].[ext]',
            fallback: 'file-loader'
          }
        }]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: false
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin('./build'),
    new webpack.DllPlugin({
      path: path.join(__dirname, targetContent, 'dist', 'js', '[name]-manifest.json'),
      name: '[name]_[hash]'
    })
  ]
}
