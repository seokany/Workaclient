import {Action} from "../index";
import {
    PROFILE_SUCCESS,
    PROFILE_FAIL,
    PROFILE_REQUEST,
    PROFILE_QUESTION_REQUEST,
    PROFILE_QUESTION_SUCCESS,
    PROFILE_QUESTION_FAIL,
    QUESTION_COMMENTS_REQUEST,
    QUESTION_COMMENTS_SUCCESS,
    QUESTION_COMMENTS_FAIL
} from "./Action";

export interface ProfileState {
    fetching: boolean;
    data: any;
    err: any;
}

export interface ProfileQuestionState {
    fetching: boolean;
    data: any;
    err: any;
}

export interface QuestionCommentState {
    fetching: boolean;
    data: any;
    err: any;
}

const initialState: ProfileState = {fetching: false, data: null, err: null};
const initialStateQ: ProfileQuestionState = {fetching: false, data: null, err: null};
const initialStateQC: ProfileQuestionState = {fetching: false, data: null, err: null};

export const ProfileFeed = (state: ProfileState = initialState, action: Action) => {
    switch (action.type) {
        case PROFILE_REQUEST:
            return {
                fetching: true,
                data: null,
                err: null,
            };
        case PROFILE_SUCCESS:
            return {
                fetching: false,
                data: action.payload.data,
                err: null,
            };
        case PROFILE_FAIL:
            return {
                fetching: false,
                data: null,
                err: action.payload.err,
            };
        default:
            return state;
    }
};

export const ProfileQuestionFeed = (state: ProfileQuestionState = initialStateQ, action: Action) => {
    switch (action.type) {
        case PROFILE_QUESTION_REQUEST:
            return {
                fetching: true,
                data: null,
                err: null,
            };
        case PROFILE_QUESTION_SUCCESS:
            return {
                fetching: false,
                data: action.payload.data,
                err: null,
            };
        case PROFILE_QUESTION_FAIL:
            return {
                fetching: false,
                data: null,
                err: action.payload.err,
            };
        default:
            return state;
    }
};

export const QuestionCommentFeed = (state: QuestionCommentState = initialStateQC, action: Action) => {
    switch (action.type) {
        case QUESTION_COMMENTS_REQUEST:
            return {
                fetching: true,
                data: null,
                err: null,
            };
        case QUESTION_COMMENTS_SUCCESS:
            return {
                fetching: false,
                data: action.payload.data,
                err: null,
            };
        case QUESTION_COMMENTS_FAIL:
            return {
                fetching: false,
                data: null,
                err: action.payload.err,
            };
        default:
            return state;
    }
};
