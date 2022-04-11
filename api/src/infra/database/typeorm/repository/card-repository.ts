import { Repository } from "typeorm";
import { ICard } from "../../../../domain/entities/card";
import { ICardRepository } from "../../../../domain/repositories/card-repository";
import { database } from "../connection";
import { Card } from "../entities/Card";

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

    async delete(id: string) {
        // const card = await this.repository.findOne(id);
        await this.repository.delete(id);
    }

    async get(id: string): Promise<ICard | null> {
        return (await this.repository.findOne(id)) ?? null;
    }

    async update(card: ICard) {
        const obtainedCard = await this.repository.findOne(card.id);

        if (obtainedCard) {
            obtainedCard.content = card.content;
            obtainedCard.title = card.title;
            obtainedCard.list = card.list;
        }

        await this.repository.save(obtainedCard!);
    }
}
