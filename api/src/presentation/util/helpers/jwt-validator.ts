import { UnauthorizedError } from "./../errors/unauthorized-error";
import { JwtService } from "../../../infra/services/jwt-service";

export const validateJwt = (token: string | undefined): any => {
    if (!token) {
        throw new UnauthorizedError();
    }

    try {
        const decodedToken = new JwtService().getPayload(token.split(" ")[1]);
        return decodedToken;
    } catch (e: any) {
        const error = new UnauthorizedError();
        error.message = e.toString();
        throw error;
    }
};
