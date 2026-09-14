const { test, expect } = require('@playwright/test');

test.describe('JavaScript Alert Tests', () => {
  test('TC16 - should accept JavaScript alert', async ({ page }) => {
    await page.goto('/javascript_alerts');
    page.once('dialog', async dialog => {
      expect(dialog.type()).toBe('alert');
      await dialog.accept();
    });
    await page.getByText('Click for JS Alert').click();
    await expect(page.locator('#result')).toHaveText('You successfully clicked an alert');
  });

  test('TC17 - should accept JavaScript confirm', async ({ page }) => {
    await page.goto('/javascript_alerts');
    page.once('dialog', async dialog => {
      expect(dialog.type()).toBe('confirm');
      await dialog.accept();
    });
    await page.getByText('Click for JS Confirm').click();
    await expect(page.locator('#result')).toHaveText('You clicked: Ok');
  });

  test('TC18 - should dismiss JavaScript confirm', async ({ page }) => {
    await page.goto('/javascript_alerts');
    page.once('dialog', async dialog => {
      await dialog.dismiss();
    });
    await page.getByText('Click for JS Confirm').click();
    await expect(page.locator('#result')).toHaveText('You clicked: Cancel');
  });
});
