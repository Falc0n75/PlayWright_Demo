# PlayWright_Demo

This project demonstrates the usage of Playwright for end-to-end testing of the Swag Labs application. The project includes several test cases that cover various aspects of the application's functionality, including logging in, adding and removing items from the cart, sorting products, and verifying social media links.

## Getting Started

### Installation

Before running the tests, ensure that you have installed all the necessary dependencies. You can do this by running:


npm install

Playwright Commands for Notes:
Inside that directory, you can run several commands:

  npx playwright test
    Runs the end-to-end tests.

  npx playwright test --ui
    Starts the interactive UI mode.

  npx playwright test --project=chromium
    Runs the tests only on Desktop Chrome.

  npx playwright test example
    Runs the tests in a specific file.

  npx playwright test --debug
    Runs the tests in debug mode.

  npx playwright codegen
    Auto generate tests with Codegen.

We suggest that you begin by typing:

    npx playwright test

