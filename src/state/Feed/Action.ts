export interface makeCard {
  title: string,
  tags: [],
  text: string,
  images: string,
  token: string
}
export interface Feeds {
  id: number,
  author: {
    username: string;
    user_image: string;
  },
  title?: string,
  images: string,
  text: string,
  created_at: string,
  updated_at: string,
  number_of_likes: string,
  number_of_comments: string,
  post_comments?: string[],
  tags: string[]
}

export interface responseFeeds {
  count: number,
  next: string,
  previous: string,
  results: Feeds[]
}

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
//get Tag
export const GET_TAG_REQUEST = 'GET_TAG_REQUEST';
export const GET_TAG_SUCCESS = 'GET_TAG_SUCCESS';
export const GET_TAG_FAIL = 'GET_TAG_FAIL';


export const getFeedRequest = () => {
  return { type: GET_FEED_REQUEST };
};
export const getFeedSuccess = (data: Feeds[]) => {
  return { type: GET_FEED_SUCCESS, payload: data };
};
export const getFeedFail = (err: boolean) => {
  return { type: GET_FEED_FAIL, payload: { err } };
};

export const makeFeedRequest = (data: makeCard) => {
  return { type: MAKE_FEED_REQUEST, payload: { data } }
}
export const makeFeedSuccess = (data: Feeds) => {
  return { type: MAKE_FEED_SUCCESS, payload: data }
}
export const makeFeedFail = (err: boolean) => {
  return { type: MAKE_FEED_FAIL, payload: { err } }
}
export const makeFeedInit = () => {
  return { type: MAKE_FEED_INIT }
}

