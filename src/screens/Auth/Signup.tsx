import React, { useState, useEffect } from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native'
import styled from 'styled-components/native'
import { useHeaderHeight, StackNavigationProp } from '@react-navigation/stack'
import { useSelector, useDispatch } from 'react-redux';

import { SIGNUP_REQUESTED, SIGNUP_INIT } from '../../reducers/signup'
import { AuthStackParamList } from '../../navigator/AuthNavigation'
import SignInput from '../../components/SignInput';
import SignupText from '../../components/SignupText';
import MiddleButton from '../../components/MiddleButton';
import { HEIGHT } from '../../constants/dimensions';
import validCheck from '../../constants/validCheck'
import { RootState } from '../../reducers';
import { LOGIN_SUCCESS } from '../../reducers/login';

type AuthHomeNavigationProps = StackNavigationProp<AuthStackParamList, 'Signup'>

type Props = {
  navigation: AuthHomeNavigationProps
}

const Wrapper = styled.View`
  background-color:#ffffff;
  padding:0px 33px;
`;

const InputWrapper = styled.View`
  flex:3;
  justify-content:center;
  padding:0px 33px;
`;

const BirthInputWrapper = styled.View`
  flex:1;
  justify-content:center;
  align-items:flex-start;
  flex-direction:row;
`;

const TermsWrapper = styled.View``

const ButtonWrapper = styled.View`
  flex:2;
  justify-content:flex-end;
  align-items:center;
  margin-bottom:56px;
`;

function Signup() {
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState('');
  const [username, setUsername] = useState('');
  const [usernameValid, setUsernameValid] = useState('');
  const [password, setPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState('');
  // const [year, setYear] = useState('2000');
  // const [yearValid, setYearValid] = useState('');
  // const [month, setMonth] = useState('10');
  // const [monthValid, setMonthValid] = useState('');
  // const [day, setDay] = useState('01');
  // const [dayValid, setDayValid] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);


  const signup = useSelector((state: RootState) => state.signup);
  const dispatch = useDispatch();

  const headerHeight = useHeaderHeight();

  if (signup.isSignup) {
    dispatch({ type: LOGIN_SUCCESS, payload: { data: { token: signup.token, user: { mbti: null } } } });
    // 회원가입에 성공할경우 바로 로그인 시켜준다.
  }
  if (signup.isError) {
    setUsernameValid(signup.username);
    setEmailValid(signup.email);
    dispatch({ type: SIGNUP_INIT });
  }

  const handleInput = (setState: Function) => (e: string) => {
    setState(e);
  }

  const handleSignup = () => {
    Keyboard.dismiss();
    //keyboard dismiss 를 통해 모든 focus 를 제거해서 vlid 검사를 하는데, Keyboard가 비동기적 처리다.
    // async awiat 을 먹여서 처리하려했지만 먹지 않는다..
    setTimeout(() => {
      setIsSubmit(true);
    }, 50);
  }

  useEffect(() => {
    if (isSubmit) {
      setIsSubmit(false);
      if (
        !emailValid
        && !usernameValid
        && !passwordValid
        // && !yearValid && !monthValid && !dayValid
      ) {
        dispatch({ type: SIGNUP_REQUESTED, payload: { email, username, password } });
        // create 성공할 경우 state (signup.isSignup --> true );
      }
    }
  }, [isSubmit])

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={{}}>
      <Wrapper style={{ height: HEIGHT - headerHeight }}>
        <InputWrapper>
          <SignInput
            placeholder="email"
            value={email}
            onChange={handleInput(setEmail)}
            keyboardType="email-address"
            type="email"
            valid={emailValid}
            onBlur={() => validCheck('email')(email, setEmailValid)}
          />
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
            valid={passwordValid}
            onChange={handleInput(setPassword)}
            onBlur={() => validCheck('password')(password, setPasswordValid)}
            isPassword={true}
          />
        </InputWrapper>
        {/* <BirthInputWrapper>
          <SignInput
            placeholder="year"
            value={year}
            valid={yearValid}
            onChange={handleInput(setYear)}
            onBlur={() => validCheck('year')(year, setYearValid)}
            fontSize={20} keyboardType="number-pad"
          />
          <SignInput
            placeholder="month"
            value={month}
            valid={monthValid}
            onChange={handleInput(setMonth)}
            onBlur={() => validCheck('month')(month, setMonthValid)}
            fontSize={20} keyboardType="number-pad"
          />
          <SignInput
            placeholder="day"
            value={day}
            valid={dayValid}
            onChange={handleInput(setDay)}
            onBlur={() => validCheck('day')(day, setDayValid)}
            fontSize={20} keyboardType="number-pad"
          />
        </BirthInputWrapper> */}
        <TermsWrapper>
          <SignupText />
        </TermsWrapper>
        <ButtonWrapper>
          <MiddleButton title="CREATE ACCOUNT" onPress={handleSignup} isPending={signup.pending} />
        </ButtonWrapper>
      </Wrapper>
    </TouchableWithoutFeedback>
  )
}

export default Signup;