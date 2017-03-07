const ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
  entry: './app/main.js',

  output: {
    filename: 'bundle.js',
    path: __dirname
  },

  devServer: {
    inline: true,
    port: 8080
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }, {
        test: /\.s?css$/,
        exclude: /node_modules/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};

module.exports = config;
