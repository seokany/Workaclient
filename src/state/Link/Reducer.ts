import { GET_LINK_REQUEST, GET_LINK_SUCCESS, GET_LINK_FAIL, GET_LINK_DETAIL_REQUEST, GET_LINK_DETAIL_SUCCESS, GET_LINK_DETAIL_FAIL, MAKE_LINK_REQUEST, MAKE_LINK_SUCCESS, MAKE_LINK_FAIL, MAKE_LINK_INIT } from "./Action";
import { Action } from "../RootSaga"
import { Links } from "./Action"

export type data = Links[];
export interface LinkState {
    posting: boolean;
    fetching: boolean;
    data: data;
    err: boolean;
}

const initialState: LinkState = {
    posting: false,
    fetching: false,
    data: [],
    err: false
};

export const GetLinkState = (state: LinkState = initialState, action: Action) => {
    switch (action.type) {
        case GET_LINK_REQUEST:
            return {
                ...state,
                fetching: true,
                err: false,
            };
        case GET_LINK_SUCCESS:
            return {
                ...state,
                posting: true,
                fetching: false,
                data: action.payload.data,
                err: false,
            };
        case GET_LINK_FAIL:
            return {
                ...state,
                fetching: false,
                err: true,
            }
        case GET_LINK_DETAIL_REQUEST:
            return {
                ...state,
                fetching: true,
                err: false,
            }
        case GET_LINK_DETAIL_SUCCESS:
            return {
                ...state,
                fetching: false,
                data: action.payload.data,
                err: false,
            }
        case GET_LINK_DETAIL_FAIL:
            return {
                ...state,
                fetching: false,
                err: true,
            }
        case MAKE_LINK_INIT:
            return {
                ...initialState
            }
        case MAKE_LINK_REQUEST:
            return {
                ...state,
                fethcing: true,
                err: false,
            }
        case MAKE_LINK_SUCCESS:
            return {
                ...state,
                posting: true,
                fetching: false,
                data: action.payload,
                err: false,
            }
        case MAKE_LINK_FAIL:
            return {
                ...state,
                fetching: false,
                err: true,
            };
        default:
            return state;
    }
}