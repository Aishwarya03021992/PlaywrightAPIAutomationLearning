import * as fs from 'fs';

import { test, expect } from '@playwright/test';

test('File Upload', async ({ request }) => {

  const response = await request.post('https://httpbin.org/post', {
    multipart: {
      file: {
        name: 'test.txt',
        mimeType: 'text/plain',
        buffer: Buffer.from('Hello World')
      }
    }
  });

  const body = await response.json();
  console.log(body.files);

  expect(response.status()).toBe(200);
});