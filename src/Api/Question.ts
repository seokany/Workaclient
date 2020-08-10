import axios, { AxiosError, AxiosPromise } from "axios";
import base from './baseURL.json'

import { patchPayload, patchTitlePayload } from '../state/Question/Types'
import { LikeActions } from "../state/Question/Action.js";

const reqresApi = axios.create({
    baseURL: base.baseURL,
});

export const makeQuestionCard = ({ tags, title, token }: { token: string, title: string, tags: [] }) => {
    return reqresApi.post(`pages/`, { title, tags }, { headers: { Authorization: `JWT ${token}` } })
        .catch((error: AxiosError) => {
            if (error) {
                throw error.response
            }
            throw { status: 500 }
        });
};

export const makeQuestion = ({ id, title, question, token }: { id: string, title: string, question: string, token: string }) => {
    return reqresApi.post(`pages/${id}/questions/`, { content: question, title }, { headers: { Authorization: `JWT ${token}` } })
        .catch((error: AxiosError) => {
            if (error) {
                throw error.response
            }
            throw { status: 500 }
        });
};


export const getQuestion = ({ token }: { token: string }) => {
    return reqresApi.get(`pages/`, { headers: { Authorization: `JWT ${token}` } })
        .catch((error: AxiosError) => {
            if (error) {
                throw error.response
            }
            throw { status: 500 }
        });
};

export const patchQuestionPage = ({ token, id, title, tags }: patchTitlePayload) => {
    return reqresApi.patch(`pages/${id}/`, { title, tags }, { headers: { Authorization: `JWT ${token}` } })
        .catch((error: AxiosError) => {
            if (error) {
                throw error.response
            }
            throw { status: 500 }
        })
}

export const deleteQuestionPage = ({ token, id }: patchTitlePayload) => {
    return reqresApi.delete(`pages/${id}/`, { headers: { Authorization: `JWT ${token}` } })
        .catch((error: AxiosError) => {
            if (error) {
                throw error.response
            }
            throw { status: 500 }
        })
}

export const getQuestionDetail = ({ token, id }: { token: string, id: number }) => {
    return reqresApi.get(`pages/${id}/questions/`, { headers: { Authorization: `JWT ${token}` } })
        .catch((error: AxiosError) => {
            if (error) {
                throw error.response
            }
            throw { status: 500 }
        });
};

export const patchQuestion = ({ token, content, id, index }: patchPayload) => {
    return reqresApi.patch(
        `pages/${id}/questions/${index}/`,
        { content },
        { headers: { Authorization: `JWT ${token}` } }
    )
        .catch((error: AxiosError) => {
            if (error) {
                throw error.response
            }
            throw { status: 500 }
        })
}


export const makeQuestionComment = ({ page_pk, question_pk, text, token }: { page_pk: number, question_pk: number, token: string, text: string }) => {
    return reqresApi.post(`pages/${page_pk}/questions/${question_pk}/comments/`, { text }, { headers: { Authorization: `JWT ${token}` } })
        .catch((error: AxiosError) => {
            if (error) {
                throw error.response
            }
            throw { status: 500 }
        });
};

export const getQuestionComment = ({ page_pk, question_pk, token }: { page_pk: number, question_pk: number, token: string }) => {
    return reqresApi.get(`pages/${page_pk}/questions/${question_pk}/comments/`, { headers: { Authorization: `JWT ${token}` } })
        .catch((error: AxiosError) => {
            if (error) {
                throw error.response
            }
            throw { status: 500 }
        });
};

export const postThumpHandle = ({ token, id, questionId, commentId }: LikeActions) => {
    return reqresApi
        .post(
            `pages/${id}/questions/${questionId}/comments/${commentId}/like/`,
            {},
            { headers: { Authorization: `JWT ${token}` } }
        )
        .catch((error: AxiosError) => {
            if (error) {
                console.log(error.response)
                throw error.response
            }
            throw { status: 500 }
        })
}