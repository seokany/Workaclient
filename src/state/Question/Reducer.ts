import {
    GET_QUESTION_FAIL,
    GET_QUESTION_REQUEST,
    GET_QUESTION_SUCCESS,
    MAKE_QUESTION_FAIL,
    MAKE_QUESTION_REQUEST,
    MAKE_QUESTION_SUCCESS
} from "./Action";

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
        pk : number;
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

const initialState: QuestionState = { fetching: false, data: [], err: false };

export const questionFeed = (state: QuestionState = initialState, action: Action) => {
    switch (action.type) {
        case MAKE_QUESTION_REQUEST:
            return {
                fetching: true,
                data: null,
                err: false,
            };
        case MAKE_QUESTION_SUCCESS:
            return {
                fetching: false,
                data: action.payload,
                err: false,
            };
        case MAKE_QUESTION_FAIL:
            return {
                fetching: false,
                data: null,
                err: true,
            };
        case GET_QUESTION_REQUEST:
            return {
                fetching: true,
                data: null,
                err: false,
            };
        case GET_QUESTION_SUCCESS:
            return {
                fetching: false,
                data: action.payload,
                err: false,
            };
        case GET_QUESTION_FAIL:
            return {
                fetching: false,
                data: null,
                err: true,
            };
        default:
            return state;
    }
};
