cucumberjs-browserstack
=======================

This repository provides information and helpful tweaks to run your Cucumber tests on the BrowserStack selenium cloud infrastructure.

###Setup
- Add the cucumber and selenium-webdriver in package.json.
- Run `npm install`.

###Configuration
- To run tests on the BrowserStack Infrastructure, replace your BS_USERNAME and BS_USERNAME in the support/world.js file.
- Add capabilities in the support/world.js file

###Run tests
- To run your tests, run the command `npm test`
- To run your tests in parallel, run the command `npm run test_parallel`
- To run your tests with local, run the command `npm run test_local`

###Further Reading
- [Cucumber](https://cucumber.io/docs/reference/javascript)
- [BrowserStack documentation for Automate](https://www.browserstack.com/automate/node)

Happy Testing!
