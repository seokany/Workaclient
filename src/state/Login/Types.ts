export interface LoginPayload {
    username: string;
    password: string;
};

export interface payload {
    token: string;
    user: User
}

export interface forgetPayload {
    email: string;
    username: string;
}

export interface forgetResponse {

}

export interface TendencyActionTypes {
    type: string;
    payload: {
        mbti: string;
        token: string;
    }
}

export interface User {
    pk: number;
    username: string;
    mbti: string | null;
};


export interface LoginResponse {
    data: payload
};

export interface TendencyResponse {
    data: {
        token: string;
        user: User;
    }
};

export interface withdrawal {
    type: string;
    payload: {
        token: string;
    }
}

export interface LoginActionTypes {
    type: string;
    payload: LoginPayload;
};
export interface LoginState {
    pending: boolean;
    isLogin: boolean;
    isError: boolean;
    isSkip: boolean;
    data: User;
    mbti: string;
    token: string;
};

export interface ForgotState {
    fetching: boolean;
    success: boolean;
    error: string;
}

export interface ForgotUsernameState {
    email: string;
    fetching: boolean;
    success: boolean;
    error: string;
}

export interface forgotAction {
    type: string;
    payload: {
        email: string;
        username: string;
    }
}

export interface forgotEamilAciton {
    type: string;
    payload: {
        email: string;
    }
}

export interface action {
    type: string;
    payload: payload;
}
