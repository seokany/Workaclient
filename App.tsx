import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import {Provider} from 'react-redux';
import { ThemeProvider } from 'styled-components'

import store from './src/state/store';
import NavController from './src/components/NavController'
import theme from './src/style/theme'
import { View } from 'react-native';

export interface LoginInfo {
  token: string,
  pk : string,
  mbti : string,
}

export default function App() {
  const [token, setToken] = useState<string>('');

  const setLogin = async () => {
    const token = await AsyncStorage.getItem('token');
    // console.log(token)
    if(token) await setToken(token)
  }
  useEffect(() => {
    setLogin();
  }, []);
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme} >
        <NavigationContainer>
          <View style={{ width: "100%", height: "100%", backgroundColor: 'black', alignItems: 'center' }}>
            <View style={{ height: "100%", width: "100%", maxWidth: 800 }}>
              <NavController token={ token } />
            </View>
          </View>
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
}
