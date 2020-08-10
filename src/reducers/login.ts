import { call, put } from 'redux-saga/effects';
import { handleActions } from 'redux-actions';
import AsyncStorage from '@react-native-community/async-storage';

import * as Api from '../Api/login';

export const LOGIN_INIT = "LOGIN_INIT" as const;
export const LOGIN_SKIP = 'SKIP' as const;
export const LOGIN_REQUESTED = 'LOGIN_REQUESTED' as const;
export const LOGIN_SUCCESS = 'LOGINSUCCESS' as const;
export const LOGIN_FAILURE = 'LOGINFAILURE' as const;

export const WITHDRAWAL = 'WITHDRAWAL' as const;

export const LOGOUT = 'LOGOUT' as const;

export const TENDENCY_SUCSSES = 'TENDENCY_SUCSSES' as const;
export const TENDENCY = 'TENDENCY' as const;

export type GetLoginAction = {
  type: typeof LOGIN_REQUESTED;
}

export type LoginPayload = {
  username: string;
  password: string;
};

type LoginActionTypes = {
  type: string;
  payload: LoginPayload;
};

type TendencyActionTypes = {
  type: string;
  payload: {
    mbti: string;
    token: string;
  }
}

type User = {
  pk: number;
  username: string;
  mbti: string | null;
};

type payload = {
  token: string;
  user: User
}

export type LoginResponse = {
  data: payload
};

export type TendencyResponse = {
  data: {
    token: string;
    user: User;
  }
};

type withdrawal = {
  type: string;
  payload: {
    token: string;
  }
}

export type LoginState = {
  pending: boolean;
  isLogin: boolean;
  isError: boolean;
  isSkip: boolean;
  data: User | {};
  mbti: string;
  token: string;
};

export const requestLogin = () =>
  ({
    type: LOGIN_REQUESTED
  })

export function* loginUser(action: LoginActionTypes) {
  try {
    const user: LoginResponse = yield call(Api.login, action.payload);
    console.log(user.data);
    yield put({ type: LOGIN_SUCCESS, payload: user.data });
  } catch (err) {
    console.log(err);
    yield put({ type: LOGIN_FAILURE })
  }
}

export function* tendencyUser(action: TendencyActionTypes) {
  try {
    const tendency = yield call(Api.tendency, action.payload);
    console.log(tendency);
  } catch (err) {
    console.log(err);
  } finally {
    yield put({
      type: TENDENCY_SUCSSES, payload: action.payload
    })
  }
}


export function* withdrawal({ payload: { token } }: withdrawal) {
  try {
    yield call(Api.withdrawal, { token });
    yield put({ type: LOGOUT })
  } catch (error) {
    console.log(error);
  }
}



const initialState: LoginState = {
  pending: false,
  isLogin: false,
  isError: false,
  isSkip: false,
  data: {},
  mbti: '',
  token: '',
};

type action = {
  type: string;
  payload: payload;
}


const reducer = (state: LoginState = initialState, action: action) => {
  switch (action.type) {
    case LOGIN_INIT:
      return {
        ...state,
        pending: false,
        isLogin: false,
        isError: false,
        isSkip: false,
        token: 'logouttoken'
      };
    case LOGIN_REQUESTED:
      return {
        ...state,
        pending: true,
      };
    case LOGIN_SKIP:
      return {
        ...state,
        pending: false,
        isLogin: false,
        isSkip: true,
      };
    case LOGIN_SUCCESS:
      const { payload } = action;
      if (payload.token) {
        AsyncStorage.setItem('token', payload.token);
      }
      return {
        ...state,
        pending: false,
        isLogin: true,
        token: payload.token || state.token,
        data: payload.user,
        mbti: payload.user.mbti || ''
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        pending: false,
        isError: true,
        isLogin: false,
      };
    case TENDENCY:
      return {
        ...state,
        pending: true,
      };
    case TENDENCY_SUCSSES:
      return {
        ...state,
        pending: false,
        mbti: action.payload,
      }
    case LOGOUT:
      return {
        ...state,
        isLogin: false,
        isSkip: false,
        data: {},
        mbti: 'logo',
        token: '',
      };
    default:
      return state;
  }
};

export default reducer;