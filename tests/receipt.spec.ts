import { test, expect } from '@playwright/test';


test('TC-029 Receipt is being downloaded', async ({ page }) => {
    const pin = process.env.COHO_PIN;
    if (!pin) throw  new Error("COHO_PIN is missing from the env file")
  await page.goto('/');
  await page.getByRole('button', { name: 'Owner / Member' }).click();
  await page.getByRole('textbox', { name: 'Enter 4-digit PIN' }).click();
  await page.getByRole('textbox', { name: 'Enter 4-digit PIN' }).fill(pin);

  await page.getByRole('button', { name: 'Sign In as Resident' }).click();
  await page.getByRole('button', { name: 'Payments' }).click();
  await page.getByRole('button', { name: 'History & Receipts' }).click();

  await page.getByRole('button', { name: 'Receipt', exact: true }).click();
  await page.getByRole('button', { name: 'Download PDF / Print' }).click();
 
});