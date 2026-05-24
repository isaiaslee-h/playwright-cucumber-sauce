const { expect } = require('@playwright/test');
const logger = require('../utils/logger');

class CartPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.cartItem = '.cart_item';
        this.cartQty = '.cart_quantity';
        this.itemDesc = '.inventory_item_desc';
        this.removeBtn = 'button[id^="remove-"]';
        this.checkoutBtn = '#checkout';
        this.continueBtn = '#continue-shopping';
    }

    async verifyCartElementsEnabled() {
        logger.info('Verifying cart elements are visible and enabled');
        // Web-first assertions automatically wait and retry!
        await expect(this.page.locator(this.cartQty)).toBeVisible();
        await expect(this.page.locator(this.itemDesc)).toBeVisible();
        await expect(this.page.locator(this.removeBtn)).toBeEnabled();
        await expect(this.page.locator(this.checkoutBtn)).toBeEnabled();
        await expect(this.page.locator(this.continueBtn)).toBeEnabled();
    }

    async removeProduct() {
        logger.info('Removing product from cart');
        await this.page.click(this.removeBtn);
    }

    async getCartItemCount() {
        return await this.page.locator(this.cartItem).count();
    }
}
module.exports = CartPage;