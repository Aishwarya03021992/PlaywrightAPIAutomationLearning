import { test, expect } from '@playwright/test';

// ── Type definitions (TypeScript) ────────────────────
interface User {
  id?:   number;
  name:  string;
  email: string;
  meta:  { role: string; active: boolean };
}

test('full serialization cycle', async ({ request }) => {
  // 1. Serialize — JS object → JSON (Playwright does this internally)
  const payload: User = {
    name:  'Bob',
    email: 'bob@example.com',
    meta:  { role: 'editor', active: true },
  };

  console.log('Serialized payload:', JSON.stringify(payload));

  const response = await request.post('/users', { data: payload });

  // 2. Deserialize — JSON string → typed JS object
  const created = await response.json() as User;

  console.log('Deserialized response:', JSON.stringify(created, null, 2));

  expect(created.id).toBeDefined();
  expect(created.name).toBe('Bob');
  expect(created.meta.active).toBe(true);
});
