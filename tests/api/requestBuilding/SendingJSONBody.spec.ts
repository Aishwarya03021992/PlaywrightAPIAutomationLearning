import { test, expect } from '@playwright/test';
test('Send JSON Body', async ({ request }) => {

  const response = await request.post('https://reqres.in/api/users', {
    data: {
      name: "Aishwarya",
      job: "QA Engineer"
    }
  });

  const body = await response.json();
  console.log(body);

  expect(response.status()).toBe(401);
});