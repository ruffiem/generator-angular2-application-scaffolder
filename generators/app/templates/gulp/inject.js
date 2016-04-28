'use strict';

var gulp = require('gulp');
var inject = require('gulp-inject');
var conf = require('./conf');
var template = require('gulp-template');
var path = require('path');
var series = require('stream-series');
var fs = require('fs');
var minifyHTML = require('gulp-minify-html');
var mainBowerFiles = require('main-bower-files');
var filter = require('gulp-filter');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var join = path.join;

/*
 * inject task fills the index.html with JS and CSS additional files
 */
gulp.task('inject', function () {
  var angular2 = gulp.src(injectAngular2(), {read: false});
  var bower = injectBower();
  return gulp.src(join(__dirname, conf.paths.dist) + '/index.html')
    .pipe(inject(series(angular2, bower), { transform: transformPath() }))
    .pipe(template(templateLocals()))
    //.pipe(minifyHTML())
    .pipe(gulp.dest(join(__dirname, conf.paths.dist)));
});

/*
 * injectAngular2 will inject Angular2 required dependencies
 */
function injectAngular2() {
  var src = conf.lib.map(function (path) {
    return join(__dirname, conf.paths.lib, path.split('/').pop());
  });

  src.push(join(__dirname, conf.paths.dist, 'system.js'));

  return src;
}

/*
 * injectBower will inject Bower components
 */
function injectBower() {
  var jsFilter = filter('**/*.js', { restore: true});
  var cssFilter = filter('**/*.css', { restore: true});

  return gulp.src(mainBowerFiles())
  .pipe(jsFilter)
  .pipe(uglify())
  .pipe(gulp.dest(join(__dirname, conf.paths.dist, 'vendor')))
  .pipe(jsFilter.restore)
  .pipe(cssFilter)
  .pipe(concat('vendor.css'))
  .pipe(minifyCSS())
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest(join(__dirname, conf.paths.dist, 'vendor')))
  .pipe(cssFilter.restore);
}

/*
 * transformPath will force browser to load latest version of the application
 */
function transformPath() {
  var v = '?v=' + getVersion();
  var path = conf.paths.dist;

  return function (filepath) {
    var filename = filepath.replace('/' + path.replace('./../', ''), '') + v;
    arguments[0] = join('/', filename);
    return inject.transform.apply(inject.transform, arguments);
  };
}

/*
 * get version from package.json
 */
function getVersion() {
  var pkg = JSON.parse(fs.readFileSync('package.json'));
  return pkg.version;
}

/*
 * update with templatelocals
 */
function templateLocals() {
  return {
    VERSION: getVersion(),
    APP_BASE: '/'
  };
}
