import React, { useState, SetStateAction } from 'react'
import styled from 'styled-components/native';
import { Platform } from 'react-native';

type Props = {
  placeholder: string;
  value: string;
  onChange: (e: string) => void;
  fontSize?: number;
  autoFocus?: boolean;
  keyboardType?: 'default' | 'number-pad' | 'email-address';
  isPassword?: boolean;
  type?: 'email';
  valid: string;
  onBlur: () => void
}

const InputWrapper = styled.View`
  margin:15px 5px;
  justify-content:center;
`;

const Input = styled.TextInput`
  border-bottom-width:3px;
  border-color:#707070;
  font-weight:bold;
  width:100%;
  min-width:90px;
  padding-left:5px;
`;

const ValidText = styled.Text`
  color:red;
`;


const SignInput = ({
  placeholder,
  value,
  type,
  valid,
  onBlur,
  onChange,
  autoFocus = false,
  fontSize = 28,
  isPassword = false,
  keyboardType = "default",
}: Props) => {

  const [textAlign, setTextAlign] = useState<'center' | 'left'>(value.length === 0 ? 'center' : 'left');

  const changeText = (e: string): void => {
    if (e.length > 0 && textAlign === 'center') {
      setTextAlign('left');
    } else if (e.length === 0) {
      setTextAlign('center');
    }
    onChange(e);
  }

  const focus = () => {
    if (Platform.OS === 'android' && isPassword) {
      setTextAlign('left');
    }
  }

  return (
    <InputWrapper>
      <Input
        placeholder={placeholder}
        value={value}
        onChangeText={changeText}
        style={{ fontSize, textAlign }}
        autoFocus={autoFocus}
        keyboardType={keyboardType}
        secureTextEntry={isPassword}
        onBlur={onBlur}
        autoCapitalize='none'
        autoCompleteType='off'
        autoCorrect={false}
        onFocus={focus}
      />
      <ValidText>{valid}</ValidText>
    </InputWrapper>
  )
}

export default SignInput
