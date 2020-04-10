const { setHeadlessWhen } = require('@codeceptjs/configure');

// turn on headless mode when running with HEADLESS=true environment variable
// HEADLESS=true npx codecept run
setHeadlessWhen(process.env.HEADLESS);

exports.config = {
  tests: './e2e_test/test/*_test.js',
  output: './e2e_test/output',
  helpers: {
    Puppeteer: {
      url: 'http://localhost',
      show: true, 
      windowSize: '1200x900'
    }
  },
  include: {
    I: './e2e_test/steps_file.js'
  },
  bootstrap: null,
  mocha: {},
  name: 'PUSH.W.F_front',
  plugins: {
    retryFailedStep: {
      enabled: true
    },
    screenshotOnFail: {
      enabled: true
    }
  }
}