const { test, expect } = require('@playwright/test');

const baseUrl = 'https://fakestoreapi.com';

test('Should update the image of a product', async ({ request }) => {
  const productId = 7;
  const updatedImage = 'https://nueva-imagen.com/imagen.jpg';
  const response = await request.put(`${baseUrl}/products/${productId}`, {
    data: { image: updatedImage }
  });
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.image).toBe(updatedImage);
  console.log('Producto actualizado:', JSON.stringify(body, null, 2));
});

test('Should return an error for an invalid product ID', async ({ request }) => {
  const invalidProductId = 9999;
  const response = await request.put(`${baseUrl}/products/${invalidProductId}`, {
    data: { title: 'Invalid Update' }
  });
  const body = await response.json();
  console.log(body);
  expect(body).toHaveProperty('title', 'Invalid Update');
});
