import { validateJwt } from "./../../../presentation/util/helpers/jwt-validator";
import { NextFunction, Request, Response } from "express";
import { error } from "../../../presentation/util/handlers/handle-error";

export const authorizationMid = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const payload = validateJwt(req.headers.authorization);
        req.body.user = payload.user;
    } catch (e) {
        return res.status(401).send(error(e));
    }

    next();
};
