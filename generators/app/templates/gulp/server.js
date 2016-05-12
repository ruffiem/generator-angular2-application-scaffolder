'use strict';

var gulp = require('gulp');
var conf = require('./conf');
var express = require('express');
var serveStatic = require('serve-static');
var openResource = require('open');
var runSequence = require('run-sequence');
var tinylr = require('tiny-lr')();
var connectLivereload = require('connect-livereload');
var watch = require('gulp-watch');
var gutil = require('gulp-util');
var path = require('path');
var join = path.join;

/*
 * create a watcher to track changes
 */
gulp.task('serve', ['dev', 'livereload'], function () {

  var c = gutil.colors.bold;

  watch(join(__dirname, conf.paths.src, '/**'), function (e) {
    runSequence('dev:live', function () {
      notifyLiveReload(e);
    });
  }).on('error', conf.errorHandler('watch'));
  serve();

  gutil.log(c.green('-----------------------------------'));
  gutil.log(c.green('Serving from:'), c.cyan('http://localhost:' + conf.ports.http));
  gutil.log(c.green('-----------------------------------'));

});

/*
 * add task livereload to gulp
 */
gulp.task('livereload', function () {
  tinylr.listen(conf.ports.liveReload);
});

/*
 * create a node server
 */
function serve() {
  var app;
  app = express().use('/', connectLivereload({port: conf.ports.liveReload}), serveStatic(join(__dirname, conf.paths.tmp)));
  app.all('/*', function (req, res) {
    res.sendFile(join(__dirname, conf.paths.tmp, 'index.html'));
  });
  app.listen(conf.ports.http, function () {
    openResource('http://localhost:' + conf.ports.http);
  });
}

/*
 * log changed files to the console
 */
function notifyLiveReload(e) {
  var fileName = e.path;
  tinylr.changed({
    body: {
      files: [fileName]
    }
  });
}
