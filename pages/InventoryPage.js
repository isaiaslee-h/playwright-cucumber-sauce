const logger = require('../utils/logger');

class InventoryPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.title = '.title';
        this.inventoryItems = '.inventory_item';
        this.cartBadge = '.shopping_cart_badge';
        this.cartIcon = '.shopping_cart_link';
    }

    /**
     * Verifies if the inventory page has loaded successfully.
     * @returns {Promise<boolean>}
     */
    async isLoaded() {
        const titleText = await this.page.locator(this.title).textContent();
        return titleText.toLowerCase() === 'products';
    }

    /**
     * Extracts a list of all products and their prices.
     * @returns {Promise<Array<{name: string, price: string}>>}
     */
    async getAllProducts() {
        logger.info('Extracting all products and prices');
        return await this.page.$$eval(this.inventoryItems, items => 
            items.map(item => ({
                name: item.querySelector('.inventory_item_name').textContent,
                price: item.querySelector('.inventory_item_price').textContent
            }))
        );
    }

    /**
     * Adds the first available product to the cart.
     * @returns {Promise<void>}
     */
    async addFirstProductToCart() {
        logger.info('Adding first product to cart');
        const firstAddBtn = this.page.locator('.btn_inventory').first();
        await firstAddBtn.click();
    }

    /**
     * Gets the current number of items displayed on the cart badge.
     * @returns {Promise<number>}
     */
    async getCartQuantity() {
        const badge = this.page.locator(this.cartBadge);
        if (await badge.isVisible()) {
            const text = await badge.textContent();
            return parseInt(text, 10);
        }
        return 0;
    }

    /**
     * Navigates to the cart page.
     * @returns {Promise<void>}
     */
    async goToCart() {
        logger.info('Navigating to Cart');
        await this.page.click(this.cartIcon);
    }
}
module.exports = InventoryPage;