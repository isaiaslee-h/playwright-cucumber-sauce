const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');
const credentials = require('../data/credentials.json');
const expect = require('@playwright/test').expect;

// Artillery passes the 'page' object automatically
async function loadTestLogin(page, userContext, events) {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    // Track a custom Artillery metric for UI response time
    events.emit('counter', 'user.login.start', 1);

    await loginPage.navigate();
    await loginPage.login(credentials.validUser.username, credentials.validUser.password);
    
    const isLoaded = await inventoryPage.isLoaded();
    expect(isLoaded).toBeTruthy();

    events.emit('counter', 'user.login.success', 1);
}

module.exports = {
    loadTestLogin
};