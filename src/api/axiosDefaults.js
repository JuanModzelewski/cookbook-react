import axios from 'axios';
import { removeTokenTimestamp, setTokenTimestamp, shouldRefreshToken } from '../utils/utils';

axios.defaults.baseURL = 'https://cookbook-drf-api-f6a1e9bf2c65.herokuapp.com/';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();

// Request Interceptor
axiosReq.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('authToken');
    console.log('Request Interceptor - Auth Token:', token); // Log the access token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosRes.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry && shouldRefreshToken()) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        console.log('Response Interceptor - Refresh Token:', refreshToken); // Log the refresh token
        const { data } = await axios.post('https://cookbook-drf-api-7cc2409bcdd9.herokuapp.com/dj-rest-auth/token/refresh/', { refresh: refreshToken });
        console.log('Response Interceptor - New Auth Token:', data.access); // Log the new access token
        localStorage.setItem('authToken', data.access);
        localStorage.setItem('refreshToken', data.refresh);
        setTokenTimestamp(data);
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
        originalRequest.headers['Authorization'] = `Bearer ${data.access}`;
        return axios(originalRequest);
      } catch (err) {
        console.error('Error refreshing token:', err);
        removeTokenTimestamp();
        // Handle sign out or redirect to sign-in page
      }
    }
    return Promise.reject(error);
  }
);