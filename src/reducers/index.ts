import { combineReducers } from 'redux';
import login, { LoginState, ForgotState, forgotPasswordReducer, ForgotUsernameState, forgotUsernameReducer } from './login';
import signup, { SignupState } from './signup'
import { getFeed, FeedState, PostFeed, PatchFeed, DeleteFeed } from '../state/Feed/Reducer'
import setting, { SettingState } from './setting'
import { search, SearchState } from '../state/Search/Reducer'
import {
    QuestionState,
    QuestionFeed,
    QuestionInitState,
    PatchQuestionFeed,
    CommentState,
    CommentFeed,
    QuestionDetailState,
    QuestionDetailFeed,
    MakeQuestionFeed,
    PatchQuestionPages,
    DeleteQuestionPage
} from "../state/Question/Reducer";
import {
    ProfileState,
    ProfileFeed,
    ProfileQuestionState,
    ProfileQuestionFeed,

} from "../state/Profile/Reducer";
import { LinkState, GetLinkState } from "../state/Link/Reducer";


export type RootState = {
    login: LoginState,
    password: ForgotState,
    forgotUsername: ForgotUsernameState,
    signup: SignupState,
    feed: FeedState,
    patchFeed: FeedState,
    deleteFeed: FeedState,
    setting: SettingState,
    search: SearchState,
    question: QuestionState,
    patchQuestionPage: QuestionInitState,
    deleteQuestionPage: QuestionInitState,
    patchQuestion: QuestionInitState,
    profile: ProfileState,
    profileQuestion: ProfileQuestionState,
    questionComment: CommentState,
    link: LinkState,
    questionDetail: QuestionDetailState,
    makeFeed: FeedState,
    makeQuestion: QuestionState,
}

export default combineReducers({
    login,
    signup,
    password: forgotPasswordReducer,
    forgotUsername: forgotUsernameReducer,
    feed: getFeed,
    patchFeed: PatchFeed,
    deleteFeed: DeleteFeed,
    setting,
    search,
    question: QuestionFeed,
    patchQuestionPage: PatchQuestionPages,
    deleteQuestionPage: DeleteQuestionPage,
    patchQuestion: PatchQuestionFeed,
    profile: ProfileFeed,
    profileQuestion: ProfileQuestionFeed,
    questionComment: CommentFeed,
    link: GetLinkState,
    questionDetail: QuestionDetailFeed,
    makeFeed: PostFeed,
    makeQuestion: MakeQuestionFeed,
});
