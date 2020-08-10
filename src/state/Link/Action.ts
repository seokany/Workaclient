

export interface makeLink {
    title: string, tags: string, text: string, url: webkitURL
}
interface getLink {
    data: [
        {
            "id": number,
            "author": {
                "pk": number,
                "username": string,
                "user_image": string
            },
            "title": string,
            "tags": string[],
            "is_author": boolean | string,
            "created_at": string
        }
    ]
}



export const GET_LINK_REQUEST = 'GET_LINK_REQUEST';
export const GET_LINK_SUCCESS = 'GET_LINK_SUCCESS';
export const GET_LINK_FAIL = 'GET_LINK_FAIL';

export const GET_LINK_DETAIL_REQUEST = 'GET_LINK_DETAIL_REQUEST';
export const GET_LINK_DETAIL_SUCCESS = 'GET_LINK_DETAIL_SUCCESS';
export const GET_LINK_DETAIL_FAIL = 'GET_LINK_DETAIL_FAIL';
// MAKE LINK
export const MAKE_LINK_REQUEST = 'MAKE_LINK_REQUEST';
export const MAKE_LINK_SUCCESS = 'MAKE_LINK_SUCCESS';
export const MAKE_LINK_FAIL = 'MAKE_LINK_FAIL';
// GET TAG
export const GET_LINKTAG_REQUEST = 'GET_LINKTAG_REQUEST';
export const GET_LINKTAG_SUCCESS = 'GET_LINKTAG_SUCCESS';
export const GET_LINKTAG_FAIL = 'GET_LINKTAG_FAIL';

export const getLinkRequest = () => {
    return {type:GET_LINK_REQUEST};
};
export const getLinkSuccess = (data: getLink[]) => {
    return {type:GET_LINKTAG_SUCCESS, payload:{data}};
};
export const getLinkFail = (err: boolean) => {
    return {type:GET_LINK_FAIL, payload: {err}};
}
export const getLinkDetailRequest = (id: string) => {
  return {type: GET_LINK_DETAIL_REQUEST, payload: {id}}
}
export const getLinkDetailSuccess = (detail: getLink) => {
    return {type: GET_LINK_DETAIL_SUCCESS, payload: {detail}}
}
export const getLinkDetailFail = (err: boolean) => {
    return {type: GET_LINK_DETAIL_FAIL, payload: {err}}
}
export const makeLinkRequest = (data: makeLink) => {
    return {type: MAKE_LINK_REQUEST, payload: {data}}
}
export const makeLinkFail = (err: boolean) => {
    return {type:MAKE_LINK_REQUEST, payload: {err}}
}