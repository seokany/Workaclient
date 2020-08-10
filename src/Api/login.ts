import axios, { AxiosPromise, AxiosError } from 'axios';

import { LoginPayload, LoginResponse } from '../reducers/login'
import { SignupPayload, SignupResponse } from '../reducers/signup';

const reqresApi = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1/accounts',
});

export const login = (
  loginPayload: LoginPayload,
): AxiosPromise<LoginResponse> => {
  const { username, password } = loginPayload;
  return reqresApi.post(`/login/`, {
    username,
    password
  }).catch((error: AxiosError) => {
    throw error.response
  });
};

export const signup = (
  signupPayload: SignupPayload): AxiosPromise<SignupResponse> => {
  const { email, username, password, year, month, day } = signupPayload;
  return reqresApi.post('/signup/', {
    email,
    username,
    password,
    birth_date: `${year}-${month}-${day}`
  }).catch((error: AxiosError) => {
    throw error.response;
  })
}

export const tendency = ({ token, mbti }: { token: string, mbti: string }): AxiosPromise<void> => {
  console.log(token, mbti);
  return reqresApi.patch('/tendency/', { mbti }, { headers: { Authorization: `JWT ${token}` } }).catch((error: AxiosError) => {
    throw error.response;
  })
}
