const { Before, After, Status, setWorldConstructor, World, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium, firefox, webkit } = require('playwright');
const logger = require('../utils/logger');

setDefaultTimeout(30 * 1000);

class CustomWorld extends World {
    constructor(options) {
        super(options);
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
    if (scenario.result.status === Status.FAILED) {
        logger.error(`Scenario Failed: ${scenario.pickle.name}. Taking screenshot.`);
        const screenshot = await this.page.screenshot({ 
            path: `reports/screenshots/${scenario.pickle.name.replace(/\s+/g, '_')}.png`, 
            fullPage: true 
        });
        this.attach(screenshot, 'image/png'); // Attaches to HTML report
    }
    await this.page.close();
    await this.context.close();
    await this.browser.close();
});