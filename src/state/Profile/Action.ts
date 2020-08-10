export const PROFILE_REQUEST = 'PROFILE_REQUEST'
export const PROFILE_SUCCESS = 'PROFILE_SUCCESS'
export const PROFILE_FAIL = 'PROFILE_FAIL'

export const PROFILE_QUESTION_REQUEST = 'PROFILE_QUESTION_REQUEST'
export const PROFILE_QUESTION_SUCCESS = 'PROFILE_QUESTION_SUCCESS'
export const PROFILE_QUESTION_FAIL = 'PROFILE_QUESTION_FAIL'

export const QUESTION_COMMENTS_REQUEST = 'QUESTION_COMMENTS_REQUEST'
export const QUESTION_COMMENTS_SUCCESS = 'QUESTION_COMMENTS_SUCCESS'
export const QUESTION_COMMENTS_FAIL = 'QUESTION_COMMENTS_FAIL'


export const ProfileRequest = (data : any) => {
    return {type: PROFILE_REQUEST , payload : {data}};
};
export const ProfileSuccess = (data: any) => {
    return {type: PROFILE_SUCCESS, payload: {data}};
};
export const ProfileFail = (err: any) => {
    return {type: PROFILE_FAIL, payload: {err}};
};


export const QuestionRequest = (data : any) => {
    return {type: PROFILE_QUESTION_REQUEST , payload : {data}};
};
export const QuestionSuccess = (data: any) => {
    return {type: PROFILE_QUESTION_SUCCESS, payload: {data}};
};
export const QuestionFail = (err: any) => {
    return {type: PROFILE_QUESTION_FAIL, payload: {err}};
};

export const QuestionCommentRequest = (data : any) => {
    return {type: QUESTION_COMMENTS_REQUEST , payload : {data}};
};
export const QuestionCommentSuccess = (data: any) => {
    return {type: QUESTION_COMMENTS_SUCCESS, payload: {data}};
};
export const QuestionCommentFail = (err: any) => {
    return {type: QUESTION_COMMENTS_FAIL, payload: {err}};
};