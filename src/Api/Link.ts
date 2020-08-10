import { Alert } from 'react-native';
import axios, { AxiosError, AxiosPromise } from "axios";
import base from './baseURL.json'

const reqresApi = axios.create({
    baseURL: base.baseURL
});

export const postLink = ({ tag, title, token, url }: { token: string, title: string, tag: [], url: string }) => {
    return reqresApi.post(`post/links/`, { tag: tag, title: title, url: url }, { headers: { Authorization: `JWT ${token}` } })
        .catch((error: AxiosError) => {
            if (error) {
                throw error.response
            }
            throw { status: 500 }
        });
};

export const getLink = ({ token }: { token: string }) => {
    return reqresApi.get(`links/`, { headers: { Authorization: `JWT ${token}` } })
        .catch((error: AxiosError) => {
            if (error) {
                throw error.response
            }
            throw { status: 500 }
        });
};

