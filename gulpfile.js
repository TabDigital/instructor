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
var babelify = require('babelify');
var browserify = require('browserify')
var source = require('vinyl-source-stream');

gulp.task('babel', function() {
  browserify({ entries: Config.srcDir + '/demo/index.js', debug: true})
    .transform(babelify)
    .bundle()
    .pipe(source('index.js'))
    .pipe(gulp.dest(Config.publicDir))
});

// Release.
gulp.task('release', function() {
  browserify({ entries: Config.srcDir + '/instructor/index.js', debug: false})
    .transform(babelify)
    .bundle()
    .pipe(source('instructor.js'))
    .pipe(gulp.dest(Config.distDir))
})

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
