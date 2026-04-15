import { test, expect } from '@playwright/test';

const BASE = 'https://httpbin.org';
const USERNAME = 'user';
const PASSWORD = 'pass';

// Helper to encode credentials
const encodeCredentials = (user: string, pwd: string) =>
  Buffer.from(`${user}:${pwd}`).toString('base64');

// ✅ Correct credentials → 200
test('BASIC AUTH - success with correct credentials', async ({ request }) => {
  const response = await request.get(`${BASE}/basic-auth/${USERNAME}/${PASSWORD}`, {
    headers: {
      'Authorization': `Basic ${encodeCredentials(USERNAME, PASSWORD)}`,
    },
  });

  const body = await response.json();
  expect(response.status()).toBe(200);
  expect(body.authenticated).toBe(true);
  console.log('✅ Authenticated:', body);
});

// ❌ Wrong credentials → 401
test('BASIC AUTH - fails with wrong credentials', async ({ request }) => {
  const response = await request.get(`${BASE}/basic-auth/${USERNAME}/${PASSWORD}`, {
    headers: {
      'Authorization': `Basic ${encodeCredentials('wrong', 'credentials')}`,
    },
  });

  expect(response.status()).toBe(401);
  console.log('❌ 401 Unauthorized - wrong credentials');
});

// ❌ No header → 401
test('BASIC AUTH - fails with no auth header', async ({ request }) => {
  const response = await request.get(`${BASE}/basic-auth/${USERNAME}/${PASSWORD}`);

  expect(response.status()).toBe(401);
  console.log('❌ 401 Unauthorized - missing auth header');
});