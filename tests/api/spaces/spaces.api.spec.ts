import { test, expect } from '@playwright/test';
import { ClickUpSpacesApi } from '../../../services/clickup/spaces.api';
import { API } from '../../../constants/test-data';

test.describe.serial('Spaces API', () => {

  let spaceId: string;
  const teamId = API.CLICKUP_TEAM_ID!;

  test.afterAll(async ({ request }) => {
    if (!spaceId) return;
    const api = new ClickUpSpacesApi(request);
    try {
      await api.deleteSpace(spaceId);
    } catch (err) {
      console.warn('Failed to delete space:', err);
    }
  });

  test('As a user, I want to retrieve my spaces', async ({ request }) => {
    const api = new ClickUpSpacesApi(request);
    const res = await api.getSpaces(teamId);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.spaces).toBeDefined();
    expect(Array.isArray(body.spaces)).toBeTruthy();
  });

  test('As a user, I want to create a space', async ({ request }) => {
    const api = new ClickUpSpacesApi(request);
    const name = `Space-${Date.now()}`;
    const res = await api.createSpace(teamId, name);
    expect([200, 201]).toContain(res.status());
    const body = await res.json();
    spaceId = body.id;
    expect(body.name).toBe(name);
  });

  test('As a user, I want to retrieve a single space', async ({ request }) => {
    const api = new ClickUpSpacesApi(request);
    const res = await api.getSpace(spaceId);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.id).toBe(spaceId);
  });

  test('As a user, I want to delete a space', async ({ request }) => {
    const api = new ClickUpSpacesApi(request);
    const res = await api.deleteSpace(spaceId);
    expect([200, 204]).toContain(res.status());
    const verify = await api.getSpace(spaceId);
    expect(verify.status()).toBe(404);
  });
});