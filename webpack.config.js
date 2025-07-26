const DependencyExtractionWebpackPlugin = require('@wordpress/dependency-extraction-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const path = require('path');

const outputPath = '_dist';

const entryPoints = {
  'px-admin': './px-admin',

  'h-icon': './block-icon/icon-v1/index.jsx',
  'px-icon': './block-icon/icon-v2/index.jsx',
  'px-faq': './block-faq/faq-v3/index.jsx',
  'px-tabs': './block-tabs/px-tabs.js',
  'px-tabs-editor': './block-tabs/px-tabs-editor.js',

  'px-gutenberg': './gutenberg/px-gutenberg.js',
  'h-gutenberg': './gutenberg/_legacy/h-gutenberg.js',
  'px-classic-editor': './gutenberg/px-classic-editor.scss',

  'h-comment': './comment/src/h-comment.js',
  'h-widgets': './widgets/src/h-widgets.sass',
  'h-menu-admin': './menu/src/h-menu-admin.js',

  'px-dark-mode': './widgets-dark-mode/src/script.js',
  'px-dark-mode-head': './widgets-dark-mode/src/script-head.js',
};

module.exports = {
  entry: entryPoints,
  output: {
    publicPath: '',
    path: path.resolve(__dirname, outputPath),
    filename: '[name].js',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new DependencyExtractionWebpackPlugin({
      injectPolyfill: true,
    }),
    new BrowserSyncPlugin({
      proxy: 'http://lab.test/',
      files: [`${outputPath}/*.css`],
      injectCss: true,
    }, { reload: false }),
  ],
  module: {
    rules: [
      {
        test: /\.s?[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(jpg|jpeg|png|gif|woff|woff2|eot|ttf|svg)$/i,
        use: 'url-loader?limit=1024',
      },
      {
        test: /\.jsx$/i,
        use: [
          require.resolve('thread-loader'),
          {
            loader: require.resolve('babel-loader'),
            options: {
              cacheDirectory: process.env.BABEL_CACHE_DIRECTORY || true,
              babelrc: false,
              configFile: false,
              presets: [
                require.resolve('@wordpress/babel-preset-default'),
              ],
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      '@lib': path.resolve(__dirname, '_lib/'),
    },
  },
};
