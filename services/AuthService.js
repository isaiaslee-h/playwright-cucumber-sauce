const logger = require('../utils/logger');

class AuthService {
    constructor(apiClient) {
        this.api = apiClient;
    }

    /**
     * REAL-WORLD PATTERN:
     * Authenticate via API, extract the token, and return it.
     */
    async getAuthToken(username, password) {
        logger.info(`Authenticating via API for user: ${username}`);
        
        const response = await this.api.apiContext.post('/v1/auth/login', {
            data: { username, password }
        });

        if (!response.ok()) {
            throw new Error(`API Login failed with status: ${response.status()}`);
        }

        const responseBody = await response.json();
        return responseBody.token; // Or extract cookies depending on your app
    }

    /**
     * SAUCEDEMO PATTERN:
     * Since SauceDemo lacks an auth API, we simulate the backend response 
     * by directly constructing the cookie it expects.
     */
    getSauceDemoSessionCookie(username) {
        logger.info(`Generating SauceDemo session cookie for: ${username}`);
        return {
            name: 'session-username',
            value: username,
            domain: 'www.saucedemo.com',
            path: '/',
        };
    }
}

module.exports = AuthService;