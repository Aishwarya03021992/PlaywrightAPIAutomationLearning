import { test, expect } from '@playwright/test';

/**
 * API KEY CONCEPT
 * reqres.in requires API key passed as a HEADER: 'x-api-key'
 */

// ✅ API Key via REQUEST HEADER (correct way for reqres.in)
test('API KEY - passed as request header', async ({ request }) => {
  const response = await request.get('https://reqres.in/api/users', {
    headers: {
      'x-api-key': 'reqres-free-v1',   // 👈 API key in header
    },
    params: {
      page: 1,
    },
  });

  console.log('Status:', response.status());
  expect(response.status()).toBe(200);

  const body = await response.json();
  console.log('Total users:', body.total);
});

// ✅ API Key — fetch single user with header
test('API KEY - fetch single user with header', async ({ request }) => {
  const response = await request.get('https://reqres.in/api/users/2', {
    headers: {
      'x-api-key': 'reqres-free-v1',   // 👈 API key in header
    },
  });

  expect(response.status()).toBe(200);
  const body = await response.json();
  console.log('User fetched with API key:', body.data.email);
});

// ❌ MISSING API Key — returns 401
test('API KEY - missing key returns 401', async ({ request }) => {
  const response = await request.get('https://reqres.in/api/users', {
    // No API key passed 👈
  });

  expect(response.status()).toBe(401);  // Unauthorized ✅
  console.log('✅ Status without API key:', response.status(), '→ 401 Unauthorized (expected)');
});