'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-angular-2-application-scaffolder:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({someAnswer: true})
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'bower.json',
      'gulpfile.js',
      'package.json',
      'tsconfig.json',
      'typings.json'
    ]);
  });
});
