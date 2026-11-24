import { test, expect } from '@playwright/test';

test('TC-001 Owner logs in with the correct PIN', async ({ page }) => {
  const pin = process.env.COHO_PIN;
  if (!pin) throw new Error('COHO_PIN is missing from the .env file');

  await page.goto('/');
  await page.getByRole('button', { name: 'Owner / Member' }).click();
  await page.getByRole('textbox', { name: 'Enter 4-digit PIN' }).fill(pin);
  await page.getByRole('button', { name: 'Sign In as Resident' }).click();

  await expect(
    page.getByRole('heading', { name: 'Pooja Sharma', exact: true })
  ).toBeVisible({ timeout: 10000 });
});