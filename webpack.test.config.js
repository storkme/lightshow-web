let { module: _module, plugins, resolve, } = require('./webpack.shared');

module.exports = {
  /**
   * Source map for Karma from the help of karma-sourcemap-loader &  karma-webpack
   *
   * Do not change, leave as is or it wont work.
   * See: https://github.com/webpack/karma-webpack#source-maps
   */
  devtool: 'inline-source-map',
  resolve,
  plugins: plugins(true),
  module: _module
};