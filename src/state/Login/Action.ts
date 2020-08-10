import * as Types from './Types'

export const LOGIN_INIT = "LOGIN_INIT" as const;
export const LOGIN_SKIP = 'SKIP' as const;
export const LOGIN_REQUESTED = 'LOGIN_REQUESTED' as const;
export const LOGIN_SUCCESS = 'LOGINSUCCESS' as const;
export const LOGIN_FAILURE = 'LOGINFAILURE' as const;

export const FORGOT_PASSWORD_INIT = 'FORGET_PASSWORD_INIT';
export const FORGOT_PASSWORD_REQUEST = 'FORGET_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGET_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILURE = 'FORGET_PASSWORD_FAILURE';

export const FORGOT_USERNAME_INIT = 'FORGET_USERNAME_INIT';
export const FORGOT_USERNAME_REQUEST = 'FORGET_USERNAME_REQUEST';
export const FORGOT_USERNAME_SUCCESS = 'FORGET_USERNAME_SUCCESS';
export const FORGOT_USERNAME_FAILURE = 'FORGET_USERNAME_FAILURE';


export const WITHDRAWAL = 'WITHDRAWAL' as const;

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST' as const;
export const LOGOUT = 'LOGOUT' as const;

export const TENDENCY_SUCSSES = 'TENDENCY_SUCSSES' as const;
export const TENDENCY = 'TENDENCY' as const;



export type GetLoginAction = {
    type: typeof LOGIN_REQUESTED;
}
export const requestLogin = () =>
    ({
        type: LOGIN_REQUESTED
    })