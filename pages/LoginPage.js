const logger = require('../utils/logger');

class LoginPage {
constructor(page) {
    this.page = page;
    this.usernameInput = '#user-name';
    this.passwordInput = '#password';
    this.loginBtn = '#login-button';
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
}
module.exports = LoginPage;