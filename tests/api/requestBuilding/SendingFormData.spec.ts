import { test, expect } from '@playwright/test';
test('Send Form Data', async ({ request }) => {

  const response = await request.post('https://httpbin.org/post', {
    form: {
      username: 'test_user',
      password: '12345'
    }
  });

  const body = await response.json();
  console.log(body.form);

  expect(response.status()).toBe(200);
});