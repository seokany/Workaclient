import React, { useState }from 'react'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import styled from 'styled-components/native';

import CancerButton from '../../components/CancerButton'
import MakeJobTagInput from "../../components/MakeJobTagInput"
import MakeInterestingInput from "../../components/MakeInterestingInput"
import MakeEmbed from "../../components/MakeEmbed"
import MakeButton from "../../components/MakeButton"
import OsView from "../../components/OsView"
import addTap from "../../constants/addTap"
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';

type TopNewsNavigationProp = MaterialTopTabNavigationProp<TopTapParamList, 'News'>;

type Props = {
    onPress:() => void;
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
    }:Props) => {
    


    const [tapTag, setTaptag] = useState('');
    const [InterestingTitle, setInterestingTitle] = useState<string>('');
    const [tapUrl, setTapUrl] = useState<string>('')
    
    const handleKeyboard  = () => {
        Keyboard.dismiss();
    }
    const onCancer = () => {
        navigation.navigate('News');
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
                        <MakeButton title="MAKE" onPress={() => onPress()}></MakeButton>
                    </TitleWrapper>
                    <InputWrapper >
                        <MakeJobTagInput 
                            placeholder="Make Job Tag"
                            value={tapTag}
                            onChange = {addTap(setTaptag)}
                            autoFocus = { true }
                        />
                        <MakeInterestingInput
                            placeholder="Make Interesting Title"
                            value={InterestingTitle}
                            onChange={addTap(setInterestingTitle)}
                            autoFocus = {true}
                        />
                        <MakeEmbed
                            placeholder="http://"    
                            value={tapUrl}
                            keyboardType = {keyboardType}
                            onChange={addTap(setTapUrl)}
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