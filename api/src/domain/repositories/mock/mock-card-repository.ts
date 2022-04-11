import { ICard, List } from "../../entities/card";
import { ICardRepository } from "../card-repository";

export class MockCardRepository implements ICardRepository {
    async create(_: ICard) {
        return;
    }

    async listAll(): Promise<any[]> {
        return [];
    }

    async get(id: string) {
        return null;
    }

    async delete(id: string) {
        return;
    }

    async update(card: ICard) {
        return;
    }
}

const cards: ICard[] = [
    {
        title: "abc",
        content: "123",
        list: List.ToDo,
        id: "abc-123-teste",
    },
];

export const getMockCardData = () => [...cards];

export class MockCardRepositoryWithData implements ICardRepository {
    async create(_: ICard) {
        return;
    }

    async listAll() {
        return cards;
    }

    async get(id: string) {
        return cards[0];
    }

    async delete(id: string) {
        return;
    }

    async update(card: ICard) {
        return;
    }
}
