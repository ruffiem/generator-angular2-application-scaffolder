require('ts-node/register');
var conf = require('./gulp/conf');
var path = require('path');
var join = path.join;

exports.config = {
  baseUrl: 'http://localhost:' + conf.ports.http,

  specs: [
    join(__dirname, conf.paths.src + '/**/**.e2e.ts'),
    join(__dirname, conf.paths.src + '/**/*.e2e.ts')
  ],
  exclude: [],

  framework: 'jasmine',

  allScriptsTimeout: 110000,

  jasmineNodeOpts: {
    showTiming: true,
    showColors: true,
    isVerbose: false,
    includeStackTrace: false,
    defaultTimeoutInterval: 400000
  },
  directConnect: true,

  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'args': ['show-fps-counter=true']
    }
  },

  onPrepare: function() {
    browser.ignoreSynchronization = true;
  },

  /**
   * Angular 2 configuration
   *
   * useAllAngular2AppRoots: tells Protractor to wait for any angular2 apps on the page instead of just the one matching
   * `rootEl`
   */
   useAllAngular2AppRoots: true
};
