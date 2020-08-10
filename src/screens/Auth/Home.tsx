import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { useSelector, useDispatch } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack'
import { AuthStackParamList } from '../../navigator/AuthNavigation'

import SignButton from '../../components/SignButton'
import { LOGIN_SKIP } from '../../reducers/login'


type AuthHomeNavigationProp = StackNavigationProp<AuthStackParamList, 'Home'>;

type Props = {
  Data: {
    email: string;
    password: string;
  };
  navigation: AuthHomeNavigationProp;
};



const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

const ImageWrapper = styled.View`
  flex:2;
  justify-content:flex-end;
`;

const ButtonWrapper = styled.View`
  flex:1;
`;
const SignButtonWrapper = styled.View`
  flex:2;
  flex-direction:row;
  align-items:center;
`;
// const SkipWrapper = styled.TouchableOpacity`
//   flex:1;
//   align-items:center;
// `;

// const SkipText = styled.Text`
//   font-size:28px;
//   color:#286E9F;
//   font-weight:700;
// `;

function Home({ navigation }: Props) {
  // skip 을 위한 dispatch
  // const dispatch = useDispatch();
  
  const onSignin = () => {
    navigation.navigate('Signin');
  }

  const onSignup = () => {
    navigation.navigate('Signup');
  }

  // const onSkip = () => {
  //   dispatch({ type: LOGIN_SKIP })
  // }

  return (
    <Container>
      <ImageWrapper>
        <Image
          source={require('../../../assets/iosWorka2.png')}
        />
      </ImageWrapper>
      <ButtonWrapper>
        <SignButtonWrapper>
          <SignButton title="Login" onPress={() => onSignin()} color="#81B9E0" />
          <SignButton title="Signup" onPress={() => onSignup()} />
        </SignButtonWrapper>
        {/* <SkipWrapper onPress={() => onSkip()}> */}
        {/* <SkipText>SKIP NOW</SkipText> */}
        {/* </SkipWrapper> */}
      </ButtonWrapper>
    </Container >
  );
}

export default Home;
