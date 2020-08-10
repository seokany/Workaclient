import { Alert } from 'react-native'
import axios, { AxiosPromise, AxiosError } from 'axios';
import base from './baseURL.json'
import { LoginPayload, forgetPayload, LoginResponse, forgetResponse } from '../reducers/login'
import { SignupPayload, SignupResponse } from '../reducers/signup';

const reqresApi = axios.create({
  baseURL: base.baseURL,
});

export const login = (
  loginPayload: LoginPayload,
): AxiosPromise<LoginResponse> => {
  const { username, password } = loginPayload;
  return reqresApi.post(`accounts/login/`, {
    username,
    password
  }).catch((error: AxiosError) => {
    if (error) {
      throw error.response
    }
    throw { status: 500 }
  });
};

export const signup = (
  signupPayload: SignupPayload): AxiosPromise<SignupResponse> => {
  const { email, username, password } = signupPayload;
  return reqresApi.post('accounts/signup/', {
    email,
    username,
    password,
  }).catch((error: AxiosError) => {
    if (error) {
      throw error.response
    }
    throw { status: 500 }
  })
}

export const forgotPassword = (
  { username, email }: forgetPayload
) => {
  return reqresApi.post('accounts/tmp-password/', { username, email })
    .catch((error: AxiosError) => {
      if (error) {
        throw error.response
      }
      throw { status: 500 }
    })
}

export const forgotUsername = (
  { email }: { email: string }
) => {
  return reqresApi.post('accounts/forgot-username/', { email })
    .catch((error: AxiosError) => {
      if ('response' in error) {
        throw error.response;
      }
      throw error;
    })
}

export const tendency = ({ token, mbti }: { token: string, mbti: string }): AxiosPromise<void> => {
  return reqresApi.patch('accounts/tendency/', { mbti }, { headers: { Authorization: `JWT ${token}` } })
    .catch((error: AxiosError) => {
      if (error) {
        throw error.response
      }
      throw { status: 500 }
    })
}

export const withdrawal = ({ token }: { token: string }): AxiosPromise<void> => {
  return reqresApi.delete('/accounts/delete/', { headers: { Authorization: `JWT ${token}` } })
    .catch((error: AxiosError) => {
      if (error) {
        throw error.response
      }
      throw { status: 500 }
    })

}
