import { UseCase } from "../..";
import { ICard } from "../../../entities/card";
import { ICardRepository } from "../../../repositories/card-repository";

export class ListCardsUseCase implements UseCase {
    constructor(private repository: ICardRepository) {}

    async run(): Promise<ICard[]> {
        return this.repository.listAll();
    }
}
