import { DomainError } from "./domain-error";

export class NotFoundError extends DomainError {
    constructor(entity: string) {
        super(`${entity} was not found.`, 404);
        this.name = "NotFoundError";
    }
}
