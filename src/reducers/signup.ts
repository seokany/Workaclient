import { call, put } from 'redux-saga/effects';
import { handleActions } from 'redux-actions';

import * as Api from '../Api/login';

import LOGIN_SUCCESS from './login';

export const SIGNUP_INIT = 'SIGNUP_INIT' as const;
export const SIGNUP_REQUESTED = 'SIGNUP_REQUESTED' as const;
export const SIGNUP_SUCCESS = 'SIGNUPSUCCESS' as const;
export const SIGNUP_FAILURE = 'SIGNUPFAILURE' as const;

export type GetSignupAction = {
    type: typeof SIGNUP_REQUESTED;
}

export type SignupPayload = {
    email: string;
    username: string;
    password: string;
};

type SignupActionTypes = {
    type: string;
    payload: SignupPayload;
};

export type SignupResponse = {
    data: {
        token: string;
    }
}

export type SignupError = {
    data: {
        email?: string[];
        username?: string[];
    };
    status: number;
}

export type SignupState = {
    pending: boolean;
    isSignup: boolean;
    isError: boolean;
    token: string;
    email: string;
    username: string;
};

export const requestLogin = () =>
    ({
        type: SIGNUP_REQUESTED
    })

export function* signupUser(action: SignupActionTypes) {
    try {
        const user: SignupResponse = yield call(Api.signup, action.payload);
        yield put({ type: SIGNUP_SUCCESS, payload: user.data });
        yield put({ type: LOGIN_SUCCESS });
    } catch (_error) {
        let { data }: SignupError = _error;
        const email = data.email ? (data.email[0]) : '';
        const username = data.username ? (data.username[0]) : '';
        yield put({ type: SIGNUP_FAILURE, payload: { email, username } })
    }
}

const initialState: SignupState = {
    pending: false,
    isSignup: false,
    isError: false,
    token: '',
    email: '',
    username: '',
};

const reducer = handleActions(
    {
        [SIGNUP_INIT]: (state) => ({
            pending: false,
            isSignup: false,
            isError: false,
            token: '',
            email: '',
            username: '',
        }),
        [SIGNUP_REQUESTED]: (state) => ({
            ...state,
            pending: true,
        }),
        [SIGNUP_SUCCESS]: (state, { payload }) => ({
            ...state,
            pending: false,
            isSignup: true,
            token: payload.token,
        }),
        [SIGNUP_FAILURE]: (state, { payload }) => ({
            ...state,
            pending: false,
            isSignup: false,
            isError: true,
            email: payload.email,
            username: payload.username,
        }),
    },
    initialState,
);

export default reducer;
