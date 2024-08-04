import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import SuccessScreen from './SuccessScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import RegisterScreen from './RegisterScreen';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Stack = createStackNavigator();

const BackButton = ({ navigation }) => (
  <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
    <Text style={styles.backButtonText}>Back</Text>
  </TouchableOpacity>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Success"
          component={SuccessScreen}
          options={({ navigation }) => ({
            headerLeft: () => <BackButton navigation={navigation} />,
            headerStyle: { backgroundColor: '#121212' },
            headerTintColor: '#FF6347',
            headerTitleStyle: { fontWeight: 'bold' },
            title: 'Success'
          })}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={({ navigation }) => ({
            headerLeft: () => <BackButton navigation={navigation} />,
            headerStyle: { backgroundColor: '#121212' },
            headerTintColor: '#FF6347',
            headerTitleStyle: { fontWeight: 'bold' },
            title: 'Forgot Password'
          })}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={({ navigation }) => ({
            headerLeft: () => <BackButton navigation={navigation} />,
            headerStyle: { backgroundColor: '#121212' },
            headerTintColor: '#FF6347',
            headerTitleStyle: { fontWeight: 'bold' },
            title: 'Register'
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  backButton: {
    marginLeft: 10,
  },
  backButtonText: {
    color: '#FF6347',
    fontSize: 18,
  },
});
