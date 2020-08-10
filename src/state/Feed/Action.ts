import * as Types from './Types'

export const GET_FEED_INIT = 'GET_FEED_INIT';
export const GET_FEED_REQUEST = 'GET_FEED_REQUEST';
export const ONLY_GET_FEED_REQUEST = 'ONLY_GET_FEED_REQUEST';
export const GET_FEED_SUCCESS = 'GET_FEED_SUCCESS';
export const GET_FEED_FAIL = 'GET_FEED_FAIL';
//Detail 부분은 다음 커밋에 분기처리 후 api 변경후 실장
export const GET_FEED_DETAIL_REQUEST = 'GET_FEED_DETAIL_REQUEST'
export const GET_FEED_DETAIL_SUCCESS = 'GET_FEED_DETAIL_SUCCESS'
export const GET_FEED_DETAIL_FAIL = 'GET_FEED_DETAIL_FAIL'
//makd Feed
export const MAKE_FEED_REQUEST = 'MAKE_FEED_REQUEST';
export const MAKE_FEED_SUCCESS = 'MAKE_FEED_SUCCESS';
export const MAKE_FEED_FAIL = 'MAKE_FEED_FAIL';
export const MAKE_FEED_INIT = 'MAKE_FEED_INIT'
//patch Feed
export const PATCH_FEED_INIT = 'PATCH_FEED_INIT';
export const PATCH_FEED_REQUEST = 'PATCH_FEED_REQUEST';
export const PATCH_FEED_SUCCESS = 'PATCH_FEED_SUCCESS';
export const PATCH_FEED_FAIL = 'PATCH_FEED_FAIL';
//delete Feed
export const DELETE_FEED_INIT = 'DELETE_FEED_INIT';
export const DELETE_FEED_REQUEST = 'DELETE_FEED_REQUEST';
export const DELETE_FEED_SUCCESS = 'DELETE_FEED_SUCCESS';
export const DELETE_FEED_FAIL = 'DELETE_FEED_FAIL';
//get Tag
export const GET_TAG_REQUEST = 'GET_TAG_REQUEST';
export const GET_TAG_SUCCESS = 'GET_TAG_SUCCESS';
export const GET_TAG_FAIL = 'GET_TAG_FAIL';



export const getFeedRequest = () => {
  return { type: GET_FEED_REQUEST };
};
export const getFeedSuccess = (data: Types.Feed[]) => {
  return { type: GET_FEED_SUCCESS, payload: data };
};
export const getFeedFail = (err: boolean) => {
  return { type: GET_FEED_FAIL, payload: { err } };
};

export const makeFeedRequest = (data: Types.makeCard) => {
  return { type: MAKE_FEED_REQUEST, payload: { data } }
}
export const makeFeedSuccess = () => {
  return { type: MAKE_FEED_SUCCESS }
}
export const makeFeedFail = () => {
  return { type: MAKE_FEED_FAIL }
}
export const makeFeedInit = () => {
  return { type: MAKE_FEED_INIT }
}

