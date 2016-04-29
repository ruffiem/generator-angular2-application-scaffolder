'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  constructor: function () {
      yeoman.generators.Base.apply(this, arguments);

      this.argument('appName', {
          type: String,
          required: false
      });

      this.appName = this.appname || path.basename(process.cwd());

      this.props = {};
  },
  prompting: function () {
    var done = this.async();

    this.log(yosay(
      chalk.red('Welcome to angular2 application scaffolder')
    ));

    this.prompt({
      type: 'input',
      name: 'name',
      message: 'Your project name',
      //Defaults to the project's folder name if the input is skipped
      default: this.appname
    }, function(answers) {
      this.props = answers;
      this.log(answers.name);
      done();
    }.bind(this));

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
      me.copy(f, f, { appName: this.props.name });
    });
    dirlist.forEach(function(f) {
      me.bulkDirectory(f, f);
    });
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install'],
      skipMessage: this.options['skip-message']
    });
  }
});
