import { NextFunction, Request, Response } from "express";
import { removeUpdateLogger } from "../../../presentation/util/helpers/card-logger";

export const removeUpdateMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    removeUpdateLogger(
        req.method,
        req.params.id ?? "abc",
        req.body?.title ?? "abc",
        () => next()
    );
};
