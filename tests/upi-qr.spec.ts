import { test, expect } from '@playwright/test';
import jsQR from 'jsqr';
import { PNG } from 'pngjs';

test('TC-025 UPI QR shows the bill amount', async ({ page }) => {
  const pin = process.env.COHO_PIN;
  if (!pin) throw new Error('COHO_PIN is missing from the .env file');

  await page.goto('/');
  await page.getByRole('button', { name: 'Owner / Member' }).click();
  await page.getByRole('textbox', { name: 'Enter 4-digit PIN' }).fill(pin);
  await page.getByRole('button', { name: 'Sign In as Resident' }).click();

  await page.getByRole('button', { name: 'Payments' }).click();
  await page.getByRole('button', { name: 'Pay via Razorpay (₹6,200)' }).click();
  await page.getByRole('button', { name: 'Show Society Direct UPI QR' }).click();

  await expect(page.locator('.p-3.bg-white svg').first()).toBeVisible();
  await expect(page.getByText('₹6,200').nth(4)).toBeVisible();
    // Screenshot the white box around the QR, then decode the picture
  const qrBox = page.locator('.p-3.bg-white').first();
  const image = await qrBox.screenshot();
  const png = PNG.sync.read(image);
  const decoded = jsQR(new Uint8ClampedArray(png.data), png.width, png.height);

  expect(decoded).not.toBeNull();
  expect(decoded?.data).toContain('upi://pay');
  expect(decoded?.data).toContain('am=6200');
});