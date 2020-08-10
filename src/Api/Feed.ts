import axios, {AxiosError, AxiosPromise} from "axios";

const reqresApi = axios.create({
    baseURL: 'http://172.30.1.13:8000/post',
});

export const getFeed = () => {
    return reqresApi.get(`/all/`)
    .catch((error: AxiosError) => {
        throw error.response
    });
};


export const getFeedDetail = (body: string) => {
    return reqresApi.get(`/detail/${body}/`)
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

