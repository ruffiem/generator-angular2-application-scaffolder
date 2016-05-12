'use strict';

var gulp = require('gulp');
var conf = require('./conf');
var del = require('del');
var runSequence = require('run-sequence');
var path = require('path');
var join = path.join;

/*
 * clean task removes all the content from the distribution folder
 */
gulp.task('clean:dev', function () {
  del(join(__dirname, conf.paths.tmp));
});
gulp.task('clean:build', function () {
  del(join(__dirname, conf.paths.dist));
});

/*
 * build task runs all required tasks to launch the app
 */
gulp.task('dev', function (done) {
  runSequence('clean:dev', 'assets:dev', 'scripts:dev', 'styles:dev', 'inject:dev', done);
});

/*
 * build task runs all required tasks to launch the app
 */
gulp.task('build', function (done) {
  runSequence('clean:build', 'assets:build', 'scripts:build', 'styles:build', 'inject:build', done);
});

/*
 * build:live bypass cleaning distribution folder
 */
gulp.task('dev:live', function (done) {
  runSequence('assets:dev', 'scripts:dev', 'styles:dev', 'inject:dev', done);
});
