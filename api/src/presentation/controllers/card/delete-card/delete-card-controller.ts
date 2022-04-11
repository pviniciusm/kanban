import { DeleteCardUseCase } from "../../../../domain/usecases/card/delete-card/delete-card-usecase";
import { Controller } from "../../../util/contracts/controller";
import { HttpRequest, ResponseData } from "../../../util/contracts/http-data";
import { MissingFieldError } from "../../../util/errors/missing-field-error";
import { error } from "../../../util/handlers/handle-error";
import { success } from "../../../util/handlers/handle-success";
import { dataMapper } from "../../../util/helpers/data-mapper";

export class DeleteCardController implements Controller {
    constructor(private useCase: DeleteCardUseCase) {}

    async handle(request: HttpRequest): Promise<ResponseData> {
        try {
            const { id } = request.params;

            if (!id) {
                throw new MissingFieldError("Id");
            }

            const result = await this.useCase.run({
                id,
            });

            return success(result.map(dataMapper), "update card");
        } catch (e) {
            return error(e);
        }
    }
}
