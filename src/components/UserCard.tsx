import React from 'react'
import styled from 'styled-components/native'

import ShadowBox from './ShadowBox'
import Tag from '../components/Tag';

import { ThemeProps } from '../style/theme'

const Wrapper = styled.View`
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

const Comment = styled.Text`
    font-size:${({ theme }: ThemeProps): number => theme.smFont}px;
    color:${({ theme }: ThemeProps): string => theme.textColor};
`;

const Button = styled.Button``;

type Props = {
    username: string;
    mento: number;
    mentiee: number;
    tag: string[];
    comment: string;
    onPress: () => void;
}

const Profile = ({
    username,
    mento,
    mentiee,
    tag,
    comment,
    onPress
}: Props) => {
    return (
        <ShadowBox>
            <Wrapper>
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
                    {tag.map((el: string, index: number) =>
                        <Tag key={el} text={el} fontColor={index ? "white" : ""} />
                    )}
                </TendencyWrapper>
                <SemiTitle>Comment</SemiTitle>
                <Comment>{comment}</Comment>
            </Wrapper>
        </ShadowBox>
    )
}


export default Profile