import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';

const ROOMS = [{ id: '1', name: 'Stress Relief' }, { id: '2', name: 'Academic Anxiety' }];

export default function CommunityScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Community Rooms</Text>
      <FlatList 
        data={ROOMS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f9fafb' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  card: { padding: 20, backgroundColor: '#fff', borderRadius: 10, marginBottom: 10, elevation: 2 }
});