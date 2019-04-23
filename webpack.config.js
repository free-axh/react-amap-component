const path = require('path');
module.exports = {
  entry: './src/component/index.js',
  output: {
    path: path.resolve(__dirname, './dist'), // 输出的路径
    filename: 'react-amap.js',
    library: 'ReactAMAP',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx']
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
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
    ],
  },
}