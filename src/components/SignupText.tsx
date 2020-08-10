import React from 'react'
import styled from 'styled-components/native';

import * as Linking from 'expo-linking';

const Wrapper = styled.View`
  flex-direction:row;
  flex-wrap:wrap;
  justify-content:center;
  align-items:center;
`;

const TouchableOpacity = styled.TouchableOpacity`
  padding:2px;
`;

const BlackText = styled.Text`
  margin-right:5px;
  font-size:13px;
`;

const BlueText = styled.Text`
  font-size:12px;
  margin-right:5px;
  color:#6E9CE5;
`;

const SignupText = () => {

  const linkingTerms = () => {
    Linking.openURL("https://www.notion.so/15df46dc8d764572a710ebb2a67bee04")
  }

  const linkingPrivacy = () => {
    Linking.openURL("https://www.notion.so/df4bbe41a1164370b1b798745c369394")
  }


  return (
    <Wrapper>
      <BlackText>By</BlackText>
      <BlackText>signing</BlackText>
      <BlackText>up</BlackText>
      <BlackText>you</BlackText>
      <BlackText>agree</BlackText>
      <BlackText>to</BlackText>
      <BlackText >our</BlackText>
      <TouchableOpacity onPress={linkingTerms}>
        <BlueText>Terms</BlueText>
      </TouchableOpacity>
      <BlackText>and</BlackText>
      <BlackText>that</BlackText>
      <BlackText>you</BlackText>
      <BlackText>have</BlackText>
      <BlackText>read</BlackText>
      <BlackText>our</BlackText>
      <TouchableOpacity onPress={linkingPrivacy}>
        <BlueText>Privacy Policy</BlueText>
      </TouchableOpacity>
      <BlackText>and</BlackText>
      <TouchableOpacity onPress={linkingTerms}>
        <BlueText>Content Policy</BlueText>
      </TouchableOpacity>
      <BlackText>.</BlackText>
    </Wrapper>
  )
}

export default SignupText
