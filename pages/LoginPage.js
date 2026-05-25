const logger = require('../utils/logger');

class LoginPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.usernameInput = '#user-name';
        this.passwordInput = '#password';
        this.loginBtn = '#login-button';
        this.errorMessage = '[data-test="error"]';
    }

    /**
     * Navigates to the base URL defined in the environment variables.
     * @returns {Promise<void>}
     */
    async navigate() {
        if (!process.env.BASE_URL) {
            throw new Error('CRITICAL: BASE_URL environment variable is not defined. Please check your .env file.');
        }
        logger.info(`Navigating to ${process.env.BASE_URL}`);
        await this.page.goto(process.env.BASE_URL);
    }

    /**
     * Fills in credentials and submits the login form.
     * @param {string} username 
     * @param {string} password 
     * @returns {Promise<void>}
     */
    async login(username, password) {
        logger.info(`Attempting login with user: ${username}`);
        await this.page.fill(this.usernameInput, username);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.loginBtn);
    }

    /**
     * Retrieves the text content of the login error message.
     * @returns {Promise<string|null>}
     */
    async getErrorMessage() {
        return await this.page.locator(this.errorMessage).textContent();
    }
}
module.exports = LoginPage;