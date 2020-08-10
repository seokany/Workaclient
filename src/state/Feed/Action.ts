
export const GET_FEED_REQUEST = 'GET_FEED_REQUEST';
export const GET_FEED_SUCCESS = 'GET_FEED_SUCCESS';
export const GET_FEED_FAIL = 'GET_FEED_FAIL';
//Detail 부분은 다음 커밋에 분기처리 후 api 변경후 실장
export const GET_FEED_DETAIL_REQUEST = 'GET_FEED_DETAIL_REQUEST'
export const GET_FEED_DETAIL_SUCCESS = 'GET_FEED_DETAIL_SUCCESS'
export const GET_FEED_DETAIL_FAIL = 'GET_FEED_DETAIL_FAIL'

export const getFeedRequest = () => {
  return {type: GET_FEED_REQUEST};
};
export const getFeedSuccess = (data: any) => {
  return {type: GET_FEED_SUCCESS, payload: {data}};
};
export const getFeedFail = (err: any) => {
  return {type: GET_FEED_FAIL, payload: {err}};
};
export const getFeedDetailRequest = (id: string) => {
  return {type: GET_FEED_DETAIL_REQUEST, payload: {id}}
}
export const getFeedDetailSuccess = (detail: any) => {
  return {type: GET_FEED_DETAIL_SUCCESS, payload: {detail}}
}
export const getFeedDetailFail = (err: any) => {
  return {type: GET_FEED_DETAIL_FAIL, payload: {err}}
}
