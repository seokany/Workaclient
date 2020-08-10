import { Alert } from 'react-native'
import axios, { AxiosError, AxiosPromise } from "axios";
import base from './baseURL.json'
import { PatchProfileImagePayload } from '../state/Profile/Action.js';
import { Form } from './Feed.js';
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

export const patchComment = ({ token, comment }: { token: string, comment: string }) => {
    return reqresApi.patch(`accounts/comment/`, { comment }, { headers: { Authorization: `JWT ${token}` } })
        .catch((error: AxiosError) => {
            if (error) {
                throw error.response
            }
            throw { status: 500 }
        })
}

export const patchUserImages = ({ token, images }: PatchProfileImagePayload) => {
    if (!images) {
        throw "NEED IMAGES";
    }
    const form: Form = new FormData();
    let match = /\.(\w+)$/.exec(images);
    let type = match ? `image/${match[1]}` : `image`;
    form.append('user_image', { uri: images, name: images.split('/').pop(), type });
    return reqresApi.patch(`accounts/image/`, form, {
        headers: {
            Authorization: `JWT ${token}`, 'Content-Type': 'application/x-www-form-urlencoded', 'charset': 'utf-8'
        }
    })
        .catch((error: AxiosError) => {
            if (error) {
                throw error.response
            }
            throw { status: 500 }
        })
}