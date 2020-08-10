import React from 'react';

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

export default function () {
  return (
    <Tab.Navigator>
      <Tab.Screen name="News" component={NewsFeed} />
      <Tab.Screen name="Questions" component={QuestionFeed} />
      <Tab.Screen name="Populars" component={PopularFeed} />
    </Tab.Navigator>
  );
}
