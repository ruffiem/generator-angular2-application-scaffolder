'use strict';

var gulp = require('gulp');
var conf = require('./conf');
var template = require('gulp-template');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var tsc = require('gulp-typescript');
var insert = require('gulp-insert');
var uglify = require('gulp-uglify');
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
  var result = gulp.src([join(__dirname, conf.paths.src, '**/*ts'), join('!' + __dirname, conf.paths.src, 'system.ts')])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(tsc(tsProject));

  return result.js
    .pipe(uglify())
    .pipe(template(templateLocals()))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(join(__dirname, conf.paths.dist)));
});

gulp.task('system', function () {
  var result = gulp.src(join(__dirname, conf.paths.src, 'system.ts'))
    .pipe(insert.prepend('declare var System;'))
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(tsc(tsProject));

  return result.js
    .pipe(uglify())
    .pipe(template(templateLocals()))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(join(__dirname, conf.paths.dist)));
});

/*
 *
 */
gulp.task('angular2', function () {
  var rpath = [];
  for(var i in conf.lib) {
    rpath.push(join(__dirname, conf.lib[i]));
  }

  return gulp.src(rpath)
    .pipe(gulp.dest(join(__dirname, conf.paths.lib)));
});

/*
 * scripts task run the sequence to concat javascript files
 */
gulp.task('scripts', function (done) {
  runSequence('typescript', 'system', 'angular2', done);
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
