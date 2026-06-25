import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';

const THERAPISTS = [{ id: '1', name: 'Dr. Anita Desai' }, { id: '2', name: 'Dr. Rajesh Kumar' }];

export default function TherapyScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Book a Session</Text>
      <FlatList 
        data={THERAPISTS}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Book</Text></TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f9fafb' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  card: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, backgroundColor: '#fff', marginBottom: 10, borderRadius: 10 },
  name: { fontSize: 16, fontWeight: '600' },
  button: { backgroundColor: '#2b6cb0', padding: 8, borderRadius: 5 },
  buttonText: { color: '#fff' }
});