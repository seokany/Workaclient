import React, { useState, useEffect } from 'react';
import { TouchableWithoutFeedback, FlatList, View, ActivityIndicator, Text } from 'react-native'
import styled from 'styled-components/native';

import QuestionCard from '../../../components/QuestionCard';

import { useDispatch, useSelector } from "react-redux";
import { GET_QUESTION_REQUEST } from "../../../state/Question/Action";
import { RootState } from "../../../reducers";
import { questionCard } from '../../../state/Question/Reducer';
import QuestionModal from '../../../components/QuestionModal';
import { StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import { SearchStackParamList } from '../../../navigator/SeachNavigation';

type navigation = StackNavigationProp<SearchStackParamList, 'Home'>

type Props = {
    navigation: navigation
}

const PaddingHeight = styled.View`
    padding:10px 0px;
`;
const QuestionFeed = ({ navigation }: Props) => {
    const [modal, setModal] = useState<questionCard>();
    const [refresh, setRefresh] = useState<boolean>(false);

    const dispatch = useDispatch();
    const rootState = useSelector((state: RootState) => state);
    const { login: loginState, question: questionState } = rootState;

    const handleQuestion = (item: questionCard) => {
        setModal(item);
    }

    const handelClose = () => {
        setModal(undefined);
    }

    const getQuestion = () => {
        setRefresh(true);
        dispatch({ type: GET_QUESTION_REQUEST, payload: { token: loginState.token } })
    }

    useEffect(() => {
        if (loginState.isLogin) {
            getQuestion()
        }
    }, [])

    useEffect(() => {
        if (refresh && !questionState.fetching) {
            setRefresh(false);
        }
    }, [questionState.fetching])

    return (
        <View style={{ flex: 1 }}>
            {
                <FlatList
                    data={questionState.data.results}
                    keyExtractor={item => `${item.id}`}
                    refreshing={refresh}
                    onRefresh={getQuestion}
                    renderItem={({ item }) =>
                        <TouchableWithoutFeedback onPress={() => handleQuestion(item)} key={item.id}>
                            <PaddingHeight>
                                <QuestionCard {...item} />
                            </PaddingHeight>
                        </TouchableWithoutFeedback>
                    }
                />
            }
            {modal &&
                <QuestionModal
                    visible={true}
                    onPress={handelClose}
                    navigation={navigation}
                    {...modal}
                />
            }
        </View>
    )
}

export default QuestionFeed
