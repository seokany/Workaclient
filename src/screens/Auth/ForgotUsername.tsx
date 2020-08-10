import React, { useState, useEffect } from 'react'
import { Text } from 'react-native'
import styled from 'styled-components/native'

import SignInput from '../../components/SignInput'
import SubmitButton from '../../components/MiddleButton';

import validCheck from '../../constants/validCheck'

const Wrapper = styled.View`
    flex:1;
    background-color:#FFFFFF;

`

const InputWrapper = styled.View`
    padding:33px;
`;

const ButtonWrapper = styled.View`
    flex:1;
    justify-content:flex-end;
    align-items:center;
`;

const ForgotEmail = () => {
    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState('');

    const handleInput = (e: string) => {
        setEmail(e);
    };

    const handleSubmit = () => {
    }

    return (
        <Wrapper>
            <InputWrapper>
                <SignInput
                    placeholder="Email address for your account"
                    fontSize={15}
                    value={email}
                    valid={emailValid}
                    onChange={handleInput}
                    onBlur={() => validCheck('email')(email, setEmailValid)}
                    autoFocus={true}
                    keyboardType="email-address"
                    type="email"
                />
                <Text>Unfortunately, if you have never given us your email, we will not be able to reset your password.</Text>
            </InputWrapper>
            <ButtonWrapper>
                <SubmitButton title="REQUEST USERNAME RECOVERY EMAIL" fontSize={14} onPress={handleSubmit} isPending={false} />
            </ButtonWrapper>
        </Wrapper>
    )
}

export default ForgotEmail

