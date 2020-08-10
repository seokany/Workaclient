import React, { useState, useEffect } from 'react'
import {ActivityIndicator, Keyboard, TouchableWithoutFeedback} from 'react-native'
import styled from 'styled-components/native';
import { useSelector, useDispatch } from 'react-redux';

import CancerButton from '../../components/CancerButton'
import MakeJobTagInput from "../../components/MakeJobTagInput"
import MakeInterestingInput from "../../components/MakeInterestingInput"
import MakeEmbed from "../../components/MakeEmbed"
import MakeButton from "../../components/MakeButton"
import OsView from "../../components/OsView"
import addTap from "../../constants/addTap"
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';
import { MAKE_LINK_REQUEST, MAKE_LINK_INIT } from '../../state/Link/Action';
import { RootState } from '../../reducers';
import { TopTapParamList } from '../../navigator/TopNavigation'

import validCheck from '../../constants/validCheck'

type TopNewsNavigationProp = MaterialTopTabNavigationProp<TopTapParamList, 'News'>;

type Props = {
    onPress: () => void;
    keyboardType?: 'url';
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



const TabLink = ({
    onPress, keyboardType, navigation
}: Props) => {



    const [tapTag, setTaptag] = useState('');
    const [InterestingTitle, setInterestingTitle] = useState<string>('');
    const [tapUrl, setTapUrl] = useState<string>('');
    const [urlValid, setUrlValid] = useState('');
    const [isMake, setIsMake] = useState(false);

    const login = useSelector((state: RootState) => state.login);
    const linkState = useSelector((state: RootState) => state.link);

    const handleKeyboard = () => {
        Keyboard.dismiss();
    }
    const onCancer = () => {
        navigation.navigate('News');
    }
    const dispatch = useDispatch();

    const upLoad = () => {
        Keyboard.dismiss();
        setTimeout(() => {
            setIsMake(true);
        }, 50);
    }

    if (linkState.posting) {
        onCancer();
    }

    useEffect(() => {
        if (isMake) {
            setIsMake(false);
            if (!urlValid) {
                const token = login.token;
                const tags = tapTag.split(',')
                if (token) {
                    dispatch({
                        type: MAKE_LINK_REQUEST,
                        payload: { title: InterestingTitle, tag: tags, token: token, url: tapUrl }
                    })
                } else {
                }
            }
    }
        return () => {
            dispatch({
                type: MAKE_LINK_INIT
            })
        }
    }, [isMake])


    if (linkState.posting) {
        onCancer();
    }


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
                            <Title>Link Worka</Title>
                        </FlexWrapper>
                        {!linkState.fetching ?
                            <MakeButton title="MAKE" onPress={upLoad}></MakeButton>
                            :<ActivityIndicator />}
                    </TitleWrapper>
                    <InputWrapper >
                        <MakeJobTagInput
                            placeholder="Make Job Tag"
                            value={tapTag}
                            onChange={addTap(setTaptag)}
                            autoFocus={true}
                            autoCorrect={false}
                        />
                        <MakeInterestingInput
                            placeholder="Make Interesting Title"
                            value={InterestingTitle}
                            onChange={addTap(setInterestingTitle)}
                            autoFocus={true}
                            autoCorrect={false}
                        />
                        <MakeEmbed
                            placeholder="http://"
                            value={tapUrl}
                            keyboardType={keyboardType}
                            onChange={addTap(setTapUrl)}
                            onBlur={() => validCheck('url')(tapUrl, setUrlValid)}
                            valid={urlValid}
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

export default TabLink