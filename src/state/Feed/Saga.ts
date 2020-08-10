import { Alert } from 'react-native';
import { call, put, takeLatest } from 'redux-saga/effects';
import { getFeed, getFeedDetail, makeFeed, patchFeed, deleteFeed } from '../../Api/Feed';
import {
  GET_FEED_FAIL,
  GET_FEED_REQUEST,
  GET_FEED_SUCCESS,
  getFeedSuccess,
  MAKE_FEED_FAIL,
  makeCard,
  makeFeedSuccess,
  PATCH_FEED_SUCCESS,
  PATCH_FEED_FAIL,
  PatchFeedPayload,
  ONLY_GET_FEED_REQUEST,
  DELETE_FEED_SUCCESS,
  DELETE_FEED_FAIL
} from './Action';
import { LOGIN_SUCCESS, LOGOUT, LOGOUT_REQUEST } from "../../reducers/login";
import { errorHandler } from '../errorHandler';
import {PROFILE_REQUEST, ProfileSuccess} from '../Profile/Action';
import {getProfile} from "../../Api/Profile";



export function* handleGetFeed({ payload: { token } }: { type: string, payload: { token: string } }) {
  try {
    const response = yield call(getFeed, { token });
    yield put({ type: LOGIN_SUCCESS, payload: { token, user: response.data.request_user } })
    yield put(getFeedSuccess(response.data.results));
  } catch (err) {
    if (!err) {
      Alert.alert("WORKA!", "인터넷 연결이 필요한 기능입니다.");
    } else {
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
    if (!err) {
      Alert.alert("WORKA!", "인터넷 연결이 필요한 기능입니다.");
    } else {
      yield put({ type: LOGOUT });
    }
    yield put({ type: GET_FEED_FAIL, payload: err })
  }
}


export function* handleMakeFeed({ type, payload: { pk, title, tags, text, images, token } }: { type: string, payload: makeCard }) {
  try {
    const response = yield call(makeFeed, { title, tags, text, images, token, pk });
    const getResponse = yield call(getFeed, { token })
    yield put(makeFeedSuccess(response.data));
    yield put(getFeedSuccess(getResponse.data.results));
    const profileResponse = yield call(getProfile, {pk: pk, token :token});
    yield put(ProfileSuccess(profileResponse.data));
    Alert.alert("WORKA!", '카드가 작성 되었습니다.')
  } catch (err) {
    if (!err) {
      Alert.alert("WORKA!", '인터넷 연결이 필요한 기능입니다.')
    } else if (err.status === 401) {
      yield put({ type: LOGOUT });
      Alert.alert("WORKA!", '인증이 유효하지 않습니다.')
    } else {
      yield errorHandler(err.status)
    }
    yield put({ type: MAKE_FEED_FAIL, payload: err })
  }
}

export function* handlePatchFeed(
  { type, payload }: { type: string, payload: PatchFeedPayload }) {
  try {
    const feed = yield call(patchFeed, payload);
    yield put({ type: ONLY_GET_FEED_REQUEST, payload });
    yield put({ type: PATCH_FEED_SUCCESS });
  } catch (error) {
    if (!error) {
      Alert.alert("WORKA!", "인터넷 연결이 필요한 작업입니다. 다시 확인해주세요");
    } else {
      console.log(error.data);

    }
    yield put({ type: PATCH_FEED_FAIL });

  }
}

export function* handleDeleteFeed(
  { type, payload }: { type: string, payload: { id: number, token: string, pk : string } }
) {
  try {
    yield call(deleteFeed, payload);
    yield put({ type: DELETE_FEED_SUCCESS });
    Alert.alert("WORKA!", "유저카드가 삭제되었습니다.", [
      {
        text: "확인",
      }
    ]);
    const profileResponse = yield call(getProfile, {token : payload.token, pk: payload.pk});
    yield put(ProfileSuccess(profileResponse.data));
    yield put({ type: ONLY_GET_FEED_REQUEST, payload });
  } catch (error) {
    if (!error) {
      Alert.alert("WORKA!", "인터넷 연결이 필요한 작업입니다. 다시 확인해주세요");
    }
    yield put({ type: DELETE_FEED_FAIL });
  }
}