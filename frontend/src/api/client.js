import axios from 'axios';
import { tokenStorage } from '../utils/tokenStorage.js';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// ✅ Request Interceptor - Add token
apiClient.interceptors.request.use(
  (config) => {
    const token = tokenStorage.get();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor - Handle 401
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // If 401, token is invalid
    if (error.response?.status === 401) {
      tokenStorage.remove(); // Clear token
      window.location.href = '/login'; // Redirect to login
    }
    return Promise.reject(error);
  }
);