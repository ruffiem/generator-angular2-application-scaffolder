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
  var env = conf.getEnv(this) === 'dev' ? conf.paths.tmp : conf.paths.dist;
  del(join(__dirname, env));
});


/*
 * build task runs all required tasks to launch the app
 */
gulp.task('dev', function (done) {
  runSequence('clean', 'assets', 'scripts', 'styles', 'inject:dev', done);
});

/*
 * build task runs all required tasks to launch the app
 */
gulp.task('build', function (done) {
  runSequence('clean', 'assets', 'scripts', 'styles', 'inject:build', done);
});

/*
 * build:live bypass cleaning distribution folder
 */
gulp.task('dev:live', function (done) {
  runSequence('assets', 'scripts', 'styles', 'inject:dev', done);
});
