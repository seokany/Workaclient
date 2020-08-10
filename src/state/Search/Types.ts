import {Feed} from "../Feed/Types";

export interface data {
    count: number;
    results: Feed[];
}

export interface SearchState {
    fetching: boolean;
    err: boolean;
    data: data;
}

export interface ReducerAction {
    type: string;
    payload: data;
}

export interface Action {
    type: string;
    payload: {
        temp: string;
        token: string;
    }
}