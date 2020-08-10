import React, { useState } from 'react'
import styled from 'styled-components/native';


type Props = {
    placeholder: string;
    value: string;
    onChange: (e: string) => void;
    fontSize?: number;
    onBlur:() => void;
    autoFocus?: boolean;
    keyboardType?: 'default';
    onPress: () => void;
}


const MakeJobTagInput = ({
    placeholder, value, onChange, onBlur, fontSize, autoFocus = false, keyboardType, onPress
}:Props) => {
    let textAlign: 'left'
    if(value.length>0) {
        textAlign = 'left'
    }
    return (
            <InputWrapper>
                <Input 
                    placeholder={placeholder}
                    value = {value}
                    onChangeText={(e) => onChange(e)}
                    autoFocus={autoFocus}
                    keyboardType={keyboardType}
                    onBlur = {onBlur}
                />
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



export default MakeJobTagInput
