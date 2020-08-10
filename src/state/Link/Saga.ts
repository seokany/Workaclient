import { call, put } from "redux-saga/effects"
import { getLinkSuccess, GET_LINK_FAIL } from "./Action";
import { getLink } from "../../Api/Link"
import { Action } from "../index"

export function*handleLink(action: Action) {
    try {
        const response = yield call( getLink, action.payload );
          yield put(getLinkSuccess(response.data.results));
    } catch (err) {
        yield put({type: GET_LINK_FAIL, payload: err})
    }
}

