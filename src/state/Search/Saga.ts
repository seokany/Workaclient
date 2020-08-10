import { call, put } from "redux-saga/effects";
import { SEARCH_FAILURCH, SEARCH_REQUEST, SEARCH_SUCCESS } from "./Action";
import { searching } from "../../Api/Search";

export interface Action {
    type: string;
    payload: {
        temp: string;
        token: string;
    }
}

export function* handleSearch(action: Action) {
    try {
        const search = yield call(searching, action.payload);
        yield put({ type: SEARCH_SUCCESS, payload: search });
        alert('질문지 생성 완료')
    } catch (err) {
        console.log("FALI")
        yield put({ type: SEARCH_FAILURCH });
    }
}
