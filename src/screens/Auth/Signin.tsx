import React, { useState, useEffect } from 'react'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
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

type AuthHomeNavigationProp = StackNavigationProp<AuthStackParamList, 'Signin'>;

type Props = {
    navigation: AuthHomeNavigationProp;
};

const Wrapper = styled.SafeAreaView`
    height:${HEIGHT}px;
    padding:20px 33px;
`;

const TitleWrapper = styled.View`
    flex:1;
    align-items:center;
    justify-content:center;
`;

const HeaderTitle = styled.Text`
    font-size : 77px;
    font-weight:700;
    color:#35749F;
`;

const InputWrapper = styled.View`
    flex:1;
    padding:0px 20px;
`;

const FindWrapper = styled.TouchableOpacity`
    margin-top:25px;
`;

const FindText = styled.Text`
    font-weight:700;
    font-size:18px;
    color:#35749F;
`;

const ButtonWrapper = styled.View`
    flex:1;
    justify-content:flex-end;
    align-items:center;
    margin-bottom:56px;
`;

const Signin = ({ navigation }: Props) => {
    const [username, setUsername] = useState('test12');
    const [usernameValid, setUsernameValid] = useState('');
    const [password, setPassword] = useState('12345678');
    const [passwordValid, setPasswordValid] = useState('');
    const [isSubmit, setIsSubmit] = useState(false);

    const loginState = useSelector((state: RootState) => state.login)
    const dispatch = useDispatch();

    if(loginState.isError) {
        alert("정보가 틀림 ㅠㅠ");
        dispatch({type:LOGIN_INIT});
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
                console.log("VLIAD")
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
                <InputWrapper>
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
        </TouchableWithoutFeedback>
    )
}

export default Signin
