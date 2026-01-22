import { apiClient } from './client.js';

export const usersAPI = {
  getProfile: async () => {
    const response = await apiClient.get('/users/profile');
    return response.data;
  },
  updateProfile: async (data) => {
    const response = await apiClient.put('/users/profile', data);
    return response.data;
  }
};