import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

export default function SuccessScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.message}>Login Successful</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#121212',
  },
  message: {
    fontSize: 24,
    color: '#FF6347',
    textAlign: 'center',
  },
});
