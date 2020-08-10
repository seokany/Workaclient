import { Alert } from 'react-native';
import { call, put } from "redux-saga/effects";
import { SEARCH_FAILURCH, SEARCH_SUCCESS } from "./Action";
import { searching } from "../../Api/Search";
import * as Types from "./Types"


export function* handleSearch(action: Types.Action) {
    try {
        const search = yield call(searching, action.payload);
        yield put({ type: SEARCH_SUCCESS, payload: search.data });
    } catch (err) {
        if (!err) {
            Alert.alert("WORKA!", "인터넷 연결이 필요한 기능입니다.");
        }
        yield put({ type: SEARCH_FAILURCH });
    }
}
