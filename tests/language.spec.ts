import { test, expect } from '@playwright/test';

test('TC-030 Rules page switches to Hindi', async ({ page }) => {
  const pin = process.env.COHO_PIN;
  if (!pin) throw new Error('COHO_PIN is missing from the .env file');

  await page.goto('/');
  await page.getByRole('button', { name: 'Owner / Member' }).click();
  await page.getByRole('textbox', { name: 'Enter 4-digit PIN' }).fill(pin);
  await page.getByRole('button', { name: 'Sign In as Resident' }).click();

  await page.getByRole('button', { name: 'Society Rules' }).click();
  await page.getByRole('button', { name: 'हिंदी' }).click();

  await expect(
    page.getByText('आगंतुक एवं ईवी वाहन पार्किंग नियम')
  ).toBeVisible({ timeout: 10000 });
});