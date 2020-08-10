import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    Image,
    Modal,
    TouchableWithoutFeedback,
    Button,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import styled from 'styled-components/native';

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state";
import {  ONLY_GET_FEED_REQUEST } from "../../state/Feed/Action";
import { Feed } from "../../state/Feed/Types"

import MentoCard from '../../components/MentoCard';
import DetailModal from '../../components/DetailModal';
import { LOGIN_SUCCESS } from "../../state/Login/Action";
import { login } from "../../Api/login";
import { SearchStackParamList } from '../../navigator/SeachNavigation';
import { StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';

type navigationProps = StackNavigationProp<SearchStackParamList, 'Home'>

export interface Props {
    navigation: navigationProps
}


const PaddingHeight = styled.View`
    padding:10px 0px;
`;

const FeedHome = ({ navigation }: Props) => {
    const dispatch = useDispatch()
    const rootState = useSelector((state: RootState) => state);
    const { feed: feedState, makeFeed, login: loginState } = rootState;
    const [timeoutNumber, setTimeoutNumber] = useState<number>(0);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    // const FeedsAll = makeFeed.data.concat()
    const [storage, setStorage] = useState<Feed>(
        {
            id: 0,
            author: {
                pk: 0,
                username: '',
                user_image: ''
            },
            title: '',
            images: '',
            text: '',
            created_at: '',
            updated_at: '',
            number_of_comments: '0',
            number_of_likes: '0',
            post_comments: [],
            tags: [],
        });

    const feedDetail = (item: Feed) => {
        clearTimeout(timeoutNumber);
        if (!modalVisible) {
            const timeNum = setTimeout(() => {
                setModalVisible(true)
                setStorage({
                    ...item
                })
            }, 50);
            setTimeoutNumber(timeNum);
        }

    }

    const handleClose = () => {
        setModalVisible(false);
    }

    const getFeed = async () => {
        setRefresh(true);
        dispatch({ type: ONLY_GET_FEED_REQUEST, payload: { token: loginState.token } })
    }

    useEffect(() => {
        if (refresh && !feedState.fetching) {
            setRefresh(false);
        }
    }, [feedState.fetching])
    return (
        <>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={feedState.data}
                    refreshing={refresh}
                    onRefresh={getFeed}
                    keyExtractor={(item) => `FEED-HOME${item.id}`}
                    renderItem={({ item }) =>
                        <TouchableWithoutFeedback onPress={() => feedDetail(item)} key={item.id}>
                            <PaddingHeight >
                                <MentoCard {...item} />
                            </PaddingHeight>
                        </TouchableWithoutFeedback>}
                />
            </View>
            {storage.id > 0 &&
                <DetailModal
                    visible={modalVisible}
                    onPress={handleClose}
                    navigation={navigation}
                    {...storage}
                />
            }
        </>
    )
}

export default FeedHome