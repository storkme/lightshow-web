let webpack = require('webpack');
let path = require('path');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');

let development = true;

if (process.argv.indexOf('-p') > 0) {
  console.error('!! Running in production mode !!');
  development = false;
}

module.exports.devServer = {
  contentBase: './src',
  port: 9000,
  inline: true,
  stats: 'errors-only',
  historyApiFallback: {
    disableDotRule: true
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 500
  }
};

module.exports.output = {
  path: path.resolve(process.cwd(), 'dist'),
  filename: '[name].bundle.js'
};

module.exports.module = {
  rules: [
    {
      test: /\.ts$/,
      use: ['awesome-typescript-loader', 'angular2-template-loader']
    },
    {
      test: /\.html$/,
      use: 'raw-loader'
    },
    {
      test: /\.scss$/,
      include: path.resolve(process.cwd(), 'src', 'app'),
      loaders: ['to-string-loader', 'raw-loader', 'sass-loader']
    }
  ]
};

module.exports.plugins = (testMode = false) => {
  let plugins = [
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      path.join(process.cwd(), 'src')
    ),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en-gb/),
    new ExtractTextPlugin('style.bundle.css'),
    new webpack.DefinePlugin({
      'DEV_MODE': development,
    })
  ];

  if (!testMode) {
    plugins.push(new CopyWebpackPlugin([
      { from: 'index.html' },
      { from: 'assets', to: 'assets' }
    ]));
  }

  return plugins;
};

module.exports.resolve = {
  modules: [
    'node_modules',
    path.resolve(process.cwd(), 'src')
  ],
  extensions: ['.ts', '.js']
};

module.exports.context = path.join(process.cwd(), 'src');

module.exports.stats = 'errors-only';

module.exports.devtool = 'source-map';