import axios, { AxiosError, AxiosPromise } from "axios";

import { data } from '../state/Search/Reducer'
import base from './baseURL.json'

const reqresApi = axios.create({
    baseURL: base.baseURL,
});

export const searching = ({ token, temp }: { token: string, temp: string }): AxiosPromise<data> => {
    return reqresApi.get(`search/`, {
        params: {
            search: temp
        },
        headers: { Authorization: `JWT ${token}` }
    })
        .catch((error: AxiosError) => {
            throw error.response
        });
};
