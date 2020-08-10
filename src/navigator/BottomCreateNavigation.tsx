import React from 'react';
import StyleSheet from 'react-native/'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';


import TabCard from '../screens/TabCreate/TabCard'
import TabLink from '../screens/TabCreate/TabLink'
import TabQuestion from '../screens/TabCreate/TabQuestion'




export type BottomCreateNavigationParamList = {
  TabLink: undefined;
  TabCard: undefined;
  TabQuestion: undefined;
}

const Tab = createBottomTabNavigator<BottomCreateNavigationParamList>();




export default function () {
  return (
    <Tab.Navigator
      tabBarOptions={{
        tabStyle: {
          justifyContent: 'center',
          alignItems: 'center',
        }
      }}>
      <Tab.Screen name="TabCard"
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="camera-plus-outline" color={color} size={size} />
          ),
        }}
        component={TabCard}
      />
      {/* <Tab.Screen name="TabLink" 
        options={{
            tabBarLabel: '',
            tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="link-plus" color={color} size={size} />
            ),
          }}
      component={TabLink} /> */}
      <Tab.Screen name="TabQuestion"
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="comment-question-outline" color={color} size={size} />
          ),
        }}
        component={TabQuestion} />
    </Tab.Navigator>
  );
}

