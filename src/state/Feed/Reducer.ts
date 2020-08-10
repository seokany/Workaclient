import * as ActionTypes from './Action';
import * as Types from "./Types";

const initialState: Types.FeedState = {
  posting: false,
  fetching: false,
  data: [],
  err: false
};



export const getFeed = (state: Types.FeedState = initialState, action: Types.FeedAction) => {
  switch (action.type) {
    case ActionTypes.GET_FEED_INIT:
      return {
        ...initialState
      }
    case ActionTypes.GET_FEED_REQUEST:
      return {
        ...state,
        fetching: true,
        err: false,
      };
    case ActionTypes.GET_FEED_SUCCESS:
      return {
        ...state,
        fetching: false,
        data: [...action.payload, ...state.data],
        err: false,
      };
    case ActionTypes.PATCH_FEED_SUCCESS:
      return {
        ...state,
        posting: true,
        fetching: false,
        data: [action.payload, ...state.data],
        err: false,
      };
    case ActionTypes.GET_FEED_FAIL:
      return {
        ...state,
        fetching: false,
        err: true,
      };
    case ActionTypes.ONLY_GET_FEED_REQUEST:
      return {
        ...state,
        fetching: true,
        err: false
      }
    default:
      return state;
  }
};

export const PostFeed = (state: Types.FeedState = initialState, action: Types.FeedAction) => {
  switch (action.type) {
    case ActionTypes.MAKE_FEED_INIT:
      return {
        ...initialState
      }
    case ActionTypes.MAKE_FEED_REQUEST:
      return {
        ...state,
        fetching: true,
        err: false,
      };
    case ActionTypes.MAKE_FEED_SUCCESS:
      return {
        ...state,
        posting: true,
        fetching: false,
        err: false
      }
    case ActionTypes.MAKE_FEED_FAIL:
      return {
        ...state,
        fetching: false,
        err: true,
      };
    default:
      return state;
  }
};

export const PatchFeed = (state: Types.FeedState = initialState, action: Types.FeedAction) => {
  switch (action.type) {
    case ActionTypes.PATCH_FEED_INIT:
      return {
        ...initialState
      }
    case ActionTypes.PATCH_FEED_REQUEST:
      return {
        ...state,
        fetching: true,
        err: false,
      };
    case ActionTypes.PATCH_FEED_SUCCESS:
      return {
        ...state,
        posting: true,
        fetching: false,
        data: [action.payload, ...state.data],
        err: false,
      };
    case ActionTypes.PATCH_FEED_FAIL:
      return {
        ...state,
        fetching: false,
        err: true,
      };
    default:
      return state;
  }
}

export const DeleteFeed = (state: Types.FeedState = initialState, action: Types.FeedAction) => {
  switch (action.type) {
    case ActionTypes.DELETE_FEED_INIT:
      return {
        ...initialState
      }
    case ActionTypes.DELETE_FEED_REQUEST:
      return {
        ...state,
        fetching: true,
        err: false,
      };
    case ActionTypes.DELETE_FEED_SUCCESS:
      return {
        ...state,
        posting: true,
        fetching: false,
        err: false,
      };
    case ActionTypes.DELETE_FEED_FAIL:
      return {
        ...state,
        fetching: false,
        err: true,
      };
    default:
      return state;
  }
}