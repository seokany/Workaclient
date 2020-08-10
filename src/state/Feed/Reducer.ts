import {
  GET_FEED_DETAIL_FAIL,
  GET_FEED_DETAIL_REQUEST, GET_FEED_DETAIL_SUCCESS,
  GET_FEED_FAIL,
  GET_FEED_REQUEST,
  GET_FEED_SUCCESS, MAKE_FEED_FAIL, MAKE_FEED_REQUEST, MAKE_FEED_SUCCESS
} from './Action';
import {Action} from '../index';

export interface FeedState {
  fetching: boolean;
  data: any;
  err: any;
}

const initialState: FeedState = {fetching: false, data: null, err: null};

export const getFeed = (state: FeedState = initialState, action: Action) => {
  switch (action.type) {
    case GET_FEED_REQUEST:
      return {
        fetching: true,
        data: null,
        err: null,
      };
    case GET_FEED_SUCCESS:
      return {
        fetching: false,
        data: action.payload.data,
        err: null,
      };
    case GET_FEED_FAIL:
      return {
        fetching: false,
        data: null,
        err: action.payload.err,
      };
    case GET_FEED_DETAIL_REQUEST:
      return {
        fetching: true,
        data: null,
        err: null,
      };
    case GET_FEED_DETAIL_SUCCESS:
      return {
        fetching: false,
        data: action.payload.data,
        err: null,
      };
    case GET_FEED_DETAIL_FAIL:
      return {
        fetching: false,
        data: null,
        err: action.payload.err,
      };
    case MAKE_FEED_REQUEST:
      return {
        fetching: true,
        data: null,
        err: null,
      };
    case MAKE_FEED_SUCCESS:
      return {
        fetching: false,
        data: action.payload.data,
        err: null,
      };
    case MAKE_FEED_FAIL:
      return {
        fetching: false,
        data: null,
        err: action.payload.err,
      };
    default:
      return state;
  }
};
