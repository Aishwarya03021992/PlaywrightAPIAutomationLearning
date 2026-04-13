import { test, expect } from '@playwright/test';

// ✅ 200 OK — Resource found
test('200 - successful GET', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
  expect(response.status()).toBe(200);
  console.log('✅ 200 OK - Resource returned successfully');
});

// ✅ 201 Created — Resource created
test('201 - resource created via POST', async ({ request }) => {
  const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
    data: { title: 'Test', body: 'Body', userId: 1 },
  });
  expect(response.status()).toBe(201);
  console.log('✅ 201 Created - New resource created');
});

// ✅ 404 Not Found — Resource doesn't exist
test('404 - resource not found', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/posts/99999');
  expect(response.status()).toBe(404);
  console.log('✅ 404 Not Found - Resource does not exist');
});

// ✅ Understanding status code categories
test('understand status code ranges', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
  const status = response.status();

  if (status >= 200 && status < 300) console.log('✅ 2xx SUCCESS');
  else if (status >= 300 && status < 400) console.log('↩️  3xx REDIRECT');
  else if (status >= 400 && status < 500) console.log('❌ 4xx CLIENT ERROR');
  else if (status >= 500) console.log('💥 5xx SERVER ERROR');

  expect(response.ok()).toBeTruthy(); // .ok() = true if status 200-299
});