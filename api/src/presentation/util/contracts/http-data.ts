export interface HttpRequest {
    body?: any;
    query?: any;
    headers?: any;
    params?: any;
}

export interface ResponseData {
    ok: boolean;
    message: string;
    code: number;
    data?: any;
    identifier?: string;
}
