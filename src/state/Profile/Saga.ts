import { Alert } from 'react-native';
import { call, put } from "redux-saga/effects";
import {
    PROFILE_FAIL,
    PROFILE_QUESTION_FAIL,
    ProfileSuccess,
    QuestionSuccess,
    PATCH_COMMENTS_SUCCESS,
    PatchProfileImagePayload,
    PATCH_PROFILE_IMAGES_SUCCESS,
    PROFILE_REQUEST,
    PROFILE_INFO_SUCCESS
} from "./Action";
import { getProfile, getQuestion, patchComment, patchUserImages } from "../../Api/Profile";
import { PatchCommentsAction, GetProfileAction } from "./Reducer";

export function* handleProfile(action: GetProfileAction) {
    try {
        const response = yield call(getProfile, action.payload);
        yield put(ProfileSuccess(response.data));
    } catch (err) {
        if (!err) {
            Alert.alert("WORKA!", "인터넷 연결이 필요한 기능입니다.");
        }
        yield put({ type: PROFILE_FAIL, payload: err })
    }
}

export function* handleProfileQuestion(action: GetProfileAction) {
    try {
        const response = yield call(getQuestion, action.payload);
        yield put(QuestionSuccess(response.data));
    } catch (err) {
        if (!err) {
            Alert.alert("WORKA!", "인터넷 연결이 필요한 기능입니다.");
        }
        yield put({ type: PROFILE_QUESTION_FAIL, payload: err })
    }
}

export function* handleProfileComments(action: PatchCommentsAction) {
    try {
        yield call(patchComment, action.payload);
        yield put({ type: PATCH_COMMENTS_SUCCESS, comments: action.payload.comments })
    } catch (error) {
        if (!error) {
            Alert.alert("WORKA!", "인터넷 연결이 필요한 기능입니다.");
        }
    }
}

export function* handleProfileImages({ type, payload }: { type: string, payload: PatchProfileImagePayload }) {
    try {
        const userImages = yield call(patchUserImages, payload);
        yield put({ type: PATCH_PROFILE_IMAGES_SUCCESS, payload: { data: { user: { user_image: userImages.data.user_image } } } });
        const response = yield call(getProfile, {pk: payload.pk, token : payload.token});
        yield put(ProfileSuccess(response.data));
    } catch (error) {
        if (!error) {
            Alert.alert("WORKA!", "인터넷 연결이 필요한 기능입니다.");
        }
    }
}

export function* handleProfileInfo(action: GetProfileAction) {
    try {
        const response = yield call(getProfile, action.payload);
        yield put({ type: PROFILE_INFO_SUCCESS, payload: response });
    } catch (err) {
        if (!err) {
            Alert.alert("WORKA!", "인터넷 연결이 필요한 기능입니다.");
        }
        yield put({ type: PROFILE_FAIL, payload: err })
    }
}