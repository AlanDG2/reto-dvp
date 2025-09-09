const { test, expect } = require('@playwright/test');

const baseUrl = 'https://fakestoreapi.com';

test('Should create a new product with all required fields', async ({ request }) => {
  const newProduct = {
    title: 'Nuevo producto',
    price: 99.99,
    description: 'Este es un producto de prueba',
    image: 'https://i.pravatar.cc',
    category: 'electronics',
  };
  const response = await request.post(`${baseUrl}/products`, { data: newProduct });
  expect(response.status()).toBe(201);
  const body = await response.json();
  expect(typeof body.id).toBe('number');
  expect(body.title).toBe(newProduct.title);
  expect(body.price).toBe(newProduct.price);
  console.log('Producto creado:', JSON.stringify(body, null, 2));
});

test('Should create a product with minimal required fields', async ({ request }) => {
  const minimalProduct = {
    title: 'Producto mínimo',
    price: 50.00,
  };
  const response = await request.post(`${baseUrl}/products`, { data: minimalProduct });
  expect(response.status()).toBe(201);
  const body = await response.json();
  expect(typeof body.id).toBe('number');
  expect(body.title).toBe(minimalProduct.title);
  expect(body.price).toBe(minimalProduct.price);
  console.log('Producto mínimo creado:', JSON.stringify(body, null, 2));
});

test('Should create a product with additional fields', async ({ request }) => {
  const productWithExtraFields = {
    title: 'Producto con campos adicionales',
    price: 75.00,
    description: 'Este es un producto con campos adicionales',
    image: 'https://i.pravatar.cc',
    category: 'electronics',
    extraField: 'Este campo no está definido en la API',
  };
  const response = await request.post(`${baseUrl}/products`, { data: productWithExtraFields });
  expect(response.status()).toBe(201);
  const body = await response.json();
  expect(typeof body.id).toBe('number');
  expect(body.title).toBe(productWithExtraFields.title);
  expect(body.price).toBe(productWithExtraFields.price);
  console.log('Producto con campos adicionales creado:', JSON.stringify(body, null, 2));
});

test('Should handle invalid product data (negative price)', async ({ request }) => {
  const invalidProduct = {
    title: 'Producto con precio inválido',
    price: -10.00,
    description: 'Este es un producto con precio inválido',
    image: 'https://i.pravatar.cc',
    category: 'electronics',
  };
  const response = await request.post(`${baseUrl}/products`, { data: invalidProduct });
  if (response.status() === 201) {
    const body = await response.json();
    console.log('La API aceptó un precio negativo:', JSON.stringify(body, null, 2));
  } else {
    expect([400, 422]).toContain(response.status());
    const body = await response.json();
    console.log(JSON.stringify(body, null, 2));
  }
});

test('Should handle missing required fields', async ({ request }) => {
  const invalidProduct = {
    title: 'Producto sin precio',
    description: 'Este es un producto sin precio',
    image: 'https://i.pravatar.cc',
    category: 'electronics',
  };
  const response = await request.post(`${baseUrl}/products`, { data: invalidProduct });
  if (response.status() === 201) {
    const body = await response.json();
    console.log('La API aceptó un producto sin precio:', JSON.stringify(body, null, 2));
  } else {
    expect([400, 422]).toContain(response.status());
    const body = await response.json();
    console.log(JSON.stringify(body, null, 2));
  }
});