import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

const questions = [
  { id: 'phq1', text: "Over the past 2 weeks, how often have you been bothered by: Little interest or pleasure in doing things?", type: 'phq' },
  { id: 'phq2', text: "Over the past 2 weeks, how often have you been bothered by: Feeling down, depressed, or hopeless?", type: 'phq' },
  { id: 'gad1', text: "Over the past 2 weeks, how often have you been bothered by: Feeling nervous, anxious, or on edge?", type: 'gad' },
  { id: 'gad2', text: "Over the past 2 weeks, how often have you been bothered by: Not being able to stop or control worrying?", type: 'gad' }
];

const options = [
  { label: 'Not at all', value: 0 },
  { label: 'Several days', value: 1 },
  { label: 'More than half the days', value: 2 },
  { label: 'Nearly every day', value: 3 },
];

export default function ScreeningModal({ visible, onComplete }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleSelect = (value) => {
    const currentQuestion = questions[currentIdx];
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      // Completed, push the full object to parent
      onComplete(newAnswers);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.progress}>Step {currentIdx + 1} of {questions.length}</Text>
          <Text style={styles.title}>Mental Health Check</Text>
        </View>

        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{questions[currentIdx].text}</Text>
        </View>

        <View style={styles.optionsContainer}>
          {options.map((opt) => (
            <TouchableOpacity 
              key={opt.value} 
              style={styles.optionButton} 
              onPress={() => handleSelect(opt.value)}
            >
              <Text style={styles.optionText}>{opt.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff', padding: 20 },
  header: { marginBottom: 40 },
  progress: { fontSize: 12, color: '#a0aec0', fontWeight: 'bold', textTransform: 'uppercase' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#2d3748' },
  questionContainer: { marginBottom: 30 },
  questionText: { fontSize: 20, color: '#4a5568', lineHeight: 28 },
  optionsContainer: { flex: 1 },
  optionButton: { padding: 18, backgroundColor: '#f7fafc', borderRadius: 8, marginBottom: 12, borderWidth: 1, borderColor: '#edf2f7' },
  optionText: { fontSize: 16, color: '#2d3748' }
});