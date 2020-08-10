import React from 'react';
import { ViewStyle } from 'react-native'
import styled from 'styled-components/native';

import { StatusBar, Platform, StyleProp } from 'react-native';

type Props = {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}

const currentHeight = StatusBar.currentHeight || 0;

const IosWrapper = styled.SafeAreaView``;

const AndoroidWrapper = styled.View`
    padding-top:${currentHeight > 25 ? 46 : 0}px;
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