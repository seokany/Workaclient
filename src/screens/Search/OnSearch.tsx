import React, { useState } from 'react'
import styled from 'styled-components/native';
import { StackNavigationProp } from '@react-navigation/stack'

import OsView from '../../components/OsView';
import { SearchStackParamList } from '../../navigator/SeachNavigation'

type AuthHomeNavigationProps = StackNavigationProp<SearchStackParamList, 'Search'>

type Props = {
    navigation: AuthHomeNavigationProps
}

const SearchWrapper = styled.View`
    width:100%
    justify-content: center;
    align-items : center;
    flex-direction : row;
    background-color : #FFFFFF
`;

const InputWrapper = styled.View`
    width:70%;
    height:34px;
    border:2px solid #88C3FC;
    border-radius:8000px;
    align-items:center;
    padding:0px 10px;
    flex-direction:row;
`;

const GoBackWrapper = styled.TouchableOpacity`
    background-color:black;
`;

const BackText = styled.Text``;

const Input = styled.TextInput``;

const BodyWrapper = styled.View`
    background-color:white;
    height:100%;
`;


export default function ({ navigation }: Props) {
    const [value, setValue] = useState('');
    const handleInput = (e: string): void => {
        setValue(e);
    }

    return (
        <OsView style={{}}>
            <SearchWrapper>
                <InputWrapper>
                    <Input value={value} onChangeText={handleInput} autoFocus={true} />
                </InputWrapper>
                <GoBackWrapper onPress={() => navigation.goBack()} >
                    <BackText> CANCEL</BackText>
                </GoBackWrapper>
            </SearchWrapper>
            <BodyWrapper>
            </BodyWrapper>
        </OsView>
    )
}
