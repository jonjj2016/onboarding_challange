import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '.auth/user.json');

setup('authenticate as alice', async ({ page }) => {
  await page.goto('/login');

  await expect(page.getByText('Sign in to Contently')).toBeVisible();

  await page.getByLabel('Email address').fill('alice.chen@contently.com');
  await page.getByRole('button', { name: 'Sign in' }).click();

  // Successful login redirects to /content — verify the heading is visible
  await page.waitForURL('**/content');
  await expect(page.getByRole('heading', { name: 'Content' })).toBeVisible();

  // Save the JWT cookie so subsequent specs skip login
  await page.context().storageState({ path: authFile });
});
