const logger = require('../utils/logger');

class CartPage {
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
        logger.info('Verifying cart elements are enabled');
        const isQtyVisible = await this.page.locator(this.cartQty).isVisible();
        const isDescVisible = await this.page.locator(this.itemDesc).isVisible();
        const isRemoveEnabled = await this.page.locator(this.removeBtn).isEnabled();
        const isCheckoutEnabled = await this.page.locator(this.checkoutBtn).isEnabled();
        const isContinueEnabled = await this.page.locator(this.continueBtn).isEnabled();

        return isQtyVisible && isDescVisible && isRemoveEnabled && isCheckoutEnabled && isContinueEnabled;
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