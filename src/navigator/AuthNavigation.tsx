import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Auth/Home';
import Signup from '../screens/Auth/Signup';
import Signin from '../screens/Auth/Signin';
import ForgotUsername from '../screens/Auth/ForgotUsername';
import ForgotPassword from '../screens/Auth/ForgotPassword';
import Tendency from '../screens/Tendency/Select'
// import FeedHome from '../screens/Feed/FeedHome'

export type AuthStackParamList = {
  Home: undefined;
  Signup: undefined;
  Signin: undefined;
  ForgotPassword: undefined;
  ForgotUsername: undefined;
  Tendency: undefined;
  // FeedHome: undefined;
}

const Stack = createStackNavigator<AuthStackParamList>();

const headerNone = {
  backgroundColor: '#fff',
  shadowColor: 'transparent',
  elevation: 0,
}

const titleStyle = {
  textAlign: 'center',
  fontSize: 24,
  color: '#35749F'
}

export default function () {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{
          headerStyle: headerNone,
          headerTitleAlign: 'center',
          headerTitle: 'CREATE ACCOUNT',
          headerTitleStyle: titleStyle,
        }} />
      <Stack.Screen name="Signin" component={Signin} options={{
        headerTitle: "",
        headerBackTitle: " ",
        headerStyle: {
          height: 50,
          backgroundColor: '#fff',
          shadowColor: 'transparent',
          elevation: 0,
        }
      }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{
        headerStyle: headerNone,
        headerTitleAlign: 'center',
        headerTitle: 'Forgot Password',
        headerTitleStyle: titleStyle
      }} />
      <Stack.Screen name="ForgotUsername" component={ForgotUsername} options={{
        headerStyle: headerNone,
        headerTitleAlign: 'center',
        headerTitle: 'Forgot Username',
        headerTitleStyle: titleStyle
      }} />
      <Stack.Screen name="Tendency" component={Tendency} options={{ headerShown: false }} />
      {/* <Stack.Screen name="FeedHome" component={FeedHome} options={{
        headerShown: false
        }} /> */}
    </Stack.Navigator>
  );
}
