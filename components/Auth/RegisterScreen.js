import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

    const handleRegister = async () => {
      // Basic validation
      if (!name ||!email || !password) {
        Alert.alert('Please fill out all fields'); // makes sure everything is filled out
        return;
      }
  
      try {
        const response = await fetch('http://localhost:4000/register', { //contacts backend
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', //json required
          },
          body: JSON.stringify({ name, email, password }), //turns field values in a json to send
        });
  
        const data = await response.json(); //sends data to backend
  
        if (!response.ok) {
          throw new Error(data.msg || 'An unexpected error occurred');
        }
  
        // Check if the message indicates success
        if (data.msg === 'User registered successfully') { // literally checks to see if the returned msg variable from the json says this 
          // Navigate to the success screen
          navigation.navigate('Success');
        } else {
          // Handle unexpected responses
          setError(data.msg || 'An unexpected error occurred');
        }
      } catch (err) {
        setError(err.message);
      }
    };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Register an Account</Text>
      <View style={styles.inputContainer}>
      <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#ccc"
          value={name}
          onChangeText={setName}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#ccc"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#ccc"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <View><Text style={styles.title}>debug delete: name:{name}, email:{email}, password:{password}, error:{error}</Text></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#121212',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    color: '#FF6347',
    alignSelf: 'center',
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#FF6347',
    padding: 10,
    borderRadius: 8,
    color: '#fff',
    backgroundColor: '#1E1E1E',
  },
  button: {
    backgroundColor: '#FF6347',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 10,
    alignSelf: 'center',
  },
  linkText: {
    color: '#FF6347',
    fontSize: 16,
  },
});
