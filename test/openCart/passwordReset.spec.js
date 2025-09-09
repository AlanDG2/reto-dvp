const { test } = require('@playwright/test');
const { faker } = require('@faker-js/faker');
const { PasswordResetPage } = require('../../page/PasswordResetPage');

const validEmail = 'user@example.com'; 
const invalidEmail = faker.internet.email();

let passwordResetPage;

test.describe('Test de Restablecimiento de Contraseña en OpenCart', () => {
  test.beforeEach(async ({ page }) => {
    passwordResetPage = new PasswordResetPage(page);
    await passwordResetPage.visit();
  });

  test('Solicitar restablecimiento de contraseña con correo válido', async () => {
    await passwordResetPage.requestPasswordReset(validEmail);
    await passwordResetPage.verifySuccessMessage();
  });

  test('Solicitar restablecimiento de contraseña con correo inválido', async () => {
    await passwordResetPage.requestPasswordReset(invalidEmail);
    await passwordResetPage.verifyErrorMessage();
  });
});
