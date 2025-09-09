const { test, expect } = require('@playwright/test');

const baseUrl = 'https://fakestoreapi.com';

test('Should fetch a specific product', async ({ request }) => {
  const productId = 1;
  const response = await request.get(`${baseUrl}/products/${productId}`);
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.id).toBe(productId);
  console.log('specific product:', JSON.stringify(body, null, 2));
});

test('nothing should be returned', async ({ request }) => {
  const invalidProductId = 9999;
  const response = await request.get(`${baseUrl}/products/${invalidProductId}`);
  const text = await response.text();
  expect(text === '' || text === '{}' || text === 'null').toBeTruthy();
  console.log('Respuesta para producto inválido:', text);
});
