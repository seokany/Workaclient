import React from 'react';
import { createStackNavigator, StackNavigationProp, StackHeaderProps } from '@react-navigation/stack';

import TopNavigation from './TopNavigation';
import Home from '../screens/Search/Home'
import Search from '../screens/Search/OnSearch';
import { ParamListBase } from '@react-navigation/core';

export type SearchStackParamList = {
    Home: { navigation: any };
    Search: undefined;
}

const Stack = createStackNavigator<SearchStackParamList>();

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
        <Stack.Navigator>
            <Stack.Screen name="Home" component={TopNavigation}
                options={{
                    animationEnabled: false,
                    header: ({ navigation }) => <Home navigation={navigation} />
                }} />
            <Stack.Screen name="Search" component={Search} options={{
                animationEnabled: false,
                headerShown: false,
            }} />
        </Stack.Navigator>
    );
}
