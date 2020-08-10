import axios, { AxiosError, AxiosPromise } from "axios";
import base from './baseURL.json'
const reqresApi = axios.create({
    baseURL: base.baseURL,
});

export const makeQuestionCard = ({ tags, title, token }: { token: string, title: string, tags: [] }) => {
    return reqresApi.post(`pages/`, { title: title, tags: tags }, { headers: { Authorization: `JWT ${token}` } })
        .catch((error: AxiosError) => {
            throw error.response
        });
};

export const makeQuestion = ({ id, question, token }: { id: string, question: string, token: string }) => {
    console.log(question)
    return reqresApi.post(`pages/${id}/questions/`, { content: question, title: 'kim' }, { headers: { Authorization: `JWT ${token}` } })
        .catch((error: AxiosError) => {
            throw error.response
        });
};


export const getQuestion = ({ token }: { token: string }) => {
    return reqresApi.get(`pages/`, { headers: { Authorization: `JWT ${token}` } })
        .catch((error: AxiosError) => {
            throw error.response
        });
};


export const makeQuestionComment = ({page_pk, question_pk, text, token}:{page_pk:number, question_pk:number, token:string,text:string}) => {
    return reqresApi.post(`pages/${page_pk}/questions${question_pk}/commments/`, {text},{ headers: { Authorization: `JWT ${token}` } })
        .catch((error: AxiosError) => {
            throw error.response
        });
};

export const getQuestionComment = ({page_pk, question_pk, token}:{page_pk:number, question_pk:number, token:string}) => {
    return reqresApi.get(`pages/${page_pk}/questions${question_pk}/commments/`, { headers: { Authorization: `JWT ${token}` } })
        .catch((error: AxiosError) => {
            throw error.response
        });
};