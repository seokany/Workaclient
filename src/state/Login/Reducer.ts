import * as Types from './Types'
import * as ActionTypes from './Action'
import AsyncStorage from "@react-native-community/async-storage";

const initialState: Types.LoginState = {
    pending: false,
    isLogin: false,
    isError: false,
    isSkip: false,
    data: {
        pk: 0,
        username: '',
        mbti: ''
    },
    mbti: '',
    token: '',
};
const passwordInitialState: Types.ForgotState = {
    fetching: false,
    success: false,
    error: '',
}

const forgotUsernameState: Types.ForgotUsernameState = {
    email: '',
    fetching: false,
    success: false,
    error: ''
}

export const LoginReducer = (state: Types.LoginState = initialState, action: Types.action) => {
    switch (action.type) {
        case ActionTypes.LOGIN_INIT:
            return {
                ...state,
                pending: false,
                isLogin: false,
                isError: false,
                isSkip: false,
                token: ''
            };
        case ActionTypes.LOGIN_REQUESTED:
            return {
                ...state,
                pending: true,
            };
        case ActionTypes.LOGIN_SKIP:
            return {
                ...state,
                pending: false,
                isLogin: false,
                isSkip: true,
            };
        case ActionTypes.LOGIN_SUCCESS:
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
        case ActionTypes.LOGIN_FAILURE:
            return {
                ...state,
                pending: false,
                isError: true,
                isLogin: false,
            };
        case ActionTypes.TENDENCY:
            return {
                ...state,
                pending: true,
            };
        case ActionTypes.TENDENCY_SUCSSES:
            return {
                ...state,
                pending: false,
                mbti: action.payload,
            }
        case ActionTypes.LOGOUT:
            return {
                ...initialState
            };
        default:
            return state;
    }
};

export const forgotPasswordReducer = (state: Types.ForgotState = passwordInitialState, { type, payload = '' }: { type: string, payload?: string }) => {
    switch (type) {
        case ActionTypes.FORGOT_PASSWORD_INIT:
            return {
                ...passwordInitialState
            };
        case ActionTypes.FORGOT_PASSWORD_REQUEST:
            return {
                ...state,
                fetching: true,
            }
        case ActionTypes.FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                fetching: false,
                success: true,
            }
        case ActionTypes.FORGOT_PASSWORD_FAILURE:
            return {
                ...state,
                fetching: false,
                error: payload,
            }
        default:
            return passwordInitialState;
    }
}

export const forgotUsernameReducer = (
    state: Types.ForgotUsernameState = forgotUsernameState,
    { type, payload }: { type: string, payload: string }
) => {
    switch (type) {
        case ActionTypes.FORGOT_USERNAME_INIT:
            return {
                ...passwordInitialState
            };
        case ActionTypes.FORGOT_USERNAME_REQUEST:
            return {
                ...state,
                fetching: true,
                success: false,
                error: '',
            }
        case ActionTypes.FORGOT_USERNAME_SUCCESS:
            return {
                ...state,
                email: payload,
                fetching: false,
                success: true,
                error: '200'
            }
        case ActionTypes.FORGOT_USERNAME_FAILURE:
            return {
                ...state,
                fetching: false,
                error: payload,
                success: false,
            }
        default:
            return forgotUsernameState;
    }
}