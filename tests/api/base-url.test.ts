import { test, expect } from '@playwright/test';

/**
 * CONCEPT: BASE URL
 * The base URL is the root address of the API.
 * In playwright.config.ts → baseURL: 'https://jsonplaceholder.typicode.com'
 * Once set, you only write the ENDPOINT in tests (no full URL needed)
 */

// ❌ WITHOUT baseURL (hardcoded full URL — bad practice)
test('WITHOUT baseURL - full URL hardcoded', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
  expect(response.status()).toBe(200);
  console.log('❌ Full URL hardcoded - harder to maintain');
});

// ✅ WITH baseURL (clean, maintainable — good practice)
// Make sure playwright.config.ts has: baseURL: 'https://jsonplaceholder.typicode.com'
test('WITH baseURL - only endpoint needed', async ({ request }) => {
  const response = await request.get('/posts/1');  // 👈 Just the endpoint
  expect(response.status()).toBe(200);
  console.log('✅ Using baseURL from config - clean and maintainable');
});

/**
 * CONCEPT: ENDPOINTS / ROUTES
 * Different endpoints map to different resources on the same server
 *
 * /posts        → collection of all posts
 * /posts/1      → a single post with id=1
 * /users        → collection of all users
 * /users/1      → a single user with id=1
 * /users/1/posts → nested route: all posts BY user 1
 */

test('ENDPOINT - collection route (all posts)', async ({ request }) => {
  const response = await request.get('/posts');   // 👈 Collection endpoint
  const body = await response.json();

  expect(response.status()).toBe(200);
  expect(Array.isArray(body)).toBeTruthy();        // Returns an ARRAY
  console.log(`Collection /posts → returned ${body.length} items`);
});

test('ENDPOINT - single resource route', async ({ request }) => {
  const response = await request.get('/posts/1'); // 👈 Single resource endpoint
  const body = await response.json();

  expect(response.status()).toBe(200);
  expect(typeof body).toBe('object');             // Returns a single OBJECT
  expect(body.id).toBe(1);
  console.log(`Single resource /posts/1 → id: ${body.id}, title: ${body.title}`);
});

test('ENDPOINT - nested route (posts by a specific user)', async ({ request }) => {
  const response = await request.get('/users/1/posts'); // 👈 Nested route
  const body = await response.json();

  expect(response.status()).toBe(200);
  expect(Array.isArray(body)).toBeTruthy();
  body.forEach((post: any) => expect(post.userId).toBe(1));
  console.log(`Nested route /users/1/posts → ${body.length} posts by user 1`);
});

test('ENDPOINT - explore all available routes', async ({ request }) => {
  // Verifying different resource routes on the same base URL
  const routes = ['/posts', '/comments', '/albums', '/photos', '/todos', '/users'];

  for (const route of routes) {
    const response = await request.get(route);
    const body = await response.json();
    expect(response.status()).toBe(200);
    console.log(`Route ${route.padEnd(10)} → ${body.length} items`);
  }
});