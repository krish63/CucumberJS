Feature: Searching for BrowserStack
  As an internet user
  In order to find out more about BrowserStack
  I want to be able to search for information about BrowserStack

  Scenario: Google search
    When I search Google for "BrowserStack"
    Then the title should contain "BrowserStack"
