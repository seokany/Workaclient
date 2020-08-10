import React from 'react'
import styled from 'styled-components/native'

import { ThemeProps } from '../style/theme'

type Props = {
    fontColor?: string;
    text: string;
}

type TextStyle = {
    color?: string;
}

const Wrapper = styled.View`
    border-radius:10px;
    background-color:${({ theme }: ThemeProps): string => theme.blue};
    padding:2px 8px;
    margin:3px;
`;

const Text = styled.Text`
    font-size:${({ theme }: ThemeProps): number => theme.mdFont}px;
    color:${({ theme }: ThemeProps): string => theme.white};
`;

export default function Tag({ fontColor, text }: Props) {
    const textStyle: TextStyle = {};
    fontColor && (textStyle.color = fontColor);
    return (
        <Wrapper onStartShouldSetResponder={() => true}>
            <Text style={textStyle}>{text}</Text>
        </Wrapper>
    )
}