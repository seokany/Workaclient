
import {
    PROFILE_SUCCESS,
    PROFILE_FAIL,
    PROFILE_REQUEST,
    PROFILE_QUESTION_REQUEST,
    PROFILE_QUESTION_SUCCESS,
    PROFILE_QUESTION_FAIL,
    PATCH_COMMENTS_SUCCESS,
    PATCH_PROFILE_IMAGES_SUCCESS,
    PROFILE_INFO_REQUEST,
    PROFILE_INFO_SUCCESS,
    PROFILE_INFO_FAIL,
} from "./Action";
import { Profile, ProfileQuestion, Comment } from "./Action";
import { number, string } from "prop-types";

export interface ProfileState {
    fetching: boolean;
    data: Profile;
    err: boolean;
}

export interface GetProfileAction {
    type: string;
    payload: {
        token: string;
        pk: string;
    }
}

export interface ProfileReducePayload {
    type: string;
    payload: {
        data: Profile;
        err: boolean;
    }
}



export interface PatchCommentsAction {
    type: string;
    payload: {
        token: string;
        comment: string;
    }
}

export interface ProfileQuestionState {
    fetching: boolean;
    data: ProfileQuestion[];
    err: boolean;
}

export interface ProfileQuestionReducePayload {
    type: string;
    payload: {
        data: ProfileQuestion[];
        err: boolean;
    }
}

export interface ProfileQuestionDetailState {
    fetching: boolean;
    data: ProfileQuestion;
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
            comments: '',
            mbti: '',
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

export const ProfileFeed = (state: ProfileState = initialState, action: ProfileReducePayload) => {
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
        case PATCH_PROFILE_IMAGES_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    user: {
                        ...state.data.user,
                        user_image: action.payload.data.user.user_image
                    }
                },
                fetching: false,
                err: false,
            };
        case PATCH_COMMENTS_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    user: {
                        ...state.data.user,
                        comments: action.payload.data.user.comments
                    }
                },
                fetching: false,
                err: false,
            }
        default:
            return state;
    }
};

export const ProfileQuestionFeed = (state: ProfileQuestionState = initialStateQ, action: ProfileQuestionReducePayload) => {
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

export const ProfileInfo = (state: ProfileState = initialState, action: ProfileReducePayload) => {
    switch (action.type) {
        case PROFILE_INFO_REQUEST:
            return {
                ...state,
                fetching: true,
                err: false,
            };
        case PROFILE_INFO_SUCCESS:
            return {
                ...state,
                fetching: false,
                data: action.payload.data,
            };
        case PROFILE_INFO_FAIL:
            return {
                ...state,
                fetching: false,
                err: action.payload.err,
            };
        default:
            return state;
    }
};