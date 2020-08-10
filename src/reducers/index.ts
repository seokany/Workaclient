import { combineReducers } from 'redux';
import login, { LoginState } from './login';
import signup, { SignupState } from './signup'
import { getFeed, FeedState } from '../state/Feed/Reducer'
import setting, { SettingState } from './setting'
import { search, SearchState } from '../state/Search/Reducer'
import {QuestionState, questionFeed, CommentState, CommentFeed} from "../state/Question/Reducer";
import {
    ProfileState,
    ProfileFeed,
    ProfileQuestionState,
    ProfileQuestionFeed,

} from "../state/Profile/Reducer";
import { LinkState, GetLinkState } from "../state/Link/Reducer";


export type RootState = {
    login: LoginState,
    signup: SignupState,
    feed: FeedState,
    setting: SettingState,
    search: SearchState,
    question: QuestionState,
    profile: ProfileState,
    profileQuestion: ProfileQuestionState,
    questionComment: CommentState,
    link: LinkState,
}

export default combineReducers({
    login,
    signup,
    feed: getFeed,
    setting,
    search,
    question: questionFeed,
    profile: ProfileFeed,
    profileQuestion: ProfileQuestionFeed,
    questionComment: CommentFeed,
    link: GetLinkState,
});
