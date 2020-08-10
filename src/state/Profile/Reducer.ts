
import {
    PROFILE_SUCCESS,
    PROFILE_FAIL,
    PROFILE_REQUEST,
    PROFILE_QUESTION_SUCCESS,
    PATCH_COMMENTS_SUCCESS,
    PATCH_PROFILE_IMAGES_SUCCESS,
    PROFILE_INFO_REQUEST,
    PROFILE_INFO_SUCCESS,
    PROFILE_INFO_FAIL,
    PROFILE_CARD_SUCCESS,
} from "./Action";
import * as Types from './Types'



const initialState: Types.ProfileState = {
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


export const ProfileFeed = (state: Types.ProfileState = initialState, action: Types.ProfileReducePayload) => {
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
        case PROFILE_CARD_SUCCESS:
            return {
                ...state,
                fetching: false,
                data: {
                    ...state.data,
                    cards: [
                        action.payload.data.cards,
                        ...state.data.cards
                    ]
                }
            }
        case PROFILE_QUESTION_SUCCESS:
            return {
                ...state,
                fetching: false,
                data: {
                    ...state.data,
                    pages: [
                        action.payload.data.pages,
                        ...state.data.pages

                    ]
                }
            }
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

export const ProfileInfo = (state: Types.ProfileState = initialState, action: Types.ProfileReducePayload) => {
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