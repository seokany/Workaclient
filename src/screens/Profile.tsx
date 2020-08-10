import React, { useEffect, useState } from 'react';
import {
    Alert,
    Modal,
    View,
    TouchableWithoutFeedback,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import styled from 'styled-components/native';

import theme, { ThemeProps } from '../style/theme'

import OsView from '../components/OsView';
import UserCard from '../components/UserCard';
import MentoCard from '../components/MentoCard';
import QuestionCard from '../components/QuestionCard'
import SettingTab from '../components/SettingTab'
import DetailModal from '../components/DetailModal';
import { useDispatch, useSelector } from "react-redux";

import QuestionModal from '../components/QuestionModal';
import { PROFILE_QUESTION_REQUEST, PROFILE_REQUEST } from "../state/Profile/Action";
import { LOGOUT, WITHDRAWAL } from '../reducers/login'
import { RootState } from '../reducers';

type select = 'card' | 'question';

type ModalType = 'setting' | 'detail' | 'question' | 'none';

type myprofile = {
    username: string;
    mento: string;
    mentiee: string;
    tag: string[];
    comment: string;
}

type modal = {
    type: ModalType;
    detail: mentoCard | {};
    question: questionCard | {};
}

type mentoCard = {
    id: string;
    image: string | null;
    title: string;
    desc: string;
    tags: string[];
    username: string;
    company: string;
}

type questionCard = {
    id: string;
    desc: string;
    image: string;
    tags: string[];
    questions: string[];
    author: {
        username: string;
    }
}

const FAKEDATA = {
    username: "Kimjoobin",
    mento: 3,
    mentiee: 4,
    tag: ["IT", "font-end", "back-end", "full-stack"],
    comment: "한줄로 적을수 있을만큼 열심히 하겠습니다."
}

const FAKEDATA_1: {
    card: mentoCard[];
} = {
    card: [
        {
            id: "1",
            image: null,
            title: "CodeStates 에서 살아남기",
            desc: "1. 열심히 공부한다. \n 2. 프리코스를 수강한다. \n 3. 이머시브를 졸업한다 \n 4. CSE에 들어간다. \n 5. 후배양성을 잘한다. \n 6. 대표님과 면접에서 포부를 설명한다. \n 7. CODESTATE 에 들어간다.",
            tags: ["IT", "front-end", "back-end", "education-end", "engineer"],
            username: "김주빈",
            company: "codestate"
        },
        {
            id: "2",
            image: "https://miro.medium.com/max/1400/1*x9kUnyASEa_Ke21yQ9gBPw.png",
            title: "CodeStates",
            desc: "1. 열심히 공부한다. \n 2. 프리코스를 수강한다. \n 3. 이머시브를 졸업한다 \n 4. CSE에 들어간다. \n 5. 후배양성을 잘한다. \n 6. 대표님과 면접에서 포부를 설명한다. \n 7. CODESTATE 에 들어간다.",
            tags: ["IT", "front-end", "back-end", "education-end", "engineer"],
            username: "any",
            company: "codestate"
        },
    ],
}

const Wrapper = styled.View`
    flex:1;
`;

const TitleView = styled.View`  
    justify-content:center;
    align-items:center;
    margin:10px 0px;
`;

const BodyWrapper = styled.View`
    padding:20px 0px;
`;

const SelectWrapper = styled.View`
    max-width:${({ theme }: ThemeProps): number => theme.maxWidth}px;
    align-self:center;
    flex-direction:row;
    `;

const Select = styled.TouchableOpacity`
    flex:1;
    padding:30px;
    align-items:center;
`;

const SelectView = styled.View`
    align-items:center;
    padding:0px 10px;
    border:0px solid ${({ theme }: ThemeProps): string => theme.textColor};
    border-bottom-width:0px;
`;

const PaddingHeight = styled.View`
    padding:10px 0px;
`;

const ModalWrapper = styled.View`
    flex:1;
    justify-content:center;
    align-items:center;
    background-color:rgba(112,112,112,0.5);
    padding:0px 8px;
`;

const ModalLayout = styled.View`
    background-color:${({ theme }: ThemeProps): string => theme.white};
    align-items:center;
    width:100%;
    max-width:${({ theme }: ThemeProps): number => theme.maxWidth}px;
    height:70%;
    border-radius:8px;
`;

const SettingChlidWrapper = styled.View`
    width:90%;
    align-self:center;
    border:1px solid black;
    border-radius:8px;
    background-color:${({ theme }: ThemeProps): string => theme.white};
    padding:5px 3px;
    margin-top:5px;

`;
const ModalTitle = styled.Text`
    text-align:center;
    font-size:20px;
    color:#DEE53A;
    margin-bottom:25px;
`;

const Title = styled.Text`
    font-size:20px;
    color:${({ theme }: ThemeProps): string => theme.textColor};
`;

const SelectText = styled.Text`
    font-size:20px;
`;

const Profile = () => {
    const [select, setSelect] = useState<select>("card");
    const [modal, setModal] = useState<modal>({
        type: 'none',
        detail: {},
        question: {}
    });
    const [detail, setDetail] = useState<mentoCard[]>([]);
    const [questionCard, setQuestionCard] = useState<questionCard>();
    const [myprofile, setMyprofile] = useState<myprofile>();
    const [question, setQuestion] = useState<questionCard[]>([])
    const [questionComment, setQuestionComment] = useState<[string]>(['riri']);


    const mentoCards: mentoCard[] = FAKEDATA_1.card;
    const dispatch = useDispatch()
    const logininfo = useSelector((state: RootState) => state.login)
    const profileinfo = useSelector((state: RootState) => state.profile)
    const questionState = useSelector((state: RootState) => state.profileQuestion)
    const faketags = ['kim', 'park']

    if (!myprofile) {
        dispatch({ type: PROFILE_REQUEST, payload: { pk: logininfo.data.pk, token: logininfo.token } })
        setMyprofile({
            username: logininfo.data.username,
            mento: logininfo.data.mento,
            mentiee: logininfo.data.mentiee,
            tag: ["IT", "font-end", "back-end", "full-stack"],
            comment: "한줄로 적을수 있을만큼 열심히 하겠습니다."
        })
    }

    useEffect(() => {
        if (profileinfo.data) {
            setQuestion(profileinfo.data.pages)
        }
    })


    const handleSelect = (text: select) => () => {
        setSelect(text);
    }

    const handleModal = () => {
        setModal({
            ...modal,
            type: 'none'
        });
    }

    const handleSetting = () => {
        setModal({
            ...modal,
            type: 'setting'
        });
    }

    const handelDetail = (card: mentoCard) => {
        setModal({
            ...modal,
            type: 'detail',
            detail: card
        })
    }

    const handleQuestion = (card: questionCard) => {
        dispatch({ type: PROFILE_QUESTION_REQUEST, payload: { token: logininfo.token, pk: card.id } })

        setModal({
            ...modal,
            type: "question",
            question: card
        });
        setQuestionComment(questionState.data.results)
    }

    const handelClose = () => {
        setModal({
            ...modal,
            type: 'none'
        });
    }

    const handleLogout = () => {
        dispatch({ type: LOGOUT })
    }

    const handleWithdrawal = () => {
        Alert.alert(
            "회원탈퇴",
            `회원탈퇴를 이후에는 Worka 의 서비스를 이용하실수 없습니다. 회원탈퇴를 진행하시겠습니까 ?`,
            [
                {
                    text: "회원탈퇴",
                    onPress: () => dispatch({ type: WITHDRAWAL, payload: { token: logininfo.token } })
                },
                {
                    text: "취소",
                    style: "cancel"
                }
            ],
            { cancelable: true }
        )
    }

    return (
        <OsView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
            <Wrapper>
                <Modal visible={modal.type === 'setting'} transparent={true} onRequestClose={handleModal} >
                    <TouchableWithoutFeedback onPress={handleModal}>
                        <ModalWrapper >
                            <ModalLayout onStartShouldSetResponder={() => true}>
                                <ScrollView style={{ width: '100%', padding: 18 }}>
                                    <ModalTitle>Helle {FAKEDATA.username}</ModalTitle>
                                    {/* <SettingTab text="username" />
                                    <SettingTab text="password" />
                                    <SettingTab text="font size" />
                                    <SettingTab text="dark theme" /> */}
                                    <SettingTab text="account">
                                        <TouchableOpacity onPress={handleLogout}>
                                            <SettingChlidWrapper>
                                                <SelectText>로그아웃</SelectText>
                                            </SettingChlidWrapper>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={handleWithdrawal}>
                                            <SettingChlidWrapper>
                                                <SelectText>회원탈퇴</SelectText>
                                            </SettingChlidWrapper>
                                        </TouchableOpacity>
                                    </SettingTab>
                                    <View style={{ height: 50 }}></View>
                                </ScrollView>
                            </ModalLayout>
                        </ModalWrapper>
                    </TouchableWithoutFeedback>
                </Modal>
                <ScrollView>
                    <TitleView>
                        <Title>Question</Title>
                    </TitleView>
                    <BodyWrapper>
                        {myprofile ? <UserCard {...myprofile} onPress={handleSetting} /> : <ActivityIndicator />}
                        <SelectWrapper>
                            <Select onPress={() => handleSelect('card')()}>
                                <SelectView style={{ borderBottomWidth: (select === "card" ? 3 : 0) }}>
                                    <SelectText style={{ color: (select === "card" ? theme.textColor : "black") }}>Card</SelectText>
                                </SelectView>
                            </Select>
                            <Select onPress={() => handleSelect('question')()}>
                                <SelectView style={{ borderBottomWidth: (select === "question" ? 3 : 0) }}>
                                    <SelectText style={{ color: (select === "question" ? theme.textColor : "black") }}>Question</SelectText>
                                </SelectView>
                            </Select>
                        </SelectWrapper>
                        {select === 'card' ?
                            mentoCards.map((item) =>
                                <TouchableOpacity onPress={() => handelDetail(item)} key={item.id}>
                                    <PaddingHeight >
                                        <MentoCard {...item} />
                                    </PaddingHeight>
                                </TouchableOpacity>
                            )
                            :
                            question.map((item: questionCard) =>
                                <TouchableOpacity onPress={() => handleQuestion(item)} key={item.id}>
                                    <PaddingHeight>
                                        <QuestionCard
                                            desc={item.desc}
                                            image="https://image.freepik.com/free-vector/design-word-concept_23-2147844787.jpg"
                                            question_count={item.questions.length}
                                            username={item.author.username}
                                            tags={faketags}
                                        />
                                    </PaddingHeight>
                                </TouchableOpacity>
                            )
                        }
                    </BodyWrapper>
                </ScrollView>
                {'id' in modal.detail && modal.type === 'detail' &&
                    <DetailModal
                        visible={true}
                        onPress={handelClose}
                        {...modal.detail}
                    />
                }
                {'id' in modal.question && modal.type === 'question' &&
                    <QuestionModal
                        visible={true}
                        onPress={handelClose}
                        id={modal.question.id}
                        desc={modal.question.desc}
                        image="https://image.freepik.com/free-vector/design-word-concept_23-2147844787.jpg"
                        question_count={modal.question.questions.length}
                        username={modal.question.author.username}
                        tags={faketags}
                        questionsArr={questionComment}
                    />
                }
            </Wrapper>
        </OsView>
    )
}

//타입으로 체킹해서 분기처리하는건 위험하다.
//


export default Profile