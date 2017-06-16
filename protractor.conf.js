exports.config = {
  // The address of a running selenium server.
  seleniumAddress: 'http://localhost:4444/wd/hub',

  // Spec patterns are relative to the location of this config.
  specs: [
    'test/e2e/*_spec.js'
  ],


  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'args': ['show-fps-counter=true']
    }
    //
    // 'browserName': 'phantomjs',
    //
    // /*
    //  * Can be used to specify the phantomjs binary path.
    //  * This can generally be ommitted if you installed phantomjs globally.
    //  */
    // 'phantomjs.binary.path': require('phantomjs-prebuilt').path,
    //
    // /*
    //  * Command line args to pass to ghostdriver, phantomjs's browser driver.
    //  * See https://github.com/detro/ghostdriver#faq
    //  */
    // 'phantomjs.ghostdriver.cli.args': ['--loglevel=DEBUG']
  },


  // A base URL for your application under test. Calls to protractor.get()
  // with relative paths will be prepended with this.
  // baseUrl: 'http://localhost:8080',
  baseUrl: 'https://autoreplenish.dev.hbgusa.com',

  jasmineNodeOpts: {
    onComplete: null,
    isVerbose: false,
    showColors: true,
    includeStackTrace: true,
    defaultTimeoutInterval: 25000
  }
};
