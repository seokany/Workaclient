import React, { useState }from 'react'
import { Keyboard, TouchableWithoutFeedback, Text, View, Image } from 'react-native'
import styled from 'styled-components/native'
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';


import MakeJobTagInput from "../../components/MakeJobTagInput"
import MakeCardDescriptionInput from "../../components/MakeCardDescriptionInput";
import MakeInterestingInput from "../../components/MakeInterestingInput"
import MakeButton from "../../components/MakeButton"
import CancerButton from '../../components/CancerButton'
import OsView from "../../components/OsView"
import addTap from "../../constants/addTap"
import {Avatar} from "react-native-elements";
import {useDispatch} from "react-redux";
import {MAKE_FEED_REQUEST} from "../../state/Feed/Action";
import AsyncStorage from "@react-native-community/async-storage";
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';

type TopNewsNavigationProp = MaterialTopTabNavigationProp<TopTapParamList, 'News'>;

type Props = {
    navigation: TopNewsNavigationProp;
}

const Wrapper = styled.SafeAreaView`
    flex:1;
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


const TabCard: React.FC = ({navigation}:Props) => {

    const [tapTag, setTaptag] = useState('');
    const [InterestingTitle, setInterestingTitle] = useState('');
    const [image, setImage] = useState('');
    const [Description, setDescription] = useState('');
    const dispatch = useDispatch();
    const isIos = Platform.OS === 'ios';

    const onCancer = () => {
        navigation.navigate('News');
    }

    const handleKeyboard  = () => {
        Keyboard.dismiss();
    }
    const onBlur = () => {

    }
    const onFocus = () => {

    }
    const camera = async () => {
        try {
            if (Constants.platform.ios) {
                const { status } = await Permissions.askAsync(Permissions.CAMERA);
                if (status !== 'granted') {
                    alert("카메라 허가 필요");
                    return;
                }
            }

            const result = await ImagePicker.launchCameraAsync();
            if (!result.cancelled) {
                setImage(result.uri)
            }
        } catch (e) {
            console.log(e);
            alert("카메라 에러");
        }
    }

    const pickImage = async () => {
        try {
            if (Constants.platform.ios) {
                const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
                if (status !== 'granted') {
                    alert("카메라 허가 필요");
                    return;
                }
            }
            let result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3],
            });
            if (!result.cancelled) {
                setImage(result.uri)
            }
        }catch(e){
            console.log(e);
            alert("카메라 라이브러리 에러");
        }
    }


    const Upload = () => {
        const token = AsyncStorage.getItem('token')
        if(token) {
            dispatch({
                type: MAKE_FEED_REQUEST,
                payload: {title: InterestingTitle, tags: tapTag, text: Description, images : image, token: token}
            })
        }else{
            console.log('토큰이 존재하지 않음')
        }
    }
    

    return (
        <OsView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
            <Wrapper>
                <TitleWrapper>
                    <CancerButton 
                        title="CANCER"
                        onPress={() => onCancer()}
                    />
                    <FlexWrapper>
                        <Title>Card Worka</Title>
                    </FlexWrapper>
                    <MakeButton title="MAKE" onPress={() => Upload()}></MakeButton>
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
                    <MakeCameraInput>
                        <Avatar
                            size="medium"
                            title="C"
                            onPress={camera}
                            source={{ }}   
                        />
                        <Avatar
                            size="medium"
                            title="D"
                            onPress={pickImage}
                            source={{ }}
                        />
                        {image !== '' && <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />}
                    
                    </MakeCameraInput>
                    <MakeCardDescriptionInput 
                        multiline
                        numberOfLines={4}
                        placeholder="Make Card Description" 
                        value={Description} 
                        onChange={addTap(setDescription)} 
                        onBlur={() => onBlur()}/>
                </InputWrapper>
            </Wrapper>
        </OsView>
    )
}
const FlexWrapper = styled.View`
    flex: 1;
    align-items: center;
`;
const MakeCameraInput = styled.View`
    flex-direction: row;
    align-content: center;

`

export default TabCard