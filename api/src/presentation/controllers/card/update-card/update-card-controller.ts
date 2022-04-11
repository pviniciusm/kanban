import { listMapper } from "./../../../util/helpers/list-mapper";
import { dataMapper } from "./../../../util/helpers/data-mapper";
import { UpdateCardUseCase } from "../../../../domain/usecases/card/update-card/update-card-usecase";
import { Controller } from "../../../util/contracts/controller";
import { HttpRequest, ResponseData } from "../../../util/contracts/http-data";
import { MissingFieldError } from "../../../util/errors/missing-field-error";
import { error } from "../../../util/handlers/handle-error";
import { success } from "../../../util/handlers/handle-success";
import { List } from "../../../../domain/entities/card";

export class UpdateCardController implements Controller {
    constructor(private useCase: UpdateCardUseCase) {}

    async handle(request: HttpRequest): Promise<ResponseData> {
        try {
            const { id } = request.params;
            const { titulo, conteudo, lista } = request.body;

            if (!id) {
                throw new MissingFieldError("Id");
            }

            if (!titulo) {
                throw new MissingFieldError("titulo");
            }

            if (!conteudo) {
                throw new MissingFieldError("conteudo");
            }

            if (!lista) {
                throw new MissingFieldError("lista");
            }

            const result = await this.useCase.run({
                id,
                title: titulo,
                content: conteudo,
                list: listMapper(lista)!,
            });

            return success(dataMapper(result), "update card");
        } catch (e) {
            return error(e);
        }
    }
}
