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
import { PROFILE_REQUEST } from "../state/Profile/Action";
import { LOGOUT, WITHDRAWAL, LOGOUT_REQUEST } from '../reducers/login'
import { RootState } from '../reducers';
import { card, page } from '../state/Profile/Action'
import { questionCard } from '../state/Question/Reducer';
import { RouteProp } from '@react-navigation/core';
import { SearchStackParamList } from '../navigator/SeachNavigation';

type ProfileScreenRouteProp = RouteProp<SearchStackParamList, 'Profile'>

type Props = {
    route: ProfileScreenRouteProp
}

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
    detail: card | null;
    question: questionCard | null;
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



const Profile = ({ route }: Props) => {
    const [select, setSelect] = useState<select>("card");
    const [modal, setModal] = useState<modal>({
        type: 'none',
        detail: null,
        question: null
    });
    //분기처리를 했는데
    const dispatch = useDispatch()
    const logininfo = useSelector((state: RootState) => state.login);
    const profile = useSelector((state: RootState) => state.profile);
    const makeFeed = useSelector((state: RootState) => state.makeFeed);
    const makeQuestion = useSelector((state: RootState) => state.makeQuestion);
    const comments = useSelector((state: RootState) => state.questionComment);
    let { data: { user, cards, pages } } = profile;

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

    const handelDetail = (card: card) => {
        setModal({
            ...modal,
            type: 'detail',
            detail: card
        })
    }

    const handleQuestion = (card: questionCard) => {
        setModal({
            ...modal,
            type: "question",
            question: card
        });
    }

    const handelClose = () => {
        setModal({
            ...modal,
            type: 'none'
        });
    }

    const handleLogout = () => {
        dispatch({ type: LOGOUT_REQUEST })
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
    useEffect(() => {
        if ('pk' in logininfo.data) {
            dispatch({ type: PROFILE_REQUEST, payload: { pk: (route && route.params && route.params.pk) || logininfo.data.pk, token: logininfo.token } })
        }
    }, [makeFeed.data, makeQuestion.data])

    return (
        <OsView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
            {user.pk ?
                <Wrapper>
                    <Modal visible={modal.type === 'setting'} transparent={true} onRequestClose={handleModal} >
                        <TouchableWithoutFeedback onPress={handleModal}>
                            <ModalWrapper >
                                <ModalLayout onStartShouldSetResponder={() => true}>
                                    <ScrollView style={{ width: '100%', padding: 18 }}>
                                        <ModalTitle>Helle {user.username}</ModalTitle>
                                        {/* <SettingTab text="password" />
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
                            {user ? <UserCard {...user} onPress={handleSetting} /> : <ActivityIndicator />}
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
                                cards.map((item) =>
                                    <TouchableWithoutFeedback onPress={() => handelDetail(item)} key={item.id}>
                                        <PaddingHeight >
                                            <MentoCard {...item} />
                                        </PaddingHeight>
                                    </TouchableWithoutFeedback>
                                )
                                :
                                pages.map((item) =>
                                    <TouchableWithoutFeedback onPress={() => handleQuestion(item)} key={item.id}>
                                        <PaddingHeight>
                                            <QuestionCard
                                                {...item}
                                            />
                                        </PaddingHeight>
                                    </TouchableWithoutFeedback>
                                )
                            }
                        </BodyWrapper>
                    </ScrollView>
                    {modal.detail && 'id' in modal.detail && modal.type === 'detail' &&
                        <DetailModal
                            visible={true}
                            onPress={handelClose}
                            {...modal.detail}
                        />
                    }
                    {modal.question && 'id' in modal.question && modal.type === 'question' &&
                        <QuestionModal
                            visible={true}
                            onPress={handelClose}
                            {...modal.question}
                        />
                    }
                </Wrapper>
                :
                <ActivityIndicator />
            }
        </OsView>
    )
}

//타입으로 체킹해서 분기처리하는건 위험하다.
//


export default Profile