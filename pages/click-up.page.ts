import { Page, Locator } from '@playwright/test';
import { ROUTES } from '../constants/test-data';

export class ClickUpPage {
  readonly page: Page;
  readonly logInBtn: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.logInBtn = page.getByRole('link', { name: 'Login' });
  }

  async goto() {
    await this.page.goto(ROUTES.BASE_URL)
  }
}