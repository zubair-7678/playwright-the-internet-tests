const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('File Upload Tests', () => {
  test('TC19 - should upload a file successfully', async ({ page }) => {
    await page.goto('/upload');
    const filePath = path.join(__dirname, '../test-data/sample.txt');
    await page.locator('#file-upload').setInputFiles(filePath);
    await page.locator('#file-submit').click();
    await expect(page.getByText('File Uploaded!')).toBeVisible();
    await expect(page.locator('#uploaded-files')).toContainText('sample.txt');
  });
});
