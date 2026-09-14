const { test, expect } = require('@playwright/test');

test.describe('Dropdown Tests', () => {
  test('TC08 - should select Option 1', async ({ page }) => {
    await page.goto('/dropdown');
    const dropdown = page.locator('#dropdown');
    await dropdown.selectOption('1');
    await expect(dropdown).toHaveValue('1');
  });

  test('TC09 - should select Option 2', async ({ page }) => {
    await page.goto('/dropdown');
    const dropdown = page.locator('#dropdown');
    await dropdown.selectOption('2');
    await expect(dropdown).toHaveValue('2');
  });
});
