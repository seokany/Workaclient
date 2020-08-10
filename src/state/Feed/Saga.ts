import {call, put, takeLatest} from 'redux-saga/effects';
import {getFeed, getFeedDetail} from '../../Api/Feed';
import {GET_FEED_DETAIL_FAIL, GET_FEED_FAIL, getFeedDetailSuccess, getFeedSuccess} from './Action';
import {Action} from '../../sagas/index'


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
