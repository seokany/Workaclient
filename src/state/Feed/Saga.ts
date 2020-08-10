import { Alert } from 'react-native';
import { call, put } from 'redux-saga/effects';
import {getFeed, makeFeed, patchFeed, deleteFeed} from '../../Api/Feed';
import * as ActionTypes from './Action';
import * as Types from './Types'
import { LOGIN_SUCCESS, LOGOUT, LOGOUT_REQUEST } from "../Login/Action";
import { errorHandler } from '../errorHandler';
import { ProfileSuccess, PROFILE_CARD_SUCCESS } from '../Profile/Action';
import { getProfile } from "../../Api/Profile";



export function* handleGetFeed({ payload: { token } }: { type: string, payload: { token: string } }) {
  try {
    const response:Types.ResponseGetFeed = yield call(getFeed, { token });
    yield put({ type: LOGIN_SUCCESS, payload: { token, user: response.data.request_user } })
    yield put({type: ActionTypes.GET_FEED_SUCCESS, payload: response.data.results})
  } catch (err) {
    if (!err) {
      Alert.alert("WORKA!", "인터넷 연결이 필요한 기능입니다.");
    } else {
      yield put({ type: LOGOUT_REQUEST });
    }
    yield put({ type: ActionTypes.GET_FEED_FAIL, payload: err })
  }
}

export function* handleOnlyGetFeed({ payload: { token } }: { type: string, payload: { token: string } }) {
  try {
    const response:Types.ResponseGetFeed = yield call(getFeed, { token });
    yield put({type: ActionTypes.GET_FEED_SUCCESS, payload: response.data.results})
  } catch (err) {
    if (!err) {
      Alert.alert("WORKA!", "인터넷 연결이 필요한 기능입니다.");
    } else {
      yield put({ type: LOGOUT });
    }
    yield put({ type: ActionTypes.GET_FEED_FAIL, payload: err })
  }
}


export function* handleMakeFeed({ payload: { pk, title, tags, text, images, token } }: { type: string, payload: Types.makeCard }) {
  try {
    const response: Types.ResponseMakeFeed = yield call(makeFeed, { title, tags, text, images, token, pk });
    yield put({type:ActionTypes.MAKE_FEED_SUCCESS});
    yield put({ type: PROFILE_CARD_SUCCESS, payload: { data: { cards: response.data } } })
    yield put({ type: ActionTypes.GET_FEED_SUCCESS, payload: [response.data] });
    Alert.alert("WORKA!", '카드가 작성 되었습니다.')
  } catch (err) {
    console.log(err);
    if (!err) {
      Alert.alert("WORKA!", '인터넷 연결이 필요한 기능입니다.')
    } else if (err.status === 401) {
      yield put({ type: LOGOUT });
      Alert.alert("WORKA!", '인증이 유효하지 않습니다.')
    } else {
      yield errorHandler(err.status)
    }
    yield put({ type: ActionTypes.MAKE_FEED_FAIL, payload: err })
  }
}

export function* handlePatchFeed(
  { type, payload }: { type: string, payload: Types.PatchFeedPayload }) {
  try {
    yield call(patchFeed, payload);
    yield put({ type: ActionTypes.ONLY_GET_FEED_REQUEST, payload });
    yield put({ type: ActionTypes.PATCH_FEED_SUCCESS });
  } catch (error) {
    if (!error) {
      Alert.alert("WORKA!", "인터넷 연결이 필요한 작업입니다. 다시 확인해주세요");
    } else {
      console.log(error.data);

    }
    yield put({ type: ActionTypes.PATCH_FEED_FAIL });

  }
}

export function* handleDeleteFeed(
  { type, payload }: { type: string, payload: { id: number, token: string, pk: string } }
) {
  try {
    yield call(deleteFeed, payload);
    yield put({ type: ActionTypes.DELETE_FEED_SUCCESS });
    Alert.alert("WORKA!", "유저카드가 삭제되었습니다.", [
      {
        text: "확인",
      }
    ]);
    const profileResponse = yield call(getProfile, { token: payload.token, pk: payload.pk });
    yield put(ProfileSuccess(profileResponse.data));
    yield put({ type: ActionTypes.ONLY_GET_FEED_REQUEST, payload });
  } catch (error) {
    if (!error) {
      Alert.alert("WORKA!", "인터넷 연결이 필요한 작업입니다. 다시 확인해주세요");
    }
    yield put({ type: ActionTypes.DELETE_FEED_FAIL });
  }
}