import { Alert } from 'react-native';
import axios, { AxiosError, AxiosPromise } from "axios";

import { data } from '../state/Search/Types'
import base from './baseURL.json'

const reqresApi = axios.create({
    baseURL: base.baseURL,
});

export const searching = ({ token, temp }: { token: string, temp: string }): AxiosPromise<data> => {
    return reqresApi.get(`post/feed/`, {
        params: {
            search: temp
        },
        headers: { Authorization: `JWT ${token}` }
    })
        .catch((error: AxiosError) => {
            if (error) {
                throw error.response
            }
            throw { status: 500 }
        });
};
