import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { getUserId } from '../storage/secureStore';
import { getScreeningStatus, saveScreeningStatus } from '../storage/secureStore';
import { apiClient } from '../services/apiClient';
import ScreeningModal from '../components/ScreeningModal';

export default function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const [showScreening, setShowScreening] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    async function checkStatus() {
      const id = await getUserId();
      const isScreened = await getScreeningStatus();
      setUserId(id);

      // If user hasn't screened, block the home view
      if (isScreened !== 'true') {
        setShowScreening(true);
      }
      setLoading(false);
    }
    checkStatus();
  }, []);

  const handleScreeningComplete = async (answers) => {
    try {
      setLoading(true);
      // 1. Submit answers to your FastAPI backend
      await apiClient.post('/assess/submit', { 
        user_id: userId,
        answers: answers 
      });

      // 2. Persist status locally
      await saveScreeningStatus('true');
      
      // 3. Close modal
      setShowScreening(false);
      setLoading(false);
    } catch (error) {
      console.error("Critical Assessment Submission Error:", error);
      // Keep modal open or show error alert
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}><ActivityIndicator size="large" /></View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScreeningModal 
        visible={showScreening} 
        onComplete={handleScreeningComplete} 
      />
      
      <View style={styles.content}>
        <Text style={styles.title}>Your ManoSetu Dashboard</Text>
        <Text style={styles.text}>Welcome back, {userId ? userId.slice(0, 8) : 'User'}.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7fafc' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  content: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#2d3748' },
  text: { fontSize: 16, color: '#4a5568' }
});