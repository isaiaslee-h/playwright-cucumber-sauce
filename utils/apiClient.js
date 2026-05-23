const { request } = require('playwright');
const logger = require('./logger');

class APIClient {
    constructor() {
        this.apiContext = null;
    }

    async init() {
        logger.info('Initializing API Request Context');
        this.apiContext = await request.newContext({
            baseURL: 'https://api.your-real-app.com', // Replace with actual API base URL
            extraHTTPHeaders: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
    }

    async dispose() {
        if (this.apiContext) {
            await this.apiContext.dispose();
        }
    }
}

module.exports = APIClient;