import axios, { AxiosPromise, AxiosError } from 'axios';
import base from './baseURL.json'
import { LoginPayload, LoginResponse } from '../reducers/login'
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
    throw error.response
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
    throw error.response;
  })
}

export const tendency = ({ token, mbti }: { token: string, mbti: string }): AxiosPromise<void> => {
  console.log(token, mbti);
  return reqresApi.patch('accounts/tendency/', { mbti }, { headers: { Authorization: `JWT ${token}` } })
    .catch((error: AxiosError) => {
      throw error.response;
    })
}

export const withdrawal = ({ token }: { token: string }): AxiosPromise<void> => {
  console.log("TOKEN INS ", token);
  return reqresApi.delete('/accounts/delete/', { headers: { Authorization: `JWT ${token}` } })
    .catch((error: AxiosError) => {
      throw error.response;
    })

}
