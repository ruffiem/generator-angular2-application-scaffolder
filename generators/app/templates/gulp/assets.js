'use strict';

var gulp = require('gulp');
var conf = require('./conf');
var runSequence = require('run-sequence');
var filter = require('gulp-filter');
var minifyCSS = require('gulp-clean-css');
var path = require('path');
var join = path.join;

/*
 * assets task fetch all html and css files from src folder
 */
gulp.task('static:dev', function () {
  return gulp.src([
    join(__dirname, conf.paths.src, '**/*.html'),
    join(__dirname, conf.paths.src, '**/*.css')])
    .pipe(gulp.dest(join(__dirname, conf.paths.tmp)));
});
/*
 * assets task fetch all html and css files from src folder
 */
gulp.task('static:build', function () {

  var cssFilter = filter('**/*.css', { restore: true });

  return gulp.src([
    join(__dirname, conf.paths.src, '**/*.html'),
    join(__dirname, conf.paths.src, '**/*.css')])
    .pipe(cssFilter)
    .pipe(minifyCSS())
    .pipe(cssFilter.restore)
    .pipe(gulp.dest(join(__dirname, conf.paths.dist)));
});

/*
 * other task takes care of the other files (images, archives, etc.)
 */
gulp.task('other', function () {

  var env = conf.getEnv(this) === 'dev' ? conf.paths.tmp : conf.paths.dist;

  return gulp.src([
    join(__dirname, conf.paths.src, '**/*'),
    join('!', __dirname, conf.paths.src, '**/*.{html,css,js,ts,sass,scss}')
  ])
    .pipe(gulp.dest(join(__dirname, env, '/')));
});

gulp.task('assets', function (done) {
  var env = conf.getEnv(this);

  if(env === 'dev') {
    runSequence('static:dev', 'other', done);
  } else {
    runSequence('static:build', 'other', done);
  }

});
