import React, { useState }from 'react'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import styled from 'styled-components/native';

import MakeJobTagInput from "../../components/MakeJobTagInput"
import MakeInterestingInput from "../../components/MakeInterestingInput"
import MakeButton from "../../components/MakeButton"
import CancerButton from '../../components/CancerButton'
import OsView from "../../components/OsView"
import addTap from "../../constants/addTap"


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


const TabLink = () => {
    
    const [tapTag, setTaptag] = useState('');
    const [InterestingTitle, setInterestingTitle] = useState<string>('');
    
    const handleKeyboard  = () => {
        Keyboard.dismiss();
    }

    


    return (
        <OsView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
            <Wrapper>
                <TitleWrapper>
                    <CancerButton title="CANCER"></CancerButton>
                    <FlexWrapper>
                        <Title>Link Worka</Title>
                    </FlexWrapper>
                    <MakeButton title="MAKE"></MakeButton>
                </TitleWrapper>
                <InputWrapper>
                    <MakeJobTagInput 
                        placeholder="Make Job Tag"
                        value={tapTag}
                        onChange = {addTap(setTaptag)}
                        autoFocus = { true }
                        onPress={handleKeyboard}
                        
                    />
                    <MakeInterestingInput
                        placeholder="Make Interesting Title"
                        value={InterestingTitle}
                        onChange={addTap(setInterestingTitle)}
                        autoFocus = {true}
                    />
                </InputWrapper>
            </Wrapper>
        </OsView>
    )
}
const FlexWrapper = styled.View`
    flex: 1;
    align-items: center;
`;

export default TabLink