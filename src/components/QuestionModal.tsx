import React, { useState, useEffect, useRef } from 'react'
import { TouchableWithoutFeedback, TouchableOpacity, ScrollView, Animated, FlatList, Button, ActivityIndicator } from 'react-native'
import styled from 'styled-components/native';

import { ThemeProps } from '../style/theme';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../reducers';

import DownArrow from '../../assets/DownArrow.svg';
import UpArrow from '../../assets/UpArrow.svg';
import ThumpsUp from '../../assets/ThumpsUp.svg';
import ThumpsDown from '../../assets/ThumpsDown.svg';
import Tag from './Tag';
import { questionCard } from '../state/Question/Reducer';
import { GET_QUESTION_DETAIL_REQUEST, QUESTION_COMMENTS_REQUEST, MAKE_QUESTION_COMMENT_REQUEST } from "../state/Question/Action";
import { TextInput } from 'react-native-gesture-handler';

interface Props extends questionCard {
    visible: boolean;
    onPress: () => void;
}

const ModalWrapper = styled.Modal`
    flex:1;
`;

const Wrapper = styled.View`
    width:100%;
    height:100%;
    background-color:rgba(112,112,112,0.9);
    justify-content:center;
    align-items:center;
    padding:0px 10px;
`;

const QuestionWrapper = styled.View`
    width:100%;
    max-width:${({ theme }: ThemeProps): number => theme.maxWidth}px;
    height:70%;
    background-color:${({ theme }: ThemeProps): string => theme.detailBg};
`;

const ModalTabWrapper = styled.View`
    width:100%;
    background-color:${({ theme }: ThemeProps): string => theme.white};
    margin-bottom:5px;
    overflow:hidden;
`;

const TileWrapper = styled.View`
    flex-direction:row;
    height:64px;
`;

const TextWrapper = styled.View`
    height:64px;
    padding:0px 10px;
    justify-content:center;
`;

const BodyWrapper = styled.View`
    flex:1
`;

const DropDownWrapper = styled.View`
    align-items:center;
`;

const AnswerWrapper = styled.View`
    width:100%;
    height:30px;
    margin-top:10px;
    padding:0px 10px;
`;

const RatingWrapper = styled.View`
    flex-direction:row;
    justify-content:flex-end;
`;

const TagWrapper = styled.View`
    min-height:90px;
    padding:15px;
    justify-content:space-around;
`;

const TendencyTagWrapper = styled.View`
    flex-direction:row;
`;

const UserTagWrapper = styled.View`
    flex-direction:row;
    justify-content:space-between;
`;

const PostComment = styled.View`
    flex:1;
    min-height:40px;
    justify-content:flex-end;
    padding:10px;
`;

const CommnetWrapper = styled.View`
    border:1px solid black;
    border-radius:3px;
    flex-direction:row;
`;

const Image = styled.Image`
    width:64px;
    height:64px;
    resize-mode:stretch;
`;

const Desc = styled.Text`
    text-align:center;
    font-size:${({ theme }: ThemeProps): number => theme.smFont}px;
    color:${({ theme }: ThemeProps): string => theme.textColor};
    line-height:12px;
`;

const QuestionText = styled.Text`
    text-align:center;
    font-size:${({ theme }: ThemeProps): number => theme.mdFont}px;
    color:${({ theme }: ThemeProps): string => theme.textColor};
    line-height:12px;
`;

const AnswerUsername = styled.Text`
    color:${({ theme }: ThemeProps): string => theme.textColor};
    font-size:${({ theme }: ThemeProps): number => theme.smFont}px;
    margin-bottom:4px;
`;

type animationState = {
    detailIndex?: number;
    animationOn: boolean;
}

