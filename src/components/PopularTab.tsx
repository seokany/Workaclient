import React from 'react'
import styled from 'styled-components/native';
import { ThemeProps } from '../style/theme';

type Props = {
    text: string;
}

const Wrapper = styled.View`
    width:100%;
    max-width:${({ theme }: ThemeProps): number => theme.maxWidth}px;
    height:40px;
    justify-content:center;
    align-items:center;
    margin:20px 0px;
    border:1px solid ${({ theme }: ThemeProps) => theme.textColor};
    border-radius:8px;
`;

const Text = styled.Text`
    font-size:${({ theme }: ThemeProps): number => theme.lgFont}px;
    color:${({ theme }: ThemeProps): string => theme.textColor};
    font-weight:600;
`

export default function PopularTab({ text }: Props) {
    return (
        <Wrapper>
            <Text>{text}</Text>
        </Wrapper>
    )
}
