const { test, expect } = require('@playwright/test');

const baseUrl = 'https://fakestoreapi.com';

test('Should delete a product', async ({ request }) => {
  const productId = 6;
  const response = await request.delete(`${baseUrl}/products/${productId}`);
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.id).toBe(productId);
  console.log('Producto eliminado:', JSON.stringify(body, null, 2));
});

test('Should return an error for an invalid product ID', async ({ request }) => {
  const invalidProductId = 9999;
  const response = await request.delete(`${baseUrl}/products/${invalidProductId}`);
  const text = await response.text();
  console.log('Respuesta para ID de producto inválido:', text);
  expect(text === '' || text === '{}' || text === 'null').toBeTruthy();
});
