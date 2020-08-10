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

export interface LikeActions {
    id: number;
    questionId: number;
    commentId: number;
    token: string;

}

export const MAKE_QUESTION_REQUEST = 'MAKE_QUESTION_REQUEST'
export const MAKE_QUESTION_SUCCESS = 'MAKE_QUESTION_SUCCESS'
export const MAKE_QUESTION_FAIL = 'MAKE_QUESTION_FAIL'
export const MAKE_QUESTION_INIT = 'MAKE_QUESTION_INIT'

export const GET_QUESTION_DETAIL_INIT = 'GET_QUESTION_DETAIL_INIT'
export const GET_QUESTION_DETAIL_REQUEST = 'GET_QUESTION_DETAIL_REQUEST'
export const GET_QUESTION_DETAIL_SUCCESS = 'GET_QUESTION_DETAIL_SUCCESS'
export const GET_QUESTION_DETAIL_FAIL = 'GET_QUESTION_DETAIL_FAIL'

export const GET_QUESTION_REQUEST = 'GET_QUESTION_REQUEST'
export const GET_QUESTION_SUCCESS = 'GET_QUESTION_SUCCESS'
export const GET_QUESTION_FAIL = 'GET_QUESTION_FAIL'

export const PATCH_QUESTION_PAGE_INIT = 'PATCH_QUESTION_PAGE_INIT'
export const PATCH_QUESTION_PAGE_REQUEST = 'PATCH_QUESTION_PAGE_REQUEST'
export const PATCH_QUESTION_PAGE_SUCCESS = 'PATCH_QUESTION_PAGE_SUCCESS'
export const PATCH_QUESTION_PAGE_FAIL = 'PATCH_QUESTION_PAGE_FAIL'

export const DELETE_QUESTION_PAGE_INIT = 'DELETE_QUESTION_PAGE_INIT'
export const DELETE_QUESTION_PAGE_REQUEST = 'DELETE_QUESTION_PAGE_REQUEST'
export const DELETE_QUESTION_PAGE_SUCCESS = 'DELETE_QUESTION_PAGE_SUCCESS'
export const DELETE_QUESTION_PAGE_FAIL = 'DELETE_QUESTION_PAGE_FAIL'

export const PATCH_QUESTION_INIT = 'PATCH_QUESTION_INIT'
export const PATCH_QUESTION_REQUEST = 'PATCH_QUESTION_REQUEST'
export const PATCH_QUESTION_SUCCESS = 'PATCH_QUESTION_SUCCESS'
export const PATCH_QUESTION_FAIL = 'PATCH_QUESTION_FAIL'

export const MAKE_QUESTION_COMMENT_REQUEST = 'MAKE_QUESTION_COMMENT_REQUEST'
export const MAKE_QUESTION_COMMENT_SUCCESS = 'MAKE_QUESTION_COMMENT_SUCCESS'
export const MAKE_QUESTION_COMMENT_FAIL = 'MAKE_QUESTION_COMMENT_FAIL'

export const THUMP_HANDLE_INIT = 'THUMP_HANDLE_INIT'
export const THUMP_HANDLE_REQUEST = 'THUMP_HANDLE_REQUEST'
export const THUMP_HANDLE_SUCCESS = 'THUMP_HANDLE_SUCCESS'
export const THUMP_HANDLE_FAIL = 'THUMP_HANDLE_FAIL'


export const QUESTION_COMMENTS_INIT = 'GET_QUESTION_COMMENTS_INIT';
export const QUESTION_COMMENTS_REQUEST = 'QUESTION_COMMENTS_REQUEST'
export const QUESTION_COMMENTS_SUCCESS = 'QUESTION_COMMENTS_SUCCESS'
export const QUESTION_COMMENTS_FAIL = 'QUESTION_COMMENTS_FAIL'

export const makeQuestionRequest = (data: QuestionRequest) => {
    return { type: MAKE_QUESTION_REQUEST, payload: { data } };
};
export const makeQuestionSuccess = (data: Question) => {
    return { type: MAKE_QUESTION_SUCCESS, payload: data };
};
export const MakeQuestionFail = (err: boolean) => {
    return { type: MAKE_QUESTION_FAIL, payload: { err } };
};
export const MakeQuestionInit = () => {
    return { type: MAKE_QUESTION_INIT }
}

export const makeQuestionCommentRequest = (data: MakeCommentRequest) => {
    return { type: MAKE_QUESTION_COMMENT_REQUEST, payload: { data } };
};
export const makeQuestionCommentSuccess = (data: Question[]) => {
    return { type: MAKE_QUESTION_COMMENT_SUCCESS, payload: { data } };
};
export const makeQuestionCommentFail = (err: boolean) => {
    return { type: MAKE_QUESTION_COMMENT_FAIL, payload: { err } };
};

export const getQuestionDetailRequest = ({ id, token }: { id: number, token: string }) => {
    return { type: GET_QUESTION_DETAIL_REQUEST, payload: { id, token } };
}

export const getQuestionDetailSuccess = (data: QuestionDetail[]) => {
    return { type: GET_QUESTION_DETAIL_SUCCESS, payload: { data } };
};
export const getQuestionDetailFail = (err: boolean) => {
    return { type: GET_QUESTION_DETAIL_FAIL, payload: { err } };
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