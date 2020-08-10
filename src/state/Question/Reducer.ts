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
    QuestionDetail,
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
import { QuestionComment } from "./Action";


export interface QuestionCardAction {
    type: string;
    payload: questionCard[];
}

export interface QuestionCommentAction {
    type: string;
    payload: Comment[]
}

export interface QuestionDetailAction {
    type: string;
    payload: QuestionDetail[]
}

export interface questionCard {
    id: string;
    title: string;
    tags: string[];
    questions: number;
    author: {
        pk: number;
        username: string;
        user_image: string;
    }
    created_at: string
}

export interface QuestionInitState {
    posting: boolean;
    fetching: boolean;
    err: boolean;
}
export interface QuestionState extends QuestionInitState {
    data: {
        results: questionCard[]
    }
}

export interface CommentState extends QuestionInitState {
    data: QuestionComment[];
}

export interface QuestionDetailState extends QuestionInitState {
    data: {
        results: QuestionDetail[]
    }
}

const initialState: QuestionState = {
    posting: false,
    fetching: false,
    data: {
        results: []
    },
    err: false
};
const initialStateComment: CommentState = {
    posting: false,
    fetching: false,
    data: [],
    err: false
};

const initialStateQuestionDetail: QuestionDetailState = {
    posting: false,
    fetching: false,
    data: {
        results: []
    },
    err: false
}

const initialPatchQuestion: QuestionInitState = {
    posting: false,
    fetching: false,
    err: false
}

export const QuestionFeed = (state: QuestionState = initialState, action: QuestionCardAction) => {
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

export const MakeQuestionFeed = (state: QuestionState = initialState, action: QuestionCardAction) => {
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
export const CommentFeed = (state: CommentState = initialStateComment, action: QuestionCommentAction) => {
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

export const QuestionDetailFeed = (state: QuestionDetailState = initialStateQuestionDetail, action: QuestionDetailAction) => {
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

export const PatchQuestionFeed = (state: QuestionInitState = initialPatchQuestion, action: { type: string }) => {
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

export const PatchQuestionPages = (state: QuestionInitState = initialPatchQuestion, action: { type: string }) => {
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

export const DeleteQuestionPage = (state: QuestionInitState = initialPatchQuestion, action: { type: string }) => {
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