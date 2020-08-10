import { call, put } from "redux-saga/effects"
import { getLinkSuccess, GET_LINK_FAIL, MAKE_LINK_FAIL, makeLinkSuccess } from "./Action";
import { getLink , postLink } from "../../Api/Link"
import { Action } from "../index"

export function*handleLink(action: Action) {
    try {
        const response = yield call( getLink, action.payload );
          yield put(getLinkSuccess(response.data.results));
    } catch (err) {
        yield put({type: GET_LINK_FAIL, payload: err})
    }
}
export function*handleMakeLink(action: Action) {
    try{
        const response = yield call( postLink, action.payload);
        yield put(makeLinkSuccess(response));
    } catch (err) {
        yield put({ type: MAKE_LINK_FAIL, payload: err})
    }
}

