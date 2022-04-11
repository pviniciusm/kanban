import { UseCase } from "../..";
import { ICardRepository } from "../../../repositories/card-repository";
import { InvalidValueError } from "../../../util/errors/invalid-value-error";
import { NotFoundError } from "../../../util/errors/not-found-error";

export interface DeleteCardParams {
    id: string;
}

export class DeleteCardUseCase implements UseCase {
    constructor(private repository: ICardRepository) {}

    async run(params: DeleteCardParams): Promise<any> {
        if (params.id.length === 0) {
            throw new InvalidValueError("id");
        }

        const card = await this.repository.get(params.id);

        if (!card) {
            throw new NotFoundError("Card");
        }

        await this.repository.delete(card.id);

        return await this.repository.listAll();
    }
}
