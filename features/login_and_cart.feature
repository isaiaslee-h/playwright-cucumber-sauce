Feature: SauceDemo E2E Flow with API Setup

  Scenario: Manage cart after API authentication
    # Bypasses UI completely; sets state and lands on inventory in < 500ms
    Given I simulate login via session cookie
    Then I should see the products page
    When I add a product to the cart
    Then the cart badge should update