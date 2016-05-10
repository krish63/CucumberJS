'use strict';

var expect = require('chai').expect;
var webdriver = require('selenium-webdriver');

module.exports = function() {
  this.World = require('../support/world.js').World;

  this.When(/^I search Google for "([^"]*)"$/, function (searchQuery, next) {
    this.driver.get('http://www.google.com');
    this.driver.findElement({ name: 'q' })
      .sendKeys(searchQuery);
    var self = this;
    var waitTimeout = 60000;
    this.driver.findElement({ name: 'btnG' })
      .click()
      .then(function() {
        self.driver.wait(function () {
          return self.driver.isElementPresent(webdriver.By.id("top_nav"));
        }, waitTimeout);
        next();
      });
  });

  this.Then(/^the title should contain "([^"]*)"$/, function (titleMatch, next) {
    this.driver.getTitle()
    .then(function(title) {
          expect(title).to.contain(titleMatch);
          next();
    });
  });
};
