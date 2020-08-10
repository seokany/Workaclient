import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';



import NewsFeed from '../screens/Feed/FeedHome'
import QuestionFeed from '../screens/Feed/QuestionFeed/QuestionFeed'
import PopularFeed from '../screens/Feed/PopularFeed/PopularFeed'

export type TopTapParamList = {
  News: undefined;
  Questions: undefined;
  Populars: undefined;
}

const Tab = createMaterialTopTabNavigator<TopTapParamList>();

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default function () {
  return (
    <Tab.Navigator>
      <Tab.Screen name="News" component={NewsFeed} />
      <Tab.Screen name="Questions" component={QuestionFeed} />
      <Tab.Screen name="Populars" component={PopularFeed} />
    </Tab.Navigator>
  );
}
