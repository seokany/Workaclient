import { questionCard } from "../Question/Reducer";

export interface user {
    pk: number,
    username: string,
    user_image: string,
    mento: number,
    mentiee: number,
    mbti: string,
    comments: string,
}

interface author {
    pk: number,
    username: string,
    user_image: string,
}
export interface page {
    id: string,
    author: author,
    title: string,
    tags: string[],
    questions: number,
    created_at: string,
}

export interface card {
    id: number,
    author: author,
    images: string,
    title: string;
    text: string,
    created_at: string,
    updated_at: string,
    "number_of_likes": string,
    "number_of_comments": string,
    "tags": string[]
}

export interface Profile {
    user: user
    pages: questionCard[]
    cards: card[]
}
interface RequestProfileQuestion {
    token: string
    pk: number
}

export interface ProfileQuestion {
    count: number,
    results: {
        id: number,
        content: string,
        created_at: string
    }
}

export interface PatchProfileImagePayload {
    token: string;
    images: string;
    pk: string;
}

interface CommentRequest {
    account_pk: number,
    pk: number,
    question_id: number,
    token: string
}
//수정
export interface Comment {
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

export interface CommentResponse {
    count: number,
    results: Comment[]
}

export const PROFILE_REQUEST = 'PROFILE_REQUEST'
export const PROFILE_SUCCESS = 'PROFILE_SUCCESS'
export const PROFILE_FAIL = 'PROFILE_FAIL'

export const PROFILE_INFO_REQUEST = 'PROFILE_INFO_REQUEST'
export const PROFILE_INFO_SUCCESS = 'PROFILE_INFO_SUCCESS'
export const PROFILE_INFO_FAIL = 'PROFILE_INFO_FAIL'

export const PATCH_PROFILE_IMAGES_REQUEST = 'PATCH_PROFILE_IMAGES_REQUEST'
export const PATCH_PROFILE_IMAGES_SUCCESS = 'PATCH_PROFILE_IMAGES_SUCCESS'
export const PATCH_PROFILE_IMAGES_FAIL = 'PATCH_PROFILE_IMAGES_FAIL'

export const PROFILE_QUESTION_REQUEST = 'PROFILE_QUESTION_REQUEST'
export const PROFILE_QUESTION_SUCCESS = 'PROFILE_QUESTION_SUCCESS'
export const PROFILE_QUESTION_FAIL = 'PROFILE_QUESTION_FAIL'

export const PATCH_COMMENTS_SUCCESS = 'PATCH_COMMENTS_SUCCESS'
export const PATCH_COMMENTS_REQUEST = 'PATCH_COMMENTS_REQUEST'


export const ProfileRequest = (data: string) => {
    return { type: PROFILE_REQUEST, payload: { data } };
};
export const ProfileSuccess = (data: Profile) => {
    return { type: PROFILE_SUCCESS, payload: { data } };
};
export const ProfileFail = (err: boolean) => {
    return { type: PROFILE_FAIL, payload: { err } };
};

export const QuestionRequest = (data: RequestProfileQuestion) => {
    return { type: PROFILE_QUESTION_REQUEST, payload: { data } };
};
export const QuestionSuccess = (data: ProfileQuestion[]) => {
    return { type: PROFILE_QUESTION_SUCCESS, payload: { data } };
};
export const QuestionFail = (err: boolean) => {
    return { type: PROFILE_QUESTION_FAIL, payload: { err } };
};
