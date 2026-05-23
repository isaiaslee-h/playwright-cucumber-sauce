const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

// Page Objects
const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');
const CartPage = require('../pages/CartPage');

// API & Services
const APIClient = require('../utils/apiClient');
const AuthService = require('../services/AuthService');

// Data & Utils
const credentials = require('../data/credentials.json');
const logger = require('../utils/logger');

// ==========================================
// UI-BASED LOGIN SETUP
// ==========================================
Given('I am on the SauceDemo login page', async function () {
    this.loginPage = new LoginPage(this.page);
    this.inventoryPage = new InventoryPage(this.page);
    this.cartPage = new CartPage(this.page);
    await this.loginPage.navigate();
});

When('I login with valid credentials', async function () {
    try {
        await this.loginPage.login(credentials.validUser.username, credentials.validUser.password);
    } catch (error) {
        logger.error(`Login failed: ${error.message}`);
        throw error; 
    }
});

// ==========================================
// API-BASED LOGIN SETUP (STATE INJECTION)
// ==========================================
Given('I am logged in via API', async function () {
    // Initialize page objects needed for post-login steps
    this.inventoryPage = new InventoryPage(this.page);
    this.cartPage = new CartPage(this.page);

    const apiClient = new APIClient();
    await apiClient.init();
    const authService = new AuthService(apiClient);

    try {
        // Inject the SauceDemo authentication cookie directly into the BrowserContext
        const authCookie = authService.getSauceDemoSessionCookie(credentials.validUser.username);
        await this.context.addCookies([authCookie]);
        logger.info('Session cookie injected into BrowserContext');

        // Navigate directly to the secured inventory page
        await this.page.goto('https://www.saucedemo.com/inventory.html');
    } catch (error) {
        logger.error(`API State injection failed: ${error.message}`);
        throw error;
    } finally {
        await apiClient.dispose();
    }
});

// ==========================================
// SHARED ACTION & ASSERTION STEPS
// ==========================================
Then('I should see the products page', async function () {
    const isLoaded = await this.inventoryPage.isLoaded();
    expect(isLoaded).toBeTruthy();
});

Then('I extract all products and prices', async function () {
    const products = await this.inventoryPage.getAllProducts();
    logger.info(`Found ${products.length} products. First item: ${JSON.stringify(products[0])}`);
});

When('I add a product to the cart', async function () {
    await this.inventoryPage.addFirstProductToCart();
});

Then('the cart badge should update', async function () {
    const qty = await this.inventoryPage.getCartQuantity();
    expect(qty).toBe("1");
});

When('I go to the cart page', async function () {
    await this.inventoryPage.goToCart();
});

Then('I verify the cart item details and buttons are enabled', async function () {
    const areElementsReady = await this.cartPage.verifyCartElementsEnabled();
    expect(areElementsReady).toBeTruthy();
});

When('I remove the product', async function () {
    await this.cartPage.removeProduct();
});

Then('the cart should be empty', async function () {
    const itemCount = await this.cartPage.getCartItemCount();
    expect(itemCount).toBe(0);
    const qty = await this.inventoryPage.getCartQuantity();
    expect(qty).toBe("0");
});