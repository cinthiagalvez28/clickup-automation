import { test, expect } from '@playwright/test';
import { BoardPage } from '../../../pages/BoardPage';

test.describe('Visual - Boards Page', () => {

  test('Boards page should match visual baseline', async ({ page }) => {
    const boardPage = new BoardPage(page);
    await boardPage.goto();
    await boardPage.sideBar.homeTitle.waitFor({ state: 'attached' });
    await expect(boardPage.sideBar.homeTitle).toBeVisible();
    await boardPage.boardBtn.click();
    await boardPage.waitForStableBoards();
    await expect(page).toHaveScreenshot('boards.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });
});