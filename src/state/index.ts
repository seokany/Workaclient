import { takeEvery, takeLatest, all } from 'redux-saga/effects';
import { LOGIN_REQUESTED, TENDENCY, loginUser, tendencyUser } from '../reducers/login';
import { SIGNUP_REQUESTED, signupUser } from '../reducers/signup'
import {GET_FEED_DETAIL_REQUEST, GET_FEED_REQUEST,MAKE_FEED_REQUEST} from "./Feed/Action";
import {handleGetFeed, handleGetFeedDetail, handleMakeFeed} from "./Feed/Saga"
import {handleQuestion, handleGetQuestion} from "./Question/Saga"
import {GET_QUESTION_REQUEST, MAKE_QUESTION_REQUEST} from "./Question/Action";
import {PROFILE_QUESTION_REQUEST, PROFILE_REQUEST, QUESTION_COMMENTS_REQUEST} from "./Profile/Action";
import {handleProfile, handleProfileQuestion, handleQuestionComments} from "./Profile/Saga";



export interface Action {
  type: string;
  payload: any;
}


function* watchLoginRequested() {
  yield takeLatest(LOGIN_REQUESTED, loginUser);
  yield takeLatest(SIGNUP_REQUESTED, signupUser);
  yield takeLatest(TENDENCY, tendencyUser);
  yield takeLatest(GET_FEED_REQUEST, handleGetFeed);
  yield takeLatest(GET_FEED_DETAIL_REQUEST, handleGetFeedDetail)
  yield takeLatest(MAKE_QUESTION_REQUEST, handleQuestion)
  yield takeLatest(MAKE_FEED_REQUEST, handleMakeFeed)
  yield takeLatest(PROFILE_REQUEST, handleProfile)
  yield takeLatest(PROFILE_QUESTION_REQUEST, handleProfileQuestion)
  yield takeLatest(QUESTION_COMMENTS_REQUEST, handleQuestionComments)
  yield takeLatest(GET_QUESTION_REQUEST, handleGetQuestion)
}

export default function* rootSaga() {
  yield all([
    watchLoginRequested()
  ])
}
