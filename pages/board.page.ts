import { Page, Locator } from '@playwright/test';
import { SideBar } from './component/side-bar.page'
import { ROUTES } from '../constants/test-data';

export class BoardPage {
  readonly page: Page;
  readonly sideBar: SideBar;
  readonly boardBtn: Locator;
  readonly addTaskBtn: Locator;
  readonly columnsHeader: Locator;
  readonly taskNameInput: Locator;
  readonly saveBtn: Locator;
  readonly columnContent: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.sideBar = new SideBar(page)
    this.boardBtn = page.locator('[data-test="data-view-item__Board"]');
    this.columnsHeader = page.locator('[class="cu-status-group-header__label"]');
    this.columnContent = page.locator('[class="board-group__viewport-inner"]');
    this.addTaskBtn = page.locator('[data-test="board-group__create-task-button__Add Task"]');
    this.taskNameInput = page.locator('[data-test="quick-create-task-panel__panel-board__input"]')
    this.saveBtn = page.locator('[data-test="quick-create-task-panel__panel-board__enter-button"]')
  }

  async goto() {
    await this.page.goto(ROUTES.BASE_URL+ROUTES.BOARD_PAGE);
  }

  async clickAddTask(columnName: string) {
    this.waitForStableBoards();
    const index = await this.getColumnIndex(columnName);
    await this.addTaskBtn.nth(index).click();
  }

  async getTask(columnName: string, taskName: string): Promise<Locator> {
    this.waitForStableBoards();
    const index = await this.getColumnIndex(columnName);
    return this.columnContent
      .nth(index)
      .locator('[class="board-task__name-link"]', {
        hasText: taskName,
      });
  }

  async getColumnIndex(columnName: string): Promise<number> {
    this.waitForStableBoards();
    const column = this.columnsHeader.filter({
      hasText: columnName,
    });
    const count = await column.count();
    if (count === 0) {
      throw new Error(`Column "${columnName}" not found`);
    }

    return this.columnsHeader.evaluateAll((els, name) => {
      return els.findIndex(el =>
        el.textContent?.trim().toLowerCase().includes(name.toLowerCase())
      );
    }, columnName);
  }

  async createTaskAndGetId(columnName: string, taskName: string): Promise<string> {
    this.waitForStableBoards();
    await this.columnsHeader.first().waitFor({ state: 'visible' });

    await this.clickAddTask(columnName);
    await this.taskNameInput.fill(taskName);
    await this.saveBtn.click();

    const responsePromise = this.page.waitForResponse(resp =>
      resp.url().includes('/tasks/v1/subcategory/') &&
      resp.url().includes('/task') &&
      resp.request().method() === 'POST'
    );

    const response = await responsePromise;
    const body = await response.json();

    return body.id;
  }

  async waitForStableBoards() {
    await this.page.waitForLoadState('load');
    await this.columnsHeader.first().waitFor({ timeout: 15000 });
    await this.columnsHeader.first().waitFor({ state: 'visible' });
    await this.addTaskBtn.first().waitFor();
  }
}