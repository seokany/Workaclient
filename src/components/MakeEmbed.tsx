import React, { useState, SetStateAction } from 'react'
import styled from 'styled-components/native';


type Props = {
    placeholder: string;
    value: string;
    onChange: (e: string) => void;
    autoFocus?: boolean;
    keyboardType?: 'url';
    onBlur: () =>void;
    valid: string;
}



const MakeEmbed = ({
    placeholder, value, onChange, autoFocus = false, keyboardType, onBlur, valid, 
}:Props) => {
    return (
        <InputWrapper>
            <Input
                placeholder={placeholder}
                onChangeText={(e) => onChange(e)}
                value = {value}
                keyboardType = {keyboardType}
                autoFocus = {true}
                onBlur={onBlur}
                autoCapitalize  = 'none'
                autoCorrect = { false }
                autoCompleteType = 'off'
            >
            </Input>
            <ValidText>{valid}</ValidText>
        </InputWrapper>
    )
}

const InputWrapper = styled.View`
    box-shadow:0px 3px 6px #000;
    font-size: 16px;
    margin-bottom: 5px;

`

const Input = styled.TextInput`
    background-color:white;
    padding: 21px 10px 21px 43px;
`
const ValidText = styled.Text`
    color:red;
    margin-top: 10px;
    margin-left: 43px;
`

export default MakeEmbed
