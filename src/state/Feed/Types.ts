import { author } from "../Profile/Types";

export interface makeCard {
    title: string,
    tags: [],
    text: string,
    images: string,
    token: string,
    pk: string,
}
export interface Feed {
    id: number,
    author: author,
    title: string,
    images: string,
    text: string,
    created_at: string,
    updated_at: string,
    number_of_likes: string,
    number_of_comments: string,
    post_comments?: string[],
    tags: string[]
}

export interface responseFeeds {
    count: number,
    next: string,
    previous: string,
    results: Feed[]
}

export interface PatchFeedPayload {
    images: string;
    title: string;
    text: string;
    tags: string[];
    token: string;
    id: number;
}

export interface FeedState {
    posting: boolean;
    fetching: boolean;
    data: Feed[]
    err: boolean;
}
export interface FeedAction {
    type: string;
    payload: Feed[]
}


export interface ResponseMakeFeed {
    data: Feed;
}

export interface Request_User {
    comment : string;
    mbti: string;
    mentiee: number;
    mento: number;
    pk: number;
    user_image: string
    username: string

}

export interface ResponseGetFeed {
    data: {
        request_user:Request_User
        results: Feed[]
    }
}

export interface Form extends FormData {
    append(name: string,
           value: string | Blob | {
               uri: string;
               name?: string;
               type: string
           }): void;
}