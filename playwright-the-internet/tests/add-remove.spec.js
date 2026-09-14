const { test, expect } = require('@playwright/test');

test.describe('Add and Remove Elements Tests', () => {
  test('TC12 - should add a new element', async ({ page }) => {
    await page.goto('/add_remove_elements/');
    await page.getByText('Add Element').click();
    await expect(page.getByText('Delete')).toBeVisible();
  });

  test('TC13 - should remove an added element', async ({ page }) => {
    await page.goto('/add_remove_elements/');
    await page.getByText('Add Element').click();
    const deleteButton = page.getByText('Delete');
    await expect(deleteButton).toBeVisible();
    await deleteButton.click();
    await expect(deleteButton).not.toBeVisible();
  });
});
