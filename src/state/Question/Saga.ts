import { Alert } from 'react-native'
import { call, put } from "redux-saga/effects";
import {
    MAKE_QUESTION_COMMENT_FAIL,
    MAKE_QUESTION_COMMENT_SUCCESS,
    GET_QUESTION_FAIL,
    MAKE_QUESTION_FAIL,
    makeQuestionSuccess,
    QUESTION_COMMENTS_SUCCESS,
    QUESTION_COMMENTS_FAIL,
    QUESTION_COMMENTS_REQUEST,
    GET_QUESTION_SUCCESS, GET_QUESTION_DETAIL_SUCCESS, GET_QUESTION_DETAIL_FAIL
} from "./Action";
import { makeQuestion, makeQuestionCard, getQuestion, makeQuestionComment, getQuestionComment, getQuestionDetail } from "../../Api/Question";
import { LOGOUT } from "../../reducers/login";
import { errorHandler } from "../errorHandler";

export function* handleQuestion({ type, payload: { tags, title, question, token } }: { type: string, payload: { token: string, tags: [], title: string, question: string } }) {
    try {
        const response = yield call(makeQuestionCard, { tags, title, token });
        yield call(makeQuestion, { id: response.data.id, question: question, token: token })
        const Getresponse = yield call(getQuestion, { token })
        yield put({ type: GET_QUESTION_SUCCESS, payload: Getresponse.data });
        yield put(makeQuestionSuccess(response.data));
        Alert.alert("WORKA!", '질문지 생성 완료')
    } catch (err) {
        if (!err) {
            Alert.alert("WORKA!", "인터넷 연결이 필요한 기능입니다.");
        } else if (err.status === 401) {
            yield put({ type: LOGOUT });
            alert('인증이 유효하지 않습니다.')
        } else {
            yield errorHandler(err.status)
        }
        yield put({ type: MAKE_QUESTION_FAIL, payload: err })
    }
}

export function* handleGetQuestion({ type, payload: { token } }: { type: string, payload: { token: string } }) {
    try {
        const response = yield call(getQuestion, { token })
        yield put({ type: GET_QUESTION_SUCCESS, payload: response.data });
    } catch (err) {
        if (!err) {
            Alert.alert("WORKA!", "인터넷 연결이 필요한 기능입니다.");
        } else if (err.status === 401) {
            yield put({ type: LOGOUT });
            alert('인증이 유효하지 않습니다.')
        } else {
            yield errorHandler(err.status)
        }
        yield put({ type: GET_QUESTION_FAIL, payload: err })
    }
}

export function* handleGetQuestionDetail({ type, payload: { token, id } }: { type: string, payload: { token: string, id: number } }) {
    try {
        const response = yield call(getQuestionDetail, { token, id })
        yield put({ type: GET_QUESTION_DETAIL_SUCCESS, payload: response.data });
    } catch (err) {
        if (!err) {
            Alert.alert("WORKA!", "인터넷 연결이 필요한 기능입니다.");
        } else if (err.status === 401) {
            yield put({ type: LOGOUT });
            alert('인증이 유효하지 않습니다.')
        } else {
            yield errorHandler(err.status)
        }
        yield put({ type: GET_QUESTION_DETAIL_FAIL, payload: err })
    }
}

export function* handleMakeQuestionComment({ type, payload: { token, question_pk, page_pk, text } }: { type: string, payload: { token: string, question_pk: number, page_pk: number, text: string } }) {
    try {
        const response = yield call(makeQuestionComment, { page_pk, question_pk, text, token })
        yield put({ type: MAKE_QUESTION_COMMENT_SUCCESS, payload: response.data })
        yield put({ type: QUESTION_COMMENTS_REQUEST, payload: { token, page_pk, question_pk } })
    } catch (err) {
        if (!err) {
            Alert.alert("WORKA!", "인터넷 연결이 필요한 기능입니다.");
        } else if (err.status === 401) {
            yield put({ type: LOGOUT });
            alert('인증이 유효하지 않습니다.')
        } else {
            yield errorHandler(err.status)
        }
        yield put({ type: MAKE_QUESTION_COMMENT_FAIL, payload: err })
    }

}

export function* handleQuestionComments({ type, payload: { token, question_pk, page_pk } }: { type: string, payload: { token: string, question_pk: number, page_pk: number } }) {
    try {
        const response = yield call(getQuestionComment, { page_pk, question_pk, token });
        yield put({ type: QUESTION_COMMENTS_SUCCESS, payload: response.data.results })
    } catch (err) {
        if (!err) {
            Alert.alert("WORKA!", "인터넷 연결이 필요한 기능입니다.");
        } else if (err.status === 401) {
            yield put({ type: LOGOUT });
            alert('인증이 유효하지 않습니다.')
        } else {
            yield errorHandler(err.status)
        }
        yield put({ type: QUESTION_COMMENTS_FAIL, payload: err })
    }
}