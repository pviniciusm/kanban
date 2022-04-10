import { CreateCardUseCase } from "../../../../domain/usecases";
import { error } from "../../../util/handlers/handle-error";
import { MissingFieldError } from "../../../util/errors/missing-field-error";
import { Controller, HttpRequest, ResponseData } from "../../index";
import { success } from "../../../util/handlers/handle-success";

export class CreateCardController implements Controller {
    constructor(private useCase: CreateCardUseCase) {}

    async handle(request: HttpRequest): Promise<ResponseData> {
        try {
            const { title, content, list } = request.body;

            if (!title) {
                throw new MissingFieldError("title");
            }

            if (!content) {
                throw new MissingFieldError("content");
            }

            if (!list) {
                throw new MissingFieldError("list");
            }

            const result = this.useCase.run({ ...request.body });
            return success(result, "Create Card", 201);
        } catch (e) {
            return error(e);
        }
    }
}
