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
import { RootState } from "../../reducers";
import { GET_FEED_REQUEST, responseFeeds, Feeds, ONLY_GET_FEED_REQUEST, } from "../../state/Feed/Action";

import MentoCard from '../../components/MentoCard';
import DetailModal from '../../components/DetailModal';
import { LOGIN_SUCCESS } from "../../reducers/login";
import { login } from "../../Api/login";


const PaddingHeight = styled.View`
    padding:10px 0px;
`;

const FeedHome = () => {
    const dispatch = useDispatch()
    const rootState = useSelector((state: RootState) => state);
    const { feed: feedState, makeFeed, login: loginState } = rootState;

    const [refresh, setRefresh] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    // const FeedsAll = makeFeed.data.concat()
    const [storage, setStorage] = useState<Feeds>(
        {
            id: 0,
            author: {
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

    const feedDetail = (item: Feeds) => {
        setStorage({
            ...item
        })
        setModalVisible(true)
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
            <DetailModal
                visible={modalVisible}
                onPress={handleClose}
                {...storage}
            />
        </>
    )
}

export default FeedHome