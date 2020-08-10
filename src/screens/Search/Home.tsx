import React, { useState } from 'react'
import styled from 'styled-components/native';
import OsView from '../../components/OsView'
import { StatusBar, Platform, TouchableWithoutFeedback } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack'

import { SearchStackParamList } from '../../navigator/SeachNavigation'

type AuthHomeNavigationProps = StackNavigationProp<SearchStackParamList, 'Home'>

type Props = {
    navigation: AuthHomeNavigationProps
}


const InputWrapper = styled.View`
    width:70%;
    height:34px;
    border:2px solid #88C3FC;
    border-radius:8000px;
    align-items:center;
    padding:0px 10px;
    flex-direction:row;
`;

const InputImage = styled.Image`
    width:16.78px;
    height:20.68px;
    margin-right:5px;
    background-color:white;
`;

const Input = styled.View`
    flex:1;
`;

const SearchWrapper = styled.ScrollView`
    z-index:3;
    width:100%;
    height:100px;
    background-color:white;
`;


export default function ({ navigation }: Props) {
    return (
        <OsView style={{ width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Search')} style={{ backgroundColor: 'black' }}>
                <InputWrapper>
                    <InputImage source={require('../../../assets/search_btn.png')} />
                    <Input />
                </InputWrapper>
            </TouchableWithoutFeedback>
        </OsView>
    )
}

// export default function ({ navigation }: Props) {
//     return (
//         <TouchableWithoutFeedback onPress={() => navigation.navigate('Search')}>
//             {Platform.OS === 'ios' ? (<IosWrapper><Search /></IosWrapper>) : <AndoroidWrapper><Search /></AndoroidWrapper>}
//         </TouchableWithoutFeedback>
//     )
// }
