
import {
    PROFILE_SUCCESS,
    PROFILE_FAIL,
    PROFILE_REQUEST,
    PROFILE_QUESTION_REQUEST,
    PROFILE_QUESTION_SUCCESS,
    PROFILE_QUESTION_FAIL,
} from "./Action";
import { Profile, ProfileQuestion, Comment } from "./Action";

export interface ProfileState {
    fetching: boolean;
    data: Profile;
    err: boolean;
}

export interface Action {
    type: string;
    payload: any;
}

export interface ProfileQuestionState {
    fetching: boolean;
    data: ProfileQuestion[];
    err: boolean;
}


const initialState: ProfileState = {
    fetching: false,
    data: {
        user: {
            pk: 0,
            username: '',
            user_image: '',
            mento: 0,
            mentiee: 0,
            mbti: '',
            is_me: false
        },
        pages: [],
        cards: []
    },
    err: false
};
const initialStateQ: ProfileQuestionState = {
    fetching: false,
    data: [],
    err: false
};

export const ProfileFeed = (state: ProfileState = initialState, action: Action) => {
    switch (action.type) {
        case PROFILE_REQUEST:
            return {
                ...state,
                fetching: true,
                err: false,
            };
        case PROFILE_SUCCESS:
            return {
                ...state,
                fetching: false,
                data: action.payload.data,
            };
        case PROFILE_FAIL:
            return {
                ...state,
                fetching: false,
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
                ...state,
                fetching: true,
            };
        case PROFILE_QUESTION_SUCCESS:
            return {
                ...state,
                fetching: false,
                data: action.payload.data,
            };
        case PROFILE_QUESTION_FAIL:
            return {
                ...state,
                fetching: false,
                err: action.payload.err,
            };
        default:
            return state;
    }
};
