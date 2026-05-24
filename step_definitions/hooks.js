const { Before, After, Status, setWorldConstructor, World, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium, firefox, webkit } = require('playwright');
const logger = require('../utils/logger');

setDefaultTimeout(10000);

class CustomWorld extends World {
    constructor(options) {
        super(options);
        /** @type {import('playwright').Browser} */
        this.browser = null;
        /** @type {import('playwright').BrowserContext} */
        this.context = null;
        /** @type {import('playwright').Page} */
        this.page = null;
    }
}
setWorldConstructor(CustomWorld);

Before(async function () {
    const browserName = process.env.BROWSER || 'chromium';
    logger.info(`Launching browser: ${browserName}`);
    
    const launchOptions = { headless: true };
    switch (browserName) {
        case 'firefox': this.browser = await firefox.launch(launchOptions); break;
        case 'webkit': this.browser = await webkit.launch(launchOptions); break;
        default: this.browser = await chromium.launch(launchOptions);
    }
    
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
});

After(async function (scenario) {
    if (scenario.result.status === Status.FAILED && this.page) {
        logger.error(`Scenario Failed: ${scenario.pickle.name}. Taking screenshot.`);
        const screenshot = await this.page.screenshot({ 
            path: `reports/screenshots/${scenario.pickle.name.replace(/\s+/g, '_')}.png`, 
            fullPage: true 
        });
        this.attach(screenshot, 'image/png'); // Attaches to HTML report
    }
    // Safely close instances
    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
});