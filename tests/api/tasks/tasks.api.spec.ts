import { test, expect } from '@playwright/test';
import { ClickUpTasksApi } from '../../../services/clickup/tasks.api';
import { API } from '../../../constants/test-data';

test.describe.serial('Tasks API', () => {

  const listId = API.CLICKUP_LIST_ID!;

  test('As a user, I want to retrieve my tasks', async ({ request }) => {
    const api = new ClickUpTasksApi(request);
    const res = await api.getTasks(listId);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.tasks).toBeDefined();
    expect(Array.isArray(body.tasks)).toBeTruthy();
  });
});