export const MAKE_QUESTION_REQUEST = 'MAKE_QUESTION_REQUEST'
export const MAKE_QUESTION_SUCCESS = 'MAKE_QUESTION_SUCCESS'
export const MAKE_QUESTION_FAIL = 'MAKE_QUESTION_FAIL'

export const GET_QUESTION_REQUEST = 'GET_QUESTION_REQUEST'
export const GET_QUESTION_SUCCESS = 'GET_QUESTION_SUCCESS'
export const GET_QUESTION_FAIL = 'GET_QUESTION_FAIL'


export const makeQuestionRequest = (data : any) => {
    return {type: MAKE_QUESTION_REQUEST , payload : {data}};
};
export const makeQuestionSuccess = (data: any) => {
    return {type: MAKE_QUESTION_SUCCESS, payload: {data}};
};
export const MakeQuestionFail = (err: any) => {
    return {type: MAKE_QUESTION_FAIL, payload: {err}};
};


export const getQuestionRequest = () => {
    return {type: MAKE_QUESTION_REQUEST ,};
};
export const getQuestionSuccess = (data: any) => {
    return {type: MAKE_QUESTION_SUCCESS, payload: {data}};
};
export const getQuestionFail = (err: any) => {
    return {type: MAKE_QUESTION_FAIL, payload: {err}};
};