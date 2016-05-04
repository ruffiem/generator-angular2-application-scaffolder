'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({

  prompting: function () {
    var done = this.async();
    //
    // this.log(yosay(
    //   chalk.red('Welcome to angular2 application scaffolder')
    // ));
    //
    // var prompts = [{
    //   name: 'appName',
    //   message: 'What is the name of your app?',
    //   default: 'some-name-here'
    // }];

    // this.prompt(prompts, function (props) {
    //   this.props.appName = props.appName;
      done();
    // });
  },

  writing: function () {

    var appName = { appName: 'test' };
    //var appName = { appName: this.props.appName || 'test' };

    var filelist = [
      //'bower.json',
      'gulpfile.js',
      //'package.json',
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

    me.template('bower.json', 'bower.json', appName);
    me.template('package.json', 'package.json', appName);

    filelist.forEach(function(f) {
      me.copy(f, f);
    });

    dirlist.forEach(function(f) {
      me.bulkDirectory(f, f);
    });
  },

  install: function () {
    this.installDependencies();
  }
});
