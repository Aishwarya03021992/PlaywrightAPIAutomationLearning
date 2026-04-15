import { test, expect } from '@playwright/test';

test('Bearer Token - Dynamic (ReqRes)', async ({ request }) => {

  // Step 1: Get token (Login API)
  const loginResponse = await request.post('https://reqres.in/api/login', {
    data: {
      email: "eve.holt@reqres.in",
      password: "cityslicka"
    }
  });

  expect(loginResponse.status()).toBe(200);

  const loginBody = await loginResponse.json();
  const token = loginBody.token;

  console.log('Generated Token:', token);

  // Step 2: Use token in another API
  const response = await request.get('https://reqres.in/api/users/2', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  console.log(body);
});