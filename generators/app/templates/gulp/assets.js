'use strict';

var gulp = require('gulp');
var conf = require('./conf');
var runSequence = require('run-sequence');
var path = require('path');
var join = path.join;

/*
 * assets task fetch all html and css files from src folder
 */
gulp.task('static', function () {
  return gulp.src([
    join(__dirname, conf.paths.src, '**/*.html'),
    join(__dirname, conf.paths.src, '**/*.css')])
    .pipe(gulp.dest(join(__dirname, conf.paths.dist)));
});

/*
 * other task takes care of the other files (images, archives, etc.)
 */
gulp.task('other', function () {
  return gulp.src([
    join(__dirname, conf.paths.src, '**/*'),
    join(__dirname, '!' + conf.paths.src, '**/*.{html,css,js,scss}')
  ])
    .pipe(gulp.dest(join(__dirname, conf.paths.dist, '/')));
});

gulp.task('assets', function (done) {
  runSequence('static', 'other', done);
});
