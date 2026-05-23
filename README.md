# Playwright Cucumber Framework

## Setup
1. Clone the repository
2. Run `npm install`
3. Run `npx playwright install`

## Execution Instructions
By default, tests run in parallel (3 workers) across Chromium, generating an HTML report in `/reports`.

**Run in Chromium (Default):**
`npx cucumber-js`

**Run in Firefox:**
`npx cross-env BROWSER=firefox cucumber-js`

**Run in WebKit:**
`npx cross-env BROWSER=webkit cucumber-js`

## Error Handling & Reporting
- **Logs:** Handled via `winston`, visible in the console.
- **Screenshots:** Automatically captured on test failure and saved to `/reports/screenshots/`.
- **HTML Report:** Generated at `reports/cucumber-report.html`.