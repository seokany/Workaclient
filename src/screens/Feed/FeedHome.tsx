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
import { GET_FEED_REQUEST, responseFeeds, Feeds, } from "../../state/Feed/Action";

import MentoCard from '../../components/MentoCard';
import DetailModal from '../../components/DetailModal';
import { LOGIN_SUCCESS } from "../../reducers/login";
import { login } from "../../Api/login";


const PaddingHeight = styled.View`
    padding:10px 0px;
`;

const FeedHome = () => {
    const feedState = useSelector((state: RootState) => state.feed)
    const makeFeed = useSelector((state: RootState) => state.makeFeed)
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const FeedsAll = makeFeed.data.concat(feedState.data)
    const [storage, setStorage] = useState<Feeds>(
        {
            id: '',
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


    return (
        <>
            {feedState.fetching ? <Text>'Now Loading'</Text> :
                <View>
                    <FlatList
                        data={FeedsAll}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) =>
                            <TouchableOpacity onPress={() => feedDetail(item)} key={item.id}>
                                <PaddingHeight >
                                    <MentoCard {...item} />
                                </PaddingHeight>
                            </TouchableOpacity>}
                    />
                </View>
            }
            <DetailModal
                visible={modalVisible}
                onPress={handleClose}
                {...storage}
            />
        </>
    )
}

export default FeedHome