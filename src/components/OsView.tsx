import React from 'react';
import { ViewStyle } from 'react-native'
import styled from 'styled-components/native';

import { StatusBar, Platform, StyleProp } from 'react-native';

import { ThemeProps } from '../style/theme'

type Props = {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}

const currentHeight = StatusBar.currentHeight || 0;

const IosWrapper = styled.SafeAreaView`
    width:100%;
    max-width:${({ theme }: ThemeProps) => theme.maxWidth}px;
    background-color:white;
    align-self:center;
`;

const AndoroidWrapper = styled.View`
    padding-top:${currentHeight > 25 ? 46 : 20}px;
    background-color:white;
`;

export default function OsView({ children, style }: Props) {
    return (
        <>
            {Platform.OS === 'ios' ?
                <IosWrapper style={style}>{children}</IosWrapper>
                :
                <AndoroidWrapper style={style}>{children}</AndoroidWrapper>}
        </>
    )
}