// Build tasks
// ===========

var gulp  = require('gulp');
var utils = require('gulp-util');

// Testing
var jest  = require('gulp-jest');
var packageJson = Object.create(require('./package.json'));

gulp.task('jest', function() {
  return gulp.src(".")
    .pipe(jest(packageJson.jest));
});

// Build configurations.
var path = require('path');

var Config = {
  srcDir:         path.resolve('./src'),
  publicDir:      path.resolve('./public')
};

// Environment detection
var currentEnv = process.env.NODE_ENV === 'production' ?
  'production' : 'development';
utils.log(
  'Environment:', utils.colors.blue(currentEnv)
);

// Webpack build
var webpack           = require('webpack');
var webpackConfig     = Object.create(require('./webpack.config.js'));
var CompressionPlugin = require('compression-webpack-plugin');

webpackConfig.plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(currentEnv)
    }
  })
);

gulp.task('webpack:build', function(callback) {
  webpackConfig.output.path = Config.publicDir;
  webpackConfig.devtool = '#source-map';
  webpackConfig.progress = true;

  if (currentEnv === 'production') {
    webpackConfig.bail = true;
    webpackConfig.debug = false;
    webpackConfig.profile = false;
    webpackConfig.output.pathInfo = false;
    webpackConfig.plugins.push(
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        mangle: { except: ['require', 'export', 'import', '$super'] },
        compress: {
          sequences: true,
          dead_code: true,
          conditionals: true,
          booleans: true,
          unused: true,
          if_return: true,
          join_vars: true,
          drop_console: true,
          warnings: false
        }
      }),
      new CompressionPlugin({
        asset: "{file}.gz",
        algorithm: "gzip",
        threshold: 10240,
        minRatio: 0.8
      })
    );
  }

  webpack(webpackConfig, function(err, stats) {
    if (err) throw new utils.PluginError('webpack:build', err);

    utils.log('Webpack', stats.toString({
      colors: true,
      chunks: false
    }));

    callback();
  });
});

// Webpack server
var WebpackDevServer  = require('webpack-dev-server');

gulp.task('webpack:serve', function() {
  var hostname = 'localhost';
  var port = 4567;
  var compiler = webpack(webpackConfig);

  var server = new WebpackDevServer(compiler, {
    contentBase: webpackConfig.contentBase,
    publicPath: webpackConfig.output.publicPath,
    historyApiFallback: true,
    noInfo: true,
    hot: true,
    stats: {
      colors: true,
      chunks: false
    }
  });
  server.listen(port, hostname, function(err) {
    if (err) throw new utils.PluginError('webpack:serve', err);

    utils.log("Starting", utils.colors.red("Webpack Dev Server"));
    utils.log(
      "Listening on",
      utils.colors.red("http://" + hostname + ":" + port)
    );
  });
});

// ESLint. I can't figure out where gulp-eslint is trying to find the .eslintignore
// file, so I'm relying on gulp for exclusions for now. Excluding tests because
// otherwise it screams about Jest/Jasmine magic.
var eslint = require('gulp-eslint');

gulp.task('eslint', function() {
  return gulp.src(
    [
      Config.srcDir + '/**/*.js*',
      '!**/tests/**'
    ]
  )
  .pipe(eslint())
  .pipe(eslint.format())
});

// Watch.
gulp.task('watch', function() {
  gulp.watch(Config.srcDir + '/**/*.js*',  ['eslint', 'jest']);
});

gulp.task('build',    ['eslint', 'webpack:build']);
gulp.task('default',  ['webpack:serve', 'build', 'watch']);
