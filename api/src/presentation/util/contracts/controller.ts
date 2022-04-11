import { HttpRequest, ResponseData } from "./http-data";

export interface Controller {
    handle(request: HttpRequest): Promise<ResponseData>;
}
