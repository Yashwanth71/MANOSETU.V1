// src/services/authService.js
import { apiClient } from './apiClient';
import { saveUserId } from '../storage/secureStore';
import * as Application from 'expo-application';
import { Platform } from 'react-native';

export const AuthService = {
  /**
   * Generates a stateless anonymous session and saves the UUID to the device.
   */
  initializeAnonymousSession: async () => {
    try {
      // Get a unique hardware identifier based on OS
      const deviceId = Platform.OS === 'ios' 
        ? await Application.getIosIdForVendorAsync()
        : Application.getAndroidId();

      // Hit our FastAPI backend
      const response = await apiClient.post('/auth/anonymous', {
        device_id_raw: deviceId || 'UNKNOWN_DEVICE_ID',
        org_code: 'DEFAULT' // Hardcoded for MVP, can be dynamic later
      });
      
      // If successful, persist the UUID to local secure storage
      if (response.status === 'success' && response.user_id) {
        await saveUserId(response.user_id);
        return response.user_id;
      } else {
        throw new Error('Invalid response from auth server');
      }
    } catch (error) {
      console.error('AuthService Error:', error);
      throw error;
    }
  }
};