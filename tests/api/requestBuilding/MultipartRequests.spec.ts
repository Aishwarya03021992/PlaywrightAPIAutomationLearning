import { test, expect } from '@playwright/test';
test('Multipart Request', async ({ request }) => {

  const response = await request.post('https://httpbin.org/post', {
    multipart: {
      file: {
        name: 'test.txt',
        mimeType: 'text/plain',
        buffer: Buffer.from('Sample file content')
      },
      description: 'Test file upload',
      user: 'Aishwarya'
    }
  });

  const body = await response.json();
  console.log(body);

  expect(response.status()).toBe(200);
});