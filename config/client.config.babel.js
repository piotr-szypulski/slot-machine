import path from 'path';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

module.exports = {
  entry: {
    main: './src/client/app.js',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: '[name].js',
  },
  target: 'web',
  devtool: '#source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: '/assets/',
              publicPath: '/assets',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: 'index.html',
      filename: 'index.html',
      excludeChunks: ['server'],
    }),
    new CopyWebpackPlugin([
      { from: 'src/assets/', to: 'assets/' },
    ]),
  ],
};
