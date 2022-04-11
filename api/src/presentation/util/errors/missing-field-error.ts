import { ControllerError } from "./controller-error";

export class MissingFieldError extends ControllerError {
    constructor(field: string) {
        super(`Request is missing ${field}.`, 400);
        this.name = "MissingFieldError";
    }
}
