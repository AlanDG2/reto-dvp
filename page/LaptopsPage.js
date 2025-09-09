const { expect } = require('@playwright/test');

exports.LaptopsPage = class LaptopsPage {
  constructor(page) {
    this.page = page;
    this.url = 'https://opencart.abstracta.us/index.php?route=product/category&path=18';
    this.laptopsHeader = page.locator('h2', { hasText: 'Laptops & Notebooks' });
    this.cartButton = page.locator('#cart-total');
    this.cartDropdown = page.locator('.dropdown-menu.pull-right');
  }

  async visit() {
    await this.page.goto(this.url);
  }

  async verifyLaptopsPage() {
    await expect(this.page).toHaveURL(/laptop-notebook/);
    await expect(this.laptopsHeader).toContainText('Laptops & Notebooks');
  }

  async addToCart(productName) {
    const addToCartButton = this.page.locator('.product-thumb', { hasText: productName }).locator('.button-group button:has-text("Add to Cart")');
    await addToCartButton.scrollIntoViewIfNeeded();
    await addToCartButton.click();
  }

  async verifyProductInCart(productName) {
    await this.cartButton.click();
    await expect(this.cartDropdown.locator(`text=${productName}`)).toBeVisible();
  }

  async verifyCartTotal(expectedTotal) {
    await expect(this.cartButton).toContainText(expectedTotal);
  }
};