export default function QuestionModal({
    visible,
    onPress,
    id,
    author: {
        username,
        user_image,
        pk
    },
    title,
    tags,
    questions,
    created_at,
}: Props) {
    // animation
    const [animationState, setAnimationState] = useState<animationState>({
        detailIndex: undefined,
        animationOn: false
    })
    const { detailIndex, animationOn } = animationState;
    const slideToggle = useRef(new Animated.Value(0)).current;
    // redux
    const dispatch = useDispatch()
    const rootState = useSelector((state: RootState) => state);
    const { login: Logininfo, questionComment: questionComment, questionDetail: questionDetail } = rootState;
    // refresh
    const [isRefresh, setIsRefresh] = useState(false);

    const setDetailStyle = (index: number): { display?: 'none' | 'flex', height?: Animated.Value, flex?: number, overFlow?: string } => {
        return (
            typeof detailIndex === 'number' && detailIndex === index ?
                { height: slideToggle, overFlow: 'hidden' }
                :
                { display: 'none' }
        )
    }
    const [text, setText] = useState('');

    const closeModal = () => {
        onPress();
    }

    const handleDetail = (index: number) => {
        const isClose = index === detailIndex
        questionCommentsRequest(index);
        if (animationOn) {
            Animated.timing(slideToggle, {
                toValue: 0,
                duration: 1000
            }).start(() => {
                setAnimationState({
                    detailIndex: isClose ? undefined : index,
                    animationOn: isClose ? false : true
                })
            });
        } else {
            setAnimationState({
                detailIndex: index === detailIndex ? undefined : index,
                animationOn: true
            })
        }
    };

    const postComments = () => {
        dispatch({
            type: MAKE_QUESTION_COMMENT_REQUEST,
            payload: {
                token: Logininfo.token,
                question_pk: detailIndex,
                page_pk: id,
                text,
            }
        })
        setText("");
    }

    const refreshing = () => {
        setIsRefresh(true);
        getQuestionDetailRequest();
        setIsRefresh(false);
    }

    useEffect(() => {
        if (animationOn) {
            Animated.timing(slideToggle, {
                toValue: 300,
                duration: 1000
            }).start();
        }
    }, [animationState]);

    const questionCommentsRequest = (index: number) => {
        dispatch({ type: QUESTION_COMMENTS_REQUEST, payload: { token: Logininfo.token, page_pk: id, question_pk: index } })
    }

    const getQuestionDetailRequest = () => {
        dispatch({ type: GET_QUESTION_DETAIL_REQUEST, payload: { token: Logininfo.token, id: id } })
    }

    useEffect(() => {
        setIsRefresh(false);
        getQuestionDetailRequest()
    }, []);

    return (
        <ModalWrapper visible={visible} transparent={true} onRequestClose={closeModal} >
            <TouchableWithoutFeedback onPress={closeModal}>
                <Wrapper>
                    <QuestionWrapper onStartShouldSetResponder={() => true}>
                        <ModalTabWrapper>
                            <TileWrapper onStartShouldSetResponder={() => true}>
                                <TextWrapper style={{ flex: 1 }}>
                                    <Desc>{title}</Desc>
                                </TextWrapper>
                                <Image source={{ uri: user_image || "https://miro.medium.com/max/1400/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg" }} />
                            </TileWrapper>
                        </ModalTabWrapper>
                        <BodyWrapper>
                            {/*detailQuestion*/}
                            {questionDetail.data.results && (
                                <FlatList
                                    refreshing={isRefresh}
                                    onRefresh={refreshing}
                                    data={questionDetail.data.results}
                                    keyExtractor={(item) => `${item.id}`}
                                    renderItem={({ item }) =>
                                        <ModalTabWrapper key={`q-${item.id}`} onStartShouldSetResponder={() => true}>
                                            <TextWrapper>
                                                <QuestionText>Q{item.id + 1}.{item.content}</QuestionText>
                                            </TextWrapper>
                                            <Animated.View style={setDetailStyle(item.id)} onStartShouldSetResponder={() => true}>
                                                {/*comment*/}
                                                {questionComment.data && (
                                                    <FlatList
                                                        style={{}}
                                                        refreshing={questionComment.fetching}
                                                        onRefresh={() => questionCommentsRequest(item.id)}
                                                        data={questionComment.data}
                                                        keyExtractor={(item) => `${item.id}`}
                                                        renderItem={({ item: questionComment }) =>
                                                            <AnswerWrapper onStartShouldSetResponder={() => true} >
                                                                <AnswerUsername style={{ opacity: 0.6 }}>{questionComment.author.username}</AnswerUsername>
                                                                <AnswerUsername>${questionComment.text}</AnswerUsername>
                                                                <RatingWrapper>
                                                                    <ThumpsUp style={{ marginRight: 7 }} />
                                                                    <ThumpsDown style={{ marginRight: 5 }} />
                                                                </RatingWrapper>
                                                            </AnswerWrapper>
                                                        }
                                                    />
                                                )}
                                                {Logininfo.data.pk !== pk &&
                                                    <PostComment>
                                                        <CommnetWrapper>
                                                            <TextInput
                                                                style={{ flex: 1, fontSize: 10, padding: 3 }}
                                                                multiline={true}
                                                                autoCorrect={false}
                                                                value={text}
                                                                onChangeText={(e) => setText(e)}
                                                            />
                                                            {questionComment.fetching ?
                                                                <ActivityIndicator />
                                                                :
                                                                <Button title="등록" onPress={postComments} />
                                                            }
                                                        </CommnetWrapper>
                                                    </PostComment>
                                                }
                                            </Animated.View>
                                            <DropDownWrapper >
                                                <TouchableOpacity onPress={() => handleDetail(item.id)} style={{ padding: 5 }}>
                                                    {detailIndex === item.id ? <UpArrow /> : <DownArrow />}
                                                </TouchableOpacity>
                                            </DropDownWrapper>
                                        </ModalTabWrapper>
                                    }
                                />
                            )}
                            <TagWrapper >
                                <TendencyTagWrapper>
                                    {tags.map((tag, tagIndex) => <Tag key={`tag-${tagIndex}`} text={tag} fontColor="#FFFFFF" />)}
                                </TendencyTagWrapper>
                                <UserTagWrapper>
                                    <Tag text={username} fontColor="#FFFFFF" />
                                </UserTagWrapper>
                            </TagWrapper>
                        </BodyWrapper>
                    </QuestionWrapper>
                </Wrapper>
            </TouchableWithoutFeedback>
        </ModalWrapper>
    )
}
