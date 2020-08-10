import React from 'react'
import { Platform } from 'react-native'
import styled from 'styled-components/native'

type Props = {
    children: React.ReactChild;
    semi?: "top" | "bottom";
}

const Wrapper = styled.View`
    width:100%;
    height:151.82px;
    border-radius:8px;
    background-color:#FFFFFF
    box-shadow:0px 3px 6px #000;
    elevation:15;
`;

export default function ShadowBox({ semi, children }: Props) {
    const style = semi ? (
        semi === "top" ?
            { width: "100%", height: 64, borderBottomLeftRadius: 0, borderBottomRightRadius: 0, marginBottom: Platform.OS === 'android' ? 2 : 0 }
            :
            { width: "100%", height: 87, borderTopLeftRadius: 0, borderTopRightRadius: 0, marginBottom: Platform.OS === 'android' ? 2 : 0 })
        :
        {}
    return (
        <Wrapper style={style}>
            {children}
        </Wrapper>
    )
}
