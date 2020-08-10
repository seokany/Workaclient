import {call, put} from "redux-saga/effects";
import {MAKE_QUESTION_FAIL,makeQuestionSuccess} from "../Question/Action";
import {makeQuestion, makeQuestionCard} from "../../Api/Question";
import {Action} from "../index";

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
