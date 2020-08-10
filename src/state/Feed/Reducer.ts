import {
  GET_FEED_FAIL,
  GET_FEED_REQUEST,
  GET_FEED_SUCCESS, MAKE_FEED_FAIL, MAKE_FEED_REQUEST, MAKE_FEED_SUCCESS, GET_FEED_INIT, MAKE_FEED_INIT, ONLY_GET_FEED_REQUEST
} from './Action';
import { Feeds } from "./Action";

export interface FeedState {
  posting: boolean;
  fetching: boolean;
  data: Feeds[]
  err: boolean;
}
export interface Action {
  type: string;
  payload: Feeds[] | Feeds;
}

const initialState: FeedState = {
  posting: false,
  fetching: false,
  data: [],
  err: false
};

export const getFeed = (state: FeedState = initialState, action: Action) => {
  switch (action.type) {
    case GET_FEED_INIT:
      return {
        ...initialState
      }
    case GET_FEED_REQUEST:
      return {
        ...state,
        fetching: true,
        err: false,
      };
    case ONLY_GET_FEED_REQUEST:
      return {
        ...state,
        fetching: true,
        err: false
      }
    case GET_FEED_SUCCESS:
      return {
        ...state,
        fetching: false,
        data: action.payload,
        err: false,
      };
    case GET_FEED_FAIL:
      return {
        ...state,
        fetching: false,
        err: true,
      };
    default:
      return state;
  }
};

export const PostFeed = (state: FeedState = initialState, action: Action) => {
  switch (action.type) {
    case MAKE_FEED_INIT:
      return {
        ...initialState
      }
    case MAKE_FEED_REQUEST:
      return {
        ...state,
        fetching: true,
        err: false,
      };
    case MAKE_FEED_SUCCESS:
      return {
        ...state,
        posting: true,
        fetching: false,
        data: [action.payload, ...state.data],
        err: false,
      };
    case MAKE_FEED_FAIL:
      return {
        ...state,
        fetching: false,
        err: true,
      };
    default:
      return state;
  }
};
