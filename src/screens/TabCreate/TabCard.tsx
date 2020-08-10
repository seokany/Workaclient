import React, { useState, useRef, useEffect } from 'react'
import {
    Animated,
    Keyboard,
    Image,
    Platform,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ActivityIndicator,
    Alert,
    ScrollView
} from 'react-native'
import styled from 'styled-components/native'
import { MaterialCommunityIcons } from '@expo/vector-icons';

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';


import { TopTapParamList } from '../../navigator/TopNavigation';

import { useSelector, useDispatch } from 'react-redux'
import { MAKE_FEED_REQUEST, MAKE_FEED_INIT } from "../../state/Feed/Action";
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

import { HEIGHT } from '../../constants/dimensions'
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs/lib/typescript/src/types';
import Tag from "../../components/Tag";


type TopNewsNavigationProp = MaterialTopTabNavigationProp<TopTapParamList, 'News'>;

type Props = {
    navigation: TopNewsNavigationProp;
}

const Wrapper = styled.SafeAreaView``;

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

const InputWrapper = styled.View``;

const TagWrapper = styled.View`
    flex-direction:row;
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
    
`;


const TabCard = ({ navigation }: Props) => {
    const [tapTag, setTaptag] = useState('');
    const [InterestingTitle, setInterestingTitle] = useState('');
    const [image, setImage] = useState('');
    const [Description, setDescription] = useState('');
    const [animationOn, setAnimationOn] = useState(true);
    const [focusDesc, setFocusDesc] = useState(false);
    const [tagArr, setTagArr] = useState<string[]>([]);

    const slideIn = useRef(new Animated.Value(0)).current;
    const descSlide = useRef(new Animated.Value(70)).current;

    const dispatch = useDispatch();
    const login = useSelector((state: RootState) => state.login);
    const makeFeedState = useSelector((state: RootState) => state.makeFeed);

    const isIos = Platform.OS === 'ios';

    const onCancer = () => {
        dispatch({ type: MAKE_FEED_INIT });
        navigation.navigate('News');
    }
    const handleKeyboard = () => {
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
                    Alert.alert("권한 필요", "카메라 허가 필요");
                    return;
                }
            }

            const result = await ImagePicker.launchCameraAsync({
                quality: 0.5
            });
            if (!result.cancelled) {
                setImage(result.uri)
            }
        } catch (e) {
            Alert.alert("카메라 에러", "카메라 불러오기 에러");
        }
    }

    const pickImage = async () => {
        try {
            if (isIos) {
                const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
                if (status !== 'granted') {
                    Alert.alert("권한 필요", "카메라 허가 필요");
                    return;
                }
            }
            let result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.5
            });
            if (!result.cancelled) {
                setImage(result.uri)
            }
        } catch (e) {
            Alert.alert("카메라 라이브러리 에러", "카메라 라이브러리 불러오기 에러");
        }
    }

    const removeTag = (index:number) => {
        const tmp = [...tagArr];
        tmp.splice(index, 1)
        setTagArr(tmp)
    }

    const Upload = () => {
        Keyboard.dismiss();
        const token = login.token;
        if (tapTag === "") {
            Alert.alert("WORKA!", "TAG 를 작성해주세요")
        } else if (InterestingTitle === "") {
            Alert.alert("WORKA!", "TITLE 을 작성해주세오");
        } else if (image === "") {
            Alert.alert("WORKA!", "이미지를 등록해주세요")
        } else if (Description === "") {
            Alert.alert("WORKA!", "설명글을 입력해주세요~")
        } else if (tagArr.length > 3) {
            Alert.alert("WORKA!", "tag는 3개 이상 사용할 수 없습니다")
        } else if (tagArr.length === 0) {
            Alert.alert("WORKA!", "tag는 하나이상 입력해야합니다.")
        } else if (token) {
            dispatch({
                type: MAKE_FEED_REQUEST,
                payload: { title: InterestingTitle, tags: tagArr, text: Description, images: image, token: token }
            })
        } else {
            Alert.alert("WORKA!", "로그인이 필요한 기능입니다!")
        }
        setTagArr([])
    }

    if (makeFeedState.err) {
        dispatch({ type: MAKE_FEED_INIT });
    }

    if (makeFeedState.posting) {
        setTaptag('');
        setInterestingTitle('');
        setImage('');
        setDescription('');
        setAnimationOn(false);
        setFocusDesc(false);
        onCancer();
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

    useEffect(() => {
        return () => {
            dispatch({ type: MAKE_FEED_INIT });
        }
    }, []);

    useEffect(() => {
        const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
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
        <OsView style={{ backgroundColor: "#FFFFFF" }}>
            <TouchableWithoutFeedback onPress={handleKeyboard}>
                <Wrapper>
                    <ScrollView>
                        <TitleWrapper>
                            <CancerButton
                                title="CANCER"
                                onPress={() => onCancer()}
                            />
                            <FlexWrapper>
                                <Title>Card Worka</Title>
                            </FlexWrapper>
                            {!makeFeedState.fetching ?
                                <MakeButton title="MAKE" onPress={() => Upload()}></MakeButton>
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
                            <Animated.View style={{ height: slideIn, overflow: 'hidden' }}>
                                <MakeCameraInput>
                                    <TouchableOpacity onPress={camera}>
                                        <Iconwrapper >
                                            <Image
                                                source={require('../../../assets/camera-enhance-outline.png')}
                                            />
                                            {/* <Title>카메라</Title> */}
                                        </Iconwrapper>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={pickImage}>
                                        <Iconwrapper>
                                            <Image
                                                source={require('../../../assets/folder-image.png')}
                                            />
                                            {/* <Title>갤러리</Title> */}
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
                            <Animated.View style={{ height: descSlide, elevation: 10 }}>
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
const MakeCameraInput = styled.View`
    flex:1;
    flex-direction: row;
    align-items: center;
    justify-content:space-around;
    padding:0px 5px;
`

export default TabCard