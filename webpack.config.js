const path = require('path');
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: './src/script.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'script.js',
    clean: true
  },
  plugins: [
    new htmlWebpackPlugin({
        template: "./src/index.html"
    })
  ],
  module: {
    rules: [
        {
            test: /\.html$/i,
            loader: "html-loader"
        }
    ]
  }
};