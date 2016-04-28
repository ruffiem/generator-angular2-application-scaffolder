'use strict';

var gulp = require('gulp');
var wrench = require('wrench');

/*
 * wrench reads gulp/ direcotry and import JS and COFFEE files
 */
wrench.readdirSyncRecursive('./gulp').filter(function (file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function (file) {
  require('./gulp/' + file);
});

/*
 * default task required by gulp
 */
gulp.task('default', function () {
  gulp.start('build');
});
