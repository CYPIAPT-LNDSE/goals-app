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
        },
      },
      {
        test: /\.s?css$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(eot|svg|ttf|otf|woff|woff2)$/,
        loader: 'file-loader?name=app/public/fonts/[name].[ext]'
      },
    ],
  },
};

module.exports = config;
