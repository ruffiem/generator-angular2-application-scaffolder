'use strict';

var gulp = require('gulp');
var conf = require('./conf');
var template = require('gulp-template');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var tsc = require('gulp-typescript');
var insert = require('gulp-insert');
var uglify = require('gulp-uglify');
var filter = require('gulp-filter');
var concat = require('gulp-concat');
var runSequence = require('run-sequence');
var fs = require('fs');
var path = require('path');
var join = path.join;

var tsProject = tsc.createProject('tsconfig.json', {
  typescript: require('typescript')
});

/*
 * typescript task compiles ts files to js
 */
gulp.task('typescript', function () {

  var env = conf.getEnv(this) === 'dev' ? conf.paths.tmp : conf.paths.dist;

  var result = gulp.src([join(__dirname, conf.paths.src, '**/*ts'), join('!' + __dirname, conf.paths.src, 'system.ts')])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(tsc(tsProject));

  return result.js
    .pipe(uglify())
    .pipe(template(templateLocals()))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(join(__dirname, env)));
});

gulp.task('system', function () {

  var env = conf.getEnv(this) === 'dev' ? conf.paths.tmp : conf.paths.dist;

  var result = gulp.src(join(__dirname, conf.paths.src, 'system.ts'))
    .pipe(insert.prepend('declare var System;'))
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(tsc(tsProject));

  return result.js
    .pipe(uglify())
    .pipe(template(templateLocals()))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(join(__dirname, env)));
});

/*
 * Prepare angular2 libraries for dev environment
 */
gulp.task('angular2:dev', function () {
  var rpath = [];

  for(var i in conf.lib) {
    rpath.push(join(__dirname, conf.lib[i]));
  }

  return gulp.src(rpath)
    .pipe(gulp.dest(join(__dirname, conf.paths.tmp, 'lib')));
});

/*
 * Concatenate angular2 libraries for production
 */
gulp.task('angular2:build', function () {

  var jsFilter = filter('**/*.js', { restore: true});
  var rpath = [];

  for(var i in conf.lib) {
    rpath.push(join(__dirname, conf.lib[i]));
  }

  return gulp.src(rpath)
    .pipe(jsFilter)
    .pipe(concat('lib.js'))
    .pipe(uglify())
    .pipe(jsFilter.restore)
    .pipe(gulp.dest(join(__dirname, conf.paths.lib)));
});

/*
 * scripts task run the sequence to concat javascript files
 */
gulp.task('scripts', function (done) {

  var env = conf.getEnv(this);

  if(env === 'dev') {
    runSequence('typescript', 'system', 'angular2:dev', done);
  } else {
    runSequence('typescript', 'system', 'angular2:build', done);
  }

});

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
