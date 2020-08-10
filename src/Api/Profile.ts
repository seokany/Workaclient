import { Alert } from 'react-native'
import axios, { AxiosError, AxiosPromise } from "axios";
import base from './baseURL.json'
const reqresApi = axios.create({
    baseURL: base.baseURL,
});

export const getProfile = ({ pk, token }: { token: string, pk: string }) => {
    return reqresApi.get(`profile/${pk}/`, { headers: { Authorization: `JWT ${token}` } })
        .catch((error: AxiosError) => {
            if (error) {
                throw error.response
            }
            throw { status: 500 }
        });
};

export const getQuestion = ({ pk, token }: { pk: string, token: string }) => {
    return reqresApi.get(`pages/${pk}/questions/`, { headers: { Authorization: `JWT ${token}` } })
        .catch((error: AxiosError) => {
            if (error) {
                throw error.response
            }
            throw { status: 500 }
        });
};

export const patchComment = ({ token, comments }: { token: string, comments: string }) => {
    return reqresApi.patch(`accounts/comment/`, { comment: comments }, { headers: { Authorization: `JWT ${token}` } })
        .catch((error: AxiosError) => {
            if (error) {
                throw error.response
            }
            throw { status: 500 }
        })
}