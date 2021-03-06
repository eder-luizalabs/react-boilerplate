const path = require('path');
const sassPaths = require('node-neat').includePaths.map((sassPath) => {
  return `includePaths[]=${sassPath}`;
}).join('&');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const cssnext = require('cssnext');

module.exports = {
  entry: [
    'babel-polyfill',
    'es5-shim',
    'es5-shim/es5-sham',
    'console-polyfill',
    './app/index'
  ],
  resolve: {
    root: [
      path.join(__dirname, 'node_modules')
    ],
    extensions: ['', '.js', '.jsx', '.json']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js'
  },
  plugins: [
    new ExtractTextPlugin('styles.css')
  ],
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json' },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', `css!postcss!sass?${sassPaths}`) },
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' }
    ]
  },
  postcss() {
    return [cssnext()];
  }
};
