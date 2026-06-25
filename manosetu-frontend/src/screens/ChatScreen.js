import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, FlatList } from 'react-native';

export default function ChatScreen() {
  const [messages, setMessages] = useState([{ id: '1', text: 'Hello! I am Manas. How are you feeling today?', sender: 'ai' }]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList 
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.bubble, item.sender === 'ai' ? styles.aiBubble : styles.userBubble]}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        contentContainerStyle={styles.chatList}
      />
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Type your message..." />
        <TouchableOpacity style={styles.sendButton}><Text style={styles.sendText}>Send</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  chatList: { padding: 20 },
  bubble: { padding: 15, borderRadius: 20, marginBottom: 10, maxWidth: '80%' },
  aiBubble: { backgroundColor: '#e2e8f0', alignSelf: 'flex-start' },
  userBubble: { backgroundColor: '#2b6cb0', alignSelf: 'flex-end' },
  messageText: { color: '#2d3748' },
  inputContainer: { flexDirection: 'row', padding: 10, backgroundColor: '#fff', borderTopWidth: 1, borderColor: '#e2e8f0' },
  input: { flex: 1, padding: 10, borderWidth: 1, borderColor: '#cbd5e0', borderRadius: 20, marginRight: 10 },
  sendButton: { backgroundColor: '#2b6cb0', padding: 10, borderRadius: 20 },
  sendText: { color: '#fff' }
});