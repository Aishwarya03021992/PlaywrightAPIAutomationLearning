import { test, expect } from '@playwright/test';
test('manual JSON stringify', async ({ request }) => {
  const payload = {
    timestamp: new Date().toISOString(),  // serialize Date as ISO string
    config:    JSON.stringify({ theme: 'dark' }),  // nested JSON string
  };

  console.log('Manual serialized payload:', JSON.stringify(payload));

  // Manual stringify when you need full control
const response = await request.post('/posts', {
  headers: { 'Content-Type': 'application/json' },
  data: JSON.stringify(payload),
});

  const raw = await response.text();       // get raw text first
  console.log('Raw response text:', raw);

  const parsed = JSON.parse(raw);           // then parse manually
  console.log('Manually deserialized response:', JSON.stringify(parsed, null, 2));

 
});