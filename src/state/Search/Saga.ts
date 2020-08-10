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
        yield put({ type: SEARCH_SUCCESS, payload: search.data });
    } catch (err) {
        console.log(err);
        yield put({ type: SEARCH_FAILURCH });
    }
}
