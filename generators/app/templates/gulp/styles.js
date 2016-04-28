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
gulp.task('sass', function () {
  return gulp.src(join(__dirname, conf.paths.src, '**/*.{sass,scss}'))
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(join(__dirname, conf.paths.dist)));
});

/*
 * Import fonts from bower_components
 */
gulp.task('fonts', function () {
  return gulp.src(join(__dirname, conf.paths.bower, '/**/*.{eot,svg,ttf,woff,woff2}'))
    .pipe(flatten())
    .pipe(gulp.dest(join(__dirname, conf.paths.dist, 'fonts')));
});

gulp.task('styles', function (done) {
  runSequence('sass', 'fonts', done);
});
