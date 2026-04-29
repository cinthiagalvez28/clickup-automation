import fs from 'fs';
import path from 'path';
import { test as setup, chromium } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { BoardPage } from '../pages/board.page';
import { USERS, DEFAULT_TIMEOUT } from '../constants/test-data';

const authPath = path.resolve('./auth/auth.json');

setup('auth setup', async () => {

  if (fs.existsSync(authPath)) {
    console.log('auth.json ya existe, reutilizando...');

    const browser = await chromium.launch({ headless: true, slowMo: 1000 });
    const context = await browser.newContext({ storageState: authPath });
    const page = await context.newPage();

    try {
      const boardPage = new BoardPage(page);
      await boardPage.goto();
      
      await boardPage.sideBar.homeTitle.waitFor({ state: 'attached' });
      const visible = await boardPage.sideBar.homeTitle.isVisible({
        timeout: DEFAULT_TIMEOUT,
      });

      if (visible) {
        console.log('Sesión válida, no se regenera auth');
        await browser.close();
        return;
      }

      console.log('Sesión expirada, regenerando...');
    } catch {
      console.log('Auth inválido, regenerando...');
    }

    await browser.close();
  }

  console.log('Creando nueva sesión...');

  const browser = await chromium.launch({ headless: true, slowMo: 1000 });
  const page = await browser.newPage();

  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.submitLoginForm(USERS.USERNAME, USERS.PASSWORD);

  const boardPage = new BoardPage(page);
  await boardPage.sideBar.homeTitle.waitFor({ state: 'attached' });

  await page.context().storageState({ path: authPath });

  await browser.close();

  console.log('auth.json generado');
});