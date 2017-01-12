const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const postcssFixes = require('postcss-fixes');
const DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = {
  devtool: 'eval',
  entry: [
    'eventsource-polyfill',
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new DashboardPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.ProvidePlugin({
      fetch: 'imports?this=>global!exports?global.fetch!isomorphic-fetch'
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js?/,
        exclude: [/node_modules/, /styles/],
        loaders: ['react-hot', 'babel']
      },
      {
        test: /\.css$/,
        loaders: [
          'style?sourceMap',
          'css?importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
          'postcss',
        ]
      },
      {
        test: /\.less$/,
        loaders: [
          'style?sourceMap',
          'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
          'postcss',
          'less?sourceMap'
        ]
      },
      {
        test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url'
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url'
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file'
      }
    ]
  },
  postcss: () => [
    postcssFixes(),
    autoprefixer({
      browsers: ['last 2 version', 'IE >= 9']
    })
  ],
  resolve: {
    extensions: ['', '.js', '.less'],
    root: [
      path.resolve('./src')
    ]
  }
};
