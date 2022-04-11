import { ControllerError } from "./controller-error";

export class UnauthorizedError extends ControllerError {
    constructor() {
        super("Login failed, try again.");
        this.code = 401;
        this.name = "UnauthorizedError";
    }
}
