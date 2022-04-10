import { Repository } from "typeorm";
import { ICard } from "../../../domain/entities/card";
import { ICardRepository } from "../../../domain/repositories/card-repository";
import { database } from "../typeorm/connection";
import { Card } from "../typeorm/entities/Card";

export class CardRepository implements ICardRepository {
    private repository: Repository<Card>;

    constructor() {
        this.repository = database.getConnection().getRepository(Card);
    }

    async create(card: ICard) {
        const toAddCard: Card = this.repository.create(card);
        await this.repository.save(toAddCard);
    }

    async listAll() {
        return (await this.repository.find()) as ICard[];
    }
}
