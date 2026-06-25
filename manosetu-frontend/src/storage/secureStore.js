// src/storage/secureStore.js
import * as SecureStore from 'expo-secure-store';

const USER_ID_KEY = 'MANOSETU_ANON_USER_ID';

export const saveUserId = async (userId) => {
  try {
    await SecureStore.setItemAsync(USER_ID_KEY, userId);
    console.log('✅ User ID securely saved to device.');
  } catch (error) {
    console.error('❌ Error saving User ID:', error);
  }
};

export const getUserId = async () => {
  try {
    return await SecureStore.getItemAsync(USER_ID_KEY);
  } catch (error) {
    console.error('❌ Error retrieving User ID:', error);
    return null;
  }
};

export const deleteUserId = async () => {
  try {
    await SecureStore.deleteItemAsync(USER_ID_KEY);
    console.log('🗑️ User ID deleted (Session Wiped).');
  } catch (error) {
    console.error('❌ Error deleting User ID:', error);
  }
};

export const saveScreeningStatus = async (status) => {
  await SecureStore.setItemAsync('MANOSETU_IS_SCREENED', String(status));
};

export const getScreeningStatus = async () => {
  return await SecureStore.getItemAsync('MANOSETU_IS_SCREENED');
};