import React from 'react'
import { TouchableOpacity, ScrollView } from 'react-native'
import styled from 'styled-components/native';
import Tag from './Tag';
import { ThemeProps } from '../style/theme';

import Xsvg from '../../assets/X_1.svg';
import { Feeds } from '../state/Feed/Action';

interface Props extends Feeds {
    visible: boolean;
    onPress: () => void;
}

const ModalWrapper = styled.Modal``;

const Wrapper = styled.View`
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
`;

const CloseView = styled.View`
    width:40px;
    height:40px;
    padding:2px;
    align-items:flex-end;
    justify-content:flex-end;
`;

const DetailWrapper = styled.View`
    width:100%;
    max-height:50%;
    max-width:${({ theme }: ThemeProps): number => theme.maxWidth}px;
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
    margin-top:20px;
    width:100%;
`;

const TagWrapper = styled.View`
    width:100%;
    padding:0px 15px;
    flex-wrap:wrap;
    flex-direction:row;
`;

const TextWrapper = styled.View`
    padding:15px;
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

export default function DetailModal({
    visible,
    id,
    author: {
        username,
    },
    title,
    images,
    text,
    tags,
    onPress
}: Props) {
    return (
        <ModalWrapper visible={visible} transparent={true} onRequestClose={onPress} >
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
                            {images ? <ImageWrapper><Image source={{ uri: images }} style={{ width: '100%', height: '100%' }} /></ImageWrapper> : <TitleView><Title>{title}</Title></TitleView>}
                            <BodyWrapper>
                                <TagWrapper >
                                    {tags.map((el: string, index: number) => <Tag key={`tag-${index}`} text={el} fontColor="#FFFFFF" />)}
                                </TagWrapper>
                                <TagWrapper style={{ justifyContent: "space-between" }}>
                                    <Tag text={username} fontColor="#FFFFFF" />
                                </TagWrapper>
                                <TextWrapper>
                                    {images && <TitleView><Title>{title}</Title></TitleView>}
                                    <Desc>{text}</Desc>
                                </TextWrapper>
                            </BodyWrapper>
                        </ScrollWrapper>
                    </ScrollView>
                </DetailWrapper>
            </Wrapper>
        </ModalWrapper>
    )
}
