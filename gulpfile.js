// All build tasks
// ===============

var gulp = require('gulp');

// Build configurations.
var Config = {
  port: 4567,
  srcDir: './src',
  publicDir: './public',
  distDir: './dist'
};

// YavaScripts.
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var concat = require('gulp-concat');

gulp.task('babel', function () {
  return gulp.src('src/demo/index.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('index.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(Config.publicDir));
});

// Autoprefixer.
var prefix = require('gulp-autoprefixer');

gulp.task('autoprefixer', ['copy-styles'], function() {
  return gulp.src(Config.publicDir + '/*.css')
    .pipe(prefix("last 2 versions", "ie 9"))
    .pipe(gulp.dest(Config.publicDir))
});

// Copy styles
var concat = require('gulp-concat')

gulp.task('copy-styles', function() {
  return gulp.src([
      Config.srcDir + '/instructor/index.css',
      Config.srcDir + '/demo/index.css'
    ])
    .pipe(concat('demo.css'))
    .pipe(gulp.dest(Config.publicDir))
});

// Server.
var finalhandler = require('finalhandler');
var http = require('http');
var serveStatic = require('serve-static');
var serve = serveStatic(Config.publicDir, { 'index': ['index.html'] });
var server = http.createServer(function(req, res) {
  var done = finalhandler(req, res);
  serve(req, res, done);
})

gulp.task('serve', function() {
  server.listen(Config.port);
})


// Watch.
gulp.task('watch', function() {
  gulp.watch(Config.srcDir + '/**/*.js',  ['babel']);
  gulp.watch(Config.srcDir + '/**/*.css', ['autoprefixer']);
});
// ---

gulp.task('build',    ['babel', 'autoprefixer']);
gulp.task('default',  ['build', 'watch', 'serve']);
