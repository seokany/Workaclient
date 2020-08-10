import React, { useState, SetStateAction } from 'react'
import styled from 'styled-components/native';


type Props = {
    placeholder: string;
    value: string;
    onChange: (e: string) => void;
    autoFocus?: boolean;
    onBlur: () => void;
    onFocus: () => void;
    keyboardType?: 'default';
    multiline: true;
    numberOfLines: {}
}

const InputWrapper = styled.View`
    height:100%;
    box-shadow:0px 3px 6px #000;
    background-color:white;
    font-size: 16px;
    margin-bottom: 5px;
`

const Input = styled.TextInput`
    height:100%;
    width:100%;    
    padding: 21px 10px 21px 43px;
    align-items:flex-start;
    justify-content:flex-start;
    text-align-vertical: top;
`

const MakeCardDescriptionInput = ({
    placeholder,
    value,
    onChange,
    onBlur,
    onFocus,
    multiline
}: Props) =>
    <InputWrapper>
        <Input
            multiline={multiline}
            numberOfLines={4}
            placeholder={placeholder}
            onChangeText={(e) => onChange(e)}
            value={value}
            onBlur={onBlur}
            onFocus={onFocus}
            autoCompleteType="off"
            autoCorrect={false}
        >
        </Input>
    </InputWrapper>

export default MakeCardDescriptionInput
