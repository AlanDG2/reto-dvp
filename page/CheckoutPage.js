const { expect } = require('@playwright/test');

exports.CheckoutPage = class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.url = 'https://opencart.abstracta.us/index.php?route=checkout/checkout';
    this.checkoutButton = page.locator('a', { hasText: 'Checkout' });
    this.continueButton = page.locator('input[value="Continue"]');
    this.firstNameInput = page.locator('input[name="firstname"]');
    this.lastNameInput = page.locator('input[name="lastname"]');
    this.addressInput = page.locator('input[name="address_1"]');
    this.cityInput = page.locator('input[name="city"]');
    this.postalCodeInput = page.locator('input[name="postcode"]');
    this.countryDropdown = page.locator('select[name="country_id"]');
    this.regionDropdown = page.locator('select[name="zone_id"]');
    this.agreeTermsCheckbox = page.locator('input[name="agree"]');
    this.confirmOrderButton = page.locator('input[value="Confirm Order"]');
    this.orderSuccessMessage = page.locator('#content h1', { hasText: 'Your order has been placed!' });
    this.paymentMethodButton = page.locator('#button-payment-method');
    this.shippingMethodButton = page.locator('#button-shipping-method');
    this.shippingAddressButton = page.locator('#button-shipping-address');
    this.paymentAddressButton = page.locator('#button-payment-address');
    this.confirmButton = page.locator('#button-confirm');
    this.cartButton = page.locator('#cart > button');
    this.removeCartItemButton = page.locator('.btn-danger');
    this.continueShoppingButton = page.locator('.btn-primary');
  }

  async visit() {
    await this.page.goto(this.url);
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async userCredentials(email, password) {
    await this.page.locator('#input-email').fill(email);
    await this.page.locator('#input-password').fill(password);
    await this.page.locator('#button-login').click();
  }

  async fillBillingDetails(firstName, lastName, address, city, postalCode, country, region) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.addressInput.fill(address);
    await this.cityInput.fill(city);
    await this.postalCodeInput.fill(postalCode);
    await this.countryDropdown.selectOption({ label: country });
    await this.regionDropdown.selectOption({ label: region });
    await this.continueButton.click();
  }

  async agreeToTermsAndProceed() {
    await this.continueButton.scrollIntoViewIfNeeded({timeout: 7000});
    await this.continueButton.click({force: true});
    await this.paymentAddressButton.scrollIntoViewIfNeeded({timeout: 7000});
    await this.paymentAddressButton.click({force: true});
    await this.shippingAddressButton.scrollIntoViewIfNeeded({timeout: 7000});
    await this.shippingAddressButton.click({force: true});
    await this.shippingMethodButton.scrollIntoViewIfNeeded({timeout: 7000});
    await this.shippingMethodButton.click({force: true});
    await this.agreeTermsCheckbox.check();
    await this.paymentMethodButton.scrollIntoViewIfNeeded({timeout: 7000});
    await this.paymentMethodButton.click({force: true});
    await this.confirmButton.scrollIntoViewIfNeeded({timeout: 7000});
    await expect(this.confirmButton).toBeVisible({timeout: 7000});
  }

  async confirmOrder() {
    await this.confirmOrderButton.click();
  }

  async verifyOrderSuccess() {
    await expect(this.orderSuccessMessage).toBeVisible();
  }

  async emptyCart() {
    await this.cartButton.click();
    await this.page.waitForTimeout(500);
    const removeButtons = await this.removeCartItemButton.elementHandles();
    for (const btn of removeButtons) {
      await btn.click();
      await this.page.waitForTimeout(500);
    }
    await this.continueShoppingButton.click();
  }
};
