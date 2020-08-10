import {
    MAKE_QUESTION_COMMENT_FAIL,
    MAKE_QUESTION_COMMENT_REQUEST,
    MAKE_QUESTION_COMMENT_SUCCESS,
    MAKE_QUESTION_FAIL,
    MAKE_QUESTION_REQUEST,
    MAKE_QUESTION_SUCCESS,
    QUESTION_COMMENTS_REQUEST,
    QUESTION_COMMENTS_SUCCESS,
    QUESTION_COMMENTS_FAIL,
    GET_QUESTION_DETAIL_REQUEST,
    GET_QUESTION_DETAIL_SUCCESS,
    GET_QUESTION_DETAIL_FAIL,
    GET_QUESTION_REQUEST,
    GET_QUESTION_SUCCESS,
    GET_QUESTION_FAIL,
    GET_QUESTION_DETAIL_INIT,
    QUESTION_COMMENTS_INIT,
    PATCH_QUESTION_INIT,
    PATCH_QUESTION_REQUEST,
    PATCH_QUESTION_SUCCESS,
    PATCH_QUESTION_FAIL,
    PATCH_QUESTION_PAGE_INIT,
    PATCH_QUESTION_PAGE_REQUEST,
    PATCH_QUESTION_PAGE_SUCCESS,
    PATCH_QUESTION_PAGE_FAIL,
    DELETE_QUESTION_PAGE_INIT,
    DELETE_QUESTION_PAGE_REQUEST,
    DELETE_QUESTION_PAGE_SUCCESS,
    DELETE_QUESTION_PAGE_FAIL,
    MAKE_QUESTION_INIT
} from "./Action";
import * as Types from './Types'



const initialState: Types.QuestionState = {
    posting: false,
    fetching: false,
    data: {
        results: []
    },
    err: false
};
const initialStateComment: Types.CommentState = {
    posting: false,
    fetching: false,
    data: [],
    err: false
};

const initialStateQuestionDetail: Types.QuestionDetailState = {
    posting: false,
    fetching: false,
    data: {
        results: []
    },
    err: false
}

const initialPatchQuestion: Types.QuestionInitState = {
    posting: false,
    fetching: false,
    err: false
}

export const QuestionFeed = (state: Types.QuestionState = initialState, action: Types.Action) => {
    switch (action.type) {
        case GET_QUESTION_REQUEST:
            return {
                ...state,
                fetching: true,
            };
        case GET_QUESTION_SUCCESS:
            return {
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

export const MakeQuestionFeed = (state: Types.QuestionState = initialState, action: Types.Action) => {
    switch (action.type) {
        case MAKE_QUESTION_INIT:
            return {
                ...initialState
            }
        case MAKE_QUESTION_REQUEST:
            return {
                ...state,
                fetching: true,
            };
        case MAKE_QUESTION_SUCCESS:
            return {
                ...state,
                posting: true,
                fetching: false,
                data: [action.payload, ...state.data.results],
                err: false,
            };
        case MAKE_QUESTION_FAIL:
            return {
                ...state,
                fetching: false,
                err: true,
            };
        default:
            return state;
    }
};
export const CommentFeed = (state: Types.CommentState = initialStateComment, action: Types.Action) => {
    switch (action.type) {
        case MAKE_QUESTION_COMMENT_REQUEST:
            return {
                ...state,
                fetching: true,
                err: false
            };
        case MAKE_QUESTION_COMMENT_SUCCESS:
            return {
                ...state,
                fetching: false,
                err: false,
                data: [...state.data, action.payload],
            };
        case MAKE_QUESTION_COMMENT_FAIL:
            return {
                ...state,
                err: true,
                fetching: false,
            };
        case QUESTION_COMMENTS_INIT:
            return {
                ...initialStateComment
            }
        case QUESTION_COMMENTS_REQUEST:
            return {
                ...state,
                fetching: true,
                err: false,
            };
        case QUESTION_COMMENTS_SUCCESS:
            return {
                fetching: false,
                data: action.payload,
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

export const QuestionDetailFeed = (state: Types.QuestionDetailState = initialStateQuestionDetail, action: Types.Action) => {
    switch (action.type) {
        case GET_QUESTION_DETAIL_INIT:
            return {
                ...initialStateQuestionDetail
            }
        case GET_QUESTION_DETAIL_REQUEST:
            return {
                ...state,
                fetching: true,
                err: false
            };
        case GET_QUESTION_DETAIL_SUCCESS:
            return {
                ...state,
                posting: true,
                fetching: false,
                err: false,
                data: action.payload,
            };
        case GET_QUESTION_DETAIL_FAIL:
            return {
                ...state,
                err: true,
                fetching: false,
            };
        default:
            return state;
    }
};

export const PatchQuestionFeed = (state: Types.QuestionInitState = initialPatchQuestion, action: { type: string }) => {
    switch (action.type) {
        case PATCH_QUESTION_INIT:
            return {
                ...initialPatchQuestion
            }
        case PATCH_QUESTION_REQUEST:
            return {
                ...state,
                fetching: true,
            };
        case PATCH_QUESTION_SUCCESS:
            return {
                ...state,
                posting: true,
                fetching: false,
                err: false,
            };
        case PATCH_QUESTION_FAIL:
            return {
                ...state,
                fetching: false,
                err: true,
            };
        default:
            return state;
    }
};

export const PatchQuestionPages = (state: Types.QuestionInitState = initialPatchQuestion, action: { type: string }) => {
    switch (action.type) {
        case PATCH_QUESTION_PAGE_INIT:
            return {
                ...initialPatchQuestion
            }
        case PATCH_QUESTION_PAGE_REQUEST:
            return {
                ...state,
                fetching: true,
            };
        case PATCH_QUESTION_PAGE_SUCCESS:
            return {
                ...state,
                posting: true,
                fetching: false,
                err: false,
            };
        case PATCH_QUESTION_PAGE_FAIL:
            return {
                ...state,
                fetching: false,
                err: true,
            };
        default:
            return state;
    }
};

export const DeleteQuestionPage = (state: Types.QuestionInitState = initialPatchQuestion, action: { type: string }) => {
    switch (action.type) {
        case DELETE_QUESTION_PAGE_INIT:
            return {
                ...initialPatchQuestion
            }
        case DELETE_QUESTION_PAGE_REQUEST:
            return {
                ...state,
                fetching: true,
            };
        case DELETE_QUESTION_PAGE_SUCCESS:
            return {
                ...state,
                posting: true,
                fetching: false,
                err: false,
            };
        case DELETE_QUESTION_PAGE_FAIL:
            return {
                ...state,
                fetching: false,
                err: true,
            };
        default:
            return state;
    }
};