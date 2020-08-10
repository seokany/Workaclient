import { combineReducers } from 'redux';
import { takeLatest } from 'redux-saga/effects';

import login, { LoginState } from './login';
import signup, { SignupState } from './signup'
import {getFeed, FeedState} from '../state/Feed/Reducer'
import setting, { SettingState } from './setting'
import {QuestionState, questionFeed} from "../state/Question/Reducer";
import {
    ProfileState,
    ProfileFeed,
    ProfileQuestionState,
    ProfileQuestionFeed,
    QuestionCommentState,
    QuestionCommentFeed
} from "../state/Profile/Reducer";

export type RootState = {
    login: LoginState,
    signup: SignupState,
    feed: FeedState,
    setting: SettingState,
    question : QuestionState
    profile : ProfileState
    profileQuestion : ProfileQuestionState
    questionComment : QuestionCommentState
}

export default combineReducers({ login, signup, feed: getFeed, setting, question: questionFeed,
    profile: ProfileFeed, profileQuestion : ProfileQuestionFeed ,questionComment : QuestionCommentFeed });
