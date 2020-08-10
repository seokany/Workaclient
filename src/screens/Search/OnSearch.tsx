import React, { useState } from 'react'
import { Text, ActivityIndicator, TouchableWithoutFeedback } from 'react-native';
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
import { ThemeProps } from '../../style/theme';
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

const GoBackWrapper = styled.TouchableWithoutFeedback``;

const BackText = styled.Text``;

const Input = styled.TextInput`
    flex:1;
`;

const BodyWrapper = styled.View`
    height:100%;
    background-color:white;
`;
const SearchResultWrapper = styled.View`
    padding:10px;
`;

const SearchResultText = styled.Text`
    font-size:${({ theme }: ThemeProps) => theme.mdFont}px;
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
    const { temp } = searchState;

    const handleInput = (e: string): void => {
        clearTimeout(searchState.searchE);
        const searchE = setTimeout(() => {
            if (e !== "") {
                dispatch({ type: SEARCH_REQUEST, payload: { token, temp: e } })
                setSearchState({ temp: e, searchE: 0 });
            }
        }, 600);

        setSearchState({
            temp: e,
            searchE
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
                {search.fetching ?
                    <ActivityIndicator /> :
                    <>
                        {searchState.temp !== "" && searchState.searchE === 0 && search.data.results.length === 0 &&
                            <SearchResultWrapper>
                                <SearchResultText>{searchState.temp} 에 대한 검색결과가 없습니다.</SearchResultText>
                                <SearchResultText>검색방법 팁) tag 나 username 을 중심으로 검색해보세요~</SearchResultText>
                            </SearchResultWrapper>}
                        <FlatList
                            data={search.data.results}
                            keyExtractor={(item) => `${item.id}`}
                            renderItem={({ item }) =>
                                <TouchableWithoutFeedback onPress={() => feedDetail(item)} key={item.id}>
                                    <PaddingHeight >
                                        <MentoCard {...item} />
                                    </PaddingHeight>
                                </TouchableWithoutFeedback>}
                        />
                    </>
                }
                {storage &&
                    < DetailModal
                        visible={modal}
                        onPress={handleClose}
                        navigation={navigation}
                        {...storage}
                    />
                }
            </BodyWrapper>
        </OsView>
    )
}
