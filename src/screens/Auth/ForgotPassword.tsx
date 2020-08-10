import React, { useState, useEffect } from 'react'
import { Text, Keyboard, Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native'
import { StackNavigationProp } from '@react-navigation/stack'

import { AuthStackParamList } from '../../navigator/AuthNavigation'
import SignInput from '../../components/SignInput'
import SubmitButton from '../../components/MiddleButton';

import validCheck from '../../constants/validCheck'
import { RootState } from '../../reducers';
import { FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_INIT } from '../../reducers/login';

type AuthHomeNavigationProp = StackNavigationProp<AuthStackParamList, 'ForgotPassword'>;

type Props = {
    navigation: AuthHomeNavigationProp;
};

const Wrapper = styled.View`
    flex:1;
    background-color:#FFFFFF;
`

const Touch = styled.TouchableOpacity`
    width:70%;
    margin-bottom:10px;
`;

const Password = styled.Text`
    font-size:14px;
    font-weight:bold;
    color:#2B6E9F;
`;

const InputWrapper = styled.View`
    padding:0px 47px;
`;

const ButtonWrapper = styled.View`
    flex:1;
    margin-top:60px;
    align-items:center;
`;

const ForgotUsername = ({ navigation }: Props) => {
    const [username, setUsername] = useState('');
    const [usernameValid, setUsernameValid] = useState('');
    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState('');
    const [isSubmit, setIsSubmit] = useState<boolean>(false)

    const dispatch = useDispatch();
    const passwordState = useSelector((state: RootState) => state.password)


    const handleInput = (setFunction: React.Dispatch<React.SetStateAction<string>>) => (e: string) => {
        setFunction(e);
    };

    const handleSubmit = () => {
        Keyboard.dismiss();

        setTimeout(() => {
            setIsSubmit(true);
        }, 50);
    }

    useEffect(() => {
        if (isSubmit) {
            setIsSubmit(false);
            if (usernameValid === "" && emailValid === "") {
                dispatch({ type: FORGOT_PASSWORD_REQUEST, payload: { email, username } })
            }
        }

    }, [isSubmit]);

    useEffect(() => {
        if (passwordState.success) {
            Alert.alert("비밀번호 찾기", "Email 로 임시 패스워드가 전송되었습니다. 최대 5분이 걸릴수있습니다!");
            dispatch({ type: FORGOT_PASSWORD_INIT });
            navigation.navigate('Home');
        }
    }, [passwordState.success]);

    useEffect(() => {
        if (passwordState.error) {
            const { error } = passwordState;
            if (error === '404') {
                Alert.alert("비밀번호 찾기", "일치하는 정보가 없습니다.");
            }
            dispatch({ type: FORGOT_PASSWORD_INIT });
        }
    }, [passwordState.error])

    useEffect(() => {
        return () => {
            dispatch({ type: FORGOT_PASSWORD_INIT });
        }
    }, []);

    return (
        <Wrapper>
            <InputWrapper>
                <SignInput
                    placeholder="username"
                    value={username}
                    valid={usernameValid}
                    onChange={handleInput(setUsername)}
                    onBlur={() => validCheck('username')(username, setUsernameValid)}
                    autoFocus={true} />
                <Touch onPress={() => navigation.navigate('ForgotUsername')}>
                    <Password>FORGOT USERNAME</Password>
                </Touch>
                <SignInput
                    placeholder="Email address"
                    value={email}
                    valid={emailValid}
                    onChange={handleInput(setEmail)}
                    onBlur={() => validCheck('email')(email, setEmailValid)}
                    type="email" />
                <Text>Unfortunately, if you have never given us your email, we will not be able to reset your password.</Text>
            </InputWrapper>
            <ButtonWrapper>
                <SubmitButton
                    title="REQUEST USERNAME RECOVERY EMAIL"
                    fontSize={14}
                    onPress={handleSubmit}
                    isPending={passwordState.fetching}
                />
            </ButtonWrapper>
        </Wrapper>
    )
}

export default ForgotUsername

