interface makeCard {
  title: string, tags: string, text: string, images : any, token: string
}


export const GET_FEED_REQUEST = 'GET_FEED_REQUEST';
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
//get Tag
export const GET_TAG_REQUEST = 'GET_TAG_REQUEST';
export const GET_TAG_SUCCESS = 'GET_TAG_SUCCESS';
export const GET_TAG_FAIL = 'GET_TAG_FAIL';


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

export const makeFeedRequest = (data:makeCard) => {
  return {type: MAKE_FEED_REQUEST, payload : {data}}
}
export const makeFeedSuccess = (data:any) => {
  return {type: MAKE_FEED_SUCCESS, payload : {data}}
}
export const makeFeedFail = (err : any) => {
  return {type : MAKE_FEED_FAIL, payload: {err}}
}

