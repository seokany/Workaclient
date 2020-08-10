import { Alert } from 'react-native';
import { call, put } from "redux-saga/effects";
import {
    PROFILE_FAIL,
    PROFILE_QUESTION_FAIL,
    ProfileSuccess,
    QuestionSuccess,
    PATCH_COMMENTS_SUCCESS
} from "./Action";
import { getProfile, getQuestion, patchComment } from "../../Api/Profile";
import { Action, PatchCommentsAction } from "./Reducer";

export function* handleProfile(action: Action) {
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

export function* handleProfileQuestion(action: Action) {
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
        const response = yield call(patchComment, action.payload);
        yield put({ type: PATCH_COMMENTS_SUCCESS, comments: action.payload.comments })
    } catch (error) {
        if (!error) {
            Alert.alert("WORKA!", "인터넷 연결이 필요한 기능입니다.");
        }
    }
}