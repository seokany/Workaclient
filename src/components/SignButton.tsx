import React, { ReactChildren } from 'react';
import styled from 'styled-components/native';

type Props = {
    title: string;
    onPress: () => void;
    color?: string;
}

const SignBtn = styled.TouchableOpacity`
    justify-content:center;
    align-items:center;
    width:138px;
    height:50px;
    border-radius:20px;
    border: 5px solid #81B9E0;
    margin:0px 5px;
`;

const SignText = styled.Text`
    font-size:28px;
    font-weight:700;
`

function SignButton({ title, onPress, color = "#2999E5" }: Props) {
    return (
        <SignBtn onPress={() => onPress()} style={{ borderColor: color }}>
            <SignText style={{ color }}>{title}</SignText>
        </SignBtn>
    )
}

export default SignButton;