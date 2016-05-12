'use strict';

var gulp = require('gulp');
var conf = require('./conf');
var sass = require('gulp-sass');
var flatten = require('gulp-flatten');
var runSequence = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');
var path = require('path');
var join = path.join;

/*
 * sass task compiles sass files to css
 */
gulp.task('sass:build', function () {
  return gulp.src(join(__dirname, conf.paths.src, '**/*.{sass,scss}'))
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(join(__dirname, conf.paths.dist)));
});
gulp.task('sass:dev', function () {
  return gulp.src(join(__dirname, conf.paths.src, '**/*.{sass,scss}'))
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(join(__dirname, conf.paths.tmp)));
});

/*
 * Import fonts from bower_components
 */
gulp.task('fonts:build', function () {
  return gulp.src(join(__dirname, conf.paths.bower, '/**/*.{eot,svg,ttf,woff,woff2}'))
    .pipe(flatten())
    .pipe(gulp.dest(join(__dirname, conf.paths.dist, 'fonts')));
});
gulp.task('fonts:dev', function () {
  return gulp.src(join(__dirname, conf.paths.bower, '/**/*.{eot,svg,ttf,woff,woff2}'))
    .pipe(flatten())
    .pipe(gulp.dest(join(__dirname, conf.paths.tmp, 'fonts')));
});

gulp.task('styles:build', function (done) {
  runSequence('sass:build', 'fonts:build', done);
});
gulp.task('styles:dev', function (done) {
  runSequence('sass:dev', 'fonts:dev', done);
});
