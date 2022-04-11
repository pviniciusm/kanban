import { ICardRepository } from "../../../../domain/repositories/card-repository";
import {
    MockCardRepository,
    MockCardRepositoryWithData,
} from "../../../../domain/repositories/mock/mock-card-repository";
import { DeleteCardUseCase } from "../../../../domain/usecases/card/delete-card/delete-card-usecase";
import { HttpRequest } from "../../../util/contracts/http-data";
import { DeleteCardController } from "./delete-card-controller";

describe("create card controller tests", () => {
    const makeSut = (repository?: ICardRepository) => {
        const repo = repository ?? new MockCardRepository();
        const useCase = new DeleteCardUseCase(repo);
        const sut = new DeleteCardController(useCase);

        const request: HttpRequest = {
            params: {
                id: "abc",
            },
        };

        return { sut, request: { ...request } };
    };

    test("should return code 400 if no Id is provided", async () => {
        const { sut, request } = makeSut();

        request.params.id = undefined;

        const response = await sut.handle(request);
        expect(response).toBeDefined();
        expect(response.code).toEqual(400);
        expect(response.ok).toBeFalsy();
        expect(response.identifier).toEqual("MissingFieldError");
    });

    test("should return code 200 if request is ok", async () => {
        const { sut, request } = makeSut(new MockCardRepositoryWithData());

        const response = await sut.handle(request);

        expect(response).toBeDefined();
        expect(response.code).toEqual(200);
        expect(response.ok).toBeTruthy();
        expect(response.identifier).toEqual("Success");
    });
});
