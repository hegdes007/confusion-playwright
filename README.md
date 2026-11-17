# Playwright + Cucumber – ConFusion

UI and API automation testing of the ConFusion Bootstrap application using Playwright, TypeScript and Cucumber.

The project integrates BDD-style testing with browser automation to cover different application scenarios.

# Features
- Playwright with Cucumber (BDD)
- Cross-browser testing (Chromium, Firefox and WebKit)
- UI testing of the ConFusion application
- API testing and API request interception
- Handling JavaScript alerts and dialogs
- File upload and download handling
- Multiple tabs and popup window handling
- Automated HTML reporting
- Parallel cross-browser execution
- GitHub Actions CI/CD integration
- GitHub Pages report hosting

# Tech Stack
- Playwright
- TypeScript
- Cucumber
- Node.js
- multiple-cucumber-html-reporter
- GitHub Actions

# Project Structure
~~~text
confusion-playwright/
│
├── .github/
│   └── workflows/              # GitHub Actions workflows
│
├── scripts/
│   └── run-cross-browser.cjs   # Cross-browser execution and report generation
│
├── test/
│   └── e2e/
│       ├── features/           # Cucumber feature files and step definitions
│       ├── common/             # Shared test utilities
│       └── hooks/              # Browser setup and teardown
│
├── reports/                    # Generated test reports
│   ├── json/                   # Browser-specific JSON reports
│   └── cucumber-report/        # Consolidated HTML report
│
├── cucumber.js                 # Cucumber configuration
├── package.json                # Dependencies and npm scripts
├── package-lock.json
├── tsconfig.json               # TypeScript configuration
└── README.md
~~~

Getting Started

Prerequisites: Node.js and npm.

# Clone the repository:
~~~bash
git clone https://github.com/hegdes007/confusion-playwright.git

cd confusion-playwright
~~~

# Install dependencies:
~~~bash
npm ci
~~~

# Install Playwright browsers:
~~~bash
npx playwright install
~~~

# Running Tests

Run tests across all three browsers:
~~~bash
npm test
~~~
Run in headed mode:
~~~bash
npm run test:headed
~~~
Run on individual browsers:
~~~bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
~~~
# Test Report

The framework generates a consolidated HTML report containing results from all three browsers.

View ConFusion HTML Report - https://hegdes007.github.io/confusion-playwright/

# Repository

GitHub – confusion-playwright - https://github.com/hegdes007/confusion-playwright/
