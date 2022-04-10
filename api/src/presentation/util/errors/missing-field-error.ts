import { ControlerError } from "./controller-error";

export class MissingFieldError extends ControlerError {
    constructor(field: string) {
        super(`Request is missing ${field}.`, 400);
        this.name = "MissingFieldError";
    }
}
