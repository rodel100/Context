import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet } from 'react-native';
import Main from './components/Navigation/Main';
import { Provider } from 'react-redux'
import store from "./Redux/reduxStore"
export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  )
}
