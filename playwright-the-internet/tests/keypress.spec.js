const { test, expect } = require('@playwright/test');

test.describe('Keyboard Tests', () => {
  test('TC20 - should detect Enter key press', async ({ page }) => {
    await page.goto('/key_presses');
    await page.keyboard.press('Enter');
    await expect(page.locator('#result')).toContainText('ENTER');
  });
});
