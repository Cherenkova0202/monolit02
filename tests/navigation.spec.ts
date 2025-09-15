import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('should redirect to login when not authenticated', async ({ page }) => {
    await page.goto('/dashboard')
    await expect(page).toHaveURL('/login')
  })

  test('should display login page correctly', async ({ page }) => {
    await page.goto('/login')

    await expect(page.locator('h2')).toContainText('Корпоративный портал')
    await expect(page.locator('text=Войдите в систему')).toBeVisible()
  })

  test('should have responsive layout on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/login')

    const card = page.locator('.ant-card')
    await expect(card).toBeVisible()

    // Check that the card adjusts to mobile viewport
    const cardBox = await card.boundingBox()
    expect(cardBox?.width).toBeLessThan(400)
  })
})