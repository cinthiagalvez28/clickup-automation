import { Page, Locator } from '@playwright/test';
import { ROUTES } from '../constants/TestData';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginBtn: Locator;
  readonly recaptcha: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="form__email-input"]');
    this.passwordInput = page.locator('[data-test="form__password-input"]');
    this.loginBtn = page.locator('[data-test="login-submit"]')
    this.recaptcha = page.locator('[class="recaptcha-checkbox-checkmark"]');
  }

  async goto() {
    await this.page.goto(ROUTES.BASE_URL+ROUTES.LOGIN);
  }

  async submitLoginForm(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginBtn.click();
  }
}