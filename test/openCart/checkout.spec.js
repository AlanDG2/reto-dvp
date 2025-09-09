const { test } = require('@playwright/test');
const { CheckoutPage } = require('../../page/CheckoutPage');
const { SearchPage } = require('../../page/SearchPage');

const productName = 'Samsung Galaxy Tab';
const validEmail = 'alan@gmail.com';
const validPassword = '12345';

test.describe('Complete Checkout Process Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.context().clearCookies();
    await page.context().clearPermissions();
  });

  test('should complete the checkout process and confirm the order', async ({ page }) => {
    const searchPage = new SearchPage(page);
    const checkoutPage = new CheckoutPage(page);
    await searchPage.visit();
    await searchPage.searchProduct(productName);
    await searchPage.addToCart(productName);
    await checkoutPage.visit();
    await checkoutPage.userCredentials(validEmail, validPassword);
    await checkoutPage.agreeToTermsAndProceed();
    await checkoutPage.confirmOrder();
    await checkoutPage.verifyOrderSuccess();
  });
});
