import React, { useState, useEffect, useRef } from 'react'
import { TouchableWithoutFeedback, TouchableOpacity, ScrollView, Animated } from 'react-native'
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
import {GET_QUESTION_DETAIL_REQUEST, QUESTION_COMMENTS_REQUEST} from "../state/Question/Action";

interface Props extends questionCard {
    visible: boolean;
    onPress: () => void;
}

const ModalWrapper = styled.Modal``;

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

const ScrollWrapper = styled.View`
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

const DetailWrapper = styled.View`
    flex:1;
    padding:0px 20px;
    align-items:flex-start;
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
    const [animationState, setAnimationState] = useState<animationState>({
        detailIndex: undefined,
        animationOn: false
    })
    const { detailIndex, animationOn } = animationState;
    const slideToggle = useRef(new Animated.Value(0)).current;
    const dispatch = useDispatch()
    // const QuestionDetail = useSelector((state: RootState) => state.profile)
    const Logininfo = useSelector((state: RootState) => state.login)
    const QuestionComment = useSelector((state: RootState) => state.questionComment)
    const QuestionDetail = useSelector((state:RootState) => state.questionDetail)


    const setDetailStyle = (index: number): { display?: 'none' | 'flex', height?: Animated.Value, flex?: number, overFlow?: string } => {
        return (
            typeof detailIndex === 'number' && detailIndex === index ?
                { height: slideToggle, overFlow: 'hidden' }
                :
                { display: 'none' }
        )
    }

    const closeModal = () => {
        onPress();
    }

    const handleDetail = (index: number) => {
        console.log('index',index)
        const isClose = index === detailIndex
        dispatch({type: QUESTION_COMMENTS_REQUEST, payload : {token: Logininfo.token, page_pk: id, question_pk: index}})
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
    }
    useEffect(() => {
        dispatch({type: GET_QUESTION_DETAIL_REQUEST, payload: {token : Logininfo.token, id: id}})
    },[])
    useEffect(() => {
        if (animationOn) {
            Animated.timing(slideToggle, {
                toValue: 300,
                duration: 1000
            }).start();
        }
    }, [animationState])
    return (
        <ModalWrapper visible={visible} transparent={true} onRequestClose={closeModal} >
            <TouchableWithoutFeedback onPress={closeModal}>
                <Wrapper>
                    <QuestionWrapper onStartShouldSetResponder={() => true}>
                        <ScrollView>
                            <ScrollWrapper>
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
                                    {QuestionDetail.data && (
                                        QuestionDetail.data.map((item) =>
                                            <ModalTabWrapper key={`q-${item.id}`} onStartShouldSetResponder={() => true}>
                                                <TextWrapper>
                                                    <QuestionText>Q{item.id + 1}.{item.content}</QuestionText>
                                                </TextWrapper>
                                                <Animated.View style={setDetailStyle(item.id)}>
                                                    {/*comment*/}
                                                    {QuestionComment.data && (
                                                        QuestionComment.data.map((answer) =>
                                                            <AnswerWrapper key={`answer-${answer.id}`}>
                                                                <AnswerUsername style={{ opacity: 0.6 }}>'kim'</AnswerUsername>
                                                                <AnswerUsername>${answer.text}</AnswerUsername>
                                                                <RatingWrapper>
                                                                    <ThumpsUp style={{ marginRight: 7 }} />
                                                                    <ThumpsDown style={{ marginRight: 5 }} />
                                                                </RatingWrapper>
                                                            </AnswerWrapper>
                                                        )
                                                    )}
                                                </Animated.View>
                                                <DropDownWrapper >
                                                    <TouchableOpacity onPress={() => handleDetail(item.id)} style={{ padding: 5 }}>
                                                        {detailIndex === 1 ? <UpArrow /> : <DownArrow />}
                                                    </TouchableOpacity>
                                                </DropDownWrapper>
                                            </ModalTabWrapper>
                                        )
                                    )}
                                </BodyWrapper>
                            </ScrollWrapper>
                        </ScrollView>
                        <TagWrapper >
                            <TendencyTagWrapper>
                                {tags.map((tag, tagIndex) => <Tag key={`tag-${tagIndex}`} text={tag} fontColor="#FFFFFF" />)}
                            </TendencyTagWrapper>
                            <UserTagWrapper>
                                <Tag text={username} fontColor="#FFFFFF" />
                            </UserTagWrapper>
                        </TagWrapper>
                    </QuestionWrapper>
                </Wrapper>
            </TouchableWithoutFeedback>
        </ModalWrapper>
    )
}
