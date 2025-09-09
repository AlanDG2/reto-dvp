const { test } = require('@playwright/test');
const { SearchPage } = require('../../page/SearchPage');

// Datos de prueba
const productFullName = 'Samsung Galaxy Tab 10.1';
const productShortName = 'Samsung Galaxy Tab';
const expectedTotal = '$241.99';

let searchPage;

test.describe('Search and Add Samsung Galaxy Tablet to Cart Tests', () => {
  test.beforeEach(async ({ page }) => {
    searchPage = new SearchPage(page);
    await searchPage.visit();
  });

  test('should search for Samsung Galaxy Tablet and add it to the cart', async () => {
    await searchPage.searchProduct(productFullName);
    await searchPage.addToCart(productFullName);
    await searchPage.verifyProductInCart(productFullName);
  });

  test('should verify the total amount in the cart after adding Samsung Galaxy Tablet', async () => {
    await searchPage.searchProduct(productShortName);
    await searchPage.addToCart(productShortName);
    await searchPage.verifyCartTotal(expectedTotal);
  });
});
