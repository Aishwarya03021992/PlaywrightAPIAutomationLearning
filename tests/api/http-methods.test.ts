import { test, expect } from '@playwright/test';

// ✅ CONCEPT 1: GET — Read/Fetch a resource
test('GET - fetch a single post', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');

  console.log('Status:', response.status());          // 200
  console.log('Body:', await response.json());        // { id:1, title:..., body:..., userId:1 }

  expect(response.status()).toBe(200);
});

// ✅ CONCEPT 2: POST — Create a new resource
test('POST - create a new post', async ({ request }) => {
  const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
    data: {
      title: 'My New Post',
      body: 'This is the content',
      userId: 1,
    },
  });

  console.log('Status:', response.status());   // 201 Created
  console.log('Body:', await response.json()); // { id: 101, title: ..., ... }

  expect(response.status()).toBe(201);
  const body = await response.json();
  expect(body.title).toBe('My New Post');
});

// ✅ CONCEPT 3: PUT — Replace the entire resource
test('PUT - replace a post completely', async ({ request }) => {
  const response = await request.put('https://jsonplaceholder.typicode.com/posts/1', {
    data: {
      id: 1,
      title: 'Replaced Title',
      body: 'Replaced body content',
      userId: 1,
    },
  });

  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.title).toBe('Replaced Title');
});

// ✅ CONCEPT 4: PATCH — Update ONLY specific fields
test('PATCH - update only the title of a post', async ({ request }) => {
  const response = await request.patch('https://jsonplaceholder.typicode.com/posts/1', {
    data: {
      title: 'Only Title Updated',
    },
  });

  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.title).toBe('Only Title Updated');
  // Other fields like body, userId remain unchanged
});

// ✅ CONCEPT 5: DELETE — Remove a resource
test('DELETE - delete a post', async ({ request }) => {
  const response = await request.delete('https://jsonplaceholder.typicode.com/posts/1');

  expect(response.status()).toBe(200); // JSONPlaceholder returns 200 for DELETE
  const body = await response.json();
  expect(body).toEqual({}); // Empty object = successfully deleted
});