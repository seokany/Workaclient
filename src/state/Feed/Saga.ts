import { call, put, takeLatest } from 'redux-saga/effects';
import { getFeed, getFeedDetail, makeFeed } from '../../Api/Feed';
import {
  GET_FEED_FAIL,
  getFeedSuccess, MAKE_FEED_FAIL, makeCard,
  makeFeedSuccess
} from './Action';
import { Action } from '../index'
import { LOGIN_SUCCESS, LOGOUT } from "../../reducers/login";
import { AsyncStorage } from "react-native";


export function* handleGetFeed({ payload: { token } }: { type: string, payload: { token: string } }) {
  try {
    const response = yield call(getFeed, { token });
    yield put({ type: LOGIN_SUCCESS, payload: { token, user: response.data.request_user } })
    console.log(response.data)
    yield put(getFeedSuccess(response.data.results));
  } catch (err) {
    console.log(err);
    if (err.status === 401) {
      yield put({ type: LOGOUT });
    }
    yield put({ type: GET_FEED_FAIL, payload: err })
  }
}


export function* handleMakeFeed({ type, payload: { title,tags, text, images, token}  }: { type: string, payload: makeCard }) {
  try {
    console.log(title)
    const response = yield call(makeFeed, {title,tags,text,images,token});
    console.log(response)
      yield put(makeFeedSuccess(response.data));
  } catch (err) {
    console.log(err.status)
    yield put({ type: MAKE_FEED_FAIL, payload: err })
  }
}