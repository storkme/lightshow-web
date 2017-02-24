let { devServer, output, module: _module, plugins, context, resolve, stats, devtool } = require('./webpack.shared');

module.exports = {
  entry: {
    main: './app/main.aot.ts',
    polyfill: './app/polyfill.ts'
  },
  context,
  output,
  module: _module,
  plugins: plugins(false),
  resolve,
  devServer,
  stats,
  devtool
};