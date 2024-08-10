import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SpeechtoTextComponent from '../SpeechtoText/SpeechtoTextComponent';
import LoginScreen from '../Auth/LoginScreen';
import SuccessScreen from '../Auth/SuccessScreen';
import ForgotPasswordScreen from '../Auth/ForgotPasswordScreen';
import RegisterScreen from '../Auth/RegisterScreen';
import Messaging from '../Messaging/Messaging'
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Translation from '../Translation/Translation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux'


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const BackButton = ({ navigation }) => (
    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
    </TouchableOpacity>
);

export default function Main() {
    const LoginState = useSelector(state => state.isLoggedIn.value);
    return (
        <NavigationContainer>
            {LoginState ? (<>
                <Stack.Navigator initialRouteName='Login'>
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
                        })} />
                </Stack.Navigator>
            </>
            ) : (
                <>
                    <Tab.Navigator>
                        <Tab.Screen
                            name="Messaging"
                            component={Messaging}
                            options={{
                                tabBarLabel: 'Home',
                                tabBarIcon: ({ color, size }) => {
                                    return <Icon name="home" size={size} color={color} />;
                                },
                            }}
                        />
                        <Tab.Screen
                            name="Translation"
                            component={Translation}
                            options={{
                                tabBarLabel: 'Translation',
                                tabBarIcon: ({ color, size }) => {
                                    return <Icon name="ab-testing" size={size} color={color} />;
                                },
                            }}
                        />
                    </Tab.Navigator>
                </>
            )}
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