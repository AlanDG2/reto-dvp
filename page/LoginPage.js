const { expect } = require('@playwright/test');

exports.LoginPage = class LoginPage {
  constructor(page) {
  this.page = page;
  this.url = 'https://opencart.abstracta.us/index.php?route=account/login';
  this.emailInput = page.locator('#input-email');
  this.passwordInput = page.locator('#input-password');
  this.submitButton = page.locator('input[type="submit"]');
  this.errorAlert = page.locator('.alert-danger');
  this.accountHeader = page.locator('#content').getByRole('heading', { name: 'My Account' });
  }

  async visit() {
    await this.page.goto(this.url);
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async verifySuccessfulLogin() {
    await expect(this.page).toHaveURL(/route=account\/account/);
    await expect(this.accountHeader).toContainText('My Account');
  }

  async verifyInvalidCredentialsError() {
    await expect(this.errorAlert).toContainText('Warning: No match for E-Mail Address and/or Password.');
  }
};
