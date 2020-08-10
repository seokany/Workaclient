import React from 'react'
import styled from 'styled-components/native';

type Props = {
    title: string;
    onPress: () => void;
}

const Button = styled.TouchableHighlight`
    width:250px;
    height:60px;
    background-color:#FFFFFF;
    border:2px #F41473 solid;
    border-radius:8000px;
    justify-content:center;
    align-items:center;
`;

const Text = styled.Text`
    font-size:15px;
    color:#F41473;
`;

const TendencyButton = ({ title, onPress }: Props) => {
    return (
        <Button onPress={() => onPress()}>
            <Text>{title}</Text>
        </Button>
    )
}

export default TendencyButton

