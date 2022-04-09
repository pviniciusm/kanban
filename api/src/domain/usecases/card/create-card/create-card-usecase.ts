import { v4 as createUuid } from "uuid";

import { ICard, List } from "../../../entities/card";
import { ICardRepository } from "../../../repositories/card-repository";
import { InvalidValueError } from "../../../util/errors/invalid-value-error";

export interface CreateCardParams {
    title: string;
    content: string;
    list: List;
}

export class CreateCardUseCase {
    constructor(private repository: ICardRepository) {}

    async run(params: CreateCardParams): Promise<ICard> {
        if (params.content.length == 0 || params.content.length > 100) {
            throw new InvalidValueError("content");
        }

        if (params.title.length == 0 || params.title.length > 50) {
            throw new InvalidValueError("title");
        }

        const id = createUuid();
        const card = { ...params, id };

        await this.repository.create(card);

        return card;
    }
}
