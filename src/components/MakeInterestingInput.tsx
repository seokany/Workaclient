import React, { useState, SetStateAction } from 'react'
import styled from 'styled-components/native';


type Props = {
    placeholder: string;
    value: string;
    onChange: (e: string) => void;
    autoFocus?: boolean;
    keyboardType?: 'default';
    autoCorrect?: boolean;
}

const MakeInterestingInput = ({
    placeholder, value, onChange, autoFocus = false, keyboardType,
}: Props) => {
    let textAlign: 'left'
    if (value.length > 0) {
        textAlign = 'left'
    }
    return (
        <InputWrapper>
            <Input
                placeholder={placeholder}
                onChangeText={(e) => onChange(e)}
                value={value}
                autoFocus={autoFocus}
                autoCapitalize='none'
                autoCorrect={false}
                autoCompleteType='off'
            >

            </Input>

        </InputWrapper>
    )
}

const InputWrapper = styled.View`
    box-shadow:0px 3px 6px #000;
    font-size: 16px;
    margin-bottom: 5px;
    elevation: 6;
    background-color:white;
`

const Input = styled.TextInput`
    background-color:white;
    padding: 21px 10px 21px 43px;
`

export default MakeInterestingInput
