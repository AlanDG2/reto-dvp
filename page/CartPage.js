const { expect } = require('@playwright/test');

exports.CartPage = class CartPage {
  constructor(page) {
    this.page = page;
    this.url = 'https://opencart.abstracta.us/index.php?route=checkout/cart';
    this.cartButton = page.locator('#cart');
    this.viewCartButton = page.locator('a', { hasText: 'View Cart' });
    this.productRow = (productName) => page.locator('td', { hasText: productName }).locator('..');
    this.removeButton = page.locator('button[data-original-title="Remove"]');
    this.emptyCartMessage = page.locator('#content p', { hasText: 'Your shopping cart is empty!' });
    this.quantityInput = page.locator('table input.form-control');
    this.updateButton = page.locator('button[data-original-title="Update"]');
    this.cartTotal = page.locator('#cart-total');
  }

  async visit() {
    await this.page.goto(this.url);
  }

  async removeProduct() {
    await this.removeButton.first().click();
  }

  async verifyEmptyCart() {
    await expect(this.emptyCartMessage).toBeVisible();
  }

  async openCart() {
    await this.cartButton.click();
    await this.viewCartButton.click();
  }

  async updateQuantity(productName, quantity) {
    // Busca la fila del producto y actualiza la cantidad
    const row = this.page.locator('td', { hasText: productName }).locator('..');
    const qtyInput = row.locator('input.form-control');
    await qtyInput.fill(String(quantity));
    await qtyInput.press('Enter');
  }

  async verifyCartTotal(expectedTotal) {
    await expect(this.cartTotal).toContainText(expectedTotal);
  }
};
