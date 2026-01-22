import { apiClient } from './client.js';

export const authAPI = {
  register: async (data) => {
    const response = await apiClient.post('/auth/register', data);
    return response.data;
  },
  login: async (data) => {
    const response = await apiClient.post('/auth/login', data);
    return response.data;
  },
  logout: async () => {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  }
};