'use strict';

var gulp = require('gulp');
var conf = require('./conf');
var runSequence = require('run-sequence');
var minifyHTML = require('gulp-minify-html');
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

  var htmlFilter = filter('**/*.html', { restore: true});
  var cssFilter = filter('**/*.css', { restore: true});

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
gulp.task('other:build', function () {
  return gulp.src([
    join(__dirname, conf.paths.src, '**/*'),
    join('!', __dirname, conf.paths.src, '**/*.{html,css,js,ts,sass,scss}')
  ])
    .pipe(gulp.dest(join(__dirname, conf.paths.dist, '/')));
});
gulp.task('other:dev', function () {
  return gulp.src([
    join(__dirname, conf.paths.src, '**/*'),
    join('!', __dirname, conf.paths.src, '**/*.{html,css,js,ts,sass,scss}')
  ])
    .pipe(gulp.dest(join(__dirname, conf.paths.tmp, '/')));
});

gulp.task('assets:dev', function (done) {
  runSequence('static:dev', 'other:dev', done);
});

gulp.task('assets:build', function (done) {
  runSequence('static:build', 'other:build', done);
});
