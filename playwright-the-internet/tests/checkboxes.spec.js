const { test, expect } = require('@playwright/test');

test.describe('Checkbox Tests', () => {
  test('TC06 - should check the first checkbox', async ({ page }) => {
    await page.goto('/checkboxes');
    const checkbox1 = page.locator('#checkboxes input').nth(0);
    await checkbox1.check();
    await expect(checkbox1).toBeChecked();
  });

  test('TC07 - should uncheck the second checkbox', async ({ page }) => {
    await page.goto('/checkboxes');
    const checkbox2 = page.locator('#checkboxes input').nth(1);
    await checkbox2.uncheck();
    await expect(checkbox2).not.toBeChecked();
  });
});
