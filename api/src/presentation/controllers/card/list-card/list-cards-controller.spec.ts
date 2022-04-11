import { ICard } from "./../../../../domain/entities/card";
import { ICardRepository } from "./../../../../domain/repositories/card-repository";
import { ListCardsUseCase } from "./../../../../domain/usecases/card/list-cards/list-cards-usecase";
import { List } from "../../../../domain/entities/card";
import { MockCardRepository } from "../../../../domain/repositories/mock/mock-card-repository";
import { CreateCardUseCase } from "../../../../domain/usecases";
import { HttpRequest } from "../../../util/contracts/http-data";
import { CreateCardController } from "../create-card/create-card-controller";
import { ListCardsController } from "./list-cards-controller";

class ErrorMockCardRepository extends MockCardRepository {
    listAll(): Promise<any[]> {
        throw new Error("Test error");
    }
}

describe("create card controller tests", () => {
    const makeSut = (repository?: ICardRepository) => {
        const repo = repository ?? new MockCardRepository();
        const useCase = new ListCardsUseCase(repo);
        const sut = new ListCardsController(useCase);

        const request: HttpRequest = {};

        return { sut };
    };

    test("should return code 200 if response is ok", async () => {
        const { sut } = makeSut();

        const response = await sut.handle({});
        expect(response).toBeDefined();
        expect(response.code).toEqual(200);
        expect(response.ok).toBeTruthy();
    });

    test("should return code 500 if something was wrong with usecase call", async () => {
        const { sut } = makeSut(new ErrorMockCardRepository());

        const response = await sut.handle({});
        expect(response).toBeDefined();
        expect(response.code).toEqual(500);
        expect(response.ok).toBeFalsy();
    });
});
