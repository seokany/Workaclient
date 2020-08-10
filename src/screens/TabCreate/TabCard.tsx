import React, { useState, useRef, useEffect } from 'react'
import { Animated, Keyboard, Image, Platform, TouchableOpacity , TouchableWithoutFeedback} from 'react-native'
import styled from 'styled-components/native'

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';
import { TopTapParamList } from '../../navigator/TopNavigation';

import { useSelector, useDispatch } from 'react-redux'
import { MAKE_FEED_REQUEST } from "../../state/Feed/Action";
import { RootState } from '../../reducers';
import { ThemeProps } from '../../style/theme';

import DownArrow from '../../../assets/DownArrow.svg';
import UpArrow from '../../../assets/UpArrow.svg';

import MakeJobTagInput from "../../components/MakeJobTagInput"
import MakeCardDescriptionInput from "../../components/MakeCardDescriptionInput";
import MakeInterestingInput from "../../components/MakeInterestingInput"
import MakeButton from "../../components/MakeButton"
import CancerButton from '../../components/CancerButton'
import OsView from "../../components/OsView"
import addTap from "../../constants/addTap"


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
`;

const ImageToggleWrapper = styled.View`
    height:30px;
    width:100%;
    max-width:${({ theme }: ThemeProps): number => theme.maxWidth}px;
    margin-bottom:8px;
    justify-content:center;
    align-items:center;
    box-shadow:0px 3px 6px #000;
    elevation:6;
    background-color:${({ theme }: ThemeProps): string => theme.white};
`;

const Iconwrapper = styled.View`
    border:1px solid black;
`;


const TabCard = ({ navigation }: Props) => {
    const [tapTag, setTaptag] = useState('');
    const [InterestingTitle, setInterestingTitle] = useState('');
    const [image, setImage] = useState('');
    const [Description, setDescription] = useState('');
    const [animationOn, setAnimationOn] = useState(false);
    const [focusDesc, setFocusDesc] = useState(false);

    const slideIn = useRef(new Animated.Value(0)).current;
    const descSlide = useRef(new Animated.Value(70)).current;

    const dispatch = useDispatch();
    const login = useSelector((state: RootState) => state.login);

    const isIos = Platform.OS === 'ios';

    const onCancer = () => {
        navigation.navigate('News');
    }
    const handleKeyboard  = () => {
        Keyboard.dismiss();
    }

    const handleCameraWrapper = () => {
        setAnimationOn(!animationOn);
        Keyboard.dismiss();
    }

    const handleDescInput = () => {
        setFocusDesc(true);
        if (animationOn) {
            setAnimationOn(false);
        }
    }

    const camera = async () => {
        try {
            if (isIos) {
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
            if (isIos) {
                const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
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
        } catch (e) {
            console.log(e);
            alert("카메라 라이브러리 에러");
        }
    }

    useEffect(() => {
        if (animationOn) {
            Animated.timing(slideIn, {
                toValue: 200,
                duration: 500
            }).start();
        } else {
            Animated.timing(slideIn, {
                toValue: 0,
                duration: 500
            }).start();
        }
    }, [animationOn]);

    useEffect(() => {
        if (focusDesc) {
            Animated.timing(descSlide, {
                toValue: 400,
                duration: 500
            }).start();
        } else {
            Animated.timing(descSlide, {
                toValue: 60,
                duration: 500
            }).start();
        }
    }, [focusDesc])

    const Upload = () => {
        Keyboard.dismiss();
        const token = login.token;
        console.log("TAB CARD TOKEN IS ", token);
        if (token) {
            dispatch({
                type: MAKE_FEED_REQUEST,
                payload: { title: InterestingTitle, tags: tapTag.replace( /\s/gi, ','), text: Description, images: image, token: token }
            })
        } else {
            console.log('토큰이 존재하지 않음')
        }
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
                            <Title>Card Worka</Title>
                        </FlexWrapper>
                        <MakeButton title="MAKE" onPress={() => Upload()}></MakeButton>
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
                        <Animated.View style={{ height: slideIn, overflow: 'hidden' }}>
                            <MakeCameraInput>
                                <TouchableOpacity onPress={camera}>
                                    <Iconwrapper >
                                        <Title>카메라</Title>
                                    </Iconwrapper>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={pickImage}>
                                    <Iconwrapper>
                                        <Title>갤러리</Title>
                                    </Iconwrapper>
                                </TouchableOpacity>
                                {image !== '' && <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />}
                            </MakeCameraInput>
                        </Animated.View>
                        <TouchableOpacity onPress={handleCameraWrapper}>
                            <ImageToggleWrapper>
                                {animationOn ? <UpArrow /> : <DownArrow />}
                            </ImageToggleWrapper>
                        </TouchableOpacity>
                        <Animated.View style={{ height: descSlide, elevation: 6 }}>
                            <MakeCardDescriptionInput
                                multiline
                                numberOfLines={4}
                                placeholder="Make Card Description"
                                value={Description}
                                onChange={addTap(setDescription)}
                                onBlur={() => setFocusDesc(false)}
                                onFocus={handleDescInput}
                            />
                        </Animated.View>
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
const MakeCameraInput = styled.View`
    flex:1;
    flex-direction: row;
    align-items: center;
    justify-content:space-around;
    padding:0px 5px;
`

export default TabCard