let { devServer, output, module: _module, plugins, context, resolve, stats, devtool } = require('./webpack.shared');

module.exports = {
  entry: {
    main: './app/main.jit.ts',
    polyfill: './app/polyfill.ts'
  },
  context,
  output,
  module: _module,
  plugins,
  resolve,
  devServer,
  stats,
  devtool
};
