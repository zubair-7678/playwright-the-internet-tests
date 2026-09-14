const { test, expect } = require('@playwright/test');

test.describe('Input Validation Tests', () => {
  test('TC10 - should accept valid numeric input', async ({ page }) => {
    await page.goto('/inputs');
    const input = page.locator('input[type="number"]');
    await input.fill('12345');
    await expect(input).toHaveValue('12345');
  });

  test('TC11 - should not accept alphabetic input', async ({ page }) => {
    await page.goto('/inputs');
    const input = page.locator('input[type="number"]');
    await input.fill('abc');
    await expect(input).not.toHaveValue('abc');
  });
});
