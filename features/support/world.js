var webdriver = require('selenium-webdriver');
var fs = require('fs');

var BrowserStackDriver = function() {
  return new webdriver.Builder().
    withCapabilities(webdriver.Capabilities.chrome()).
    usingServer('http://hub.browserstack.com/wd/hub').
    withCapabilities({
        'browserName' : 'firefox', 
        'browserstack.user' : 'BS_USERNAME',
        'browserstack.key' : 'BS_ACCESS_KEY'
    }).
    build();
};

var driver = BrowserStackDriver();

var getDriver = function() {
  return driver;
};

var World = function World(callback) {

  var screenshotPath = "screenshots";

  this.webdriver = webdriver;
  this.driver = driver;

  if(!fs.existsSync(screenshotPath)) {
    fs.mkdirSync(screenshotPath);
  }
  
  callback();
};

module.exports.World = World;
module.exports.getDriver = getDriver;
