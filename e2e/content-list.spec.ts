import { expect, test } from '@playwright/test';

test.describe('Content list page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/content');
    await expect(page.getByRole('heading', { name: 'Content' })).toBeVisible();
  });

  test('shows content cards for the active site', async ({ page }) => {
    const cards = page.locator('.MuiCard-root');
    await expect(cards.first()).toBeVisible();
  });

  test('search filters cards and persists in URL', async ({ page }) => {
    const searchInput = page.getByLabel('Search');
    await searchInput.fill('Sourdough');

    // Wait for debounce + query
    await page.waitForTimeout(600);
    await expect(page).toHaveURL(/search=Sourdough/);

    // Refresh — filter must survive
    await page.reload();
    await expect(searchInput).toHaveValue('Sourdough');
    await expect(page).toHaveURL(/search=Sourdough/);
  });

  // test('status filter updates URL and scopes results', async ({ page }) => {
  //   // MUI Select trigger has class .MuiSelect-select — more reliable than aria attrs
  //   // Find the FormControl whose label reads "Status" — avoids colliding with the nav site switcher
  //   const statusSelect = page
  //     .locator('.MuiFormControl-root')
  //     .filter({ has: page.locator('label', { hasText: /^Status$/ }) })
  //     .locator('.MuiSelect-select');
  //   await expect(statusSelect).toBeVisible();
  //   await statusSelect.click();

  //   await page.getByRole('option', { name: 'Published' }).click();

  //   await page.waitForTimeout(300);
  //   await expect(page).toHaveURL(/status=3/);

  //   await page.reload();
  //   await expect(page).toHaveURL(/status=3/);
  // });

  test('pagination changes page param in URL', async ({ page }) => {
    const hasSecondPage = await page
      .getByRole('button', { name: '2' })
      .isVisible()
      .catch(() => false);
    if (!hasSecondPage) {
      test.skip();
      return;
    }
    await page.getByRole('button', { name: '2' }).click();
    await expect(page).toHaveURL(/page=2/);
  });

  test('clicking a content card navigates to edit page', async ({ page }) => {
    await page.locator('.MuiCard-root').first().click();
    await expect(page).toHaveURL(/\/content\/edit\/.+/);
  });
});
