import { test, expect } from '@playwright/test';

test.use({
  storageState: 'john-auth.json',
});

test('User Pages', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.getByRole('link', { name: 'Add Stuff' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'List Stuff' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'john@foo.com' })).toBeVisible();
  await page.getByRole('link', { name: 'Add Stuff' }).click();
  await expect(page.getByRole('heading', { name: 'Add Stuff' })).toBeVisible();
  await page.getByRole('link', { name: 'List Stuff' }).click();
  await expect(page.getByRole('heading', { name: 'Stuff' })).toBeVisible();
});

test('List Stuff Page', async ({ page }) => {
  page.on('console', msg => console.log(msg.text())); // Log browser console messages
  page.on('requestfailed', request => console.log(`Request failed: ${request.url()}`)); // Log failed requests
  await page.goto('http://localhost:3000/list');
});
