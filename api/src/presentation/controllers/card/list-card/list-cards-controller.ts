import { dataMapper } from "./../../../util/helpers/data-mapper";
import { ListCardsUseCase } from "../../../../domain/usecases/card/list-cards/list-cards-usecase";
import { Controller } from "../../../util/contracts/controller";
import { HttpRequest, ResponseData } from "../../../util/contracts/http-data";
import { error } from "../../../util/handlers/handle-error";
import { success } from "../../../util/handlers/handle-success";

export class ListCardsController implements Controller {
    constructor(private useCase: ListCardsUseCase) {}

    async handle(request: HttpRequest): Promise<ResponseData> {
        try {
            const result = await this.useCase.run();
            return success(result.map(dataMapper), "List Cards", 200);
        } catch (e) {
            return error(e);
        }
    }
}
