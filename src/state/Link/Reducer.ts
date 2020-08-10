import { GET_LINK_REQUEST, GET_LINK_SUCCESS, GET_LINK_FAIL, GET_LINK_DETAIL_REQUEST, GET_LINK_DETAIL_SUCCESS, GET_LINK_DETAIL_FAIL, MAKE_LINK_REQUEST, MAKE_LINK_SUCCESS, MAKE_LINK_FAIL } from "./Action";
import { Action } from "../index"
import { Links } from "./Action"

export type data = Links[];
export interface LinkState {
    fetching: boolean;
    data: data;
    err: boolean;
}

const initialState: LinkState = { fetching: false, data: [], err: false };

export const GetLinkState = (state: LinkState = initialState, action: Action) => {
    switch (action.type) {
        case GET_LINK_REQUEST:
            return {
                fetching: true,
                data: null,
                err: false,
            };
        case GET_LINK_SUCCESS:
            return {
                fetching: false,
                data: action.payload.data,
                err: false,
            };
        case GET_LINK_FAIL:
            return {
                fetching: false,
                data: null,
                err: true,
            }
        case GET_LINK_DETAIL_REQUEST:
            return {
                fetching: true,
                data: null,
                err: false,
            }
        case GET_LINK_DETAIL_SUCCESS:
            return {
                fetching: false,
                data: action.payload.data,
                err: false,
            }
        case GET_LINK_DETAIL_FAIL:
            return {
                fetching: false,
                data: null,
                err: true,
            }
        case MAKE_LINK_REQUEST:
            return {
                fethcing: true,
                data: null,
                err: false,
            }
        case MAKE_LINK_SUCCESS:
            return {
                fetching: false,
                data: action.payload.data,
                err: false,
            }
        case MAKE_LINK_FAIL:
            return {
                fetching: false,
                data: null,
                err: true,
            };
        default:
            return state;
    }
}