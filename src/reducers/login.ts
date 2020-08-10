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

export type LoginResponse = {
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
  data: any;
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
    yield put({ type: LOGIN_SUCCESS, payload: user });
  } catch (err) {
    console.log(err);
    yield put({ type: LOGIN_FAILURE })
  }
}

export function* tendencyUser(action: TendencyActionTypes) {
  try {
    yield call(Api.tendency, action.payload);
  } catch (err) {
    console.log(err);
  } finally {
    yield put({
      type: LOGIN_SUCCESS, payload: {
        data: {
          user: {
            mbti: action.payload
          }
        }
      }
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

const reducer = handleActions(
  {
    [LOGIN_INIT]: (state) => ({
      ...state,
      pending: false,
      isLogin: false,
      isError: false,
      isSkip: false,
      token: ''
    }),
    [LOGIN_REQUESTED]: (state) => ({
      ...state,
      pending: true,
    }),
    [LOGIN_SKIP]: (state) => ({
      ...state,
      pending: false,
      isLogin: false,
      isSkip: true,
    }),
    [LOGIN_SUCCESS]: (state, { payload }: { type: string, payload: LoginResponse }) => {
      if (payload.data.token) {
        AsyncStorage.setItem('token', payload.data.token);
      }
      return ({
        ...state,
        pending: false,
        isLogin: true,
        token: payload.data.token || state.token,
        data: payload.data.user,
        mbti: payload.data.user.mbti || ''
      })
    },
    [LOGIN_FAILURE]: (state) => ({
      ...state,
      pending: false,
      isError: true,
      isLogin: false,
    }),
    [TENDENCY]: (state) => ({
      ...state,
      pending: true,
    }),
    [LOGOUT]: (state) => {
      AsyncStorage.clear();
      return ({
        ...state,
        isLogin: false,
        isSkip: false,
        data: {},
        mbti: '',
        token: '',
      })
    },
  },
  initialState,
);

export default reducer;



// { "message": "Request failed with status code 400", 
// "name": "Error", 
// "stack": "createError@http://172.30.1.59:19001/node_modules/expo/AppEntry.bundle?platform=ios&dev=true&minify=false&hot=false:140518:26\nsettle@http://172.30.1.59:19001/node_modules/expo/AppEntry.bundle?platform=ios&dev=true&minify=false&hot=false:140508:25\nhandleLoad@http://172.30.1.59:19001/node_modules/expo/AppEntry.bundle?platform=ios&dev=true&minify=false&hot=false:140406:15\ndispatchEvent@http://172.30.1.59:19001/node_modules/expo/AppEntry.bundle?platform=ios&dev=true&minify=false&hot=false:32785:31\nsetReadyState@http://172.30.1.59:19001/node_modules/expo/AppEntry.bundle?platform=ios&dev=true&minify=false&hot=false:31854:27\n__didCompleteResponse@http://172.30.1.59:19001/node_modules/expo/AppEntry.bundle?platform=ios&dev=true&minify=false&hot=false:31696:29\nemit@http://172.30.1.59:19001/node_modules/expo/AppEntry.bundle?platform=ios&dev=true&minify=false&hot=false:7450:42\n__callFunction@http://172.30.1.59:19001/node_modules/expo/AppEntry.bundle?platform=ios&dev=true&minify=false&hot=false:3225:49\nhttp://172.30.1.59:19001/node_modules/expo/AppEntry.bundle?platform=ios&dev=true&minify=false&hot=false:2938:31\n__guard@http://172.30.1.59:19001/node_modules/expo/AppEntry.bundle?platform=ios&dev=true&minify=false&hot=false:3179:15\ncallFunctionReturnFlushedQueue@http://172.30.1.59:19001/node_modules/expo/AppEntry.bundle?platform=ios&dev=true&minify=false&hot=false:2937:21\ncallFunctionReturnFlushedQueue@[native code]", "config": { "url": "/signup/", "method": "post", "data": "{\"email\":\"test1@email.com\",\"username\":\"test12\",\"password\":\"12345678\",\"birth_date\":\"2000-10-01\"}", 
// "headers": { "Accept": "application/json, text/plain, */*", "Content-Type": "application/json;charset=utf-8" }, 
// "baseURL": "http://127.0.0.1:8000/api/v1/accounts", 
// "transformRequest": [null], 
// "transformResponse": [null],
//  "timeout": 0,
//   "xsrfCookieName": "XSRF-TOKEN",
//    "xsrfHeaderName": "X-XSRF-TOKEN", 
//    "maxContentLength": -1 } 
//   }