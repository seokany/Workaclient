import {call, put, takeLatest} from 'redux-saga/effects';
import {getFeed, getFeedDetail, makeFeed} from '../../Api/Feed';
import {

  GET_FEED_FAIL,
  getFeedSuccess, MAKE_FEED_FAIL,
  makeFeedSuccess
} from './Action';
import {Action} from '../index'


export function* handleGetFeed() {
  try{
  const response = yield call( getFeed );
    yield put(getFeedSuccess(response.data.results));
  } catch (err) {
    yield put({ type: GET_FEED_FAIL , payload: err })
  }
}


export function* handleMakeFeed(action : Action) {
  try{
    const response = yield call( makeFeed, action.payload  );
    yield put(makeFeedSuccess(response));
  } catch (err) {
    yield put({ type: MAKE_FEED_FAIL, payload: err })
  }
}