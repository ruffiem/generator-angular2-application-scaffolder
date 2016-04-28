var gutil = require('gulp-util');

/*
 * set prefix for relative paths
 */
var pre = './../';

/*
 * set environment paths relatively to gulp tasks folder
 */
exports.paths = {
  dist: pre + 'dist',
  lib: pre + 'dist/lib',
  src: pre + 'src',
  tmp: pre + '.tmp',
  bower: pre + 'bower_components'
};

/*
 * set essential libraries for angular2 to run (keep the order)
 */
exports.lib = [
  pre + 'node_modules/es6-shim/es6-shim.min.js',
  pre + 'node_modules/es6-shim/es6-shim.map',
  pre + 'node_modules/systemjs/dist/system-polyfills.js',
  pre + 'node_modules/systemjs/dist/system-polyfills.js.map',
  pre + 'node_modules/angular2/es6/dev/src/testing/shims_for_IE.js',
  pre + 'node_modules/angular2/bundles/angular2-polyfills.js',
  pre + 'node_modules/systemjs/dist/system.src.js',
  pre + 'node_modules/rxjs/bundles/Rx.js',
  pre + 'node_modules/angular2/bundles/angular2.dev.js',
];

/*
 * set ports for the node and the live reload servers
 */
exports.ports = {
  http: 5555,
  liveReload: 4002
};

/*
 * error output
 */
exports.errorHandler = function(title) {
  'use strict';

  return function(err) {
    gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
    this.emit('end');
  };
};
