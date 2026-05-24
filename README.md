# Playwright Cucumber POM Framework

## Setup & Local Execution
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Run `npx playwright install --with-deps` to install required browsers.
4. **Data Setup:** Copy `data/credentials.example.json` to `data/credentials.json` and enter valid SauceDemo credentials.
5. **Environment:** Create a `.env` file at the root and add `BASE_URL=https://www.saucedemo.com`.

## Commands
* `npm test` - Runs tests in Chromium (3 parallel workers).
* `npm run test:firefox` - Runs tests in Firefox.
* `npm run test:data-driven` - Runs scenario outlines.
* `npm run perf` - Runs the Artillery load test.

## GitHub Actions CI/CD
This project uses GitHub Secrets for secure execution. Ensure the following secrets are added to your repository before triggering the pipeline:
* `SAUCE_USERNAME`
* `SAUCE_PASSWORD`

HTML Reports for functional tests and Artillery load tests are automatically uploaded as zip artifacts to the GitHub Actions run summary page.

## Notes on Architecture
* **API Login:** The API login step is a *cookie simulation* injected directly into the Playwright BrowserContext to bypass the UI. It is not a true REST authentication since SauceDemo lacks a backend auth API.
* **Parallel Workers:** Configured globally in `cucumber.js`.