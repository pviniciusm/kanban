export class ControllerError extends Error {
    constructor(message: string, public code?: number) {
        super(message);
        this.code = code ?? 400;
        this.name = "ControllerError";
    }
}
