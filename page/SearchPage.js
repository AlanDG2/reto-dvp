const { expect } = require('@playwright/test');

exports.SearchPage = class SearchPage {
  constructor(page) {
    this.page = page;
    this.url = 'https://opencart.abstracta.us';
    this.searchBar = page.locator('input[name="search"]');
    this.searchButton = page.locator('span.input-group-btn button');
    this.cartButton = page.locator('#cart-total');
    this.cartDropdown = page.locator('.dropdown-menu');
  }

  async visit() {
    await this.page.goto(this.url);
  }

  async searchProduct(productName) {
    await this.searchBar.fill(productName);
    await this.searchButton.click();
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
