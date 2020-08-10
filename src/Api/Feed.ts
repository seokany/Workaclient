import { Alert } from 'react-native';
import axios, { AxiosError, AxiosPromise } from "axios";
import base from './baseURL.json'
import * as Types from '../state/Feed/Types'



const reqresApi = axios.create({
    baseURL: base.baseURL
});

export const getFeed = ({ token }: { token: string }): AxiosPromise<Types.responseFeeds> => {
    return reqresApi.get(`post/feed/`, { headers: { Authorization: `JWT ${token}` } })
        .catch((error: AxiosError) => {
            if (error) {
                throw error.response
            }
            throw { status: 500 }
        });
};


// export const getFeedDetail = (body: string) => {
//     return reqresApi.get(`post/detail/${body}/`)
//         .catch((error: AxiosError) => {
//             if (error) {
//                 throw error.response
//             }
//             throw { status: 500 }
//         });
// };




export const makeFeed = ({ title,
    tags,
    text,
    images,
    token
}: Types.makeCard): AxiosPromise<Types.ResponseMakeFeed> => {
    const form: Types.Form = new FormData();
    form.append("title", title);
    for (let i = 0; i < tags.length; i++) {
        const tag = tags[i];
        form.append('tags', tag)
    }

    form.append("text", text);
    if (images) {
        let match = /\.(\w+)$/.exec(images);
        let type = match ? `image/${match[1]}` : `image`;
        // form.append('images', JSON.stringify({ uri: images, name: images.split('/').pop(), type }));
        form.append('images', { uri: images, name: images.split('/').pop(), type });
    }
    return reqresApi.post(`post/feed/`, form, {
        headers: {
            Authorization: `JWT ${token}`, 'Content-Type': 'application/x-www-form-urlencoded', 'charset': 'utf-8'
        }
    })
        .catch((error: AxiosError) => {
            if (error) {
                throw error.response;
            }
            throw { status: 500 }
        });
};

export const patchFeed = ({
    images,
    title,
    text,
    tags,
    token,
    id
}: Types.PatchFeedPayload):AxiosPromise<void> => {
    const form: Types.Form = new FormData();
    form.append("title", title);
    for (let i = 0; i < tags.length; i++) {
        const tag = tags[i];
        form.append('tags', tag)
    }
    form.append("text", text);
    if (images) {
        let match = /\.(\w+)$/.exec(images);
        let type = match ? `image/${match[1]}` : `image`;
        // form.append('images', JSON.stringify({ uri: images, name: images.split('/').pop(), type }));
        if (images) {
            form.append('images', { uri: images, name: images.split('/').pop(), type });
        }
    }

    return reqresApi.patch(`post/feed/${id}/`, form, {
        headers: {
            Authorization: `JWT ${token}`, 'Content-Type': 'application/x-www-form-urlencoded', 'charset': 'utf-8'
        }
    })
        .catch((error) => {
            if (error) {
                throw error.response;
            }
            throw { status: 500 }
        })
}

export const deleteFeed = ({ id, token }: { id: number, token: string }):AxiosPromise<void> => {
    return reqresApi.delete(`post/feed/${id}/`, {
        headers: {
            Authorization: `JWT ${token}`
        }
    })
        .catch((error) => {
            if (error) {
                throw error.response;
            }
            throw { status: 500 }
        })
}