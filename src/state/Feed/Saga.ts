import { call, put, takeLatest } from 'redux-saga/effects';
import { getFeed, getFeedDetail, makeFeed } from '../../Api/Feed';
import {
  GET_FEED_FAIL, GET_FEED_REQUEST, GET_FEED_SUCCESS,
  getFeedSuccess, MAKE_FEED_FAIL, makeCard,
  makeFeedSuccess
} from './Action';
import {LOGIN_SUCCESS, LOGOUT, LOGOUT_REQUEST} from "../../reducers/login";
import {AsyncStorage} from "react-native";



export function* handleGetFeed({ payload: { token } }: { type: string, payload: { token: string } }) {
  try {
    const response = yield call(getFeed, { token });
    yield put({ type: LOGIN_SUCCESS, payload: { token, user: response.data.request_user } })
    yield put(getFeedSuccess(response.data.results));
  } catch (err) {
    if (err.status === 401) {
      yield put({ type: LOGOUT_REQUEST });
    }
    yield put({ type: GET_FEED_FAIL, payload: err })
  }
}

export function* handleOnlyGetFeed({ payload: { token } }: { type: string, payload: { token: string } }) {
  try {
    const response = yield call(getFeed, { token });
    yield put(getFeedSuccess(response.data.results));
  } catch (err) {
    if (err.status === 401) {
      yield put({ type: LOGOUT });
    }
    yield put({ type: GET_FEED_FAIL, payload: err })
  }
}


export function* handleMakeFeed({ type, payload: { title, tags, text, images, token } }: { type: string, payload: makeCard }) {
  try {
    const response = yield call(makeFeed, { title, tags, text, images, token });
    const getResponse = yield call(getFeed, {token})
    yield put(makeFeedSuccess(response.data));
    yield put(getFeedSuccess(getResponse.data.results));
    alert('카드가 작성 되었습니다.')
  } catch (err) {
    yield put({ type: MAKE_FEED_FAIL, payload: err })
  }
}