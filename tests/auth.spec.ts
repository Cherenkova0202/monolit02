import { test, expect } from '@playwright/test'

test.describe('Authentication', () => {
  test('should display login form', async ({ page }) => {
    await page.goto('/login')

    await expect(page.locator('h2')).toContainText('Корпоративный портал')
    await expect(page.locator('input[placeholder="your@email.com"]')).toBeVisible()
    await expect(page.locator('input[placeholder="Пароль"]')).toBeVisible()
    await expect(page.locator('button:has-text("Войти")')).toBeVisible()
    await expect(page.locator('button:has-text("Войти через Google")')).toBeVisible()
  })

  test('should show validation errors for empty form', async ({ page }) => {
    await page.goto('/login')

    await page.locator('button:has-text("Войти")').click()

    await expect(page.locator('.ant-form-item-explain-error')).toContainText('Введите email')
  })

  test('should redirect to dashboard when authenticated', async ({ page }) => {
    // This is a placeholder test - in real implementation you would mock authentication
    await page.goto('/login')

    // Mock successful authentication would go here
    // For now, just check that the login page is accessible
    await expect(page.locator('h2')).toContainText('Корпоративный портал')
  })
})