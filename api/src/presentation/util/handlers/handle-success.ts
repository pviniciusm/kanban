import { ResponseData } from "../../controllers";

export const success = (
    data: any,
    operation?: string,
    code?: number
): ResponseData => {
    return {
        ok: true,
        code: code ?? 200,
        message: `Operation${
            operation ? " " + operation : ""
        } was successfully done.`,
        data,
        identifier: "Success",
    };
};
