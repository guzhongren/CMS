const isProduction = process.env.NODE_ENV === 'production'
const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// DLLPlugin
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const HappyPack = require('happypack')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const {
  GenerateSW
} = require('workbox-webpack-plugin')
const publicUrl = '/'
const buildTarget = './dist/'
module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: {
    app: ['@babel/polyfill', './src/index.tsx']
  },
  output: {
    filename: 'static/js/[name]_bundle.js',
    chunkFilename: 'static/js/[name]_bundle.js',
    path: path.resolve(__dirname, buildTarget),
    publicPath: publicUrl
  },
  devServer: {
    contentBase: path.resolve(__dirname, './public'),
    compress: true,
    host: 'localhost',
    hot: true,
    open: true,
    progress: true,
    inline: true,
    clientLogLevel: 'none',
    historyApiFallback: true,
    noInfo: false,
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: {
      '/api/v1/*': {
        target: 'http://127.0.0.1:1234',
        secure: false,
        changeOrigin: true
      }
    }
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30000, // 模块大于30k会被抽离到公共模块
      minChunks: 1, // 模块出现1次就会被抽离到公共模块
      maxAsyncRequests: 5, // 异步模块，一次最多只能被加载5个
      maxInitialRequests: 3, // 入口模块最多只能加载3个
      name: true,
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
          name: 'default'
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: 'vendors'
        }
      }
    },
    runtimeChunk: {
      name: 'runtime'
    }
  },
  devtool: isProduction ? '(none)' : 'cheap-module-eval-source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      '@config': path.resolve(__dirname, './src/config'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@stories': path.resolve(__dirname, './src/stories'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
      '@api': path.resolve(__dirname, './src/api'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@theme': path.resolve(__dirname, './src/theme')
    }
  },
  module: {
    rules: [{
        test: /\.(jsx|tsx|js|ts)$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'source-map-loader',
          'happypack/loader?id=babel'
        ]
      },
      {
        test: /\.(le|sa|sc|c)ss$/,
        use: [
          'css-hot-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              // modules: true,
              localIdentName: '[local]_[hash:base64:6]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: !isProduction,
              ident: 'postcss'
            }
          },
          {
            loader: 'resolve-url-loader'
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
              sourceMap: !isProduction
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg|ico|cur)(\?[=a-z0-9]+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: 'static/images/[hash:6].[ext]',
            fallback: 'file-loader'
          }
        }]
      },
      {
        test: /\.(ttf|eot|otf|woff(2)?)(\?[\s\S]+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'static/fonts/[hash:6].[ext]'
          }
        }]
      }
    ]
  },
  target: 'web',
  plugins: [
    // DllPlugin
    // new webpack.DllReferencePlugin({
    //   context: __dirname,
    //   manifest: require((isProduction ? './build' : './public') + '/dist/js/vendor-manifest.json')
    // }),
    new ProgressBarPlugin({
      format: 'build [:bar] :percent (:elapsed seconds)',
      clear: false,
      width: 60
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new MiniCssExtractPlugin({
      filename: 'static/style/[name].css'
    })
  ].concat(!isProduction ? [
    new webpack.HotModuleReplacementPlugin()
  ] : [
    new CleanWebpackPlugin(),
    new WebpackParallelUglifyPlugin({
      uglifyES: {
        mangle: false,
        output: {
          beautify: false,
          comments: false
        },
        compress: {
          warnings: false,
          drop_console: true,
          collapse_vars: true,
          reduce_vars: true
        }
      }
    }),
    new HappyPack({
      id: 'babel',
      threads: 4,
      loaders: ['babel-loader']
    }),
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'server',
    //   analyzerHost: '127.0.0.1',
    //   analyzerPort: 8889,
    //   reportFilename: 'report.html',
    //   defaultSizes: 'parsed',
    //   openAnalyzer: true,
    //   generateStatsFile: false,
    //   statsFilename: 'stats.json',
    //   statsOptions: null,
    //   logLevel: 'info'
    // })，
    new HtmlWebpackPlugin({
      title: 'Community Management System',
      hash: true,
      filename: './index.html',
      template: './public/template.html',
      favicon: path.resolve(__dirname, 'public/favicon.ico'),
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
      },
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      chunksSortMode: 'none',
      cache: true
    }),
    new CopyWebpackPlugin([{
      from: './public/config.js',
      to: path.resolve(__dirname, buildTarget),
      toType: 'dir'
    }, {
      from: './public/manifest.json',
      to: path.resolve(__dirname, buildTarget),
      toType: 'dir'
    }, {
      from: './public/icon.png',
      to: path.resolve(__dirname, buildTarget),
      toType: 'dir'
    }, {
      from: './public/favicon.ico',
      to: path.resolve(__dirname, buildTarget),
      toType: 'dir'
    }]),
    new GenerateSW({
      importWorkboxFrom: 'local',
      skipWaiting: true,
      clientsClaim: true,
      navigateFallbackBlacklist: [
        // Exclude URLs starting with /_, as they're likely an API call
        new RegExp('^/_'),
        // Exclude URLs containing a dot, as they're likely a resource in
        // public/ and not a SPA route
        new RegExp('/[^/]+\\.[^/]+$')
      ]
    })
  ])
}