import { test, expect } from '@playwright/test';

// ✅ CONCEPT: PATH PARAMS — Part of the URL path
// /posts/1  → "1" is the path param (identifies a specific resource)
test('PATH PARAM - get post by ID in URL', async ({ request }) => {
  const postId = 5; // 👈 This is a path parameter
  const response = await request.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);

  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.id).toBe(postId);
  console.log('Path Param used - Post ID:', body.id);
});

// ✅ CONCEPT: QUERY PARAMS — Appended after ? in URL
// /posts?userId=1  → filters posts by userId
test('QUERY PARAMS - filter posts by userId', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/posts', {
    params: {         // 👈 These become ?userId=1 in the URL
      userId: 1,
    },
  });

  expect(response.status()).toBe(200);
  const body = await response.json();
  console.log('Total posts for userId=1:', body.length); // should be 10
  body.forEach((post: any) => expect(post.userId).toBe(1)); // every post belongs to user 1
});

// ✅ CONCEPT: REQUEST HEADERS — Metadata sent with the request
test('REQUEST HEADERS - send custom headers', async ({ request }) => {
  const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
    headers: {                              // 👈 Custom headers
      'Content-Type': 'application/json',  // Tells server we're sending JSON
      'Accept': 'application/json',        // Tells server we expect JSON back
      'X-Custom-Header': 'playwright-test' // Custom header (optional metadata)
    },
    data: {
      title: 'Header Test',
      body: 'Testing headers',
      userId: 1,
    },
  });

  expect(response.status()).toBe(201);

  // ✅ INSPECT RESPONSE HEADERS
  const contentType = response.headers()['content-type'];
  console.log('Response Content-Type:', contentType);
  expect(contentType).toContain('application/json');
});

// ✅ CONCEPT: REQUEST BODY — Data sent with POST/PUT/PATCH
test('REQUEST BODY - send JSON body in POST', async ({ request }) => {
  const requestPayload = {       // 👈 This is the Request Body
    title: 'Learn Playwright',
    body: 'API testing is fun!',
    userId: 42,
  };

  const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
    data: requestPayload,
  });

  const responseBody = await response.json(); // 👈 This is the Response Body
  console.log('Sent:', requestPayload);
  console.log('Received:', responseBody);

  expect(response.status()).toBe(201);
  expect(responseBody.title).toBe(requestPayload.title);
  expect(responseBody.userId).toBe(requestPayload.userId);
});