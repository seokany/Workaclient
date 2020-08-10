import React, { useState } from 'react';
import { Modal, View, TouchableWithoutFeedback, ScrollView, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

import theme, { ThemeProps } from '../style/theme'

import OsView from '../components/OsView';
import UserCard from '../components/UserCard';
import MentoCard from '../components/MentoCard';
import QuestionCard from '../components/QuestionCard'
import SettingTab from '../components/SettingTab'
import DetailModal from '../components/DetailModal';


const a = [];


type select = 'card' | 'question'

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
    question_count: number;
    image: string;
    tags: string[];
    username: string;
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
    question: questionCard[];
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
    question: [
        {
            id: "1",
            desc: "Tongji Architectural Design And Research Institute: The Latest Architecture and News",
            question_count: 8,
            image: "https://image.freepik.com/free-vector/design-word-concept_23-2147844787.jpg",
            tags: ["architecture", "interior design"],
            username: "hwan"
        },
        {
            id: "2",
            desc: "IT 최고액 연봉 프로그래밍 언어는?",
            question_count: 4,
            image: "https://lh3.googleusercontent.com/dt7eyYhUAwoOn6V_CrmQuNbITswpJf8k8oJuyNUEggZGD35kA4qnxTFigt78HgMtiJ0sHl0zynRXySVfGTXXNmocrSGPttVyChn2fPXp4ZU5OpWfQvz4HNkJ0rsGCxKXwhs0o6Go",
            tags: ["IT", "front-end"],
            username: "joo"
        },
        {
            id: "3",
            desc: "Tongji Architectural Design And Research Institute: The Latest Architecture and News",
            question_count: 8,
            image: "https://image.freepik.com/free-vector/design-word-concept_23-2147844787.jpg",
            tags: ["architecture", "interior design"],
            username: "hwan"
        },
        {
            id: "4",
            desc: "Tongji Architectural Design And Research Institute: The Latest Architecture and News",
            question_count: 8,
            image: "https://image.freepik.com/free-vector/design-word-concept_23-2147844787.jpg",
            tags: ["architecture", "interior design"],
            username: "hwan"
        }
    ]
}

const Wrapper = styled.View`
    flex:1;
`;

const TitleView = styled.View`  
    justify-content:center;
    align-items:center;
    margin:10px 0px;
`;

const Title = styled.Text`
    font-size:20px;
    color:${({ theme }: ThemeProps): string => theme.textColor};
`;

const BodyWrapper = styled.View`
    padding:20px 0px;
`;

const SelectWrapper = styled.View`
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

const SelectText = styled.Text`
    font-size:20px;
`;

const QuestionCardWrapper = styled.View`
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
    height:70%;
`;

const ModalTitle = styled.Text`
    text-align:center;
    font-size:20px;
    color:#DEE53A;
    margin-bottom:25px;
`;


const Profile = () => {
    const [select, setSelect] = useState<select>("card");
    const [settingModal, setSettingModal] = useState<boolean>(false);
    const [detailModal, setDetailModal] = useState<boolean>(false);
    const [detail, setDetail] = useState<mentoCard>();

    const handleSelect = (text: select) => () => {
        setSelect(text);
    }

    const handleModal = () => {
        setSettingModal(!settingModal);
    }

    const handelDetail = (detailCard: mentoCard) => {
        setDetailModal(true);
        setDetail(detailCard);
    }

    const handelDetailClose = () => {
        console.log("HANDLE")
        setDetailModal(false);
    }

    const mentoCard: mentoCard[] = FAKEDATA_1.card;
    const questionCard: questionCard[] = FAKEDATA_1.question;

    return (
        <OsView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
            <Wrapper>
                <Modal visible={settingModal} transparent={true} >
                    <TouchableWithoutFeedback onPress={() => setSettingModal(false)}>
                        <ModalWrapper >
                            <TouchableWithoutFeedback>
                                <ModalLayout onStartShouldSetResponder={() => true}>
                                    <ScrollView style={{ width: '100%', padding: 18 }}>
                                        <ModalTitle>Helle {FAKEDATA.username}</ModalTitle>
                                        <SettingTab text="username" />
                                        <SettingTab text="password" />
                                        <SettingTab text="font size" />
                                        <SettingTab text="dark theme" />
                                        <View style={{ height: 50 }}></View>
                                    </ScrollView>
                                </ModalLayout>
                            </TouchableWithoutFeedback>
                        </ModalWrapper>
                    </TouchableWithoutFeedback>
                </Modal>
                <ScrollView>
                    <TitleView>
                        <Title>Question</Title>
                    </TitleView>
                    <BodyWrapper>
                        <UserCard {...FAKEDATA} onPress={handleModal} />
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
                            mentoCard.map((item) =>
                                <TouchableOpacity onPress={() => handelDetail(item)} key={item.id}>
                                    <QuestionCardWrapper >
                                        <MentoCard {...item} />
                                    </QuestionCardWrapper>
                                </TouchableOpacity>
                            )
                            :
                            questionCard.map((item) =>
                                <QuestionCardWrapper key={item.id}>
                                    <QuestionCard {...item} />
                                </QuestionCardWrapper>
                            )
                        }
                    </BodyWrapper>
                </ScrollView>
                {detail &&
                    <DetailModal visible={detailModal} onPress={handelDetailClose} {...detail} />
                }
            </Wrapper>
        </OsView>
    )
}


export default Profile