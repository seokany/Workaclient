import axios, { AxiosError, AxiosPromise } from "axios";
import base from './baseURL.json'
import { responseFeeds } from "../state/Feed/Action";

import { makeCard } from '../state/Feed/Action'
import { string } from "prop-types";

const reqresApi = axios.create({
    baseURL: base.baseURL
});

export const getFeed = ({ token }: { token: string }): AxiosPromise<responseFeeds> => {
    console.log('gugu'+token)
    return reqresApi.get(`post/feed/`, { headers: { Authorization: `JWT ${token}` } })
        .catch((error: AxiosError) => {
            throw error.response
        });
};


export const getFeedDetail = (body: string) => {
    return reqresApi.get(`post/detail/${body}/`)
        .catch((error: AxiosError) => {
            throw error.response
        });
};

interface Form extends FormData {
    append(name: string,
        value: string | Blob | {
            uri: string;
            name?: string;
            type: string
        }): void;
}

export const makeFeed = ({ title,
    tags,
    text,
    images,
    token
}: makeCard) => {
    const form: Form = new FormData();
    console.log("MAKE FEED");
    form.append("title", title);
    form.append("tags", tags);
    form.append("text", text);
    form.append("token", token);
    if (images) {
        let match = /\.(\w+)$/.exec(images);
        let type = match ? `image/${match[1]}` : `image`;
        // form.append('images', JSON.stringify({ uri: images, name: images.split('/').pop(), type }));
        form.append('images', { uri: images, name: images.split('/').pop(), type });
    }
    // console.log(form);
    return reqresApi.post(`post/feed/`, form, {
        headers: {
            Authorization: `JWT ${token}`, 'Content-Type': 'application/x-www-form-urlencoded', 'charset': 'utf-8'
        }
    })
        .catch((error: AxiosError) => {
            console.log(error);
            console.log(error.response);
            throw error.response
        });
};

