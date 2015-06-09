// All build tasks
// ===============

var gulp = require('gulp');

// Build configurations.
var Config = {
  port:       '4567',
  srcDir:     './src',
  publicDir:  './public'
};

// YavaScripts.
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var concat = require('gulp-concat');

gulp.task('babel', function () {
  return gulp.src('src/boot.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('bundle.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(Config.publicDir));
});

// SASS.
var sass = require('gulp-ruby-sass');

gulp.task('sass', function() {
  return sass(
      Config.srcDir + '/stylesheets/index.scss',
      { require: 'sass-globbing' }
    )
    .pipe(gulp.dest(Config.publicDir + '/stylesheets/'))
});
// ---

// Autoprefixer.
var prefix = require('gulp-autoprefixer');

gulp.task('autoprefixer', ['sass'], function() {
  return gulp.src(Config.publicDir + '/stylesheets/*.css')
    .pipe(prefix("last 2 versions", "ie 9"))
    .pipe(gulp.dest(Config.publicDir + '/stylesheets/'))
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
  gulp.watch(Config.srcDir + '/**/*.scss', ['autoprefixer']);
});
// ---

gulp.task('build',    ['babel', 'autoprefixer']);
gulp.task('default',  ['build', 'watch', 'serve']);
