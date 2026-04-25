import { test, expect } from '@playwright/test';

test('POST form data', async ({ request }) => {
  const response = await request.post('/login', {
    form: {                        // ← 'form' key triggers x-www-form-urlencoded
      username: 'alice',
      password: 's3cr3t',
      remember: 'true',
    },
  });

  expect(response.status()).toBe(200);

  // Verify response Content-Type header
  const ct = response.headers()['content-type'];
  expect(ct).toContain('application/x-www-form-urlencoded');
});