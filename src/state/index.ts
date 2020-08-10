import { takeEvery, takeLatest, all } from 'redux-saga/effects';
import { LOGIN_REQUESTED, TENDENCY, WITHDRAWAL, loginUser, tendencyUser, withdrawal, LOGOUT_REQUEST, logout } from '../reducers/login';
import { SIGNUP_REQUESTED, signupUser } from '../reducers/signup'
import { GET_FEED_DETAIL_REQUEST, GET_FEED_REQUEST, ONLY_GET_FEED_REQUEST, MAKE_FEED_REQUEST } from "./Feed/Action";
import { handleGetFeed, handleMakeFeed, handleOnlyGetFeed } from "./Feed/Saga"
import {
  handleQuestion,
  handleGetQuestion,
  handleMakeQuestionComment,
  handleQuestionComments,
  handleGetQuestionDetail
} from "./Question/Saga"
import {
  GET_QUESTION_DETAIL_REQUEST,
  GET_QUESTION_REQUEST,
  MAKE_QUESTION_COMMENT_REQUEST,
  MAKE_QUESTION_REQUEST,
  QUESTION_COMMENTS_REQUEST
} from "./Question/Action";
import { PROFILE_QUESTION_REQUEST, PROFILE_REQUEST, PATCH_COMMENTS_REQUEST } from "./Profile/Action";
import { handleProfile, handleProfileQuestion, handleProfileComments } from "./Profile/Saga";
import { SEARCH_REQUEST } from './Search/Action';
import { handleSearch } from './Search/Saga';
import { handleLink, handleMakeLink } from './Link/Saga';
import { GET_LINK_REQUEST, MAKE_LINK_REQUEST } from "./Link/Action"



export interface Action {
  type: string;
  payload: any;
}


function* watchLoginRequested() {
  // signup
  yield takeLatest(SIGNUP_REQUESTED, signupUser);
  //login
  yield takeLatest(LOGIN_REQUESTED, loginUser);
  yield takeLatest(TENDENCY, tendencyUser);
  yield takeLatest(LOGOUT_REQUEST, logout);
  yield takeLatest(WITHDRAWAL, withdrawal);
  // feed
  yield takeLatest(GET_FEED_REQUEST, handleGetFeed);
  yield takeLatest(ONLY_GET_FEED_REQUEST, handleOnlyGetFeed);
  yield takeLatest(MAKE_QUESTION_REQUEST, handleQuestion);
  yield takeLatest(MAKE_FEED_REQUEST, handleMakeFeed);
  //profile
  yield takeLatest(PROFILE_REQUEST, handleProfile);
  yield takeLatest(PROFILE_QUESTION_REQUEST, handleProfileQuestion);
  yield takeLatest(PATCH_COMMENTS_REQUEST, handleProfileComments);
  // yield takeLatest(QUESTION_COMMENTS_REQUEST, handleQuestionComments);
  yield takeLatest(GET_QUESTION_REQUEST, handleGetQuestion);
  // search
  yield takeLatest(SEARCH_REQUEST, handleSearch);
  // link
  yield takeLatest(GET_LINK_REQUEST, handleLink);
  yield takeLatest(MAKE_LINK_REQUEST, handleMakeLink);
  yield takeLatest(MAKE_QUESTION_COMMENT_REQUEST, handleMakeQuestionComment)
  yield takeLatest(QUESTION_COMMENTS_REQUEST, handleQuestionComments)
  yield takeLatest(GET_QUESTION_DETAIL_REQUEST, handleGetQuestionDetail)
}


export default function* rootSaga() {
  yield all([
    watchLoginRequested()
  ])
}
