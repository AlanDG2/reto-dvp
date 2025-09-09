
const { expect } = require('@playwright/test');

exports.RegisterPage = class RegisterPage {
  constructor(page) {
  this.page = page;
  this.url = 'https://opencart.abstracta.us/index.php?route=account/register';
  this.firstNameInput = page.locator('#input-firstname');
  this.lastNameInput = page.locator('#input-lastname');
  this.emailInput = page.locator('#input-email');
  this.telephoneInput = page.locator('#input-telephone');
  this.passwordInput = page.locator('#input-password');
  this.confirmPasswordInput = page.locator('#input-confirm');
  this.termsCheckbox = page.locator('input[type="checkbox"]');
  this.continueButton = page.locator('input[value="Continue"]');
  this.successMessage = page.locator('h1');
  this.errorMessages = page.locator('[class="text-danger"]');
  this.existingUserError = page.locator('.alert.alert-danger.alert-dismissible');
  }

  async visit() {
    await this.page.goto(this.url);
    await expect(this.page).toHaveURL(/route=account\/register/);
  }

  async verifyTitle() {
    await expect(this.page).toHaveTitle(/Register Account/);
  }

  async fillFirstName(firstName) {
    await this.firstNameInput.fill(firstName);
    await expect(this.firstNameInput).toHaveValue(firstName);
  }

  async fillLastName(lastName) {
    await this.lastNameInput.fill(lastName);
    await expect(this.lastNameInput).toHaveValue(lastName);
  }

  async fillEmail(email) {
    await this.emailInput.fill(email);
    await expect(this.emailInput).toHaveValue(email);
  }

  async fillTelephone(telephone) {
    await this.telephoneInput.fill(telephone);
    await expect(this.telephoneInput).toHaveValue(telephone);
  }

  async fillPassword(password) {
    await this.passwordInput.fill(password);
    await expect(this.passwordInput).toHaveValue(password);
  }

  async fillConfirmPassword(password) {
    await this.confirmPasswordInput.fill(password);
    await expect(this.confirmPasswordInput).toHaveValue(password);
  }

  async acceptTerms() {
    await this.termsCheckbox.check();
    await expect(this.termsCheckbox).toBeChecked();
  }

  async submitForm() {
    await this.continueButton.scrollIntoViewIfNeeded();
    await this.continueButton.click();
  }

  async verifyEmptyFormErrors() {
    const errors = await this.errorMessages.allTextContents();
    expect(errors.length).toBe(5);
    const expectedErrors = [
      'First Name must be between 1 and 32 characters!',
      'Last Name must be between 1 and 32 characters!',
      'E-Mail Address does not appear to be valid!',
      'Telephone must be between 3 and 32 characters!',
      'Password must be between 4 and 20 characters!',
    ];
    expectedErrors.forEach((msg, i) => expect(errors[i]).toContain(msg));
  }

  async verifyExistingUserError() {
    await expect(this.existingUserError).toBeVisible();
    await expect(this.existingUserError).toContainText('Warning: E-Mail Address is already registered!');
  }
};
