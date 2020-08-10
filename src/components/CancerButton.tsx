import React from 'react'
import styled from 'styled-components/native';

type Props = {
    title: string;
    fontSize?: number;
    onPress: () => void;
}

const Button = styled.TouchableOpacity`
  padding-left: 10px;
`;

const Title = styled.Text`
  color:#F41473;
  font-weight:300;
`;

const CancerButton = ({ title, onPress, fontSize = 12 }: Props) =>
    <Button onPress={() => onPress()} >
        <Title style={{ fontSize }}>{title}</Title>
    </Button>

export default CancerButton;