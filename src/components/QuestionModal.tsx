import React, { useState, useEffect, useRef } from 'react'
import { TouchableWithoutFeedback, TouchableOpacity, ScrollView, Animated } from 'react-native'
import styled from 'styled-components/native';
import Tag from './Tag';
import { ThemeProps } from '../style/theme';
import DownArrow from '../../assets/DownArrow.svg';
import UpArrow from '../../assets/UpArrow.svg';
import ThumpsUp from '../../assets/ThumpsUp.svg';
import ThumpsDown from '../../assets/ThumpsDown.svg';
import {useDispatch, useSelector} from "react-redux";
import {QUESTION_COMMENTS_REQUEST} from "../state/Profile/Action";

type Props = {
    visible: boolean;
    id: string;
    image: string;
    desc: string;
    question_count: number;
    tags: string[];
    username: string;
    onPress: () => void;
}

const QUESTIONS =
    [
        {
            q: "HELLOW",
            as: [{ u: "kimjoobin", a: "worlds??", }]
        },
        {
            q: "WORLD!",
            as: [{ u: "whan", a: "HELLO WORLD ^_^" }]
        },
        {
            q: "NO JAVA, IT'S SCRIPT!",
            as: [
                { u: "java_man", a: "JAVA IS BEST L" },
                { u: "py", a: "NO py IS BEST ^_^" },
                { u: "an", a: "파이썬은 최고의 언어입니다. 자바 달라요" }
            ]
        },
        {
            q: "WHO HAS BEST PERPOMENTS IN IMERSIVE 19"
        }
    ]

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

export default function QuestionModal({ visible, desc, image, question_count, tags, username, onPress, id, questionsArr }: Props) {
    const [animationState, setAnimationState] = useState<animationState>({
        detailIndex: undefined,
        animationOn: false
    })
    const { detailIndex, animationOn } = animationState;
    const slideToggle = useRef(new Animated.Value(0)).current;
    const dispatch = useDispatch()
    const QuestionDetail = useSelector(state => state.profileQuestion)
    const Logininfo = useSelector(state => state.login)
    const QuestionComment = useSelector(state => state.questionComment)
    console.log(QuestionDetail.data + questionsArr[0])



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
        const isClose = index === detailIndex
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
                                            <Desc>{desc}</Desc>
                                        </TextWrapper>
                                        <Image source={{ uri: image }} />
                                    </TileWrapper>
                                </ModalTabWrapper>
                                <BodyWrapper>
                                    {QuestionDetail.data.results && (
                                        QuestionDetail.data.results.map((item) =>
                                            <ModalTabWrapper key={`q-${item.id}`} onStartShouldSetResponder={() => true}>
                                                <TextWrapper>
                                                    <QuestionText>Q{item.id + 1}.{item.content}</QuestionText>
                                                </TextWrapper>
                                                <Animated.View style={setDetailStyle(item.id)}>
                                                    {questionsArr && (
                                                        questionsArr.map((answer) =>
                                                            <AnswerWrapper key={`answer-${answer.id}`}>
                                                                <AnswerUsername style={{ opacity: 0.6 }}>'kim'</AnswerUsername>
                                                                <AnswerUsername>'kim'</AnswerUsername>
                                                                <RatingWrapper>
                                                                    <ThumpsUp style={{ marginRight: 7 }} />
                                                                    <ThumpsDown style={{ marginRight: 5 }} />
                                                                </RatingWrapper>
                                                            </AnswerWrapper>
                                                        )
                                                    )}
                                                </Animated.View>
                                                <DropDownWrapper >
                                                    <TouchableOpacity onPress={() => handleDetail(1)} style={{ padding: 5 }}>
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
