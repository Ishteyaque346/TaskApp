import { apiClient } from './client.js';

export const tasksAPI = {
  getTasks: async (filters = {}) => {
    const response = await apiClient.get('/tasks', { params: filters });
    return response.data;
  },
  createTask: async (data) => {
    const response = await apiClient.post('/tasks', data);
    return response.data;
  },
  updateTask: async (id, data) => {
    const response = await apiClient.put(`/tasks/${id}`, data);
    return response.data;
  },
  deleteTask: async (id) => {
    const response = await apiClient.delete(`/tasks/${id}`);
    return response.data;
  }
};

