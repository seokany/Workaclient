import { Alert } from 'react-native';
import { call, put } from "redux-saga/effects"
import { getLinkSuccess, GET_LINK_FAIL, MAKE_LINK_FAIL, makeLinkSuccess } from "./Action";
import { getLink, postLink } from "../../Api/Link"
import { Action } from "../RootSaga"
import { LOGOUT } from "../Login/Action";
import { errorHandler } from "../errorHandler";

export function* handleLink(action: Action) {
    try {
        const response = yield call(getLink, action.payload);
        yield put(getLinkSuccess(response.data.results));
    } catch (err) {
        if (!err) {
            Alert.alert("WORKA!", "인터넷 연결이 필요한 기능입니다.");
        } else if (err.status === 401) {
            yield put({ type: LOGOUT });
            Alert.alert("WORKA!", '인증이 유효하지 않습니다.')
        } else {
            yield errorHandler(err.status)
        }
        yield put({ type: GET_LINK_FAIL, payload: err })
    }
}
export function* handleMakeLink(action: Action) {
    try {
        const response = yield call(postLink, action.payload);
        yield put(makeLinkSuccess(response));
    } catch (err) {
        if (!err) {
            Alert.alert("WORKA!", "인터넷 연결이 필요한 기능입니다.");
        } else if (err.status === 401) {
            yield put({ type: LOGOUT });
            Alert.alert("WORKA!", '인증이 유효하지 않습니다.')
        } else {
            yield errorHandler(err.status)
        }
        yield put({ type: MAKE_LINK_FAIL, payload: err })
    }
}

