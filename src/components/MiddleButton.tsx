import React from 'react'
import { ActivityIndicator, GestureResponderEvent, View } from 'react-native'
import styled from 'styled-components/native';

type Props = {
    title: string;
    fontSize?: number;
    onPress: () => void;
    isPending: boolean;
}

const Button = styled.TouchableOpacity`
    background:#3C99E5;
    height:50px;
    border-radius:30px;
    margin-bottom:10px;
    justify-content:center;
    align-items:center;
    min-width:300px;
    width:80%;
`;

const Title = styled.Text`
  color:#FFFFFF;
  font-weight:700;
`;


const MiddleButton = ({ title, fontSize = 28, onPress, isPending }: Props) => {
    return (
        <Button onPress={() => onPress()}>
            {!isPending ? <Title style={{ fontSize }}>{title}</Title> : <ActivityIndicator size="large" color="#FFFFFF" />}
        </Button>
    )
}

export default MiddleButton
