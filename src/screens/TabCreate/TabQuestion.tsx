import React, { useEffect, useState } from 'react'
import {ActivityIndicator, TouchableWithoutFeedback} from 'react-native'
import styled from 'styled-components/native'
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';

import MakeJobTagInput from "../../components/MakeJobTagInput"
import MakeInterestingInput from "../../components/MakeInterestingInput"
import MakeQuestionInput from "../../components/MakeQuestionInput"
import MakeButton from "../../components/MakeButton"
import CancerButton from '../../components/CancerButton'
import OsView from "../../components/OsView"
import addTap from "../../constants/addTap"
import { Keyboard } from 'react-native'
import { useDispatch, useSelector } from "react-redux";
import { MAKE_QUESTION_REQUEST, MAKE_QUESTION_INIT } from '../../state/Question/Action'
import { TopTapParamList } from "../../navigator/TopNavigation";
import { RootState } from "../../reducers";
import { makeFeed } from '../../Api/Feed';



type TopNewsNavigationProp = MaterialTopTabNavigationProp<TopTapParamList, 'News'>;

type Props = {
    navigation: TopNewsNavigationProp;
}

const Wrapper = styled.SafeAreaView`
    flex:1
`;

const TitleWrapper = styled.View`
    flex-direction: row;
    align-items:center;
    
    backgroundColor: 'rgb(251, 250, 251)';
    padding: 24px 0px;
    
`
const Title = styled.Text`
    font-size:24px;
    color: #7B7B7B;
`;

const InputWrapper = styled.View`
    flex-direction:column;
`
const TabQuestion = ({ navigation }: Props) => {

    const [tapTag, setTaptag] = useState('');
    const [InterestingTitle, setInterestingTitle] = useState('');
    const [quetion, setQuestion] = useState('');
    const dispatch = useDispatch()

    const isLogin = useSelector((state: RootState) => state.login)
    const makeState = useSelector((state: RootState) => state.makeQuestion);


    const upload = () => {
        const tags = tapTag.split(' ')
        if (isLogin.isLogin && isLogin.token) {
            dispatch({ type: MAKE_QUESTION_REQUEST, payload: { tags: tags, title: InterestingTitle, question: quetion, token: isLogin.token } })
        }
    }

    const onCancer = () => {
        navigation.navigate('News');
    }

    const handleKeyboard = () => {
        Keyboard.dismiss();
    }

    if (makeState.posting) {
        onCancer();
    }

    useEffect(() => {
        return () => {
            dispatch({ type: MAKE_QUESTION_INIT });
        }
    }, [])
    return (
        <OsView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
            <TouchableWithoutFeedback onPress={handleKeyboard}>
                <Wrapper>
                    <TitleWrapper>
                        <CancerButton
                            title="CANCER"
                            onPress={() => onCancer()}
                        />
                        <FlexWrapper>
                            <Title>Link Question</Title>
                        </FlexWrapper>
                        {!makeState.fetching ?
                            <MakeButton title="MAKE" onPress={() => upload()}></MakeButton>
                            :<ActivityIndicator />}
                    </TitleWrapper>

                    <InputWrapper>
                        <MakeJobTagInput
                            placeholder="Make Job Tag"
                            value={tapTag}
                            onChange={addTap(setTaptag)}
                            autoFocus={true}
                        />
                        <MakeInterestingInput
                            placeholder="Make Interesting Title"
                            value={InterestingTitle}
                            onChange={addTap(setInterestingTitle)}
                            autoFocus={true}
                        />
                        <MakeQuestionInput
                            placeholder="Q1. Make Question"
                            value={quetion}
                            onChange={addTap(setQuestion)}
                            autoFocus={true}
                        />
                    </InputWrapper>
                </Wrapper>
            </TouchableWithoutFeedback>
        </OsView>
    )
}

const FlexWrapper = styled.View`
    flex: 1;
    align-items: center;
`;

export default TabQuestion