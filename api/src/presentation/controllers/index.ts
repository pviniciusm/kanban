export interface HttpRequest {
    body?: any;
    query?: any;
    headers?: any;
}

export interface ResponseData {
    ok: boolean;
    message: string;
    code: number;
    data?: any;
    identifier?: string;
}

// export interface HttpResponse {
//     send: (data: any) => Promise<ResponseData>;
// }

export interface Controller {
    handle(request: HttpRequest): Promise<ResponseData>;
}
