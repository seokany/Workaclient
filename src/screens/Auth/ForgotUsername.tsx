import React, { useState, useEffect } from 'react'
import { Text, Keyboard, Alert } from 'react-native'
import styled from 'styled-components/native'

import { StackNavigationProp } from '@react-navigation/stack';

import SignInput from '../../components/SignInput';
import SubmitButton from '../../components/MiddleButton';

import validCheck from '../../constants/validCheck'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state';
import { FORGOT_USERNAME_REQUEST, FORGOT_USERNAME_INIT } from '../../state/Login/Action';
import { AuthStackParamList } from '../../navigator/AuthNavigation';

type AuthHomeNavigationProp = StackNavigationProp<AuthStackParamList, 'ForgotUsername'>;

type Props = {
    navigation: AuthHomeNavigationProp;
};

const Wrapper = styled.View`
    flex:1;
    background-color:#FFFFFF;

`

const InputWrapper = styled.View`
    padding:33px;
`;

const ButtonWrapper = styled.View`
    flex:1;
    margin-top:60px;
    align-items:center;
`;

const ForgotEmail = ({ navigation }: Props) => {
    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState('');
    const [isSubmit, setIsSubmit] = useState(false);

    const dispatch = useDispatch();
    const forgotUsernameState = useSelector((state: RootState) => state.forgotUsername);


    const handleInput = (e: string) => {
        setEmail(e);
    };

    const handleSubmit = () => {
        Keyboard.dismiss();
        setTimeout(() => {
            setIsSubmit(true);
        }, 50)
    }

    useEffect(() => {
        if (isSubmit) {
            setIsSubmit(false);
            if (emailValid === "") {
                dispatch({ type: FORGOT_USERNAME_REQUEST, payload: { email } })
            }
        }
    }, [isSubmit]);


    useEffect(() => {
        if (forgotUsernameState.success) {
            Alert.alert(
                "유저네임 찾기",
                `찾으신 아이디는 ${forgotUsernameState.email} 입니다.`,
                [{
                    text: "로그인",
                    onPress: () => navigation.navigate('Signin')
                }, {
                    text: "임시비밀번호 발급",
                    onPress: () => navigation.navigate('ForgotPassword')
                }]
            )
        }
    }, [forgotUsernameState.success]);

    useEffect(() => {
        if (forgotUsernameState.error) {
            const { error } = forgotUsernameState;
            if (error === '404') {
                Alert.alert("유저네임 찾기", "일치하는 정보가 없습니다.");
            }
            dispatch({ type: FORGOT_USERNAME_INIT });
        }
    }, [forgotUsernameState.error]);


    useEffect(() => {
        return () => {
            dispatch({ type: FORGOT_USERNAME_INIT });
        }
    }, []);

    return (
        <Wrapper>
            <InputWrapper>
                <SignInput
                    placeholder="Email address for your account"
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
                <SubmitButton title="REQUEST USERNAME RECOVERY EMAIL" fontSize={14} onPress={handleSubmit} isPending={forgotUsernameState.fetching} />
            </ButtonWrapper>
        </Wrapper>
    )
}

export default ForgotEmail

