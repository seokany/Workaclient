import React from 'react'
import { CommonActions } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';




import { AuthStackParamList } from '../../src/navigator/AuthNavigation';
import {useDispatch} from "react-redux";
import styled from 'styled-components/native';




type Props = {
    title: string;
    fontSize?: number;
    onPress: () => void;
    isPending: boolean;
    
}

const Button = styled.TouchableOpacity`
  padding-left: 10px;
`;

const Title = styled.Text`
  color:#F41473;
  font-weight:300;
`;



const CancerButton = ({ title, onPress, fontSize = 12}: Props) => {
    const dispatch = useDispatch;
    
    return (
        <Button 
            onPress={() => onPress()}
        >
            <Title style={{ fontSize }}>{title}</Title>
        </Button>
    )
}

export default CancerButton;


