import {call, put} from "redux-saga/effects";
import * as Api from "../../Api/login";
import {LOGIN_SUCCESS} from "../Login/Action";
import * as Types from "./Types"
import * as ActionTypes from "./Action"

export function* signupUser(action: Types.SignupActionTypes) {
    try {
        const user = yield call(Api.signup, action.payload);
        yield put({ type: ActionTypes.SIGNUP_SUCCESS, payload: user.data });
        yield put({ type: LOGIN_SUCCESS, payload: { token: user.data.token, user: { mbti: null, pk: user.data.pk, username: user.data.username } } });
    } catch (_error) {
        console.log(_error);
        if (!_error) {
            yield put({ type:ActionTypes. SIGNUP_FAILURE, payload: { email: "", username: "", status: '500' } })
        } else {
            let { data }: Types.SignupError = _error;
            const email = data.email ? (data.email[0]) : '';
            const username = data.username ? (data.username[0]) : '';
            yield put({ type: ActionTypes.SIGNUP_FAILURE, payload: { email, username, status: "401" } })
        }
    }
}

