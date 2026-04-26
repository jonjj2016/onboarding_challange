import { test, expect } from '@playwright/test';

// Sourdough bread — seeded with Zwilling (p1), Lodge (p3), Microplane (p7)
const CONTENT_ID = 'c0000000-0000-0000-0000-000000000001';
const EDIT_URL = `/content/edit/${CONTENT_ID}`;

test.describe('Content edit page', () => {
  test('loads existing content into all form fields', async ({ page }) => {
    await page.goto(EDIT_URL);
    await expect(page.getByLabel('Title')).not.toHaveValue('');
    await expect(
      page.getByText('Published').or(page.getByText('Draft')).or(page.getByText('Unpublished')),
    ).toBeVisible();
  });

  test('toolbar shows correct action buttons for current status', async ({ page }) => {
    await page.goto(EDIT_URL);
    await expect(page.getByRole('button', { name: 'Save' })).toBeVisible();
    const isPublished = await page
      .getByText('Published')
      .isVisible()
      .catch(() => false);
    if (isPublished) {
      await expect(page.getByRole('button', { name: 'Unpublish' })).toBeVisible();
    } else {
      await expect(page.getByRole('button', { name: 'Publish' })).toBeVisible();
    }
  });

  test('attaches 3 products in order, saves, reloads — order persists', async ({ page }) => {
    await page.goto(EDIT_URL);

    // Wait for existing seed chips to appear, then clear them
    await expect(page.locator('.MuiChip-root').first()).toBeVisible({ timeout: 10000 });

    let count = await page.locator('.MuiChip-deleteIcon').count();
    while (count > 0) {
      await page.locator('.MuiChip-deleteIcon').first().click();
      await page.waitForTimeout(200);
      count = await page.locator('.MuiChip-deleteIcon').count();
    }

    // Use products not in sourdough seed: KitchenAid (p2), Vitamix (p4), Instant Pot (p5)
    // pressSequentially triggers React's onInputChange correctly (fill can bypass it)
    const autocomplete = page.getByRole('combobox', { name: 'Products' });

    await autocomplete.click();
    await autocomplete.pressSequentially('KitchenAid', { delay: 50 });
    await page.waitForTimeout(500);
    await page
      .getByRole('option', { name: /KitchenAid/i })
      .first()
      .click();
    await expect(page.locator('.MuiChip-root', { hasText: /KitchenAid/i })).toBeVisible();

    await autocomplete.pressSequentially('Vitamix', { delay: 50 });
    await page.waitForTimeout(500);
    await page
      .getByRole('option', { name: /Vitamix/i })
      .first()
      .click();
    await expect(page.locator('.MuiChip-root', { hasText: /Vitamix/i })).toBeVisible();

    await autocomplete.pressSequentially('Instant Pot', { delay: 50 });
    await page.waitForTimeout(500);
    await page
      .getByRole('option', { name: /Instant Pot/i })
      .first()
      .click();
    await expect(page.locator('.MuiChip-root', { hasText: /Instant Pot/i })).toBeVisible();

    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Saved successfully')).toBeVisible();

    // Reload and verify order survived the DB round-trip
    await page.reload();
    await expect(page.locator('.MuiChip-root').first()).toBeVisible({ timeout: 10000 });

    const chipLabels = page.locator('.MuiChip-label');
    await expect(chipLabels.nth(0)).toContainText(/KitchenAid/i);
    await expect(chipLabels.nth(1)).toContainText(/Vitamix/i);
    await expect(chipLabels.nth(2)).toContainText(/Instant Pot/i);
  });

  test('unsaved changes guard shows modal when navigating away', async ({ page }) => {
    await page.goto(EDIT_URL);

    const titleInput = page.getByLabel('Title');
    await titleInput.click();
    await titleInput.press('End');
    await titleInput.type(' - edited');

    // exact: true — "Contently" logo also contains "Content"
    await page.getByRole('link', { name: 'Content', exact: true }).click();

    // Use heading role — strict mode: paragraph also contains "Unsaved changes"
    await expect(page.getByRole('heading', { name: 'Unsaved changes' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Stay' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Leave' })).toBeVisible();

    await page.getByRole('button', { name: 'Stay' }).click();
    await expect(page).toHaveURL(new RegExp(CONTENT_ID));
  });
});
