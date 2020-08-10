

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

interface author {
    pk: number,
    username: string,
    user_image: string,
}

export interface QuestionDetail {
    id: number,
    content: string,
    created_at: string,
}

export interface QuestionComment {
    id: number,
    author: author,
    text: string,
    is_like: string,
    is_unlike: string,
    like_count: string,
    unlike_count: string,
    is_mento: string,
    created_at: string
}

export interface MakeCommentRequest {
    question_pk: number,
    page_pk: number,
    text: string,
    token: string,
}

interface CommentRequest {
    page_pk: number,
    question_pk: number,
    token: string
}

export const MAKE_QUESTION_REQUEST = 'MAKE_QUESTION_REQUEST'
export const MAKE_QUESTION_SUCCESS = 'MAKE_QUESTION_SUCCESS'
export const MAKE_QUESTION_FAIL = 'MAKE_QUESTION_FAIL'

export const GET_QUESTION_DETAIL_REQUEST = 'GET_QUESTION_DETAIL_REQUEST'
export const GET_QUESTION_DETAIL_SUCCESS = 'GET_QUESTION_DETAIL_SUCCESS'
export const GET_QUESTION_DETAIL_FAIL = 'GET_QUESTION_DETAIL_FAIL'

export const GET_QUESTION_REQUEST = 'GET_QUESTION_REQUEST'
export const GET_QUESTION_SUCCESS = 'GET_QUESTION_SUCCESS'
export const GET_QUESTION_FAIL = 'GET_QUESTION_FAIL'

export const MAKE_QUESTION_COMMENT_REQUEST = 'MAKE_QUESTION_COMMENT_REQUEST'
export const MAKE_QUESTION_COMMENT_SUCCESS = 'MAKE_QUESTION_COMMENT_SUCCESS'
export const MAKE_QUESTION_COMMENT_FAIL = 'MAKE_QUESTION_COMMENT_FAIL'

export const QUESTION_COMMENTS_REQUEST = 'QUESTION_COMMENTS_REQUEST'
export const QUESTION_COMMENTS_SUCCESS = 'QUESTION_COMMENTS_SUCCESS'
export const QUESTION_COMMENTS_FAIL = 'QUESTION_COMMENTS_FAIL'



export const makeQuestionRequest = (data: QuestionRequest) => {
    return { type: MAKE_QUESTION_REQUEST, payload:  {data}  };
};
export const makeQuestionSuccess = (data: Question) => {
    return { type: MAKE_QUESTION_SUCCESS, payload: data };
};
export const MakeQuestionFail = (err: boolean) => {
    return { type: MAKE_QUESTION_FAIL, payload: { err } };
};

export const makeQuestionCommentRequest = (data: MakeCommentRequest) => {
    return {type: MAKE_QUESTION_COMMENT_REQUEST, payload:{data}};
};
export const makeQuestionCommentSuccess = (data: Question[]) => {
    return {type: MAKE_QUESTION_COMMENT_SUCCESS, payload: {data}};
};
export const makeQuestionCommentFail = (err: boolean) => {
    return {type: MAKE_QUESTION_COMMENT_FAIL, payload: {err}};
};

export const getQuestionDetailRequest = ({id, token}: {id:number, token:string}) => {
    return {type: GET_QUESTION_DETAIL_REQUEST, payload:{id, token}};
}

export const getQuestionDetailSuccess = (data: QuestionDetail[]) => {
    return {type: GET_QUESTION_DETAIL_SUCCESS, payload: {data}};
};
export const getQuestionDetailFail = (err: boolean) => {
    return {type: GET_QUESTION_DETAIL_FAIL, payload: {err}};
};



export const QuestionCommentRequest = (data: CommentRequest) => {
    return { type: QUESTION_COMMENTS_REQUEST, payload: { data } };
};
export const QuestionCommentSuccess = (data: QuestionComment[]) => {
    return { type: QUESTION_COMMENTS_SUCCESS, payload: { data } };
};
export const QuestionCommentFail = (err: boolean) => {
    return { type: QUESTION_COMMENTS_FAIL, payload: { err } };
};