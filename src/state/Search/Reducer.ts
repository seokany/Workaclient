import { SEARCH_FAILURCH, SEARCH_REQUEST, SEARCH_SUCCESS } from "./Action";
import * as Types from "./Types"



const initialState: Types.SearchState = {
    fetching: false,
    err: false,
    data: {
        count: 0,
        results: []
    },
};

export const search = (
    state: Types.SearchState = initialState,
    action: Types.ReducerAction
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
