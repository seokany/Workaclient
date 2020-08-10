import { Action } from "../index";
import {
    GET_QUESTION_FAIL,
    GET_QUESTION_REQUEST,
    GET_QUESTION_SUCCESS,
    MAKE_QUESTION_FAIL,
    MAKE_QUESTION_REQUEST,
    MAKE_QUESTION_SUCCESS
} from "./Action";

export interface questionCard {
    id: string;
    desc: string;
    image: string;
    tags: string[];
    questions: string[];
    author: {
        username: string;
    }
}

export interface QuestionState {
    fetching: boolean;
    data: questionCard[];
    err: any;
}

const initialState: QuestionState = { fetching: false, data: null, err: null };

export const questionFeed = (state: QuestionState = initialState, action: Action) => {
    switch (action.type) {
        case MAKE_QUESTION_REQUEST:
            return {
                fetching: true,
                data: null,
                err: null,
            };
        case MAKE_QUESTION_SUCCESS:
            return {
                fetching: false,
                data: action.payload.data,
                err: null,
            };
        case MAKE_QUESTION_FAIL:
            return {
                fetching: false,
                data: null,
                err: action.payload.err,
            };
        case GET_QUESTION_REQUEST:
            return {
                fetching: true,
                data: null,
                err: null,
            };
        case GET_QUESTION_SUCCESS:
            return {
                fetching: false,
                data: action.payload.data,
                err: null,
            };
        case GET_QUESTION_FAIL:
            return {
                fetching: false,
                data: null,
                err: action.payload.err,
            };
        default:
            return state;
    }
};
