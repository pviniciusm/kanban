import { UseCase } from "../..";
import { List } from "../../../entities/card";
import { ICardRepository } from "../../../repositories/card-repository";
import { InvalidValueError } from "../../../util/errors/invalid-value-error";
import { NotFoundError } from "../../../util/errors/not-found-error";
import { validateCardFields } from "../../../util/helpers/validate-card-fields";

export interface UpdateCardParams {
    id: string;
    title: string;
    content: string;
    list: List;
}

export class UpdateCardUseCase implements UseCase {
    constructor(private repository: ICardRepository) {}

    async run(params: UpdateCardParams): Promise<any> {
        if (params.id.length === 0) {
            throw new InvalidValueError("id");
        }

        validateCardFields(params);

        const card = await this.repository.get(params.id);
        if (!card) {
            throw new NotFoundError("Card");
        }

        await this.repository.update(params);

        return params;
    }
}
