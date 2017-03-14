const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  entry: './app/main.js',

  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
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
          presets: ['es2015', 'react', 'stage-2', ],
        },
      },
      {
        test: /\.s?css$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(eot|svg|ttf|otf|woff|woff2)$/,
        loader: 'file-loader?name=app/public/fonts/[name].[ext]',
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader',
     },
    ],
  },
};

module.exports = config;
