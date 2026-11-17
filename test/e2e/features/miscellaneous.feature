Feature: Miscellaneous Page

Scenario: Example to demonstrate handling of JavaScript Alerts, Confirm, Prompt in Playwright
    When I vist the Alert Page
    Then Handling JS Alert - Validate Alert Text and Click OK
    Then Handling JS Confirm - Validate Confirm Text and Click OK
    Then Handling JS Confirm - Click Cancel
    Then Handling JS Prompt - Input text in prompt, Click OK and Validate Input Text