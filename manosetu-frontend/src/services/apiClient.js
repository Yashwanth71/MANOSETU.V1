// src/services/apiClient.js
import axios from 'axios';

// CTO Note: Change this to your computer's IP address if testing on a physical phone!
const LOCAL_IP = '10.63.2.162'; // e.g., '192.168.1.5'
const BASE_URL = process.env.EXPO_PUBLIC_API_URL || `http://${LOCAL_IP}:8000/api/v1/assess`;

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10-second timeout (essential for waiting on Manas AI responses)
  headers: {
    'Content-Type': 'application/json',
  },
});

// GLOBAL RESPONSE INTERCEPTOR
apiClient.interceptors.response.use(
  (response) => {
    // Strip the axios wrapper and return just the pure data payload
    return response.data;
  },
  (error) => {
    // Centralized Error Logging
    if (!error.response) {
      console.error('🚨 Network Error: Check your connection or backend status.');
    } else {
      console.error(`🚨 API Error [${error.response.status}]:`, error.response.data);
    }
    return Promise.reject(error);
  }
);