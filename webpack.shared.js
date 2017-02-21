let webpack = require('webpack');
let path = require('path');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');

let WS_ENDPOINT = "ws://\"+window.location.host+\"";

if (process.argv.indexOf('-p') > 0) {
  console.error('Running in production mode');
} else {
  WS_ENDPOINT = "ws://localhost:8096";
}

console.log('Using websocket endpoint: ' + WS_ENDPOINT);

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
      test: /\.css$/,
      include: path.resolve(process.cwd(), 'src', 'app'),
      loaders: ['to-string-loader', 'css-loader']
    },
    {
      test: /\.css$/,
      exclude: path.resolve(process.cwd(), 'src', 'app'),
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader'
      })
    }
  ]
};

module.exports.plugins = [
  new webpack.ProgressPlugin(),
  new webpack.ContextReplacementPlugin(
    // The (\\|\/) piece accounts for path separators in *nix and Windows
    /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
    path.join(process.cwd(), 'src')
  ),
  new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en-gb/),
  new CopyWebpackPlugin([
    { from: 'index.html' }
  ]),
  new ExtractTextPlugin('style.bundle.css'),
  // new webpack.DefinePlugin({
  //   'WS_ENDPOINT': `"${WS_ENDPOINT}"`,
  // })
];

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