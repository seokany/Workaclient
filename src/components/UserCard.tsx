import React, { useState, useEffect } from 'react'
import styled from 'styled-components/native'

import ShadowBox from './ShadowBox'
import Tag from '../components/Tag';

import { ThemeProps } from '../style/theme'
import { user, PATCH_COMMENTS_REQUEST } from '../state/Profile/Action';
import ModifySvg from '../../assets/Modify.svg'
import { TouchableOpacity, TextInput, View } from 'react-native';
import { RootState } from '../reducers';
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
`

const InfoWrapper = styled.View`
    flex:1;
    padding:0px 14px;
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
    username,
    mento,
    mentiee,
    mbti,
    comments,
    onPress
}: Props) => {

    const dispatch = useDispatch();
    const loginState = useSelector((state: RootState) => state.login);

    const [isModifyComment, setIsModifyComment] = useState<boolean>(false);
    const [inputComment, setInputComment] = useState(comments);

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
            setInputComment(comments);
        }
        setIsModifyComment(false);
    }

    return (
        <Wrapper>
            <ShadowBox>
                <WrapperPadding>
                    <ProfileWrapper>
                        <AvatarWrapper></AvatarWrapper>
                        <InfoWrapper>
                            <NameText>{username}</NameText>
                            <NameText><DescText>Mento: {mento}  </DescText><DescText>  Mentiee: {mentiee}</DescText></NameText>
                        </InfoWrapper>
                        <Button title="Setting" onPress={() => onPress()} />
                    </ProfileWrapper>
                    <SemiTitle>Tendency</SemiTitle>
                    <TendencyWrapper>
                        <Tag text={mbti} fontColor={"white"} />
                    </TendencyWrapper>
                    <CommentWrapper>
                        <SemiTitle>Comment</SemiTitle>
                        <ModifySvgWrapper>
                            {isModifyComment ? <Comment>{inputComment.length}/50</Comment> :
                                <TouchableOpacity onPress={handleComment}>
                                    <ModifySvg />
                                </TouchableOpacity>
                            }
                        </ModifySvgWrapper>
                    </CommentWrapper>
                    {isModifyComment ?
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