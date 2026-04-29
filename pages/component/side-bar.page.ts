import { Page, Locator } from '@playwright/test';

export class SideBar {
  readonly page: Page;
  readonly homeTitle: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.homeTitle = page.locator('span.sidebar__title:has-text("Home")');
  }
}