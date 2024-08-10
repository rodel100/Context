import React, {useEffect} from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

export default function SuccessScreen({ navigation }) {
  useEffect(() => {
    const timeAfterSuccess = setTimeout(() => {
      navigation.navigate('Messaging')}, 3000);

      return () => clearTimeout(timeAfterSuccess)
    }, [navigation]);
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
