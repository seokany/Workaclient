import React, { useState, useEffect } from 'react'
import { TouchableOpacity, ScrollView, TouchableWithoutFeedback, TextInput, Platform, Alert } from 'react-native'
import styled from 'styled-components/native';
import Tag from './Tag';
import { ThemeProps } from '../style/theme';

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import Xsvg from '../../assets/X_1.svg';
import { Feeds, PATCH_FEED_REQUEST, PATCH_FEED_INIT, DELETE_FEED_REQUEST, DELETE_FEED_INIT } from '../state/Feed/Action';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers';
import { PROFILE_REQUEST } from '../state/Profile/Action';
import { StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import { SearchStackParamList } from '../navigator/SeachNavigation';

interface Props extends Feeds {
    visible: boolean;
    navigation?: StackNavigationProp<SearchStackParamList, 'Home'>;
    onPress: () => void;
}

const ModalWrapper = styled.Modal``;

const Wrapper = styled.SafeAreaView`
    width:100%;
    height:100%;
    background-color:rgba(112,112,112,0.9);
    justify-content:center;
    align-items:center;
    padding:0px 15px;
`;

const CloseWrapper = styled.View`
    width:100%;
    max-width:${({ theme }: ThemeProps): number => theme.maxWidth}px;
    align-items:flex-end;
    margin-bottom: 3px;
`;

const CloseView = styled.View`
    width:40px;
    height:40px;
    padding:2px;
    align-items:flex-end;
    justify-content:flex-end;
`;

const DetailWrapper = styled.View`
    border-radius: 8px;
    width:100%;
    max-height:70%;
    max-width:${({ theme }: ThemeProps): number => theme.maxWidth}px;
    background-color:${({ theme }: ThemeProps): string => theme.detailTag}
    
`;

const ScrollWrapper = styled.View``;

const ImageWrapper = styled.View`
    width:100%;
    height:240px;
`;

const TextWrapper = styled.View`
    align-items: flex-start;
    padding:4px;
`;

const Image = styled.Image`
    border-top-left-radius:8px;
    border-top-right-radius:8px;
    width:100%;
    height:100%;
    resize-mode:stretch;
`;

const BodyWrapper = styled.View`
    margin-top:0px;
    width:100%;
`;

const TagWrapper = styled.View`
    width:100%;
    padding:0px 5px;
    flex-wrap:wrap;
    flex-direction:row;
`;

const TitleView = styled.View`
    
`;
const EditWrapper = styled.View`
    border:1px solid black;
    border-radius:8px;
    padding:10px;
`;


const Title = styled.Text`
    font-size:14px;
    text-align:left;
    font-weight: 700;
    color: #554C4C;
    line-height: 20px;
    margin-top: 8px;
    margin-bottom:5px;
    margin-left: 8px;
`;

const Desc = styled.Text`
    font-size:${({ theme }: ThemeProps): number => theme.lgFont}px;
    line-height:12px;
    margin-left: 8px;
    padding-top: 3px;
    padding-bottom: 3px;
    margin-top: 5px;
    margin-bottom: 12px;
`;

const EditText = styled.Text`
    color:yellow;
`;

export default function DetailModal({
    id,
    author: {
        username,
        pk
    },
    title,
    images,
    text,
    tags,
    visible,
    navigation,
    onPress
}: Props) {
    const loginState = useSelector((state: RootState) => state.login);
    const patchFeedState = useSelector((state: RootState) => state.patchFeed);
    const deleteFeedState = useSelector((state: RootState) => state.deleteFeed);
    const dispatch = useDispatch();

    const isMe = loginState.data.pk === pk;
    const isIos = Platform.OS === 'ios';
    const [inputState, setInputState] = useState({
        title: "",
        text: "",
        images: "",
        tags: ""
    })
    const [isEdit, setIsEdit] = useState<boolean>(false);


    const handleText = (type: 'title' | 'text' | 'tags') => (e: string) => {
        setInputState({
            ...inputState,
            [type]: e
        })
    }

    const handleImages = () => {
        if (isEdit) {
            Alert.alert(
                "이미지 수정",
                "이미지를 수정하시겠습니까?",
                [
                    {
                        text: "카메라",
                        onPress: camera
                    },
                    {
                        text: "사진첩",
                        onPress: pickImage
                    },
                    {
                        text: "취소"
                    }
                ]
            )
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
                setInputState({
                    ...inputState,
                    images: result.uri
                })
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
                setInputState({
                    ...inputState,
                    images: result.uri
                })
            }
        } catch (e) {
            Alert.alert("카메라 라이브러리 에러", "카메라 라이브러리 불러오기 에러");
        }
    }

    const handleUpdate = () => {
        const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
        const tagsValid = inputState.tags.trim().replace(/,/gi, '').replace(regExp, '').replace(/\s{2,}/gi, ' ').split(' ')
        dispatch({
            type: PATCH_FEED_REQUEST, payload: {
                title: inputState.title,
                text: inputState.text,
                images: inputState.images,
                tags: tagsValid,
                id: id,
                token: loginState.token,
            }
        });
        setIsEdit(false);
    }

    const handleDelete = () => {
        Alert.alert(
            "WORKA!",
            "게시글을 정말 삭제하겠습니까?",
            [
                {
                    text: "삭제",
                    onPress: () => dispatch({ type: DELETE_FEED_REQUEST, payload: { id, token: loginState.token } })
                },
                {
                    text: "취소"
                }
            ]
        )
    }

    const handleError = () => {
        Alert.alert("WORKA!", "올바르지 않은 접근입니다. 다시 시도해주세요");
        onPress();
    }
    const deleteInit = () => {
        onPress();
        dispatch({ type: PROFILE_REQUEST, payload: { token: loginState.token, pk: loginState.data.pk } });
        dispatch({ type: DELETE_FEED_INIT });
    }

    if (deleteFeedState.posting) {
        Alert.alert("WORKA!", "유저카드가 삭제되었습니다.", [
            {
                text: "확인",
                onPress: deleteInit
            }
        ]);
    }
    if (patchFeedState.posting) {
        dispatch({ type: PROFILE_REQUEST, payload: { token: loginState.token, pk: loginState.data.pk } });
        dispatch({ type: PATCH_FEED_INIT });
    }

    if (patchFeedState.err) {
        handleError()
        dispatch({ type: PATCH_FEED_INIT });
    }
    if (deleteFeedState.err) {
        handleError()
        dispatch({ type: DELETE_FEED_INIT });
    }

    useEffect(() => {
        if (visible) {
            setIsEdit(false);
            setInputState({
                title,
                text,
                images,
                tags: tags.join(" "),
            })
        }
    }, [visible])


    return (
        <ModalWrapper visible={visible} transparent={true} onRequestClose={onPress} >
            <TouchableWithoutFeedback onPress={onPress}>
                <Wrapper>
                    <CloseWrapper>
                        <TouchableOpacity onPress={onPress} style={{}}>
                            <CloseView>
                                <Xsvg style={{}} />
                            </CloseView>
                        </TouchableOpacity>
                    </CloseWrapper>
                    <DetailWrapper>
                        <ScrollView>
                            <ScrollWrapper onStartShouldSetResponder={() => true}>
                                <TouchableWithoutFeedback onPress={handleImages}>
                                    <ImageWrapper>
                                        <Image source={{ uri: inputState.images || images || '' }} style={{ width: '100%', height: '100%' }} />
                                    </ImageWrapper>
                                </TouchableWithoutFeedback>
                                <BodyWrapper>
                                    <TextWrapper>
                                    </TextWrapper>
                                    {isEdit ?
                                        <EditWrapper>
                                            <TextInput value={inputState.tags} onChangeText={handleText('tags')} />
                                        </EditWrapper>
                                        :
                                        <TagWrapper >
                                            {inputState.tags.split(' ').map((el: string, index: number) => <Tag key={`tag-${index}`} text={el} fontColor="#FA5080" />)}
                                        </TagWrapper>
                                    }
                                    <TagWrapper style={{ justifyContent: "space-between" }}>
                                        <TouchableOpacity onPress={() => {
                                            onPress();
                                            navigation && navigation.navigate('Profile', { pk });
                                        }}>
                                            <Tag text={username} fontColor="#2C4F71" />
                                        </TouchableOpacity>
                                        {isMe &&
                                            (isEdit ?
                                                <>
                                                    <TouchableOpacity onPress={handleUpdate} >
                                                        <EditText>수정, 등록</EditText>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={handleDelete}>
                                                        <EditText>삭제</EditText>
                                                    </TouchableOpacity>
                                                </>
                                                :
                                                <TouchableOpacity onPress={() => setIsEdit(!isEdit)}>
                                                    <EditText>edit</EditText>
                                                </TouchableOpacity>)
                                        }
                                    </TagWrapper>
                                    {isEdit ?
                                        <EditWrapper>
                                            <TextInput value={inputState.title} onChangeText={handleText('title')} />
                                        </EditWrapper>
                                        :
                                        <Title>{inputState.title}</Title>
                                    }
                                    {isEdit ?
                                        <EditWrapper>
                                            <TextInput value={inputState.text} onChangeText={handleText('text')} />
                                        </EditWrapper>
                                        :
                                        <Desc style={{ color: "white" }}>{inputState.text}</Desc>
                                    }
                                </BodyWrapper>
                            </ScrollWrapper>
                        </ScrollView>
                    </DetailWrapper>
                </Wrapper>
            </TouchableWithoutFeedback>
        </ModalWrapper>
    )
}
