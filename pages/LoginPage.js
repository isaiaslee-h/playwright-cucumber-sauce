const logger = require('../utils/logger');

class LoginPage {
constructor(page) {
    this.page = page;
    this.usernameInput = '#user-name';
    this.passwordInput = '#password';
    this.loginBtn = '#login-button';
    this.errorMessage = '[data-test="error"]';
}

async navigate() {
    logger.info('Navigating to SauceDemo');
    await this.page.goto('https://www.saucedemo.com/');
}

async login(username, password) {
    logger.info(`Attempting login with user: ${username}`);
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginBtn);
}

async getErrorMessage() {
        return await this.page.locator(this.errorMessage).textContent();
    }

}
module.exports = LoginPage;