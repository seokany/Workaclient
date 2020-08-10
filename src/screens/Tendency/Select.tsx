import React, { useState } from 'react';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';

import TendencyButton from '../../components/TendencyButton';
import { TENDENCYQUESTIONS } from '../../constants/tendencyQ';
import { RootState } from '../../reducers';
import { TENDENCY } from '../../reducers/login'


const Wrapper = styled.SafeAreaView`
    flex:1
`;

const TitleWrapper = styled.View`
    flex:1;
    align-items:center;
    justify-content:flex-end;
`;

const Title = styled.Text`
    font-size:30px;
`;

const Italic = styled.Text`
    color:#F41473;
    font-style:italic;
    font-weight:bold;
`;

const Desc = styled.Text`
    margin-top:17px;
    font-size:18px;
    color:#7B7B7B;
`;

const BodyWrapper = styled.View`
    flex:2.5;
    justify-content:center;
    align-items:center;
`;

const TopButtonWrapper = styled.View`
    margin-bottom:15px;
`;

const BottomButtonWrapper = styled.View`
    margin-top:15px;
`;

const Select = () => {
    const [mbtiIndex, setMbtiIndex] = useState(0);
    const [mbti, setMbti] = useState('');

    const dispatch = useDispatch();
    const loginState = useSelector((state: RootState) => state.login)


    const chooseQ = (quest: { type: string, q: string }) => () => {
        // if (!loginState.pending) {
        //     setMbti(mbti + quest.type)
        //     if (mbtiIndex > 2) {
        //         dispatch({ type: TENDENCY, payload: { mbti: mbti + quest.type, token: loginState.token } })
        //         return;
        //     }
            setMbtiIndex(mbtiIndex + 1);
        // }
    }

    const [q1, q2] = TENDENCYQUESTIONS[mbtiIndex];
    return (
        <Wrapper>
            <TitleWrapper>
                <Title>What <Italic>tickles</Italic></Title>
                <Title>Your <Italic style={{ fontStyle: 'normal' }}>Tendency?</Italic></Title>
                <Desc>Choose your interests below.</Desc>
            </TitleWrapper>
            <BodyWrapper>
                <TopButtonWrapper>
                    <TendencyButton title={q1.q} onPress={chooseQ(q1)} />
                </TopButtonWrapper>
                <BottomButtonWrapper>
                    <TendencyButton title={q2.q} onPress={chooseQ(q2)} />
                </BottomButtonWrapper>
            </BodyWrapper>
        </Wrapper>
    )
}

export default Select

