import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 8000
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    // Backend expects the admin token in a custom header.
    config.headers['X-Admin-Token'] = token;
  }
  return config;
});

export default api;
