const { test } = require('@playwright/test');
const { faker } = require('@faker-js/faker');
const { LoginPage } = require('../../page/LoginPage');

const validEmail = 'alan@gmail.com';
const validPassword = '12345';
const invalidEmail = faker.internet.email();
const invalidPassword = faker.internet.password();

let loginPage;

test.describe('Login test in OpenCart', () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.visit();
  });

  test('Successful login with valid credentials', async () => {
    await loginPage.login(validEmail, validPassword);
    await loginPage.verifySuccessfulLogin();
  });

  test('Login failed with invalid credentials', async () => {
    await loginPage.login(invalidEmail, invalidPassword);
    await loginPage.verifyInvalidCredentialsError();
  });
});
