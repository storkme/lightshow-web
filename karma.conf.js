module.exports = config => {
  let testWebpackConfig = require('./webpack.test.config');

  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    exclude: [],
    files: [
      { pattern: './src/spec-bundle.js', watched: false }
    ],
    preprocessors: { './src/spec-bundle.js': ['webpack', 'sourcemap'] },
    client: {
      builtPaths: ['src/'], // add more spec base paths as needed
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: true,
    webpack: testWebpackConfig,
    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i.e.
      noInfo: true,
      // and use stats to turn off verbose output
      stats: {
        // options i.e.
        chunks: false
      }
    }
  });
};