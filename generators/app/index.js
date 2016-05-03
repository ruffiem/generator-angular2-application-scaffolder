'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({

  prompting: function () {
    var done = this.async();

    this.log(yosay(
      chalk.red('Welcome to angular2 application scaffolder')
    ));

    // var prompts = [];
    //
    // this.prompt(prompts, function (props) {
    //   this.props = props;
    //   done();
    // }.bind(this));
    done();
  },

  writing: function () {

    var filelist = [
      'bower.json',
      'gulpfile.js',
      'package.json',
      'tsconfig.json',
      'typings.json',
      'karma.conf.js',
      'karma-test-shim.js'
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
  },

  install: function () {
    this.installDependencies();
  }
});
