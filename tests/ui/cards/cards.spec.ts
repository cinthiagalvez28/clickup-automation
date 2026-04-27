import { test, expect } from '@playwright/test';
import { BoardPage } from '../../../pages/BoardPage';
import { ClickUpTasksApi } from '../../../services/clickup/tasks.api';

test.describe('Cards\' tests', () => {
  let taskId: string | undefined;

  test.afterEach(async ({ request }) => {
    if (!taskId) return;
    try {
      const tasksApi = new ClickUpTasksApi(request);
      const response = await tasksApi.deleteTask(taskId);

      if (![200, 204].includes(response.status())) {
        console.warn(`Task cleanup failed: ${taskId}, status: ${response.status()}`);
      }
    } catch (e) {
      console.warn(`Task cleanup error: ${taskId}`, e);
    } finally {
      taskId = undefined;
    }
  });

  test('As a user, I want to add a new card to the To Do list', async ({ page }) => {
    const boardPage = new BoardPage(page);
    await boardPage.goto();
    await boardPage.sideBar.homeTitle.waitFor({ state: 'attached' });
    await expect(boardPage.sideBar.homeTitle).toBeVisible();
    await boardPage.boardBtn.click();
    await boardPage.waitForStableBoards();
    const taskName = `Test-${Date.now()}`;
    taskId = await boardPage.createTaskAndGetId('To Do', taskName);
    await expect(await boardPage.getTask('To Do', taskName)).toBeVisible();
  });

  test('As a user, I want to add a new card to the In Progress list', async ({ page }) => {
    const boardPage = new BoardPage(page);

    await test.step('Navigate to board page', async () => {
      await boardPage.goto();
    });

    await test.step('Select the board mode', async () => {
      await boardPage.sideBar.homeTitle.waitFor({ state: 'attached' });
      await boardPage.boardBtn.click();
      await boardPage.waitForStableBoards();
    });

    await test.step('Create task in In Progress', async () => {
      const taskName = `Test-${Date.now()}`;
      taskId = await boardPage.createTaskAndGetId('In Progress', taskName);
      await expect(await boardPage.getTask('In Progress', taskName)).toBeVisible();
    });
  });
});
