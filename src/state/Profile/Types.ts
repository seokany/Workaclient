
export interface user {
    pk: number,
    username: string,
    user_image: string,
    mento: number,
    mentiee: number,
    mbti: string,
    comments: string,
}

export interface author {
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
    pages: page[]
    cards: card[]
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
export interface ProfileState {
    fetching: boolean;
    data: Profile;
    err: boolean;
}

export interface GetProfileAction {
    type: string;
    payload: {
        token: string;
        pk: string;
    }
}

export interface ProfileResponse {
    data: Profile
}
export interface UserImageResponse {
    data: {
        user_image:string;
    }
}

export interface ProfileReducePayload {
    type: string;
    payload: {
        data: Profile;
        err: boolean;
    }
}
export interface PatchCommentsAction {
    type: string;
    payload: {
        token: string;
        comment: string;
    }
}

export interface ProfileQuestionState {
    fetching: boolean;
    data: ProfileQuestion[];
    err: boolean;
}
