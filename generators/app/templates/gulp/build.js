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
gulp.task('clean', function () {
  del(join(__dirname, conf.paths.dist));
});

/*
 * build task runs all required tasks to launch the app
 */
gulp.task('build', function (done) {
  runSequence('clean', 'assets', 'scripts', 'styles', 'inject', done);
});

/*
 * build:live bypass cleaning distribution folder
 */
gulp.task('build:live', function (done) {
  runSequence('assets', 'scripts', 'styles', 'inject', done);
});
