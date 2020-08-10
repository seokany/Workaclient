import React, { useState, useEffect } from 'react'
import { Alert, TouchableOpacity, TextInput, View, Image, Platform } from 'react-native';
import styled from 'styled-components/native'

import ShadowBox from './ShadowBox'
import Tag from '../components/Tag';

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import { ThemeProps } from '../style/theme'
import { PATCH_COMMENTS_REQUEST, PATCH_PROFILE_IMAGES_REQUEST } from '../state/Profile/Action';
import { user } from '../state/Profile/Types'
import ModifySvg from '../../assets/Modify.svg'
import { RootState } from '../state';
import { useDispatch, useSelector } from 'react-redux';

const Wrapper = styled.View`
    width:100%;
    max-width:${({ theme }: ThemeProps): number => theme.maxWidth}px;
    align-self:center;
`;

const WrapperPadding = styled.View`
   padding:20px 26px;
`;

const ProfileWrapper = styled.View`
    flex-direction:row;
    margin-bottom:10px;
`;

const AvatarWrapper = styled.View`
    width:40px;
    height:40px;
    border-radius:800px;
    border:1px solid black;
    overflow:hidden;
`

const InfoWrapper = styled.View`
    flex:1;
    padding:0px 14px;
    margin-top: 10px;
`;

const CommentWrapper = styled.View`
    width:100%;
    flex-direction:row;
    margin-bottom:5px;
`;

const ModifySvgWrapper = styled.View`
    margin-left:10px;
`;

const NameText = styled.Text`
    font-size:${({ theme }: ThemeProps): number => theme.lgFont}px;
    color:${({ theme }: ThemeProps): string => theme.textColor};
    font-weight:700;
`;

const DescText = styled.Text`
    font-size:${({ theme }: ThemeProps): number => theme.mdFont}px;
    color:${({ theme }: ThemeProps): string => theme.textColor};
    margin-right:14px;
`;

const SemiTitle = styled.Text`
    font-size:${({ theme }: ThemeProps): number => theme.mdFont}px;
    color:${({ theme }: ThemeProps): string => theme.textColor};
    font-weight:700;
`;

const TendencyWrapper = styled.View`
    flex-direction:row;
    margin:3px 0px;
`;

const CommentButtonWrapper = styled.View`
    flex-direction:row;
    justify-content:flex-end;
    padding-top:10px;
    padding-right:10px;
`;

const Comment = styled.Text`
    font-size:${({ theme }: ThemeProps): number => theme.smFont}px;
    color:${({ theme }: ThemeProps): string => theme.textColor};
`;

const Button = styled.Button``;
interface Props extends user {
    onPress: () => void;
}

const Profile = ({
    pk,
    username,
    mento,
    mentiee,
    mbti,
    comments,
    user_image,
    onPress
}: Props) => {
    const dispatch = useDispatch();
    const loginState = useSelector((state: RootState) => state.login);
    const profileState = useSelector((state: RootState) => state.profile);

    const [isModifyComment, setIsModifyComment] = useState<boolean>(false);
    const [inputComment, setInputComment] = useState(comments);

    const [modifyImage, setModifyImge] = useState("");
    const isIos = Platform.OS === 'ios';

    const handleComment = () => {
        setIsModifyComment(true);
    }

    const handleChange = (e: string) => {
        if (e.length <= 50) {
            setInputComment(e);
        }
    }

    const handleModify = (type: 'change' | 'cancel') => () => {
        if (type === 'change') {
            if (comments !== inputComment) {
                dispatch({ type: PATCH_COMMENTS_REQUEST, payload: { token: loginState.token, comment: inputComment } })
            }
        } else {
            setInputComment(profileState.data.user.comments);
        }
        setIsModifyComment(false);
    }

    const handleAvatar = () => {
        if (pk === loginState.data.pk) {
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

    const patchImage = (images: string) => {
        dispatch({ type: PATCH_PROFILE_IMAGES_REQUEST, payload: { token: loginState.token, images: images, pk: loginState.data.pk } })
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
                setModifyImge(result.uri)
                patchImage(result.uri);
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
                setModifyImge(result.uri)
                patchImage(result.uri);
            }
        } catch (e) {
            Alert.alert("카메라 라이브러리 에러", "카메라 라이브러리 불러오기 에러");
        }
    }

    const image = user_image || modifyImage

    useEffect(() => {
        setInputComment(comments);
    }, [comments])

    return (
        <Wrapper>
            <ShadowBox>
                <WrapperPadding>
                    <ProfileWrapper>
                        <TouchableOpacity onPress={handleAvatar}>
                            <AvatarWrapper>
                                {image !== "" && <Image style={{ width: "100%", height: "100%" }} source={{ uri: image }} />}
                            </AvatarWrapper>
                        </TouchableOpacity>
                        <InfoWrapper>
                            <NameText>{username}</NameText>
                        </InfoWrapper>
                        {pk === loginState.data.pk && <Button title="Setting" onPress={() => onPress()} />}
                    </ProfileWrapper>
                    <SemiTitle>Tendency</SemiTitle>
                    <TendencyWrapper>
                        <Tag text={mbti} fontColor={"white"} />
                    </TendencyWrapper>
                    <CommentWrapper>
                        <SemiTitle>Comment</SemiTitle>
                        {pk === loginState.data.pk &&
                            <ModifySvgWrapper>
                                {isModifyComment
                                    ?
                                    <Comment>{inputComment.length}/50</Comment>
                                    :
                                    <TouchableOpacity onPress={handleComment}>
                                        <ModifySvg />
                                    </TouchableOpacity>
                                }
                            </ModifySvgWrapper>
                        }
                    </CommentWrapper>
                    {isModifyComment
                        ?
                        <View style={{}}>
                            <TextInput style={{ borderWidth: 1, borderRadius: 8, fontSize: 12, padding: 5 }} value={inputComment} onChangeText={handleChange} maxLength={50} autoCorrect={false} />
                            <CommentButtonWrapper>
                                <TouchableOpacity style={{ marginRight: 10 }} onPress={handleModify('change')}>
                                    <Comment>수정</Comment>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleModify('cancel')}>
                                    <Comment>취소</Comment>
                                </TouchableOpacity>
                            </CommentButtonWrapper>
                        </View>
                        :
                        <Comment>{inputComment}</Comment>
                    }
                </WrapperPadding>
            </ShadowBox>
        </Wrapper>
    )
}


export default Profile