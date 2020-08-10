import {
  GET_FEED_FAIL,
  GET_FEED_REQUEST,
  GET_FEED_SUCCESS, MAKE_FEED_FAIL, MAKE_FEED_REQUEST, MAKE_FEED_SUCCESS
} from './Action';
import { Feeds } from "./Action";

export type data = Feeds[];

export interface FeedState {
  fetching: boolean;
  data: data;
  err: boolean;
}
export interface Action {
  type: string;
  payload: data;
}
const initialState: FeedState = {fetching: false, data: [], err: false};

export const getFeed = (state: FeedState = initialState, action: Action) => {
  switch (action.type) {
    case GET_FEED_REQUEST:
      return {
        fetching: true,
        data: null,
        err: false,
      };
    case GET_FEED_SUCCESS:
      return {
        fetching: false,
        data: action.payload,
        err: false,
      };
    case GET_FEED_FAIL:
      return {
        fetching: false,
        data: null,
        err: true,
      };
    case MAKE_FEED_REQUEST:
      return {
        fetching: true,
        data: null,
        err: false,
      };
    case MAKE_FEED_SUCCESS:
      return {
        fetching: false,
        data: action.payload,
        err: false,
      };
    case MAKE_FEED_FAIL:
      return {
        fetching: false,
        data: null,
        err: true,
      };
    default:
      return state;
  }
};
