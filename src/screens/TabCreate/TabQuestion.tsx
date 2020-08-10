import React, { useEffect, useState } from 'react'
import {ActivityIndicator, TouchableWithoutFeedback, Alert, TouchableOpacity} from 'react-native'
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
import { ScrollView } from 'react-native-gesture-handler';
import Tag from "../../components/Tag";



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
const TagWrapper = styled.View`
    flex-direction:row;
`;
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
    const [tagArr, setTagArr] = useState<string[]>([]);
    const dispatch = useDispatch()

    const isLogin = useSelector((state: RootState) => state.login)
    const makeState = useSelector((state: RootState) => state.makeQuestion);


    const upload = () => {
        if (isLogin.isLogin && isLogin.token) {
            if (InterestingTitle === "") {
                Alert.alert("WORKA!", "Title을 작성해주세요")
            } else if (quetion === "") {
                Alert.alert("WORKA!", "질문을 등록하여 주세요")
            } else {
                dispatch({
                    type: MAKE_QUESTION_REQUEST,
                    payload: {tags: tagArr, title: InterestingTitle, question: quetion, token: isLogin.token}
                })
            }
        } else {
            Alert.alert("WORKA!", '인증되지 않았습니다.')
        }
        setTagArr([])
    }

    const onCancer = () => {
        dispatch({ type: MAKE_QUESTION_INIT });
        navigation.navigate('News');
    }

    const handleKeyboard = () => {
        Keyboard.dismiss();
    }
    const removeTag = (index:number) => {
        const tmp = [...tagArr];
        tmp.splice(index, 1)
        setTagArr(tmp)
    }

    if (makeState.posting) {
        setTaptag("")
        setInterestingTitle("")
        setQuestion("")
        onCancer();
    }

    useEffect(() => {
        return () => {
            dispatch({ type: MAKE_QUESTION_INIT });
        }
    }, [])

    useEffect(() => {
        const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
        if(tapTag.trim().length === 0){
            setTaptag('')
            return
        }
        if(tagArr.length < 3){
            if(tapTag.split(' ').length > 1 && tapTag.length > 0 && tapTag.trim().length > 0){
                tagArr.push(tapTag.trim().replace(regExp, '').replace(/\s{2,}/gi, ' '))
                setTaptag((''))
            }
        } else {
            Alert.alert('Worka!', 'Tag는 3종류까지 넣을 수 있습니다.')
        }
    }, [tapTag])
    return (
        <OsView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
            <TouchableWithoutFeedback onPress={handleKeyboard}>
                <Wrapper>
                    <ScrollView>
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
                                : <ActivityIndicator />}
                        </TitleWrapper>

                        <InputWrapper>
                            <MakeJobTagInput
                                placeholder="Make Job Tag"
                                value={tapTag}
                                onChange={addTap(setTaptag)}
                            />
                            <TagWrapper>
                                {tagArr.map((el, index) =>
                                    <TouchableOpacity onPress={() => removeTag(index)}>
                                        <Tag key={`${index}`} text={el} response={false}/>
                                    </TouchableOpacity>
                                )}
                            </TagWrapper>
                            <MakeInterestingInput
                                placeholder="Make Interesting Title"
                                value={InterestingTitle}
                                onChange={addTap(setInterestingTitle)}
                            />
                            <MakeQuestionInput
                                placeholder="Q1. Make Question"
                                value={quetion}
                                onChange={addTap(setQuestion)}
                            />
                        </InputWrapper>
                    </ScrollView>
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