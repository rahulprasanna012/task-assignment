const API_BASE_URL = 'http://localhost:5000/api';

class TaskService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    };

    if (config.body) {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async getAllTasks(queryParams = '') {
    const endpoint = `/tasks${queryParams ? `?${queryParams}` : ''}`;
    return this.request(endpoint);
  }

  async createTask(taskData) {
    return this.request('/tasks', {
      method: 'POST',
      body: taskData,
    });
  }

  async updateTask(taskId, updates) {
    return this.request(`/tasks/${taskId}`, {
      method: 'PATCH',
      body: updates,
    });
  }

  async getInsights() {
    return this.request('/tasks/insights/summary');
  }
}

export const taskService = new TaskService();