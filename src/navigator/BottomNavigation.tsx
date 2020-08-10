import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Profile from '../screens/Profile';
import Coin from '../screens/Coin';
import SeachNavigation from './SeachNavigation';
import BottomCreateNavigation from './BottomCreateNavigation';



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
      <Tab.Screen name="Home" component={SeachNavigation} />
      <Tab.Screen name="Create" component={BottomCreateNavigation} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Coin" component={Coin} />
    </Tab.Navigator>
  );
}

