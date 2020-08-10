import * as Types from './Types'

export const PROFILE_REQUEST = 'PROFILE_REQUEST'
export const PROFILE_SUCCESS = 'PROFILE_SUCCESS'
export const PROFILE_FAIL = 'PROFILE_FAIL'
// 다른사람 프로필 들어가기
export const PROFILE_INFO_REQUEST = 'PROFILE_INFO_REQUEST'
export const PROFILE_INFO_SUCCESS = 'PROFILE_INFO_SUCCESS'
export const PROFILE_INFO_FAIL = 'PROFILE_INFO_FAIL'
// 이미지 바꾸기
export const PATCH_PROFILE_IMAGES_REQUEST = 'PATCH_PROFILE_IMAGES_REQUEST'
export const PATCH_PROFILE_IMAGES_SUCCESS = 'PATCH_PROFILE_IMAGES_SUCCESS'
export const PATCH_PROFILE_IMAGES_FAIL = 'PATCH_PROFILE_IMAGES_FAIL'

export const PROFILE_QUESTION_SUCCESS = 'PROFILE_QUESTION_SUCCESS'
export const PROFILE_CARD_SUCCESS = "PROFILE_CARD_SUCCESS"

export const PATCH_COMMENTS_SUCCESS = 'PATCH_COMMENTS_SUCCESS'
export const PATCH_COMMENTS_REQUEST = 'PATCH_COMMENTS_REQUEST'


export const ProfileRequest = (data: string) => {
    return { type: PROFILE_REQUEST, payload: { data } };
};
export const ProfileSuccess = (data: Types.Profile) => {
    return { type: PROFILE_SUCCESS, payload: { data } };
};
export const ProfileFail = (err: boolean) => {
    return { type: PROFILE_FAIL, payload: { err } };
};

export const QuestionSuccess = (data: Types.ProfileQuestion[]) => {
    return { type: PROFILE_QUESTION_SUCCESS, payload:  data  };
};
