import React from 'react'
import { TouchableWithoutFeedback, TouchableOpacity, ScrollView } from 'react-native'
import styled from 'styled-components/native';
import Tag from './Tag';
import { ThemeProps } from '../style/theme';

import Xsvg from '../../assets/X_1.svg';

type Props = {
    visible: boolean;
    image: string | null;
    title: string;
    tags: string[];
    username: string;
    company: string;
    desc: string;
    onPress: () => void;
}

const ModalWrapper = styled.Modal``;

const Wrapper = styled.View`
    width:100%;
    height:100%;
    background-color:rgba(112,112,112,0.5);
    justify-content:center;
    align-items:center;
    padding:0px 30px;
`;

const CloseWrapper = styled.View`
    width:100%;
    max-width:320px;
    align-items:flex-end;
    padding:2px;
`;

const DetailWrapper = styled.View`
    width:100%;
    max-height:50%;
    max-width:320px;
    background-color:${({ theme }: ThemeProps): string => theme.detailBg}
    padding:2px;
`;

const ScrollWrapper = styled.View``;

const ImageWrapper = styled.View`
    width:100%;
    height:240px;
    padding:5px;
`;

const Image = styled.Image`
    width:100%;
    height:100%;
    resize-mode:stretch;
`;

const BodyWrapper = styled.View`
    margin-top:5px;
    width:100%;
`;

const TagWrapper = styled.View`
    width:100%;
    padding:0px 15px;
    flex-wrap:wrap;
    flex-direction:row;
`;

const TitleView = styled.View`
    margin:10px 0px;
`;

const Title = styled.Text`
    font-size:20px;
    text-align:center;
`;

const Desc = styled.Text`
    font-size:${({ theme }: ThemeProps): number => theme.smFont}px;
    line-height:12px;
`;

export default function DetailModal({ visible, image, title = "타이틀 테스트", tags, username, company, desc, onPress }: Props) {
    console.log(visible, image);
    return (
        <ModalWrapper visible={visible} transparent={true} >
            <Wrapper>
                <CloseWrapper>
                    <TouchableOpacity onPress={onPress} style={{}}>
                        <Xsvg />
                    </TouchableOpacity>
                </CloseWrapper>
                <TouchableWithoutFeedback>
                    <DetailWrapper>
                        <ScrollView>
                            <ScrollWrapper onStartShouldSetResponder={() => true}>
                                {image ? <ImageWrapper><Image source={{ uri: image }} style={{ width: '100%', height: '100%' }} /></ImageWrapper> : <TitleView><Title>{title}</Title></TitleView>}
                                <BodyWrapper>
                                    <TagWrapper >
                                        {tags.map((el: string, index: number) => <Tag key={`tag-${index}`} text={el} fontColor="#FFFFFF" />)}
                                    </TagWrapper>
                                    <TagWrapper style={{ justifyContent: "space-between" }}>
                                        <Tag text={username} fontColor="#FFFFFF" />
                                        <Tag text={company} fontColor="#FFFFFF" />
                                    </TagWrapper>
                                    {image && <TitleView><Title>{title}</Title></TitleView>}
                                    <Desc>{desc}</Desc>
                                </BodyWrapper>
                            </ScrollWrapper>
                        </ScrollView>
                    </DetailWrapper>
                </TouchableWithoutFeedback>
            </Wrapper>
        </ModalWrapper>
    )
}
