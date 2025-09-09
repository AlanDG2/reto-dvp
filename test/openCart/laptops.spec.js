const { test, expect } = require('@playwright/test');
const { LaptopsPage } = require('../../page/LaptopsPage');

const productName = 'MacBook Pro';
const expectedTotal = '$2,000.00';

test.describe('Laptops & Notebooks Tests', () => {
  let laptopsPage;

  test.beforeEach(async ({ page }) => {
    laptopsPage = new LaptopsPage(page);
    await laptopsPage.visit();
  });

  test('should add a MacBook Pro to the cart and verify it is in the cart', async () => {
    await laptopsPage.addToCart(productName);
    await laptopsPage.verifyProductInCart(productName);
  });

  test('should verify the total amount in the cart after adding MacBook Pro', async () => {
    await laptopsPage.addToCart(productName);
    await laptopsPage.verifyProductInCart(productName);
    await laptopsPage.verifyCartTotal(expectedTotal);
  });
});
