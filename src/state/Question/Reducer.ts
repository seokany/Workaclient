import {
    GET_QUESTION_FAIL,
    GET_QUESTION_REQUEST,
    GET_QUESTION_SUCCESS, MAKE_QUESTION_COMMENT_FAIL, MAKE_QUESTION_COMMENT_REQUEST, MAKE_QUESTION_COMMENT_SUCCESS,
    MAKE_QUESTION_FAIL,
    MAKE_QUESTION_REQUEST,
    MAKE_QUESTION_SUCCESS, QUESTION_COMMENTS_REQUEST, QUESTION_COMMENTS_SUCCESS, QUESTION_COMMENTS_FAIL
} from "./Action";
import { QuestionComment } from "./Action";


export interface Action {
    type: string;
    payload: any;
}

export interface questionCard {
    id: number;
    title: string;
    tags: string[];
    questions: string;
    author: {
        pk: number;
        username: string;
        user_image: string;
    }
    created_at: string
}


export interface QuestionState {
    fetching: boolean;
    data: questionCard[];
    err: boolean;
}

export interface CommentState{
    fetching: boolean;
    data: QuestionComment[];
    err: boolean;
}

const initialState: QuestionState = { fetching: false, data: [], err: false };
const initialStateComment : CommentState = { fetching: false, data: [], err: false}

export const questionFeed = (state: QuestionState = initialState, action: Action) => {
    switch (action.type) {
        case MAKE_QUESTION_REQUEST:
            return {
                ...state,
                fetching: true,
            };
        case MAKE_QUESTION_SUCCESS:
            return {
                ...state,
                fetching: false,
                data: action.payload,
                err: false,
            };
        case MAKE_QUESTION_FAIL:
            return {
                ...state,
                fetching: false,
                err: true,
            };
        case GET_QUESTION_REQUEST:
            return {
                ...state,
                fetching: true,
            };
        case GET_QUESTION_SUCCESS:
            return {
                ...state,
                fetching: false,
                data: action.payload,
                err: false,
            };
        case GET_QUESTION_FAIL:
            return {
                ...state,
                fetching: false,
                err: true,
            };
        default:
            return state;
    }
};

export const CommentFeed = (state: CommentState = initialStateComment, action: Action) => {
    switch (action.type) {
        case MAKE_QUESTION_COMMENT_REQUEST:
            return {
                ...state,
                fetching: true,
                err: false
            };
        case MAKE_QUESTION_COMMENT_SUCCESS:
            return {
                fetching: false,
                err:false,
                data: action.payload,
            };
        case MAKE_QUESTION_COMMENT_FAIL:
            return {
                ...state,
                err: true,
                fetching:false,
            };
        case QUESTION_COMMENTS_REQUEST:
            return {
                ...state,
                fetching: true,
                err: false,
            };
        case QUESTION_COMMENTS_SUCCESS:
            return {
                fetching: false,
                data: action.payload.data,
                err: false,
            };
        case QUESTION_COMMENTS_FAIL:
            return {
                ...state,
                fetching: false,
                err: false,
            };
        default:
            return state;
    }
};
