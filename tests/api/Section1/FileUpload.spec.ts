import { test, expect } from '@playwright/test';
import fs   from 'fs';
import path from 'path';

test('file upload via API', async ({ request }) => {
  // Read file as buffer
  const filePath = path.resolve(__dirname, 'fixtures/photo.jpg');
  const fileBuffer = fs.readFileSync(filePath);

  const response = await request.post('/upload', {
    multipart: {
      file: {
        name:     'photo.jpg',
        mimeType: 'image/jpeg',
        buffer:   fileBuffer,     // ← Buffer from fs.readFileSync
      },
    },
  });

  expect(response.status()).toBe(200);
  const result = await response.json();
  expect(result.url).toContain('photo');
});

test('file upload with metadata', async ({ request }) => {
  const pdfBuffer = fs.readFileSync('fixtures/report.pdf');

  const response = await request.post('/documents', {
    multipart: {
      document: {
        name:     'report.pdf',
        mimeType: 'application/pdf',
        buffer:   pdfBuffer,
      },
      title:    'Q4 Report',    // plain text fields alongside the file
      category: 'finance',
    },
  });

  expect(response.ok()).toBeTruthy();
});