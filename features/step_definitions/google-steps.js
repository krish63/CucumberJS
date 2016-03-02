'use strict';

var expect = require('chai').expect;

module.exports = function() {
  this.World = require('../support/world.js').World;

  this.When(/^I search Google for "([^"]*)"$/, function (searchQuery, next) {
    this.driver.get('http://www.google.co.uk/webhp?complete=0');
    this.driver.findElement({ name: 'q' })
      .sendKeys(searchQuery);
    this.driver.findElement({ name: 'q' })
      .sendKeys(this.webdriver.Key.ENTER)
        .then(function() {
          next();
        });
  });

  this.Then(/^the title should contain Google$/, function (next) {
    this.driver.getTitle()
    .then(function(title) {
          expect(title).to.contain('Google');
          next();
    });
  });
};
