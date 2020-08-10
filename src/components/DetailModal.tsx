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

                            {images ? <ImageWrapper><Image source={{ uri: images || '' }} style={{ width: '100%', height: '100%' }} /></ImageWrapper> : <TitleView><Title>{title}</Title></TitleView>}

                            <BodyWrapper>
                                <TextWrapper>
                                    {images && <TitleView><Title>{title}</Title></TitleView>}
                                </TextWrapper>
                                <TagWrapper >
                                    {tags.map((el: string, index: number) => <Tag key={`tag-${index}`} text={el} fontColor="#FA5080" />)}
                                </TagWrapper>
                                <TagWrapper style={{ justifyContent: "space-between" }}>
                                    <Tag text={username} fontColor="#2C4F71" />
                                </TagWrapper>
                                <Title>{title}</Title>
                                <Desc style={{ color: "white" }}>{text}</Desc>
                            </BodyWrapper>
                        </ScrollWrapper>
                    </ScrollView>
                </DetailWrapper>
            </Wrapper>
        </ModalWrapper>
    )
}
