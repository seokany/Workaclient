import React from 'react';
import StyleSheet from 'react-native/'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import TabCard from '../screens/TabCreate/TabCard'
import TabLink from '../screens/TabCreate/TabLink'
import TabQuestion from '../screens/TabCreate/TabQuestion'




export type BottomCreateNavigationParamList = {
  TabLink: undefined;
  TabCard: undefined;
  TabQuestion: undefined;
}

const barStyle = {
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center"
}

const Tab = createBottomTabNavigator<BottomCreateNavigationParamList>();




export default function () {
  return (
    <Tab.Navigator tabBarOptions={{
      tabStyle: barStyle
    }}>
      <Tab.Screen name="TabCard" component={TabCard} />
      <Tab.Screen name="TabLink" component={TabLink} />
      <Tab.Screen name="TabQuestion" component={TabQuestion} />
    </Tab.Navigator>
  );
}

