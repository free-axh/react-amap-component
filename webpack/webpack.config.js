const path = require('path');
module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: './src/component/index.js',
  output: {
    path: path.resolve(__dirname, '../dist'), // 输出的路径
    filename: '[name]_[hash:8].js'  // 打包后文件
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
    ]
  },
}