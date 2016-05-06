'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({

  prompting: function () {
    var done = this.async();

    var prompts = [{
      name: 'appName',
      message: 'What is the name of your app?',
      default: 'some-name-here'
    }];

    return this.prompt(prompts).then(function (props) {
      this.props = props;
      done();
    }.bind(this));

  },

  writing: function () {

    this.conflicter.force = true;
    var appName = { appName: this.props.appName || 'undefined' };

    var filelist = [
      'gulpfile.js',
      'tsconfig.json',
      'typings.json',
      'karma.conf.js',
      'karma-test-shim.js',
      'protractor.conf.js'
    ];

    var dirlist = [
      'gulp',
      'src',
      'typings'
    ];

    var me = this;

    filelist.forEach(function(f) {
      me.copy(f, f);
    });

    dirlist.forEach(function(f) {
      me.bulkDirectory(f, f);
    });

    me.template('bower.json', 'bower.json', appName);
    me.template('package.json', 'package.json', appName);
    me.template('src/index.html', 'src/index.html', appName);
  },

  install: function () {
    this.installDependencies();
  }
});
