export class DomainError extends Error {
    constructor(message: string, public code?: number) {
        super(message);
        this.code = code ?? 400;
    }
}
