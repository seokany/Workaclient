import {call, put, takeLatest} from 'redux-saga/effects';
import {getFeed, getFeedDetail, makeFeed} from '../../Api/Feed';
import {
  GET_FEED_DETAIL_FAIL,
  GET_FEED_FAIL,
  getFeedDetailSuccess,
  getFeedSuccess, MAKE_FEED_FAIL,
  MAKE_FEED_SUCCESS,
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

export function* handleGetFeedDetail(action : Action) {
  try{
    const response = yield call( getFeedDetail, action.payload  );
    yield put(getFeedDetailSuccess(response.data.results));
  } catch (err) {
    yield put({ type: GET_FEED_DETAIL_FAIL, payload: err })
  }
}

export function* handleMakeFeed(action : Action) {
  try{
    yield call( makeFeed, action.payload  );
    yield put(makeFeedSuccess('success'));
  } catch (err) {
    yield put({ type: MAKE_FEED_FAIL, payload: err })
  }
}