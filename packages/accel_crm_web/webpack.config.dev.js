const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

require('dotenv').config();

if (!process.env.APP_COOKIE) {
  throw new Error('Please set the APP_COOKIE in your .env file!');
}

if (!process.env.API_URL) {
  throw new Error('Please set the API_URL in your .env file!');
}

if (!process.env.STRIPE_KEY) {
  throw new Error('Please set the STRIPE_KEY in your .env file!');
}

if (!process.env.STRIPE_IMAGE) {
  throw new Error('Please set the STRIPE_IMAGE in your .env file!');
}

/**
 * Webpack Development Configuration
 */
module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: `${path.resolve(__dirname, './src')}/index.tsx`,
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        APP_NAME: JSON.stringify(process.env.APP_NAME),
        APP_COOKIE: JSON.stringify(process.env.APP_COOKIE),
        API_URL: JSON.stringify(process.env.API_URL),
        STRIPE_KEY: JSON.stringify(process.env.STRIPE_KEY),
        STRIPE_IMAGE: JSON.stringify(process.env.STRIPE_IMAGE),
        FILE_URL: JSON.stringify(process.env.FILE_URL),
      },
    }),
    new HtmlWebpackPlugin({
      template: './src/index-dev.html',
      favicon: './src/assets/icon-green.jpg',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        use: 'tslint-loader',
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
      {
        test: /\.s(a|c)ss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.(pdf|ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: 'file-loader',
        query: {
          name: 'assets/[name].[hash:8].[ext]',
        },
      }
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.css'],
  },
  devServer: {
    historyApiFallback: true,
  },
};
