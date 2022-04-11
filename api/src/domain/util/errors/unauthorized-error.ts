import { DomainError } from "./domain-error";

export class InvalidCredentialsError extends DomainError {
    constructor() {
        super(`Your credentials are invalid, try again.`);
        this.code = 401;
        this.name = "InvalidCredentialsError";
    }
}
