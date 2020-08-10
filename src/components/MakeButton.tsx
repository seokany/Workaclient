import React from 'react'
import { ActivityIndicator, Alert } from 'react-native'
import styled from 'styled-components/native';

type Props = {
    title: string;
    fontSize?: number;
    onPress: () => void;
}

const Button = styled.TouchableOpacity`
    padding-right: 10px;
`;

const Title = styled.Text`
  color:#F41473;
  font-weight:300;
`;


const MakeButton = ({ title, fontSize = 12, onPress }: Props) => {
    return (
        // <Button onPress={() => Alert.alert('is Posted')}>
        <Button onPress={onPress}>
            <Title style={{ fontSize }}>{title}</Title>
        </Button>
    )
}

export default MakeButton
