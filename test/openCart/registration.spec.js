const { test } = require('@playwright/test');
const { RegisterPage } = require('../../page/RegisterPage');
const { faker } = require('@faker-js/faker');

const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const email = faker.internet.email();
const telephone = faker.phone.number();
const password = faker.internet.password();

test.describe('Sign up', () => {
  test('Complete the registration form', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.visit();
    await registerPage.verifyTitle();
    await registerPage.fillFirstName(firstName);
    await registerPage.fillLastName(lastName);
    await registerPage.fillEmail(email);
    await registerPage.fillTelephone(telephone);
    await registerPage.fillPassword(password);
    await registerPage.fillConfirmPassword(password);
    await registerPage.acceptTerms();
    await registerPage.submitForm();
  });

  test('Try to send the empty form', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.visit();
    await registerPage.submitForm();
    await registerPage.verifyEmptyFormErrors();
  });

  test('try to register a new user', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.visit();
    await registerPage.fillFirstName(firstName);
    await registerPage.fillLastName(lastName);
    await registerPage.fillEmail(email);
    await registerPage.fillTelephone(telephone);
    await registerPage.fillPassword(password);
    await registerPage.fillConfirmPassword(password);
    await registerPage.acceptTerms();
    await registerPage.submitForm();
    await registerPage.verifyExistingUserError();
  });
});
