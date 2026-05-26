Feature: SauceDemo Data-Driven Login

  Scenario Outline: Authenticate with all accepted SauceDemo users
    Given I am on the SauceDemo login page
    When I login with username "<username>" account
    Then the login should resolve with status "<status>"

    Examples:
      | username                | status  |
      | standard_user           | success |
      | locked_out_user         | locked  |
      | problem_user            | success |
      | performance_glitch_user | success |
      | error_user              | success |
      | visual_user             | success |