import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Profile from '../screens/Profile';
import Coin from '../screens/Coin';
import BottomCreateNavigation from './BottomCreateNavigation';
import SearchNavigation from './SeachNavigation';



export type BottomTapParamList = {
  Home: undefined;
  Create: undefined;
  Profile: undefined;
  Coin: undefined;
}



const Tab = createBottomTabNavigator<BottomTapParamList>();



export default function () {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
        component={SearchNavigation}
      />
      <Tab.Screen name="Create"
        options={{
          tabBarVisible: false,
          tabBarLabel: 'Create',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="eye-plus" color={color} size={size} />
          ),
        }}
        component={BottomCreateNavigation} />
      <Tab.Screen name="Profile"
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="face-profile" color={color} size={size} />
          ),

        }}
        component={Profile} />
      {/* <Tab.Screen name="Coin" component={Coin} /> */}
    </Tab.Navigator>
  );
}
