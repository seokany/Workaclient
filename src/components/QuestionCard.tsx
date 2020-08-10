import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import styled from 'styled-components/native'

import ShadowBox from './ShadowBox'
import Tag from './Tag'
import { ThemeProps } from '../style/theme';

type Props = {
    desc: string;
    question_count: number;
    image: string;
    tags: string[];
    username: string;
}

const Wrapper = styled.View`
    width:100%;
    max-width:${({ theme }: ThemeProps): number => theme.maxWidth}px;
    align-self:center;
`;

const HeaderWrapper = styled.View`
    flex-direction:row;
    flex:1;
`;

const DescWrapper = styled.View`
    flex:1;
    margin:15px 0px;
    justify-content:space-around;
`;

const Image = styled.Image`
    width:64px;
    height:64px;
`;

const Desc = styled.Text`
    font-size:${({ theme }: ThemeProps): number => theme.mdFont}px;
    color:${({ theme }: ThemeProps): string => theme.textColor};
    text-align:center;
`;

const BottomWrapper = styled.View`
    flex:1;
    padding:15px;
    justify-content:space-around;
`;

const TagWrapper = styled.View`
    padding:3px 0px;
    flex-direction:row;
`;

export default function QuestionCard({
    desc,
    question_count,
    image,
    tags,
    username
}: Props) {
    return (
        <Wrapper>
            <ShadowBox semi={"top"}>
                <HeaderWrapper>
                    <DescWrapper>
                        <Desc>{desc}</Desc>
                        <Desc>질문 갯수: {question_count}</Desc>
                    </DescWrapper>
                    <Image source={{ uri: image }} />
                </HeaderWrapper>
            </ShadowBox>
            <ShadowBox semi={"bottom"}>
                <BottomWrapper>
                    <TagWrapper>
                        {tags.map((el: string, index: number) => <Tag key={`tag-${index}`} fontColor={index ? "#FFFFFF" : "black"} text={el} />)}
                    </TagWrapper>
                    <TagWrapper>
                        <Tag fontColor="black" text={username} />
                    </TagWrapper>
                </BottomWrapper>
            </ShadowBox>
        </Wrapper>
    )
}

const styles = StyleSheet.create({})
