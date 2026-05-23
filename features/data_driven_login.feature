Feature: SauceDemo Data-Driven Login

  Scenario Outline: Authenticate with all accepted SauceDemo users
    Given I am on the SauceDemo login page
    # The < > brackets are mandatory for Cucumber to map the table columns
    When I login with username "<username>" and password "<password>"
    Then the login should resolve with status "<status>"

    Examples:
      | username                | password     | status  |
      | standard_user           | secret_sauce | success |
      | locked_out_user         | secret_sauce | locked  |
      | problem_user            | secret_sauce | success |
      | performance_glitch_user | secret_sauce | success |
      | error_user              | secret_sauce | success |
      | visual_user             | secret_sauce | success |