import React, { useState, useEffect } from 'react'
import { Keyboard, TouchableWithoutFeedback, Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/native'

import { StackNavigationProp } from '@react-navigation/stack'
import { AuthStackParamList } from '../../navigator/AuthNavigation'

import { RootState } from '../../reducers'
import { LOGIN_INIT, LOGIN_REQUESTED } from '../../reducers/login'

import SignInput from '../../components/SignInput'
import MiddleButton from '../../components/MiddleButton'

import { HEIGHT } from '../../constants/dimensions'
import validCheck from '../../constants/validCheck'
import OsView from '../../components/OsView';

type AuthHomeNavigationProp = StackNavigationProp<AuthStackParamList, 'Signin'>;

type Props = {
    navigation: AuthHomeNavigationProp;
};

const Wrapper = styled.SafeAreaView`
    flex:1;
    padding:20px 33px;
    background-color:white;
`;

const TitleWrapper = styled.View`
    align-items:center;
`;

const HeaderTitle = styled.Text`
    font-size : 77px;
    font-weight:700;
    color:#35749F;
    padding:10px;
`;

const InputWrapper = styled.View`
    padding:0px 20px;
`;

const FindWrapper = styled.TouchableOpacity`
    margin-top:20px;
`;

const FindText = styled.Text`
    font-weight:700;
    font-size:18px;
    color:#35749F;
`;

const ButtonWrapper = styled.View`
    margin-top:30px;
    align-items:center;
`;

const Signin = ({ navigation }: Props) => {
    const [username, setUsername] = useState('');
    const [usernameValid, setUsernameValid] = useState('');
    const [password, setPassword] = useState('');
    const [passwordValid, setPasswordValid] = useState('');
    const [isSubmit, setIsSubmit] = useState(false);

    const loginState = useSelector((state: RootState) => state.login)
    const dispatch = useDispatch();

    if (loginState.isError) {
        Alert.alert("로그인", "입력하신 정보가 맞지 않습니다. 다시 확인해주세요");
        dispatch({ type: LOGIN_INIT });
    }

    const handleInput = (setInput: React.Dispatch<string>) => (e: string) => {
        setInput(e);
    }

    const handleLogin = () => {
        Keyboard.dismiss();
        //signup 과 동일
        setTimeout(() => {
            setIsSubmit(true);
        }, 50);
    }

    useEffect(() => {
        if (isSubmit) {
            setIsSubmit(false);
            if (!usernameValid && !passwordValid) {
                dispatch({ type: LOGIN_REQUESTED, payload: { username, password } });
                // 로그인에 성공할경우 components/NavController 에서 감지해서 메인 nav 로 분기
            }
        }
    }, [isSubmit]);

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
            <Wrapper>
                <TitleWrapper>
                    <HeaderTitle>Worka!</HeaderTitle>
                </TitleWrapper>
                <InputWrapper onStartShouldSetResponder={() => true}>
                    <SignInput
                        placeholder="username"
                        value={username}
                        valid={usernameValid}
                        onChange={handleInput(setUsername)}
                        onBlur={() => validCheck('username')(username, setUsernameValid)}
                    />
                    <SignInput
                        placeholder="password"
                        value={password}
                        isPassword={true}
                        valid={passwordValid}
                        onChange={handleInput(setPassword)}
                        onBlur={() => validCheck('password')(password, setPasswordValid)}
                    />
                    <FindWrapper onPress={() => navigation.navigate("ForgotPassword")}>
                        <FindText>FORGOT PASSWORD</FindText>
                    </FindWrapper>
                </InputWrapper>
                <ButtonWrapper>
                    <MiddleButton title="LOG IN" onPress={handleLogin} isPending={loginState.pending} />
                </ButtonWrapper>
            </Wrapper>
        </TouchableWithoutFeedback >
    )
}

export default Signin
