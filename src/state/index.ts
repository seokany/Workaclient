import { combineReducers } from 'redux';
import { getFeed, PostFeed, PatchFeed, DeleteFeed } from './Feed/Reducer'
import setting, { SettingState } from '../reducers/setting'
import { search } from './Search/Reducer'
import {
    QuestionFeed,
    PatchQuestionFeed,
    CommentFeed,
    QuestionDetailFeed,
    MakeQuestionFeed,
    PatchQuestionPages,
    DeleteQuestionPage
} from "./Question/Reducer";
import {
    ProfileFeed,
    ProfileInfo,

} from "./Profile/Reducer";
import { LinkState, GetLinkState } from "./Link/Reducer";
import { QuestionState, QuestionInitState, CommentState, QuestionDetailState } from './Question/Types';
import { ProfileState } from './Profile/Types';
import { LoginState, ForgotState, ForgotUsernameState } from './Login/Types';
import {forgotPasswordReducer, forgotUsernameReducer, LoginReducer} from "./Login/Reducer";
import {SignupState} from "./Signup/Types";
import { SignupReducer } from './Signup/Reducer';
import { SearchState } from './Search/Types';
import { FeedState } from './Feed/Types';


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
    questionComment: CommentState,
    profileInfo: ProfileState,
    link: LinkState,
    questionDetail: QuestionDetailState,
    makeFeed: FeedState,
    makeQuestion: QuestionState,
}

export default combineReducers({
    login: LoginReducer,
    signup: SignupReducer,
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
    questionComment: CommentFeed,
    profileInfo: ProfileInfo,
    link: GetLinkState,
    questionDetail: QuestionDetailFeed,
    makeFeed: PostFeed,
    makeQuestion: MakeQuestionFeed,
});
