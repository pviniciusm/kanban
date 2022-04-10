import { v4 } from "uuid";

import { UseCase } from "./../../index";
import { ICardRepository } from "../../../repositories/card-repository";
import { List, ICard } from "../../../entities/card";
import { MockCardRepository } from "../../../repositories/mock/mock-card-repository";
import {
    getMockCardData,
    MockCardRepositoryWithData,
} from "./../../../repositories/mock/mock-card-repository";
import { ListCardsUseCase } from "./list-cards-usecase";

describe("create card use case tests", () => {
    const makeSut = (mockRepository?: ICardRepository) => {
        const repository = new MockCardRepository();
        const sut = new ListCardsUseCase(mockRepository ?? repository);
        return { sut };
    };

    test("should return a list", async () => {
        const { sut } = makeSut();

        const result = await sut.run();
        expect(Array.isArray(result)).toBe(true);
    });

    test("should return a list of cards if DB contains a card", async () => {
        const card: ICard = getMockCardData()[0];

        const repository = new MockCardRepositoryWithData();
        const { sut } = makeSut(repository);

        const result = await sut.run();
        expect(Array.isArray(result)).toBe(true);
        expect(result).toHaveLength(1);
        expect(result[0]).toMatchObject(card);
    });
});
