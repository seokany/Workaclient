export interface SignupPayload {
    email: string;
    username: string;
    password: string;
    status: string;
};

export interface SignupActionTypes {
    type: string;
    payload: SignupPayload;
};

export interface SignupResponse {
    data: {
        token: string;
        pk: number;
    }
}

export interface SignupError {
    data: {
        email?: string[];
        username?: string[];
    };
    status: number;
}

export interface SignupState {
    pending: boolean;
    isSignup: boolean;
    isError: boolean;
    email: string;
    username: string;
};
