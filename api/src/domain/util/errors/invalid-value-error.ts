import { DomainError } from "./domain-error";

export class InvalidValueError extends DomainError {
    constructor(value: string) {
        super(`Value of ${value} is invalid.`);
    }
}
