import React, { useState } from 'react'
import styled from 'styled-components/native';
import { StackNavigationProp } from '@react-navigation/stack'
import { useSelector, useDispatch } from 'react-redux'

import { SEARCH_REQUEST } from '../../state/Search/Action'
import { SearchStackParamList } from '../../navigator/SeachNavigation'

import OsView from '../../components/OsView';
import { RootState } from '../../reducers';
import { Text } from 'react-native';

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
    const [searchState, setSearchState] = useState({
        temp: '',
        searchE: 0,
    })
    const { temp, searchE } = searchState;

    const state = useSelector((state: RootState) => state);
    const dispatch = useDispatch();

    const token = state.login.token;
    const search = state.search

    const handleInput = (e: string): void => {
        clearTimeout(searchState.searchE);
        const searchE = setTimeout(() => {
            console.log("SEARCH!!", e);
            dispatch({ type: SEARCH_REQUEST, payload: { token, temp: e } })
        }, 600);

        setSearchState({
            temp: e,
            searchE: searchE
        })
    }

    return (
        <OsView style={{}}>
            <SearchWrapper>
                <InputWrapper>
                    <Input value={temp} onChangeText={handleInput} autoFocus={true} />
                </InputWrapper>
                <GoBackWrapper onPress={() => navigation.goBack()} >
                    <BackText> CANCEL</BackText>
                </GoBackWrapper>
            </SearchWrapper>
            <BodyWrapper>
                <Text>SEARCHED THE </Text>
            </BodyWrapper>
        </OsView>
    )
}
