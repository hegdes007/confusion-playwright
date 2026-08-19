Feature: Menu Page

Scenario: Verify the display of navigation bar in Menu Page
    When I visit the "menu" Page
    Then I should see Navigation Bar and links associated with it
    Then I should see 'Menu' link should be active

Scenario: Verify the navigation to Menu Page and display of breadcrumb in Menu Page
    When I visit the "home" Page
    Then I click on Menu link in Navigation bar
    Then I should navigate to Menu page
    Then I should see breadcrumb in Menu page

Scenario: Verify the display Dish and its Image in Menu Page
    When I visit the "menu" Page
    Then I should see '14' dishes in Menu Page
    Then I should see image for every dish in Menu Page

Scenario: Verify the display of API Error message in Menu Page
    When I visit the "home" Page
    When There is an API Error
    Then I click on Menu link in Navigation bar
    Then I should see the Error Message in Menu Page

Scenario: Verify the API response status and length of meals array
    When I hit the API I should see API resonse status as 200
    Then Check the length of the meals array