import React from 'react'
import styled from 'styled-components/native';

import { Feeds } from "../state/Feed/Action";

import { ThemeProps } from '../style/theme';

import Tag from './Tag';

type Props = Feeds;

const Wrapper = styled.View`
    align-self:center;
    width:100%;
    max-width:${({ theme }: ThemeProps): number => theme.maxWidth}px;
    height:250px;
    padding:5px;
    box-shadow:0px 3px 6px #000;
    border-radius:8px;
    elevation:15;
`;

const ImageWrapper = styled.View`
    width:100%;
    height:180px;
    background-color:white;
    border-top-left-radius:8px;
    border-top-right-radius:8px;
    box-shadow:0px 1px 1px #000;
    border-bottom-width:1px;
    padding:2px;
    elevation:1;
`;

const Image = styled.Image`
    width:100%;
    height:100%;
    resize-mode:stretch
`;

const TextWrapper = styled.View`
    flex:1;
    padding:8px;
`;

const Title = styled.Text`
    font-size:${({ theme }: ThemeProps): number => theme.lgFont}px;
    font-weight:700;
    text-align:center;
`;

const Desc = styled.Text`
    font-size:${({ theme }: ThemeProps): number => theme.mdFont}px;
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
            <ImageWrapper>
                {images ? <Image source={{ uri: images }} /> : <TextWrapper>
                    <Title>{title}</Title>
                    <Desc>{text}</Desc>
                </TextWrapper>}
            </ImageWrapper>
            <BottomWrapper>
                <TagsWrapper>
                    {tags.map((el, index) => <Tag key={`tag-${index}`} fontColor={index ? "#FFFFFF" : 'black'} text={el} />)}
                </TagsWrapper>
                <UserTagWrapper>
                    <Tag text={username} />
                </UserTagWrapper>
            </BottomWrapper>
        </Wrapper>
    )
}
