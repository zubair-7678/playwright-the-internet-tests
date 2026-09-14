const { test, expect } = require('@playwright/test');

test.describe('Dynamic Controls Tests', () => {
  test('TC14 - should enable the disabled input', async ({ page }) => {
    await page.goto('/dynamic_controls');
    const input = page.locator('input[type="text"]');
    await expect(input).toBeDisabled();
    await page.getByRole('button', { name: 'Enable' }).click();
    await expect(input).toBeEnabled();
  });

  test('TC15 - should disable the enabled input', async ({ page }) => {
    await page.goto('/dynamic_controls');
    const input = page.locator('input[type="text"]');
    await page.getByRole('button', { name: 'Enable' }).click();
    await expect(input).toBeEnabled();
    await page.getByRole('button', { name: 'Disable' }).click();
    await expect(input).toBeDisabled();
  });
});
