export interface patchPayload {
    token: string;
    content: string;
    id: number;
    index: number;
}

export interface patchTitlePayload {
    token: string;
    tags: string[];
    title: string;
    id: number;
    pk: string
}