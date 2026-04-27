import { APIRequestContext, APIResponse } from '@playwright/test';

export class ClickUpTasksApi {
  constructor(private request: APIRequestContext) {}

  private get baseUrl() {
    const url = process.env.CLICKUP_API_BASE_URL;
    if (!url) throw new Error('Missing CLICKUP_API_BASE_URL');
    return url;
  }

  private get headers() {
    return {
      Authorization: process.env.CLICKUP_TOKEN!,
    };
  }

  async getTasks(listId: string): Promise<APIResponse> {
    return this.request.get(`${this.baseUrl}/list/${listId}/task`, {
      headers: this.headers,
    });
  }

  async deleteTask(taskId: string): Promise<APIResponse> {
    const res = await this.request.delete(
      `${this.baseUrl}/task/${taskId}`,
      {
        headers: this.headers,
      }
    );

    if (![200, 204].includes(res.status())) {
      throw new Error(
        `Failed to delete task ${taskId}. Status: ${res.status()}`
      );
    }
    return res;
  }
}