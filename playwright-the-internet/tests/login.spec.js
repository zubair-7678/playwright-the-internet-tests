const { test, expect } = require('@playwright/test');

test.describe('Login Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('TC01 - should login successfully with valid credentials', async ({ page }) => {
    await page.locator('#username').fill('tomsmith');
    await page.locator('#password').fill('SuperSecretPassword!');
    await page.locator('button[type="submit"]').click();
    await expect(page).toHaveURL(/secure/);
    await expect(page.locator('#flash')).toContainText('You logged into a secure area!');
  });

  test('TC02 - should show error for invalid username', async ({ page }) => {
    await page.locator('#username').fill('wronguser');
    await page.locator('#password').fill('SuperSecretPassword!');
    await page.locator('button[type="submit"]').click();
    await expect(page.locator('#flash')).toContainText('Your username is invalid!');
  });

  test('TC03 - should show error for invalid password', async ({ page }) => {
    await page.locator('#username').fill('tomsmith');
    await page.locator('#password').fill('WrongPassword');
    await page.locator('button[type="submit"]').click();
    await expect(page.locator('#flash')).toContainText('Your password is invalid!');
  });

  test('TC04 - should show error when credentials are empty', async ({ page }) => {
    await page.locator('button[type="submit"]').click();
    await expect(page.locator('#flash')).toBeVisible();
  });

  test('TC05 - should logout successfully', async ({ page }) => {
    await page.locator('#username').fill('tomsmith');
    await page.locator('#password').fill('SuperSecretPassword!');
    await page.locator('button[type="submit"]').click();
    await expect(page).toHaveURL(/secure/);
    await page.locator('a.button.secondary.radius').click();
    await expect(page).toHaveURL(/login/);
    await expect(page.locator('#flash')).toContainText('You logged out of the secure area!');
  });
});
