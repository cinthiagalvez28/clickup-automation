import { APIRequestContext, APIResponse } from '@playwright/test';
import { API } from '../../constants/test-data';

export class ClickUpSpacesApi {
  constructor(private request: APIRequestContext) {}

  private get baseUrl() {
    const url = API.CLICKUP_API_BASE_URL;
    if (!url) throw new Error('Missing CLICKUP_API_BASE_URL');
    return url;
  }

  private get headers() {
    return {
      Authorization: API.CLICKUP_TOKEN!,
    };
  }

  async getSpaces(teamId: string): Promise<APIResponse> {
    return this.request.get(`${this.baseUrl}/team/${teamId}/space`, {
      headers: this.headers,
    });
  }

  async getSpace(spaceId: string): Promise<APIResponse> {
    return this.request.get(`${this.baseUrl}/space/${spaceId}`, {
      headers: this.headers,
    });
  }

  async createSpace(teamId: string, name: string): Promise<APIResponse> {
    const res = await this.request.post(
      `${this.baseUrl}/team/${teamId}/space`,
      {
        headers: this.headers,
        data: {
          name,
        },
      }
    );

    if (![200, 201].includes(res.status())) {
      throw new Error(
        `Failed to create space. Status: ${res.status()}`
      );
    }

    return res;
  }

  async deleteSpace(spaceId: string): Promise<APIResponse> {
    const res = await this.request.delete(
      `${this.baseUrl}/space/${spaceId}`,
      {
        headers: this.headers,
      }
    );

    if (![200, 204].includes(res.status())) {
      throw new Error(
        `Failed to delete space ${spaceId}. Status: ${res.status()}`
      );
    }

    return res;
  }
}