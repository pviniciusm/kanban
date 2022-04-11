import { validateCardFields } from "./../../../util/helpers/validate-card-fields";
import { v4 as createUuid } from "uuid";
import { UseCase } from "../..";

import { ICard, List } from "../../../entities/card";
import { ICardRepository } from "../../../repositories/card-repository";
import { InvalidValueError } from "../../../util/errors/invalid-value-error";

export interface CreateCardParams {
    title: string;
    content: string;
    list: List;
}

export class CreateCardUseCase implements UseCase {
    constructor(private repository: ICardRepository) {}

    async run(params: CreateCardParams): Promise<ICard> {
        validateCardFields(params);

        const id = createUuid();
        const card = { ...params, id };

        await this.repository.create(card);

        return card;
    }
}
