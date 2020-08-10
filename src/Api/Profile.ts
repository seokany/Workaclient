import axios, { AxiosError, AxiosPromise } from "axios";
import base from './baseURL.json'
const reqresApi = axios.create({
    baseURL: base.baseURL,
});

export const getProfile = ({ pk, token }: { token: string, pk: string }) => {
    return reqresApi.get(`profile/${pk}/`, { headers: { Authorization: `JWT ${token}` } })
        .catch((error: AxiosError) => {
            throw error.response
        });
};

export const getQuestion = ({ pk, token }: { pk: string, token: string }) => {
    return reqresApi.get(`pages/${pk}/questions/`, { headers: { Authorization: `JWT ${token}` } })
        .catch((error: AxiosError) => {
            throw error.response
        });
};

export const patchComment = ({ token, comments }: { token: string, comments: string }) => {
    console.log(token, comments);
    return reqresApi.patch(`accounts/comment/`, { comment: comments }, { headers: { Authorization: `JWT ${token}` } })
        .catch((error: AxiosError) => {
            console.log("ERROR");
            console.log(error);
            console.log(error.response);
            throw error.response
        })
}