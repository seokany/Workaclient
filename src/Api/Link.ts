import axios, { AxiosError, AxiosPromise } from "axios";
import base from './baseURL.json'

const reqresApi = axios.create({
    baseURL: base.baseURL
});

export const postLink = ({id, tags, title, token, url}: {id: number, token: string, title: string, tags:[], url: webkitURL}) => {
    return reqresApi.post(`links/${id}`, {tags, title, url}, { headers: { Authorization: `JWT${ token }`} })
        .catch((error: AxiosError) => {
            throw error.response
        });
};

export const getLink = ({id,  token}: {id: number, token:string}) => {
    return reqresApi.get(`links/${id}/`, { headers: { Authorization: `JWT${token}`} })
        .catch((error: AxiosError) => {
            throw error.response
        });
};

