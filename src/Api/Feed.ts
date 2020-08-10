import axios, {AxiosError, AxiosPromise} from "axios";
import base from './baseURL.json'

const reqresApi = axios.create({
    baseURL: base.baseURL
});

export const getFeed = () => {
    return reqresApi.get(`post/all/`)
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

export const makeFeed = (body: any) => {
    return reqresApi.post(`/feed/`, body, { headers: { Authorization: `JWT ${body.token}` } })
        .catch((error: AxiosError) => {
            throw error.response
        });
};

