const { expect } = require('@playwright/test');

exports.PasswordResetPage = class PasswordResetPage {
  constructor(page) {
    this.page = page;
    this.url = 'https://opencart.abstracta.us/index.php?route=account/forgotten';
    this.emailInput = page.locator('#input-email');
    this.submitButton = page.locator('input[type="submit"]');
    this.successAlert = page.locator('.alert-success');
    this.errorAlert = page.locator('.alert-danger');
  }

  async visit() {
    await this.page.goto(this.url);
  }

  async requestPasswordReset(email) {
    await this.emailInput.fill(email);
    await this.submitButton.click();
  }

  async verifySuccessMessage() {
    await expect(this.successAlert).toContainText('An email with a confirmation link has been sent your email address.');
  }

  async verifyErrorMessage() {
    await expect(this.errorAlert).toContainText('Warning: The E-Mail Address was not found in our records, please try again!');
  }
};
