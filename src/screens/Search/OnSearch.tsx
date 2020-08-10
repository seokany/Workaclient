import React, { useState } from 'react'
import { Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { StackNavigationProp } from '@react-navigation/stack'
import { useSelector, useDispatch } from 'react-redux'

import { SEARCH_REQUEST } from '../../state/Search/Action'
import { SearchStackParamList } from '../../navigator/SeachNavigation'

import OsView from '../../components/OsView';
import { RootState } from '../../reducers';
import { FlatList } from 'react-native-gesture-handler';
import { Feeds } from '../../state/Feed/Action';
import MentoCard from '../../components/MentoCard';
import DetailModal from '../../components/DetailModal';
type AuthHomeNavigationProps = StackNavigationProp<SearchStackParamList, 'Search'>

type Props = {
    navigation: AuthHomeNavigationProps
}

const SearchWrapper = styled.View`
    width:100%;
    height:34px;
    justify-content: center;
    align-items : center;
    flex-direction : row;
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

const GoBackWrapper = styled.TouchableOpacity``;

const BackText = styled.Text``;

const Input = styled.TextInput``;

const BodyWrapper = styled.View`
    height:100%;
    background-color:white;
`;

const PaddingHeight = styled.View`
    padding:10px 0px;
`;

export default function ({ navigation }: Props) {
    const state = useSelector((state: RootState) => state);
    const dispatch = useDispatch();
    const token = state.login.token;
    const search = state.search
    const feed = state.feed;

    const [searchState, setSearchState] = useState({
        temp: '',
        searchE: 0,
    })
    const [storage, setStorage] = useState<Feeds>(feed.data[0]);
    const [modal, setModal] = useState<boolean>(false);
    const { temp, searchE } = searchState;


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

    const feedDetail = (item: Feeds) => {
        setStorage({
            ...item
        })
        setModal(true);
    }

    const handleClose = () => {
        setModal(false);
    }

    return (
        <OsView>
            <SearchWrapper>
                <InputWrapper>
                    <Input value={temp} onChangeText={handleInput} autoFocus={true} autoCapitalize='none' />
                </InputWrapper>
                <GoBackWrapper onPress={() => navigation.goBack()} >
                    <BackText> CANCEL</BackText>
                </GoBackWrapper>
            </SearchWrapper>
            <BodyWrapper>
                <Text>SEARCHED THE {temp} </Text>
                {search.fetching ?
                    <ActivityIndicator /> :
                    <FlatList
                        data={search.data.results}
                        keyExtractor={(item) => `${item.id}`}
                        renderItem={({ item }) =>
                            <TouchableOpacity onPress={() => feedDetail(item)} key={item.id}>
                                <PaddingHeight >
                                    <MentoCard {...item} />
                                </PaddingHeight>
                            </TouchableOpacity>}
                    />
                }
                < DetailModal
                    visible={modal}
                    onPress={handleClose}
                    {...storage}
                />
            </BodyWrapper>
        </OsView>
    )
}
