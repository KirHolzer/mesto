const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const mode = process.env.NODE_ENV ||  'development';
const devMode = (mode === 'development');
const target = devMode ? 'web' : 'browserslist';
const devtool =  devMode ? 'sourse-map' : undefined;

module.exports = {
  entry: ['@babel/polyfill' ,path.resolve(__dirname, "src", "index.js")],
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true, 
    filename: '[name].[contenthash].js',
  },
  plugins: [new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'src', 'index.html')
  })],
  module: {
    rules: [
        {
            test:/\.html$/i,
            loader: 'html-loader',
        },
        {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
          },
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', { targets: "defaults" }]
                ]
              }
            }
          }
    ]
  }
};
