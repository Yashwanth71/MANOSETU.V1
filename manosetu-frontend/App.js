import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import our Domain Services
import { getUserId } from './src/storage/secureStore';
import { AuthService } from './src/services/authService';

// Import our foundational Screen
import HomeScreen from './src/screens/HomeScreen';
import ChatScreen from './src/screens/ChatScreen';
import CommunityScreen from './src/screens/CommunityScreen';
import TherapyScreen from './src/screens/TherapyScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function bootSequence() {
      try {
        // 1. Check for an existing session in the device's secure enclave
        const existingUserId = await getUserId();

        if (existingUserId) {
          console.log('✅ Session found in memory:', existingUserId);
          setIsAuthenticated(true);
        } else {
          console.log('⚠️ No session found. Reaching out to FastAPI backend...');
          // 2. No session? Silently ping the backend to generate one
          await AuthService.initializeAnonymousSession();
          console.log('✅ New anonymous session created and saved.');
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('🚨 Critical Boot Error. Is your FastAPI server running?', error);
        // In a production environment, we would render a "Network Retry" button here
      } finally {
        // 3. Drop the splash screen and render the app
        setIsBooting(false);
      }
    }

    bootSequence();
  }, []);

  // Show a loading screen while we verify identity with the backend
  if (isBooting) {
    return (
      <View style={styles.splashContainer}>
        <ActivityIndicator size="large" color="#2b6cb0" />
        <Text style={styles.splashText}>ManoSetu is waking up...</Text>
      </View>
    );
  }

  // Once identity is confirmed, render the main Navigation Mesh
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Manas AI" component={ChatScreen} />
        <Tab.Screen name="Community" component={CommunityScreen} />
        <Tab.Screen name="Therapy" component={TherapyScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7fafc',
  },
  splashText: {
    marginTop: 20,
    fontSize: 16,
    color: '#4a5568',
    fontWeight: '500',
  }
});