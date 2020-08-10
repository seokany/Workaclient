import { Alert } from 'react-native';
import { call, put } from "redux-saga/effects";
import {
    PROFILE_FAIL,
    PATCH_COMMENTS_SUCCESS,
    PATCH_PROFILE_IMAGES_SUCCESS,
    PROFILE_INFO_SUCCESS, PROFILE_SUCCESS
} from "./Action";
import * as Types from './Types'
import { getProfile, getQuestion, patchComment, patchUserImages } from "../../Api/Profile";

export function* handleProfile(action: Types.GetProfileAction) {
    try {
        const response:Types.ProfileResponse = yield call(getProfile, action.payload);
        yield put({type: PROFILE_SUCCESS, payload : response});
    } catch (err) {
        if (!err) {
            Alert.alert("WORKA!", "인터넷 연결이 필요한 기능입니다.");
        }
        yield put({ type: PROFILE_FAIL, payload: err })
    }
}

export function* handleProfileComments(action: Types.PatchCommentsAction) {
    try {
        yield call(patchComment, action.payload);
        yield put({ type: PATCH_COMMENTS_SUCCESS, payload: { data: { user: { comments: action.payload.comment } } } })
    } catch (error) {
        if (!error) {
            Alert.alert("WORKA!", "인터넷 연결이 필요한 기능입니다.");
        }
    }
}

export function* handleProfileImages({ type, payload }: { type: string, payload: Types.PatchProfileImagePayload }) {
    try {
        const userImages:Types.UserImageResponse = yield call(patchUserImages, payload);
        yield put({ type: PATCH_PROFILE_IMAGES_SUCCESS, payload: { data: { user: { user_image: userImages.data.user_image } } } });
        const response:Types.ProfileResponse = yield call(getProfile, { pk: payload.pk, token: payload.token });
        yield put({type: PROFILE_SUCCESS, payload: response.data});
    } catch (error) {
        if (!error) {
            Alert.alert("WORKA!", "인터넷 연결이 필요한 기능입니다.");
        }
    }
}

export function* handleProfileInfo(action: Types.GetProfileAction) {
    try {
        const response:Types.ProfileResponse = yield call(getProfile, action.payload);
        yield put({ type: PROFILE_INFO_SUCCESS, payload: response });
    } catch (err) {
        if (!err) {
            Alert.alert("WORKA!", "인터넷 연결이 필요한 기능입니다.");
        }
        yield put({ type: PROFILE_FAIL, payload: err })
    }
}