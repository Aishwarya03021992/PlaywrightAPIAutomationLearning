import { test, expect } from '@playwright/test';

test('Set Request Headers', async ({ request }) => {

  const response = await request.get('https://httpbin.org/headers', {
    headers: {
      'Authorization': 'Bearer test_token',
      'Custom-Header': 'Aishwarya'
    }
  });

  const body = await response.json();
  console.log(body);

  expect(response.status()).toBe(200);
});