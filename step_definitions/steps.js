const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

// Page Objects
const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');
const CartPage = require('../pages/CartPage');

// Utils
const logger = require('../utils/logger');
const credentials = require('../data/credentials.json');

// ==========================================
// UI-BASED LOGIN SETUP
// ==========================================
Given('I am on the SauceDemo login page', async function () {
    this.loginPage = new LoginPage(this.page);
    this.inventoryPage = new InventoryPage(this.page);
    this.cartPage = new CartPage(this.page);
    await this.loginPage.navigate();
});

When('I login with username {string} account', async function (username) {
    const password = credentials.validUser.password;
    try {
        await this.loginPage.login(username, password);
    } catch (error) {
        logger.error(`Login failed for ${username}: ${error.message}`);
        throw error; 
    }
});

Then('the login should resolve with status {string}', async function (expectedStatus) {
    if (expectedStatus === 'success') {
        const isLoaded = await this.inventoryPage.isLoaded();
        expect(isLoaded).toBeTruthy();
    } else if (expectedStatus === 'locked') {
        const errorMessage = await this.loginPage.getErrorMessage();
        logger.info(`Captured error message: ${errorMessage}`);
        expect(errorMessage).toContain('locked out');
    } else {
        throw new Error(`Unknown status provided in Examples table: ${expectedStatus}`);
    }
});

Given('I simulate login via session cookie', async function () {
    logger.info('Simulating login via cookie injection');
    
    this.inventoryPage = new InventoryPage(this.page);
    this.cartPage = new CartPage(this.page);
    
    // Dynamically parse the domain from the environment variable
    const baseUrl = new URL(process.env.BASE_URL);
    const targetDomain = baseUrl.hostname;
    
    await this.page.context().addCookies([{
        name: 'session-username',
        value: credentials.validUser.username, // Read dynamically
        domain: targetDomain,                  // Read dynamically
        path: '/'
    }]);
    
    await this.page.goto(`${process.env.BASE_URL}/inventory.html`);
});


Then('I should see the products page', async function () {
    const isLoaded = await this.inventoryPage.isLoaded();
    expect(isLoaded).toBeTruthy();
});

When('I add a product to the cart', async function () {
    await this.inventoryPage.addFirstProductToCart();
});

Then('the cart badge should update', async function () {
    const qty = await this.inventoryPage.getCartQuantity();
    // Updated to expect a Number based on our Phase 2 refactor
    expect(qty).toBe(1); 
});

When('I go to the cart page', async function () {
    await this.inventoryPage.goToCart();
});

Then('I verify the cart item details and buttons are enabled', async function () {
    // Assertions are now handled natively inside the Page Object
    await this.cartPage.verifyCartElementsEnabled();
});

When('I remove the product', async function () {
    await this.cartPage.removeProduct();
});

Then('the cart should be empty', async function () {
    const itemCount = await this.cartPage.getCartItemCount();
    expect(itemCount).toBe(0);
    const qty = await this.inventoryPage.getCartQuantity();
    // Updated to expect a Number
    expect(qty).toBe(0); 
});