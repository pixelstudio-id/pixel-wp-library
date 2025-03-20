const DependencyExtractionWebpackPlugin = require('@wordpress/dependency-extraction-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const path = require('path');

const outputPath = 'dist';

const entryPoints = {
  'h-icon': './module-block-icon/icon-v1/index.jsx',
  'px-icon': './module-block-icon/icon-v2/index.jsx',
  'px-faq': './module-block-faq/faq-v3/index.jsx',
  'px-tabs': './module-block-tabs/px-tabs.js',
  'px-tabs-editor': './module-block-tabs/px-tabs-editor.js',

  'px-gutenberg': './module-gutenberg/px-gutenberg.js',
  'h-gutenberg': './module-gutenberg/_legacy/h-gutenberg.js',
  'px-classic-editor': './module-gutenberg/px-classic-editor.scss',

  'h-comment': './module-comment/src/h-comment.js',
  'h-admin': './module-modify/src/h-admin.sass',
  'h-widgets': './module-widgets/src/h-widgets.sass',
  'h-menu-admin': './module-menu/src/h-menu-admin.js',

  'px-dark-mode': './module-widgets-dark-mode/src/script.js',
  'px-dark-mode-head': './module-widgets-dark-mode/src/script-head.js',
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
