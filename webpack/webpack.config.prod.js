const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const postcssFixes = require('postcss-fixes');
const cssnano = require('cssnano');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.[hash].js',
    publicPath: '/'
  },
  plugins: [
    new ExtractTextPlugin('styles.[hash].css', {
      allChunks: true
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        drop_console: true
      }
    }),
    new HtmlWebpackPlugin({
      template: './src/html/index.prod.html'
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: [/node_modules/, /styles/],
        loaders: ['babel'],
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?importLoaders=1!postcss')
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract(
          'style',
          // eslint-disable-next-line
          'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!less')
      },
      {
        test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream'
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
    }),
    cssnano({
      safe: true,
      calc: false
    })
  ],
  resolve: {
    extensions: ['', '.js', '.less'],
    root: [
      path.resolve('./src')
    ]
  }
};
