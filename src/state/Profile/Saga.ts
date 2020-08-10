import {call, put} from "redux-saga/effects";
import {
    PROFILE_FAIL,
    PROFILE_QUESTION_FAIL,
    ProfileSuccess,
    QuestionSuccess
} from "./Action";
import {getProfile, getQuestion} from "../../Api/Profile";
import {Action} from "./Reducer";

export function* handleProfile(action : Action) {
    try{
        const response = yield call( getProfile, action.payload );
        console.log(response.data)
        yield put(ProfileSuccess(response.data));
    } catch (err) {
        yield put({ type: PROFILE_FAIL , payload: err })
    }
}

export function* handleProfileQuestion(action : Action) {
    try{
        const response = yield call( getQuestion, action.payload );
        yield put(QuestionSuccess(response.data));
    } catch (err) {
        yield put({ type: PROFILE_QUESTION_FAIL , payload: err })
    }
}
