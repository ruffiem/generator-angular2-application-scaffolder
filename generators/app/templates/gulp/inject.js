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
gulp.task('inject:dev', function () {
  var angular2 = gulp.src(injectAngular2('tmp'), {read: false});
  var bower = injectBower('tmp');
  return gulp.src(join(__dirname, conf.paths.tmp) + '/index.html')
    .pipe(inject(series(angular2, bower), { relative : true }))
    .pipe(template(templateLocals()))
    .pipe(gulp.dest(join(__dirname, conf.paths.tmp)));
});

/*
 * inject task fills the index.html with JS and CSS additional files
 */
gulp.task('inject:build', function () {
  var angular2 = gulp.src(injectAngular2('dist'), {read: false});
  var bower = injectBower('dist');
  return gulp.src(join(__dirname, conf.paths.dist) + '/index.html')
    .pipe(inject(series(angular2, bower), { transform: transformPath() }))
    .pipe(template(templateLocals()))
    .pipe(minifyHTML())
    .pipe(gulp.dest(join(__dirname, conf.paths.dist)));
});

/*
 * injectAngular2 will inject Angular2 required dependencies
 */
function injectAngular2(env) {
  var src = conf.lib.map(function (path) {
    return join(__dirname, conf.paths[env], 'lib', path.split('/').pop());
  });


  if(env === 'dist') {
    src.push(join(__dirname, conf.paths.lib, 'lib.js'));
  }

  src.push(join(__dirname, conf.paths[env], 'system.js'));

  return src;
}

/*
 * injectBower will inject Bower components
 */
function injectBower(env) {
  var jsFilter = filter('**/*.js', { restore: true});
  var cssFilter = filter('**/*.css', { restore: true});

  return gulp.src(mainBowerFiles())
  .pipe(jsFilter)
  .pipe(concat('vendor.js'))
  .pipe(uglify())
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest(join(__dirname, conf.paths[env], 'vendor')))
  .pipe(jsFilter.restore)
  .pipe(cssFilter)
  .pipe(concat('vendor.css'))
  .pipe(minifyCSS())
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest(join(__dirname, conf.paths[env], 'vendor')))
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
