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
        // Enforce strict environment configuration
        if (!process.env.BASE_URL) {
            throw new Error("CRITICAL: BASE_URL environment variable is not defined. Please check your .env file.");
        }
        
        logger.info(`Navigating to ${process.env.BASE_URL}`);
        await this.page.goto(process.env.BASE_URL);
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