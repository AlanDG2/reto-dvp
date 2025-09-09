const { test, expect } = require('@playwright/test');

const baseUrl = 'https://fakestoreapi.com';

test('Should fetch all electronics products', async ({ request }) => {
  const response = await request.get(`${baseUrl}/products/category/electronics`);
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(Array.isArray(body)).toBeTruthy();
  body.forEach((product) => {
    expect(product.category).toBe('electronics');
  });
  console.log('Electronic Products', JSON.stringify(body, null, 2));
});

test('Should return an empty array for an invalid category', async ({ request }) => {
  const response = await request.get(`${baseUrl}/products/category/invalid-category`);
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(Array.isArray(body)).toBeTruthy();
  expect(body.length).toBe(0);
  console.log('Empty response ', JSON.stringify(body, null, 2));
});
