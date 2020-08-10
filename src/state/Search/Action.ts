export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_FAILURCH = 'SEARCH_FAILURCH';

export const makeSearchRequest = (temp: string) => {
    return { type: SEARCH_REQUEST, payload: { temp } };
};
export const makeSearchSuccess = (temp: string) => {
    return { type: SEARCH_SUCCESS, payload: { temp } };
};
export const MakeSearchFail = (err: any) => {
    return { type: SEARCH_FAILURCH, payload: { err } };
};