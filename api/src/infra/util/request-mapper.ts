import { Request, Response } from "express";
import { Controller } from "../../presentation/util/contracts/controller";
import {
    HttpRequest,
    ResponseData,
} from "../../presentation/util/contracts/http-data";

export const mapRequest = async (
    req: Request,
    res: Response,
    controller: Controller
) => {
    const request: HttpRequest = {
        body: req.body,
        query: req.query,
        headers: req.headers,
    };

    const result: ResponseData = await controller.handle(request);

    res.status(result.code).send(result);
};
