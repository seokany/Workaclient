import {call, put} from "redux-saga/effects";
import {
    PROFILE_FAIL,
    PROFILE_QUESTION_FAIL,
    ProfileSuccess,
    QUESTION_COMMENTS_FAIL, QuestionCommentSuccess,
    QuestionSuccess
} from "../Profile/Action";
import {getProfile, getQuestion, getQuestionComment} from "../../Api/Profile";
import {Action} from "../index";

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

export function* handleQuestionComments(action : Action) {
    try{
        let arr = []
        for (let i = 0; i < action.payload.question_id.length; i++) {
            let response = yield call( getQuestionComment, action.payload.question_id[i].id);
            arr.push(response.data)
        }

        yield put(QuestionCommentSuccess(arr));
    } catch (err) {
        yield put({ type: QUESTION_COMMENTS_FAIL , payload: err })
    }
}