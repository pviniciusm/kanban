import { DomainError } from "../../../domain/util/errors/domain-error";
import { ResponseData } from "../contracts/http-data";
import { ControllerError } from "../errors/controller-error";

export const error = (e: any): ResponseData => {
    if (e instanceof DomainError || e instanceof ControllerError) {
        return {
            ok: false,
            message: e.message,
            identifier: e.name,
            code: e.code ?? 400,
        };
    }

    if (e instanceof Error) {
        return {
            ok: false,
            message: e.message,
            identifier: e.name,
            code: 500,
        };
    }

    return {
        ok: false,
        message: e.toString(),
        identifier: "unknown",
        code: 500,
    };
};
