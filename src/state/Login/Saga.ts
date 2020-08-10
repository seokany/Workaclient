import {call, put} from "redux-saga/effects";
import * as Api from "../../Api/login";
import {Alert} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import * as Types from './Types'
import * as ActionTypes from './Action'

export function* forgotPassword(action: Types.forgotAction) {
    try {
        yield call(Api.forgotPassword, action.payload);
        yield put({ type: ActionTypes.FORGOT_PASSWORD_SUCCESS });
    } catch (error) {
        let status: string;
        if (!error) {
            status = '500'
        } else if ('status' in error) {
            status = error.status.toString()
        } else {
            status = '500'
        }
        yield put({ type: ActionTypes.FORGOT_PASSWORD_FAILURE, payload: status });
    }
}

export function* forgotUsername(action: Types.forgotEamilAciton) {
    try {
        const email = yield call(Api.forgotUsername, action.payload);
        yield put({ type: ActionTypes.FORGOT_USERNAME_SUCCESS, payload: email.data.username });
    } catch (error) {
        let status: string;
        if (!error) {
            status = '500'
        } else if ('status' in error) {
            status = error.status.toString()
        } else {
            status = '500'
        }
        yield put({ type: ActionTypes.FORGOT_USERNAME_FAILURE, payload: status });
    }
}

export function* tendencyUser(action: Types.TendencyActionTypes) {
    try {
        yield call(Api.tendency, action.payload);
        yield put({ type: ActionTypes.TENDENCY_SUCSSES, payload: action.payload })
    } catch (error) {
        if (!error) {
            Alert.alert("WORKA!", "인터넷 연결이 필요한 작업입니다.");
        } else {
            Alert.alert("WORKA!", error.data);
        }
        yield put({ type: ActionTypes.LOGIN_FAILURE });
    }
}

export function* logout() {
    try {
        yield AsyncStorage.removeItem('token');
        yield put({ type: ActionTypes.LOGOUT })
    } catch (error) {

    }
}


export function* withdrawal({ payload: { token } }: Types.withdrawal) {
    try {
        yield call(Api.withdrawal, { token });
        yield put({ type: ActionTypes.LOGOUT_REQUEST })
    } catch (error) {
        if (!error) {
            Alert.alert("WORKA!", "인터넷 연결이 필요한 작업입니다.");
        }
    }
}
export function* loginUser(action: Types.LoginActionTypes) {
    try {
        const user: Types.LoginResponse = yield call(Api.login, action.payload);
        yield put({ type: ActionTypes.LOGIN_SUCCESS, payload: user.data });
    } catch (err) {
        yield put({ type: ActionTypes.LOGIN_FAILURE })
    }
}
