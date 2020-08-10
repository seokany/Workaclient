import {call, put} from "redux-saga/effects";
import {
    MAKE_QUESTION_COMMENT_FAIL,
    MAKE_QUESTION_COMMENT_SUCCESS,GET_QUESTION_FAIL,
    MAKE_QUESTION_FAIL,getQuestionSuccess,
    makeQuestionSuccess, QUESTION_COMMENTS_SUCCESS, QUESTION_COMMENTS_FAIL, QUESTION_COMMENTS_REQUEST
} from "./Action";
import {makeQuestion, makeQuestionCard, getQuestion, makeQuestionComment, getQuestionComment} from "../../Api/Question";

import {Action} from "./Reducer";

export function* handleQuestion(action : Action) {
    try{
        const response = yield call( makeQuestionCard, action.payload );
        yield call(makeQuestion, {id: response.data.id, question : action.payload.question, token: action.payload.token})
        yield put(makeQuestionSuccess(response.data));
        alert('질문지 생성 완료')
    } catch (err) {
        yield put({ type: MAKE_QUESTION_FAIL , payload: err })
    }
}

export function* handleGetQuestion({ type, payload: { token } }: { type: string, payload: { token: string } }) {
    try {
        const response = yield call(getQuestion, { token })
        yield put(getQuestionSuccess(response.data));
    } catch (err) {
        yield put({ type: GET_QUESTION_FAIL, payload: err })
    }
}

export function* handleMakeQuestionComment(action: Action) {
    try{
        const response = yield call(makeQuestionComment, action.payload)
        yield put({type:MAKE_QUESTION_COMMENT_SUCCESS, payload: response.data})
        yield put({type:QUESTION_COMMENTS_REQUEST, payload: action.payload})
    }catch (err) {
        yield put({ type: MAKE_QUESTION_COMMENT_FAIL , payload: err })
    }

}


export function* handleQuestionComments(action : Action) {
    try{
        const response = yield call(getQuestionComment, action.payload);
        yield put({type:QUESTION_COMMENTS_SUCCESS, payload: response.data.results})
    } catch (err) {
        yield put({ type: QUESTION_COMMENTS_FAIL , payload: err })
    }
}