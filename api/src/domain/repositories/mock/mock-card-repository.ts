import { ICard, List } from "../../entities/card";
import { ICardRepository } from "../card-repository";

export class MockCardRepository implements ICardRepository {
    async create(_: ICard) {
        return;
    }

    async listAll() {
        return [];
    }
}

const cards: ICard[] = [
    {
        title: "abc",
        content: "123",
        list: List.toDo,
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
}
