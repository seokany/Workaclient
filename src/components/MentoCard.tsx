import React from 'react'
import styled from 'styled-components/native';

import { Feeds } from "../state/Feed/Action";

import { ThemeProps } from '../style/theme';

import Tag from './Tag';

type Props = Feeds;

const Wrapper = styled.View`
    width:100%;
    max-width:${({ theme }: ThemeProps): number => theme.maxWidth}px;
    padding:5px;
    box-shadow:0px 3px 6px #000;
    border-radius:8px;
    elevation:15;
`;

const TopWrapper = styled.View`
    align-items: flex-start;
    width: 100%;
    elevation: 1;
    background-color: white;
    border-top-left-radius:8px;
    border-top-right-radius:8px;
    padding: 4px;
    
`;

const ImageWrapper = styled.View`
    width:100%;
    height:180px;
    background-color: white;
    elevation:1;
    padding-top:3px;
`;

const Image = styled.Image`
    width:100%;
    height: 180px;
`;

const TextWrapper = styled.View`
    flex:1;
    padding:8px;
`;

const Title = styled.Text`
    font-size:${({ theme }: ThemeProps): number => theme.mainTitleFont}px;
    font-weight:700;
    text-align:center;
`;

const Desc = styled.Text`
    line-height:16px;
`;

const BottomWrapper = styled.View`
    border-bottom-left-radius:8px;
    border-bottom-right-radius:8px;
    background-color:white;
    padding:11px;
    justify-content:space-around;
`;

const TagsWrapper = styled.View`
    flex-direction:row;
    flex-wrap:wrap;
    margin-bottom: 4px;
`;

const UserTagWrapper = styled.View`
    flex-direction:row;
    justify-content:space-between;
`;

export default function MentoCard({
    id,
    author: {
        username,
    },
    title,
    images,
    text,
    tags,
    // company,
}: Props) {
    return (
        <Wrapper>
            <TopWrapper>
                <Title style={{padding: 3, paddingLeft: 5}}>{title}</Title>
            </TopWrapper>
            <ImageWrapper>
                {images ? <Image source={{ uri: images || '' }} /> : <TextWrapper>
                    <Desc>{text}</Desc>
                </TextWrapper>}
            </ImageWrapper>
            <BottomWrapper>
                <TagsWrapper>
                    {tags.map((el, index) => <Tag key={`tag-${index}`} fontColor={index ? "white" : 'black'} text={el} />)}
                </TagsWrapper>
                <UserTagWrapper>
                    <Tag text={username} />
                </UserTagWrapper>
            </BottomWrapper>
        </Wrapper>
    )
}
