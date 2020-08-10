import {card, page, user} from "../Profile/Types";

export interface Question {
    author: {
        username: string
    },
    title: string,
    tags: string[]
}
export interface QuestionRequest {
    tag: string,
    title: string,
    question: string,
    token: string
}

export interface author {
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

export interface CommentRequest {
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


export interface MakeQuestionResponse {
    data: page
}
export interface GetQuestionResponse {
    data:{
        results:page[]
    }
}
export interface GetQuestionDetailResponse {
    data: {
        request_user: user
        results: QuestionDetail[]
    }
}

export interface MakeQuestionCommentResponse {
    data: QuestionComment
}
export interface GetQuestionCommentResponse {
    data:{
        results: QuestionComment[]
    }
}

export interface Action {
    type: string;
    payload: card[] | Comment[] | QuestionDetail[]
}

export interface QuestionInitState {
    posting: boolean;
    fetching: boolean;
    err: boolean;
}
export interface QuestionState extends QuestionInitState {
    data: {
        results: page[]
    }
}

export interface CommentState extends QuestionInitState {
    data: QuestionComment[];
}

export interface QuestionDetailState extends QuestionInitState {
    data: {
        results: QuestionDetail[]
    }
}



export interface patchPayload {
    token: string;
    content: string;
    id: number;
    index: number;
}

export interface patchTitlePayload {
    token: string;
    tags: string[];
    title: string;
    id: number;
    pk: string
}