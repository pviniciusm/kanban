import { listMapper } from "./../../../util/helpers/list-mapper";
import { dataMapper } from "./../../../util/helpers/data-mapper";
import { CreateCardUseCase } from "../../../../domain/usecases";
import { error } from "../../../util/handlers/handle-error";
import { MissingFieldError } from "../../../util/errors/missing-field-error";
import { success } from "../../../util/handlers/handle-success";
import { Controller } from "../../../util/contracts/controller";
import { HttpRequest, ResponseData } from "../../../util/contracts/http-data";

export class CreateCardController implements Controller {
    constructor(private useCase: CreateCardUseCase) {}

    async handle(request: HttpRequest): Promise<ResponseData> {
        try {
            const { titulo, conteudo, lista } = request.body;

            if (!titulo) {
                throw new MissingFieldError("titulo");
            }

            if (!conteudo) {
                throw new MissingFieldError("conteudo");
            }

            if (!lista) {
                throw new MissingFieldError("list");
            }

            const result = await this.useCase.run({
                title: titulo,
                content: conteudo,
                list: listMapper(lista)!,
            });
            return success(dataMapper(result), "Create Card", 201);
        } catch (e) {
            return error(e);
        }
    }
}
