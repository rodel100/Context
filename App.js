import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SpeechtoTextComponent from './components/SpeechtoText/SpeechtoTextComponent';
import LoginScreen from './components/Auth/LoginScreen';
import SuccessScreen from './components/Auth/SuccessScreen';
import ForgotPasswordScreen from './components/Auth/ForgotPasswordScreen';
import RegisterScreen from './components/Auth/RegisterScreen';
import Messaging from './components/Messaging/Messaging'
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Translation from './components/Translation/Translation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation } from 'react-native-paper';
import Main from './components/Navigation/Main';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const BackButton = ({ navigation }) => (
  <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
    <Text style={styles.backButtonText}>Back</Text>
  </TouchableOpacity>
);
let IsLoggedIn = false;
export default function App() {
  return (<>
    <Main />
  </>
  )
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
