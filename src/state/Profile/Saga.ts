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
        console.log(response.data)
        yield put(ProfileSuccess(response.data));
    } catch (err) {
        yield put({ type: PROFILE_FAIL, payload: err })
    }
}

export function* handleProfileQuestion(action: Action) {
    try {
        const response = yield call(getQuestion, action.payload);
        yield put(QuestionSuccess(response.data));
    } catch (err) {
        yield put({ type: PROFILE_QUESTION_FAIL, payload: err })
    }
}

export function* handleProfileComments(action: PatchCommentsAction) {
    console.log(action.payload);
    try {
        const response = yield call(patchComment, action.payload);
        yield put({ type: PATCH_COMMENTS_SUCCESS, comments: action.payload.comments })
    } catch (error) {

    }
}