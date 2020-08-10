import {Alert} from "react-native";
import * as Types from "./Types"
import * as ActionTypes from "./Action"
const initialState: Types.SignupState = {
    pending: false,
    isSignup: false,
    isError: false,
    email: '',
    username: '',
};

export const SignupReducer = (state: Types.SignupState = initialState, action: Types.SignupActionTypes) => {
    const { payload } = action;
    switch (action.type) {
        case ActionTypes.SIGNUP_INIT:
            return {
                pending: false,
                isSignup: false,
                isError: false,
                email: '',
                username: '',
            };
        case ActionTypes.SIGNUP_REQUESTED:
            return {
                ...state,
                pending: true,
            };
        case ActionTypes.SIGNUP_SUCCESS:
            return {
                ...state,
                pending: false,
                isSignup: true,
            };
        case ActionTypes.SIGNUP_FAILURE:
            if (action.payload.status === '500') {
                Alert.alert("WORKA!", "인터넷 연결이 필요한 작업입니다!");
            }
            return {
                ...state,
                pending: false,
                isSignup: false,
                isError: true,
                email: payload.email,
                username: payload.username,
            };
        default:
            return initialState
    }
}