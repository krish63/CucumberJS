'use strict';

var fs = require('fs');
var webdriver = require('selenium-webdriver');
var browserstack = require('browserstack-local');

var bs_local;

var BrowserStackDriver = function() {
  var browserStackUsername = process.env.BROWSERSTACK_USERNAME;
  var browserStackAccessKey = process.env.BROWSERSTACK_ACCESS_KEY;
  var testType = process.env.TEST_TYPE;
  var isLocal = false;

  if(typeof(testType) == 'string' && testType.toLowerCase().indexOf('local') > -1) {
    bs_local = new browserstack.Local();
    var bs_local_args = {
      'key': browserStackAccessKey,
      'forcelocal': true
    };
    bs_local.start(bs_local_args, function() {});
    isLocal = true;
  }  
  return new webdriver.Builder().
    usingServer('http://hub.browserstack.com/wd/hub').
    withCapabilities({
        'os' : 'OS X',
        'os_version' : 'El Capitan',
        'browserName' : 'firefox',
        'browser_version' : '46',
        'build' : 'Sample Cucumber NodeJS tests',
        'browserstack.user' : browserStackUsername,
        'browserstack.key' : browserStackAccessKey,
        'browserstack.local' : isLocal
    }).
    build();
};

var driver = BrowserStackDriver();

var stopLocal = function() {
  if(bs_local != null) {
    bs_local.stop();
  }
}

var getDriver = function() {
  return driver;
};

var World = function World() {

  var defaultTimeout = 20000;
  var screenshotPath = "screenshots";

  this.webdriver = webdriver;
  this.driver = driver;

  if(!fs.existsSync(screenshotPath)) {
    fs.mkdirSync(screenshotPath);
  }
  
  this.waitFor = function(cssLocator, timeout) {
    var waitTimeout = timeout || defaultTimeout;
    return driver.wait(function() {
      return driver.isElementPresent({ css: cssLocator });
    }, waitTimeout);
  };
};

module.exports.World = World;
module.exports.getDriver = getDriver;
module.exports.stopLocal = stopLocal;