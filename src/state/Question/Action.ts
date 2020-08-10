interface Question {
    author: {
        username: string
    },
    title: string,
    tags: string[]
}
interface QuestionRequest {
    tag: string,
    title: string,
    question: string,
    token: string
}
export const MAKE_QUESTION_REQUEST = 'MAKE_QUESTION_REQUEST'
export const MAKE_QUESTION_SUCCESS = 'MAKE_QUESTION_SUCCESS'
export const MAKE_QUESTION_FAIL = 'MAKE_QUESTION_FAIL'

export const GET_QUESTION_REQUEST = 'GET_QUESTION_REQUEST'
export const GET_QUESTION_SUCCESS = 'GET_QUESTION_SUCCESS'
export const GET_QUESTION_FAIL = 'GET_QUESTION_FAIL'


export const makeQuestionRequest = (data : QuestionRequest) => {
    return {type: MAKE_QUESTION_REQUEST , payload : {data}};
};
export const makeQuestionSuccess = (data: Question) => {
    return {type: MAKE_QUESTION_SUCCESS, payload: {data}};
};
export const MakeQuestionFail = (err: boolean) => {
    return {type: MAKE_QUESTION_FAIL, payload: {err}};
};


export const getQuestionRequest = () => {
    return {type: MAKE_QUESTION_REQUEST };
};
export const getQuestionSuccess = (data: Question[]) => {
    return {type: MAKE_QUESTION_SUCCESS, payload: {data}};
};
export const getQuestionFail = (err: boolean) => {
    return {type: MAKE_QUESTION_FAIL, payload: {err}};
};