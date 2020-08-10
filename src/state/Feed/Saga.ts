import { call, put, takeLatest } from 'redux-saga/effects';
import { getFeed, getFeedDetail, makeFeed } from '../../Api/Feed';
import {
  GET_FEED_FAIL,
  getFeedSuccess, MAKE_FEED_FAIL,
  makeFeedSuccess
} from './Action';
import { Action } from '../index'
import { LOGIN_SUCCESS } from "../../reducers/login";
import { AsyncStorage } from "react-native";


export function* handleGetFeed({ payload: { token } }: { type: string, payload: { token: string } }) {
  try {
    const response = yield call(getFeed, { token });
    yield put({ type: LOGIN_SUCCESS, payload: { token, user: response.data.request_user } })
    yield put(getFeedSuccess(response.data.results));
  } catch (err) {
    console.log(err);
    if (err.status === 401) {
      yield AsyncStorage.clear()
    }
    yield put({ type: GET_FEED_FAIL, payload: err })
  }
}


export function* handleMakeFeed(action: Action) {
  try {
    const response = yield call(makeFeed, action.payload);
    //   console.log(response);
    //   yield put(makeFeedSuccess(response.data));
  } catch (err) {
    yield put({ type: MAKE_FEED_FAIL, payload: err })
  }
}