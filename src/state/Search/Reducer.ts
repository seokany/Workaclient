import { SEARCH_FAILURCH, SEARCH_REQUEST, SEARCH_SUCCESS } from "./Action";
import { questionCard } from '../Question/Reducer'

export interface data {
    count: number;
    results: questionCard[];
}

export interface SearchState {
    fetching: boolean;
    err: boolean;
    data: data;
}

export interface Action {
    type: string;
    payload: data;
}

const initialState: SearchState = {
    fetching: false,
    err: false,
    data: {
        count: 0,
        results: []
    },
};

export const search = (
    state: SearchState = initialState,
    action: Action
) => {
    switch (action.type) {
        case SEARCH_REQUEST:
            return {
                ...state,
                fetching: true,
                err: false,
            };
        case SEARCH_SUCCESS:
            return {
                fetching: false,
                err: false,
                data: action.payload,
            };
        case SEARCH_FAILURCH:
            return {
                ...state,
                fetching: false,
                err: true,
            };
        default:
            return state;
    }
};
