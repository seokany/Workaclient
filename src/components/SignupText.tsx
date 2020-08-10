import React from 'react'
import styled from 'styled-components/native';

const Wrapper = styled.View`
`;

const BlackText = styled.Text`
  font-size:12px;
`;

const BlueText = styled.Text`
  color:#6E9CE5;
`;

const SignupText = () => {
  return (
    <Wrapper>
      <BlackText>By signing up, you agree to our
                <BlueText> Terms </BlueText>
        and that you have read our
                <BlueText> Privacy Policy </BlueText>
        and
                <BlueText> Content Policy</BlueText>
        .
            </BlackText>
    </Wrapper>
  )
}

export default SignupText
